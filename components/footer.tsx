"use client"

import { useState } from "react"
import Link from "next/link"
import { LeLoLogo } from "./lelo-logo"
import { EditeurSection, ContactInfoSection, CGVSection, PrivacyPolicySection, Divider } from "./legal-content"

export function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <footer
        dir="rtl"
        className="bg-red-950 border-t border-white/10 py-12 px-4"
      >
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

            {/* Partie gauche avec logo et description */}
            <div className="col-span-1 md:col-span-2">
              <LeLoLogo className="mb-4" />
              <p className="text-white/70 mb-4 max-w-md">
               مرشد .. أول منصة للمساعد القانوني الذكي  في تونس
              </p>
              <p className="text-white/70 mb-4 max-w-md">
                منصة مرشد قانون تساعد طلبة الحقوق على الوصول إلى أكثر من 5000 وثيقة قانونية تونسية، وتسهيل المراجعة والتحضير للامتحانات.
              </p>
              <p className="text-sm text-white/50 italic">
                "ابدأ رحلتك في إتقان القانون التونسي مع مرشد قانون"
              </p>
            </div>

            {/* قسم المنصة */}
            <div>
              <h3 className="font-semibold text-white mb-4" dir="rtl">المنصة</h3>
              <ul className="space-y-2 text-white/70" dir="rtl">
                <li>
                  <a href="#pricing" className="hover:text-white transition-colors" dir="rtl">الاشتراك</a>
                </li>
                <li>
                  <a href="#features" className="hover:text-white transition-colors" dir="rtl">المميزات</a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-white transition-colors" dir="rtl">الأسئلة</a>
                </li>
                <li>
                  <a href="https://wa.me/+21628888612?text=مرحباً، أريد التواصل معكم" className="hover:text-white transition-colors" dir="rtl">تواصل</a>
                </li>
              </ul>
            </div>

            {/* قسم عن المنصة */}
            <div>
              <h3 className="font-semibold text-white mb-4" dir="rtl">عن المنصة</h3>
              <ul className="space-y-2 text-white/70" dir="rtl">
                <li>
                  <a href="#" className="hover:text-white transition-colors" dir="rtl">من نحن</a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors" dir="rtl">المدونة</a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors" dir="rtl">الوظائف</a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-white transition-colors" dir="rtl">اتصل بنا</a>
                </li>
              </ul>
            </div>
          </div>

          {/* حقوق النشر وPowered by + روابط قانونية */}
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-white/50">
            <p>&copy; 2026 مرشد قانون. جميع الحقوق محفوظة.</p>
            <p>&copy; Powered by AIBC</p>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm">
              <button
                onClick={() => setIsModalOpen(true)}
                className="text-white/40 hover:text-white/80 underline underline-offset-2 transition-colors cursor-pointer"
              >
                Mentions légales
              </button>
              <Link href="/cgv" className="text-white/40 hover:text-white/80 underline underline-offset-2 transition-colors">
                Conditions générales de vente
              </Link>
              <Link
                href="/politique-de-confidentialite"
                className="text-white/40 hover:text-white/80 underline underline-offset-2 transition-colors"
              >
                Politique de confidentialité
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.75)" }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsModalOpen(false)
          }}
        >
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-red-950 rounded-t-2xl">
              <h2 className="text-white font-bold text-lg">Mentions légales</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-white/70 hover:text-white transition-colors text-2xl leading-none"
                aria-label="Fermer"
              >
                &times;
              </button>
            </div>

            {/* Scrollable content */}
            <div className="overflow-y-auto px-6 py-5 text-gray-800 text-sm leading-relaxed space-y-4">
              <EditeurSection />
              <ContactInfoSection />
              <Divider />
              <CGVSection />
              <Divider />
              <PrivacyPolicySection />
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end bg-gray-50 rounded-b-2xl">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2 bg-red-950 text-white rounded-lg text-sm font-medium hover:bg-red-900 transition-colors"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
