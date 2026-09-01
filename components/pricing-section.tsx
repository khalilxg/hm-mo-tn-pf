"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "./ui/button"
import { Check } from "lucide-react"
import { Phone } from "lucide-react"
import { handleFlouciStart } from "./hero-section-action"
import { SUBSCRIPTION_PRICE_MILLIMES } from "@/lib/pricing"

const subscribeWithAmount = handleFlouciStart.bind(null, SUBSCRIPTION_PRICE_MILLIMES)

// Only two offers now: one flat yearly subscription, and the enterprise /
// private-instance package (contact us). The previous 20 DT and 40 DT
// monthly tiers were removed on request.
const pricingPlans = [
  {
    name: "الاشتراك السنوي",
    price: "94 دينار",
    priceSuffix: "/ السنة",
    description: "كل ما تحتاجه من مرشد القانوني التونسي، بسعر واحد وبسيط طوال السنة.",
    features: [
      "اشتراك لمدة 12 شهرًا كاملة",
      "رسائل غير محدودة مع الذكاء الاصطناعي",
      "أكثر من 5000 وثيقة قانونية والوصول الكامل إلى الجرائد الرسمية",
    ],
    popular: true,
  },
  {
    name: "الخطة المؤسسية – حل خاص للمؤسسات",
    price: "حل مخصص",
    description: "احصل على نسختك الخاصة (Instance) — تواصل معنا لتفاصيل الأسعار والتنفيذ.",
    features: [
      "نسخة خاصة كاملة",
      "نشر كصورة Docker",
      "نطاق DNS خاص",
      "علامة بيضاء 100%",
      "إدارة المستخدمين والإذنات",
      "تكامل API",
      "تكامل روبوت المراسلة",
      "تحكم كامل على مزود الذكاء الاصطناعي",
      "أمان كامل على خوادمك",
    ],
    enterprise: true,
  },
]

