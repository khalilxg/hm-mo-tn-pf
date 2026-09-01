"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "ما هي منصة مرشد القانوني التونسي؟",
    answer:
      "مرشد القانوني التونسي هو نظام ذكي يساعد طلاب القانون والممارسين عبر مكتبة كبيرة ووظائف ذكاء اصطناعي لتبسيط المفاهيم وتحضير الامتحانات.",
  },
  {
    question: "لمن تناسب هذه المنصة؟",
    answer:
      "مخصصة لطلبة القانون في جميع المستويات، والمحامين، والمتخصصين القانونيين، وكل من يحتاج الوصول السريع للمراجع القانونية.",
  },
  {
    question: "كيف تساعدني في المراجعة والامتحانات؟",
    answer:
      "توفر شروحات مبسطة، أجوبة ذكية على الأسئلة، وتنظيمًا للمراجع والجرائد الرسمية لتسهيل المراجعة والفهم.",
  },
  {
    question: "ماذا يتضمن الاشتراك؟",
    answer:
      "الاشتراك يمنحك الوصول إلى مكتبة الوثائق وعددًا من الرسائل مع الذكاء الاصطناعي بحسب الخطة المختارة.",
  },
  {
    question: "ما هي خطط الاشتراك المتاحة؟",
    answer:
      "تتوفر خطط بأسعار مختلفة (مثلاً 20 د.ت و40 د.ت) مع حد لعدد الرسائل وفترات اشتراك محددة كما هو مذكور في صفحة الأسعار.",
  },
  {
    question: "كيف يمكنني الدفع؟",
    answer:
      "يتم الدفع إلكترونياً عبر بوابة Flouci أو وسائل الدفع المدعومة. بعد الدفع يتم تأكيد الوصول وإرسال بيانات الدخول.",
  },
  {
    question: "متى أحصل على بيانات الدخول؟",
    answer:
      "بعد التحقق من إيصال الدفع، سيرسل الفريق بيانات الدخول إلى رقم هاتفك أو بريدك الإلكتروني.",
  },
  {
    question: "هل إجابات مرشد تعتبر استشارة قانونية ملزمة؟",
    answer:
      "لا. مرشد أداة تعليمية ومعلوماتية بالذكاء الاصطناعي، وليست بديلاً عن استشارة محامٍ مختص. المرجع الرسمي الوحيد للقانون التونسي هو الرائد الرسمي للجمهورية التونسية. يُنصح دائمًا بالتحقق من المصادر الرسمية قبل اتخاذ أي قرار قانوني.",
  },
  {
    question: "هل المعلومات القانونية محدثة دائمًا؟",
    answer:
      "تُحدَّث قاعدة البيانات القانونية بشكل دوري لتشمل آخر التعديلات التشريعية. ومع ذلك، قد تتأخر بعض الإجابات عن أحدث التعديلات إلى حين موعد التحديث القادم، لذا يُفضل تأكيد أي معلومة حساسة من المصدر الرسمي.",
  },
  {
    question: "هل تعمل المنصة على الهاتف والكمبيوتر؟",
    answer:
      "نعم، المنصة متوافقة مع جميع الأجهزة (هاتف، حاسوب، تابلت) ومتاحة على مدار الساعة.",
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section 
      id="faq" className="py-20 px-4 bg-background"
    >
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl font-bold mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            الأسئلة الشائعة
          </motion.h2>
          <motion.p
            className="text-xl max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            كل ما تريد أن تعرفه عن مرشد القانوني التونسي.
          </motion.p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="border border-border/20 rounded-lg bg-card/50 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <button
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white/5 transition-colors rounded-lg"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-lg font-medium text-white pr-4">{faq.question}</span>
                <ChevronDown
                  className={`h-5 w-5 text-gray-400 transition-transform flex-shrink-0 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              <motion.div
                initial={false}
                animate={{
                  height: openIndex === index ? "auto" : 0,
                  opacity: openIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-4">
                  <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
