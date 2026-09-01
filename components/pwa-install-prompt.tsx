"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Download, X, Share, SquarePlus, Smartphone } from "lucide-react"

// How long we stay quiet after the user dismisses the prompt, in ms.
const DISMISS_COOLDOWN = 4 * 24 * 60 * 60 * 1000 // 4 days
const STORAGE_KEY = "morched-pwa-install-dismissed-at"
// Wait a bit after load so the prompt never fights the page's own entrance
// animations — it should feel like a deliberate nudge, not a jump-scare.
const SHOW_DELAY = 2500

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

function isStandalone() {
  if (typeof window === "undefined") return false
  return (
    window.matchMedia?.("(display-mode: standalone)").matches ||
    // iOS Safari
    (window.navigator as any).standalone === true
  )
}

function isIOS() {
  if (typeof window === "undefined") return false
  return /iphone|ipad|ipod/i.test(window.navigator.userAgent)
}

function wasRecentlyDismissed() {
  if (typeof window === "undefined") return false
  const raw = window.localStorage.getItem(STORAGE_KEY)
  if (!raw) return false
  const dismissedAt = Number(raw)
  if (Number.isNaN(dismissedAt)) return false
  return Date.now() - dismissedAt < DISMISS_COOLDOWN
}

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showIOSHint, setShowIOSHint] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (isStandalone() || wasRecentlyDismissed()) return

    let timer: ReturnType<typeof setTimeout> | null = null

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      timer = setTimeout(() => setVisible(true), SHOW_DELAY)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)

    // iOS never fires beforeinstallprompt — show manual "Add to Home
    // Screen" instructions instead, since it's still a real installable PWA.
    if (isIOS()) {
      timer = setTimeout(() => {
        setShowIOSHint(true)
        setVisible(true)
      }, SHOW_DELAY)
    }

    const handleInstalled = () => {
      setVisible(false)
      setDeferredPrompt(null)
    }
    window.addEventListener("appinstalled", handleInstalled)

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
      window.removeEventListener("appinstalled", handleInstalled)
      if (timer) clearTimeout(timer)
    }
  }, [])

  const dismiss = () => {
    setVisible(false)
    window.localStorage.setItem(STORAGE_KEY, String(Date.now()))
  }

  const handleInstallClick = async () => {
    if (!deferredPrompt) return
    await deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    setDeferredPrompt(null)
    setVisible(false)
    if (outcome === "dismissed") {
      window.localStorage.setItem(STORAGE_KEY, String(Date.now()))
    }
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          dir="rtl"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 26 }}
          className="fixed z-[100] bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-sm"
        >
          <div className="relative">
            {/* Pulsing attention glow behind the card */}
            <span className="absolute -inset-1.5 rounded-[28px] bg-red-500/50 blur-xl animate-pulse pointer-events-none" />

            <div className="relative rounded-3xl border border-white/15 bg-red-950/95 backdrop-blur-xl shadow-2xl shadow-red-950/50 overflow-hidden">
              {/* Shine sweep for extra pop */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                  className="absolute top-0 -left-1/2 h-full w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  style={{ animation: "shine 3.5s ease-in-out infinite" }}
                />
              </div>

              <button
                onClick={dismiss}
                aria-label="إغلاق"
                className="absolute top-3 left-3 text-white/50 hover:text-white transition-colors z-10"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="relative p-5 pt-6">
                <div className="flex items-start gap-3">
                  <div className="relative shrink-0">
                    <span className="absolute inset-0 rounded-2xl bg-white animate-ping opacity-20" />
                    <div className="relative w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-lg">
                      <Smartphone className="w-6 h-6 text-red-700" />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-white font-black text-base leading-snug">
                      ثبّت تطبيق مرشد على جهازك
                    </p>
                    <p className="text-white/70 text-xs mt-1 leading-relaxed">
                      وصول أسرع، بدون متصفح، ويعمل من شاشتك الرئيسية مباشرة — على الهاتف أو الحاسوب.
                    </p>
                  </div>
                </div>

                {showIOSHint ? (
                  <div className="mt-4 space-y-2 bg-white/5 border border-white/10 rounded-2xl p-3">
                    <p className="text-white/90 text-xs font-semibold">للتثبيت على آيفون:</p>
                    <div className="flex items-center gap-2 text-white/70 text-xs">
                      <span className="w-5 h-5 rounded-md bg-white/10 flex items-center justify-center shrink-0">
                        <Share className="w-3 h-3" />
                      </span>
                      اضغط على زر المشاركة في المتصفح
                    </div>
                    <div className="flex items-center gap-2 text-white/70 text-xs">
                      <span className="w-5 h-5 rounded-md bg-white/10 flex items-center justify-center shrink-0">
                        <SquarePlus className="w-3 h-3" />
                      </span>
                      ثم اختر "إضافة إلى الشاشة الرئيسية"
                    </div>
                  </div>
                ) : (
                  <div className="mt-4 flex items-center gap-2">
                    <button
                      onClick={handleInstallClick}
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-white text-red-700 font-extrabold text-sm py-2.5 rounded-xl hover:bg-red-50 transition-all hover:scale-[1.02] active:scale-95"
                    >
                      <Download className="w-4 h-4" />
                      تثبيت الآن
                    </button>
                    <button
                      onClick={dismiss}
                      className="px-3 py-2.5 text-white/60 hover:text-white text-xs transition-colors"
                    >
                      لاحقًا
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
