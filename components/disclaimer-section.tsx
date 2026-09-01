"use client"

import { motion } from "framer-motion"
import { GraduationCap, Landmark, RefreshCw, Bot, ShieldAlert } from "lucide-react"
import { TunisiaMotif } from "./ui/tunisia-motif"

const points = [
  {
    icon: GraduationCap,
    title: "أداة تعليمية معلوماتية",
    text: "مرشد أداة تعليمية ومعلوماتية تعتمد على الذكاء الاصطناعي لتبسيط القانون التونسي، ولا تُعد استشارة قانونية ولا بديلاً عن محامٍ مرخّص.",
  },
  {
    icon: Landmark,
    title: "المصدر الرسمي الوحيد",
    text: "المرجع القانوني المعتمد رسميًا هو الرائد الرسمي للجمهورية التونسية (الجريدة الرسمية) والمنشورات الرسمية للدولة التونسية، وليس أي محتوى مولّد آليًا.",
  },
  {
    icon: RefreshCw,
    title: "تحديث دوري لقاعدة البيانات",
    text: "تُحدَّث قاعدة المعلومات القانونية بشكل دوري. قد تتأخر بعض الإجابات عن أحدث التعديلات التشريعية إلى حين موعد التحديث القادم.",
  },
  {
    icon: Bot,
    title: "تقنية ذكاء اصطناعي من مزودين متخصصين",
    text: "تعتمد المنصة على نماذج ذكاء اصطناعي مقدَّمة من جهات خارجية متخصصة، كأي تطبيق ذكاء اصطناعي عادي، وقد تحتوي الإجابات أخطاءً تقنية.",
  },
  {
    icon: ShieldAlert,
    title: "حدود المسؤولية",
    text: "لا تتحمّل منصة مرشد مسؤولية أي قرار يُتخذ بالاعتماد فقط على إجابات المنصة. يُنصح دائمًا بالتحقق من المصادر الرسمية أو استشارة محامٍ مختص.",
  },
]

export function DisclaimerSection() {
  return (
    <section
      id="disclaimer"
      dir="rtl"
      className="relative py-20 px-4 bg-red-950 overflow-hidden scroll-mt-[var(--header-space,6rem)]"
    >
      <TunisiaMotif className="absolute -top-10 -left-10 w-64 h-64 text-white" opacity={0.05} />
      <TunisiaMotif className="absolute -bottom-16 -right-16 w-72 h-72 text-white rotate-180" opacity={0.04} />

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-12">
          <motion.span
            className="px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-widest mb-4 inline-block"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            الشفافية أولاً
          </motion.span>
          <motion.h2
            className="text-3xl md:text-5xl font-black text-white mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            إخلاء المسؤولية
          </motion.h2>
          <motion.p
            className="text-white/70 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            نؤمن أن الوضوح جزء من الثقة. إليك بالضبط كيف تعمل المنصة وما حدود استخدامها.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {points.map((p, i) => {
            const Icon = p.icon
            return (
              <motion.div
                key={p.title}
                className="bg-white/[0.06] border border-white/10 rounded-3xl p-6 backdrop-blur-sm hover:bg-white/[0.09] transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center mb-4 text-white">
                  <Icon size={20} />
                </div>
                <h3 className="text-white font-bold text-base mb-2">{p.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{p.text}</p>
              </motion.div>
            )
          })}

          <motion.div
            className="bg-gradient-to-br from-red-600 to-red-800 rounded-3xl p-6 flex flex-col justify-center border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: points.length * 0.08 }}
          >
            <p className="text-white font-bold text-sm leading-relaxed">
              لأي استفسار قانوني حاسم أو نزاع، يُرجى دائمًا الرجوع إلى محامٍ مرخّص أو الجهات الرسمية المختصة.
            </p>
            <a
              href="/cgv"
              className="mt-4 inline-flex items-center gap-1 text-white/80 hover:text-white text-xs underline underline-offset-2 transition-colors"
            >
              الشروط الكاملة في الشروط العامة للبيع
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
