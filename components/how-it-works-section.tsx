"use client"

import { motion } from "framer-motion"
import { MessageCircleQuestion, BrainCircuit, FileCheck2 } from "lucide-react"

const steps = [
  {
    icon: MessageCircleQuestion,
    step: "01",
    title: "اطرح سؤالك القانوني",
    text: "اكتب سؤالك بلغتك العادية، تمامًا كما تراسل صديقًا — بدون مصطلحات معقدة.",
  },
  {
    icon: BrainCircuit,
    step: "02",
    title: "تحليل مبني على القانون التونسي",
    text: "يحلل الذكاء الاصطناعي سؤالك استنادًا إلى قاعدة بيانات محدثة دوريًا من النصوص القانونية التونسية.",
  },
  {
    icon: FileCheck2,
    step: "03",
    title: "إجابة مبسطة مع مصادرها",
    text: "تحصل على إجابة واضحة ومنظمة، وننصحك دومًا بمراجعة المصدر الرسمي قبل اتخاذ أي قرار.",
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" dir="rtl" className="py-12 md:py-20 px-4 bg-background relative overflow-hidden">
      <div className="container mx-auto max-w-5xl relative z-10">
        <div className="text-center mb-14">
          <motion.span
            className="px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-widest mb-4 inline-block"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            بكل بساطة
          </motion.span>
          <motion.h2
            className="text-3xl md:text-5xl font-black mb-4 text-white"
            style={{ fontFamily: "var(--font-playfair)" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            كيف يعمل مرشد؟
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 relative">
          {/* connecting line for desktop */}
          <div className="hidden md:block absolute top-11 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

          {steps.map((s, i) => {
            const Icon = s.icon
            return (
              <motion.div
                key={s.step}
                className="relative bg-card border border-white/10 rounded-3xl p-6 md:p-8 text-center flex flex-col items-center"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
              >
                <div className="w-14 h-14 rounded-2xl bg-white text-red-700 flex items-center justify-center mb-5 shadow-lg shadow-black/10 relative z-10">
                  <Icon size={24} />
                </div>
                <span className="text-white/30 font-black text-3xl mb-2" style={{ fontFamily: "var(--font-playfair)" }}>
                  {s.step}
                </span>
                <h3 className="text-white font-bold text-lg mb-2">{s.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{s.text}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
