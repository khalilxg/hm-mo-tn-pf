"use client"

import { useEffect } from "react"

/**
 * Best-effort, site-wide input filter.
 *
 * The bot only understands Arabic script, Latin letters, Arabic/Latin
 * numerals and standard punctuation — everything else (Cyrillic, CJK,
 * emoji spam, etc.) is stripped as the user types, in any <input>,
 * <textarea> or contenteditable element on the page, including the
 * AnythingLLM chat widget's own message box.
 *
 * IMPORTANT / honest limitation: browsers do not let a host page reach
 * inside a *closed* shadow root or a cross-origin <iframe> — that's a
 * security boundary, not a bug here. This listener is attached at the
 * `document` level with `capture: true` and reads `event.composedPath()`,
 * which *does* reach into same-page, *open* shadow roots (the common case
 * for widgets like this one, since the DOM node is retargeted but the
 * event still bubbles up through the composed tree). If AnythingLLM's
 * widget instead renders its input inside a closed shadow root or a
 * cross-origin iframe, this script cannot reach it, and the only fully
 * reliable enforcement is server-side, in the AnythingLLM workspace's
 * system prompt (e.g. "Reply only in Arabic; if the user writes in a
 * script other than Arabic/Latin, ask them to switch to Arabic"). Keep the
 * on-page notices (see LanguageNotice / WidgetLanguageBadge) either way —
 * they cover every case, including closed widgets.
 */

// Arabic block + Arabic-Indic digits, Latin letters, Latin/Arabic-Indic
// digits, whitespace, and common Latin + Arabic punctuation.
const ALLOWED_CHARS =
  /[^\u0600-\u06FF\u0750-\u077F\u08A0-\u08FFA-Za-z0-9\u0660-\u0669\u06F0-\u06F9\s.,!?;:'"()\-_/@#$%^&*+=\[\]{}|\\<>~`،؛؟٪«»“”‘’…]/g

function sanitize(value: string) {
  return value.replace(ALLOWED_CHARS, "")
}

const PROCESSED_FLAG = "__morchedArFiltering"

function isTextField(el: any): el is HTMLInputElement | HTMLTextAreaElement {
  return (
    el &&
    (el.tagName === "TEXTAREA" ||
      (el.tagName === "INPUT" &&
        ["text", "search", "email", "url", "tel", ""].includes((el.getAttribute("type") || "").toLowerCase())))
  )
}

export function ChatInputGuard() {
  useEffect(() => {
    function handleInput(e: Event) {
      const path = (e as any).composedPath ? (e as any).composedPath() : [e.target]
      const target = (path && path[0]) as HTMLElement | undefined
      if (!target || (target as any)[PROCESSED_FLAG]) return

      if (isTextField(target)) {
        const el = target as HTMLInputElement | HTMLTextAreaElement
        const clean = sanitize(el.value)
        if (clean !== el.value) {
          const pos = el.selectionStart ?? clean.length
          ;(el as any)[PROCESSED_FLAG] = true
          el.value = clean
          try {
            el.setSelectionRange(Math.min(pos, clean.length), Math.min(pos, clean.length))
          } catch {
            // ignore — some input types don't support selection ranges
          }
          el.dispatchEvent(new Event("input", { bubbles: true }))
          ;(el as any)[PROCESSED_FLAG] = false
        }
      } else if (target.isContentEditable) {
        const clean = sanitize(target.textContent || "")
        if (clean !== target.textContent) {
          ;(target as any)[PROCESSED_FLAG] = true
          target.textContent = clean
          // Move caret to the end after we rewrite the text.
          const range = document.createRange()
          const sel = window.getSelection()
          range.selectNodeContents(target)
          range.collapse(false)
          sel?.removeAllRanges()
          sel?.addRange(range)
          target.dispatchEvent(new Event("input", { bubbles: true }))
          ;(target as any)[PROCESSED_FLAG] = false
        }
      }
    }

    document.addEventListener("input", handleInput, true)
    return () => document.removeEventListener("input", handleInput, true)
  }, [])

  return null
}
