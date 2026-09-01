"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Sparkles, X } from "lucide-react"

/**
 * Floating "Donate / support us" button.
 *
 * There's no dedicated donation payment gateway wired up yet — no such
 * integration was provided — so the popup opens with a warm, sincere message
 * about supporting free/low-cost legal-AI access for students (tech for
 * good, education) and funnels genuinely interested donors to WhatsApp /
 * email, the same channels already used for support elsewhere on this site.
 * If/when a donation payment link exists, drop it into DONATION_LINK below
 * and it'll be used automatically.
 */
const DONATION_LINK: string | null = null // e.g. "https://flouci.me/pay/xxxxx"
const WHATSAPP_NUMBER = "21628888612"
const CONTACT_EMAIL = "contact@aibc.tn"

export function DonationButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Floating button — placed bottom-left so it never collides with the
          phone button or the AnythingLLM chat bubble, both anchored right. */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="ادعم مرشد"
        className="fixed bottom-6 left-6 z-50 flex items-center gap-2 rounded-full bg-white px-4 py-3 text-red-600 shadow-xl transition hover:scale-110 hover:bg-red-50"
      >
        <Heart className="w-6 h-6 fill-red-500 text-red-500" />
        <span className="hidden sm:inline text-sm font-bold">ادعم مرشد</span>
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
                <p className="text-white/90 leading-relaxed mb-4">
                  مرشد مشروع تونسي يؤمن بأن التقنية يجب أن تكون في خدمة الخير — تعليم مجاني الوصول إليه، ومعرفة
                  قانونية متاحة لكل طالب وطالبة مهما كانت إمكانياتهم. دعمك، مهما كان بسيطًا، يساعدنا على إبقاء
                  التجربة المجانية متاحة للطلبة وتطوير المحتوى القانوني لفائدة الجميع.
                </p>
                <p className="text-sm text-white/70 mb-6">
                  تواصل معنا وسنُسعد بشرح كيف يمكنك المساهمة في دعم التعليم والتقنية من أجل الخير في تونس 🇹🇳
                </p>

                {DONATION_LINK ? (
                  <a
                    href={DONATION_LINK}
                    className="block w-full rounded-xl bg-white py-3 font-extrabold text-red-700 hover:bg-red-100 transition"
                  >
                    ادعم الآن
                  </a>
                ) : (
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("مرحبا، أريد دعم مشروع مرشد القانوني التونسي 💛")}`}
                      className="flex-1 rounded-xl bg-white py-3 font-extrabold text-red-700 hover:bg-red-100 transition"
                    >
                      واتساب
                    </a>
                    <a
                      href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("دعم مشروع مرشد")}`}
                      className="flex-1 rounded-xl border border-white/40 py-3 font-extrabold text-white hover:bg-white/10 transition"
                    >
                      البريد الإلكتروني
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
