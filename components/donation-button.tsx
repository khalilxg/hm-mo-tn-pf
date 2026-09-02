"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Sparkles, X, CheckCircle2 } from "lucide-react"
import { handleDonationStart } from "./hero-section-action"

/**
 * Floating "Donate / support us" button.
 *
 * The donor types a digit-only amount (in TND), clicks "تبرع" (donate), and
 * is redirected to Flouci to pay. Flouci then redirects back to this same
 * site's homepage (see /api/flouci/verify-donation) — a donation doesn't
 * grant chat access like a subscription does, it just says thank you.
 */
const MIN_AMOUNT = 1
const DEFAULT_AMOUNT = 100

export function DonationButton() {
  const [open, setOpen] = useState(false)
  const [amount, setAmount] = useState(String(DEFAULT_AMOUNT))

  const numericAmount = Math.max(MIN_AMOUNT, Number(amount) || 0)
  const donateAction = handleDonationStart.bind(null, String(numericAmount * 1000)) // TND → millimes

  return (
    <>
      {/* Floating button — bottom-left. Clearly reads as a donation button:
          Arabic label on top, heart underneath, always visible (not hidden
          on mobile), with a soft pulsing ring so it stands out. */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="تبرع لدعم مرشد"
        className="fixed bottom-6 left-6 z-50 flex w-16 h-16 flex-col items-center justify-center gap-0.5 rounded-full bg-white text-red-600 shadow-xl transition hover:scale-110 hover:bg-red-50"
      >
        <span className="absolute inset-0 rounded-full bg-red-400/40 animate-ping" />
        <span className="relative text-[11px] font-extrabold leading-none">تبرع</span>
        <Heart className="relative w-5 h-5 fill-red-500 text-red-500" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            dir="rtl"
            className="fixed inset-0 z-[60] flex items-center justify-center bg-red-950/60 backdrop-blur-sm px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 20, stiffness: 260 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md rounded-3xl border border-white/20 bg-gradient-to-b from-red-700 to-red-900 p-8 text-center text-white shadow-2xl overflow-hidden"
            >
              <Sparkles className="absolute -top-4 -right-4 w-24 h-24 text-white/10" />
              <Sparkles className="absolute -bottom-6 -left-6 w-28 h-28 text-white/10 rotate-45" />

              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="إغلاق"
                className="absolute top-4 left-4 text-white/70 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative z-10">
                <Heart className="w-12 h-12 mx-auto mb-4 fill-white text-white animate-pulse" />
                <h3 className="text-2xl font-extrabold mb-3">شكرًا لتفكيرك فينا 💛</h3>
                <p className="text-white/90 leading-relaxed mb-6">
                  دعمك يساعد على تطوير الذكاء الاصطناعي في خدمة التعليم في تونس، وإبقاء تجربة الطلبة
                  مجانية، والاستمرار في النمو لفائدة أكبر عدد ممكن من الطلبة والباحثين.
                </p>

                <form action={donateAction} className="space-y-4">
                  <div>
                    <label htmlFor="donation-amount" className="block text-sm text-white/70 mb-2">
                      المبلغ (دينار تونسي)
                    </label>
                    <div className="flex items-center justify-center gap-2">
                      <input
                        id="donation-amount"
                        name="amountDisplay"
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value.replace(/[^0-9]/g, ""))}
                        className="w-24 rounded-xl border border-white/30 bg-white/10 px-3 py-2 text-center text-xl font-bold text-white outline-none focus:border-white"
                      />
                      <span className="text-white/80 font-semibold">د.ت</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={numericAmount < MIN_AMOUNT}
                    className="w-full rounded-xl bg-white py-3 font-extrabold text-red-700 hover:bg-red-100 transition disabled:opacity-50"
                  >
                    تبرع الآن
                  </button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

/**
 * Reads `?donation=success|failed|cancelled|error` set by
 * /api/flouci/verify-donation after the donor returns from Flouci, and
 * shows a short thank-you (or apology) banner. Mount once near the top of
 * the page.
 */
export function DonationThanksBanner() {
  const [status, setStatus] = useState<string | null>(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const donation = params.get("donation")
    if (donation) {
      setStatus(donation)
      params.delete("donation")
      const newQuery = params.toString()
      const newUrl = window.location.pathname + (newQuery ? `?${newQuery}` : "")
      window.history.replaceState({}, "", newUrl)
      const timer = setTimeout(() => setStatus(null), 7000)
      return () => clearTimeout(timer)
    }
  }, [])

  if (!status) return null

  const isSuccess = status === "success"

  return (
    <div
      dir="rtl"
      className="fixed top-24 inset-x-0 mx-auto w-fit max-w-[92vw] z-[70] flex items-center gap-2 rounded-xl border px-4 py-3 shadow-xl backdrop-blur-sm text-center
        border-white/20 bg-red-800/95 text-white"
    >
      {isSuccess ? (
        <>
          <CheckCircle2 className="w-5 h-5 text-green-300 shrink-0" />
          <p className="text-sm font-semibold">
            شكرًا لدعمك مرشد 💛 ساهمت في دعم الذكاء الاصطناعي من أجل التعليم والنمو في تونس.
          </p>
        </>
      ) : (
        <p className="text-sm font-semibold">
          لم تكتمل عملية التبرع. يمكنك إعادة المحاولة في أي وقت 🙏
        </p>
      )}
    </div>
  )
}