export function PricingSection() {
  const [showPaymentInfo, setShowPaymentInfo] = useState(true)
  const [glow, setGlow] = useState(false)
  const paymentSectionRef = useRef<HTMLDivElement | null>(null)

  const handleSubscribeClick = (plan: typeof pricingPlans[number]) => {
    if (plan.enterprise) {
      window.location.href = "tel:+21628888612"
      return
    }

    setShowPaymentInfo(true)
    setTimeout(() => {
      paymentSectionRef.current?.scrollIntoView({ behavior: "smooth" })
      setGlow(true)
      setTimeout(() => setGlow(false), 1800)
    }, 200)
  }

  return (
    <section
      id="pricing"
      className="py-16 px-4 bg-gradient-to-b from-red-700 to-red-900 min-h-screen text-white relative"
    >
      {/* Raised well above the default bottom-right corner so it doesn't
          overlap the AnythingLLM chat bubble (bottom-right) or the "student
          test" badge that floats just above it (see anythingllm-widget.tsx
          and widget-language-badge.tsx). */}
      <a
        href="tel:+21628888612"
        className="fixed bottom-44 right-6 bg-white hover:bg-red-100 text-red-600 rounded-full shadow-xl p-4 z-40 flex items-center justify-center transition transform hover:scale-110"
      >
        <Phone className="w-7 h-7" />
      </a>

      <div className="text-center text-2xl md:text-3xl font-extrabold mb-12 leading-relaxed">
        قوة القانون … مع ذكاء اصطناعي يفهمك ويدعمك ويوفر عليك ساعات العمل.
        <br /> لأن مستقبلك يستحق أفضل الأدوات وأسرع الحلول.
        <br /> لهذا أنشأنا مرشد القانوني التونسي من أجلك.
      </div>

      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              className={`
                relative flex h-full flex-col rounded-2xl p-8 shadow-xl border border-white/20
                backdrop-blur-xl bg-white/10 hover:bg-white/20 transition
                ${plan.popular ? "shadow-red-300/40 border-white" : ""}
                ${plan.enterprise ? "shadow-yellow-300/40 border-yellow-400" : ""}
              `}
              whileHover={{ scale: 1.04 }}
            >
              {plan.popular && (
                <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded">
                  العرض الوحيد
                </div>
              )}
              <div className="flex-1">
                <h3 className="text-3xl font-bold mb-3">{plan.name}</h3>
                <div className="text-4xl font-extrabold mb-1">
                  {plan.price}
                  {plan.priceSuffix && (
                    <span className="text-lg font-semibold opacity-70"> {plan.priceSuffix}</span>
                  )}
                </div>
                {!plan.enterprise && (
                  <p className="text-xs text-white/60 mb-4">
                    السعر بالدينار التونسي (TND) شامل الأداء على القيمة المضافة (TVA)
                  </p>
                )}
                {plan.enterprise && <div className="mb-4" />}
                <p className="opacity-80 mb-6 leading-relaxed">{plan.description}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 opacity-90">
                      <Check className="w-5 h-5 text-white" /> {f}
                    </li>
                  ))}
                </ul>
              </div>

              {plan.enterprise ? (
                <Button
                  className="mt-auto w-full bg-white text-red-700 font-extrabold py-3 rounded-xl hover:bg-red-100"
                  onClick={() => handleSubscribeClick(plan)}
                >
                  اتصل بنا الآن — أو اطلب نسختك الخاصة
                </Button>
              ) : (
                /* Flouci payment button — server action via form */
                <form action={subscribeWithAmount}>
                  <Button
                    type="submit"
                    className="mt-auto w-full bg-white text-red-700 font-extrabold py-3 rounded-xl hover:bg-red-100"
                  >
                    اشترك الآن — 94 دينار / سنة
                  </Button>
                </form>
              )}
            </motion.div>
          ))}
        </div>

        <p className="text-center text-sm text-white/70 mt-8 max-w-2xl mx-auto leading-relaxed">
          تحتاج عرضًا أكبر أو تخصيصًا خاصًا بمؤسستك؟{" "}
          <a href="tel:+21628888612" className="underline font-semibold hover:text-white">
            اتصل بنا
          </a>{" "}
          للحصول على نسختك الخاصة (Instance) وتفاصيل الأسعار.
        </p>
      </div>

      <div className="max-w-3xl mx-auto mt-8 px-2">
        <p className="text-center text-xs md:text-sm text-white/60 leading-relaxed">
          جميع الأسعار المعروضة أعلاه معلنة بالدينار التونسي (TND) وتشمل الأداء على القيمة المضافة (TVA) المعمول
          به قانونيًا في تونس. أي عملية شراء إضافية خارج نطاق الباقة المشترَك فيها (مثل رسائل إضافية أو خدمات
          تكميلية) تخضع للـ TVA بشكل منفصل وتُضاف إلى السعر المعلن وقت الشراء.
        </p>
      </div>

      <AnimatePresence>
        {showPaymentInfo && (
          <motion.div
            ref={paymentSectionRef}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className={`
              mt-16 max-w-3xl mx-auto transition
              ${glow ? "ring-4 ring-red-400 ring-opacity-60" : ""}
            `}
          >
            <div className="space-y-6">
              <div className="relative rounded-2xl border border-red-500/40 bg-red-500/10 px-6 py-6 text-center overflow-hidden">
                <div className="absolute inset-0 bg-red-500/20 blur-2xl opacity-40 pointer-events-none" />
                <div className="relative space-y-3">
                  <p className="text-lg font-semibold text-white mb-2">
                    الدفع الإلكتروني عبر Flouci
                  </p>
                  <p className="text-sm text-gray-200 leading-relaxed">
                    انقر على "اشترك الآن" – سيتم توجيهك بأمان إلى صفحة دفع Flouci. بعد إتمام الدفع ستحصل على الوصول إلى المنصة.
                  </p>
                  <p className="text-xs text-gray-300 mt-2 leading-relaxed">
                    لاسترجاع المصاريف في حال الدفع الخطأ، الرجاء الضغط على زر "طلب استرجاع المبلغ" أدناه ومراسلتنا.
                    الرجاء التحقق من "mentions legales" أسفل هذه الصفحة قبل إرسال الطلب.
                  </p>
                  <div className="space-y-1 text-sm">
                    <p className="text-white font-medium">📱 WhatsApp: +216 28 888 612</p>
                    <p className="text-white font-medium">✉️ Email: contact@aibc.tn</p>
                    <div className="mt-3">
                      <a href="mailto:contact@aibc.tn?subject=%D8%B7%D9%84%D8%A8%20%D8%A7%D8%B3%D8%AA%D8%AC%D8%B1%D8%A7%D8%B9%20%D8%A7%D9%84%D9%85%D8%A8%D9%84%D8%BA" className="inline-block">
                        <button className="bg-white text-red-700 font-extrabold py-2 px-4 rounded-lg">طلب استرجاع المبلغ</button>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
