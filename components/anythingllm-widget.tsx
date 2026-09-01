"use client"

import Script from "next/script"

/**
 * AnythingLLM embedded chat widget — configured to:
 *  - show the Morched logo inside the open chat window (data-brand-image-url)
 *  - use a Morched-branded assistant name instead of the default
 *    "AnythingLLM Chat Assistant" (data-assistant-name)
 *  - hide AnythingLLM's own "powered by" sponsor line (data-no-sponsor)
 *  - use Morched's brand red for the chat bubble (data-button-color)
 *
 * NOTE on the closed/collapsed bubble icon: AnythingLLM's public embed API
 * (see https://github.com/Mintplex-Labs/anythingllm-embed) only lets you pick
 * data-chat-icon from a fixed set (plus, chatBubble, support, search2,
 * search, magic) — it does not currently accept a custom image URL for that
 * specific closed-state icon, only for the *opened* chat header
 * (data-brand-image-url, used below). "chatBubble" is used here as the
 * closest generic option. The small floating label rendered by
 * <ChatWidgetLabel /> (see widget-language-badge.tsx) sits right next to it
 * to make clear it's Morched's own assistant.
 */
export function AnythingLLMWidget() {
  return (
    <Script
    />
  )
}
