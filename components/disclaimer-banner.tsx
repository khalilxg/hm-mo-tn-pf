"use client"

import { AlertTriangle } from "lucide-react"

export function DisclaimerBanner() {
  return (
    <div dir="rtl" className="w-full bg-red-950/95 border-b border-white/10 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-2.5 flex items-center justify-center gap-2 text-center flex-wrap">
        <AlertTriangle className="w-4 h-4 text-yellow-400 shrink-0" />
        <p className="text-[12px] md:text-sm text-white/80 leading-snug">
          مرشد أداة تعليمية بالذكاء الاصطناعي وليست بديلاً عن استشارة محامٍ مختص — المرجع الرسمي الوحيد هو
          <span className="font-semibold text-white"> الرائد الرسمي للجمهورية التونسية</span>.
          {" "}
          <a href="#disclaimer" className="underline underline-offset-2 hover:text-white transition-colors whitespace-nowrap">
            التفاصيل
          </a>
        </p>
      </div>
    </div>
  )
}
