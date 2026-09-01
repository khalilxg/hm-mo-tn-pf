'use client'

import { Zap, GraduationCap, Building2, Languages } from "lucide-react"
import { ParticleTextEffect } from "./particle-text-effect"
import { InfiniteSlider } from "./ui/infinite-slider"
import { ProgressiveBlur } from "./ui/progressive-blur"
import { TunisiaMotif } from "./ui/tunisia-motif"
import {
  handleFreeStart,
  handleFlouciStart,
  handleEnterpriseStart,
} from "./hero-section-action"
import { SUBSCRIPTION_PRICE_MILLIMES } from "@/lib/pricing"

const subscribeWithAmount = handleFlouciStart.bind(null, SUBSCRIPTION_PRICE_MILLIMES)

export function HeroSection() {
  return (
    <section className="py-20 px-4 relative overflow-hidden min-h-screen flex flex-col justify-between">
      <TunisiaMotif className="absolute top-6 right-6 w-40 h-40 text-white pointer-events-none hidden md:block" opacity={0.05} />
      <TunisiaMotif className="absolute bottom-10 left-6 w-32 h-32 text-white pointer-events-none hidden md:block rotate-12" opacity={0.04} />
      <div className="flex items-start justify-center pt-16" style={{ minHeight: 'clamp(260px, 45vw, 420px)' }}>
        <ParticleTextEffect words={["مرشد", "قانون تونس", "تونس", "قانون"]} />
      </div>

      <div className="container mx-auto text-center relative z-10 pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center justify-center text-center px-4">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4 max-w-3xl leading-relaxed">
            
            المرشد القانوني التونسي هو أول منصة ذكاء اصطناعي للمساعدة القانونية في تونس، متخصصة في القانون التونسي، وتوفر حلولًا ذكية للطلبة والمحامين والقضاة والباحثين والمهنيين القانونيين.
            
            </h2>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <p className="text-sm md:text-base font-medium text-gray-200">
                أكثر من <span className="text-white font-bold">+9000</span> طالب ومستخدم في تونس
              </p>
            </div>
          </div>

          {/* Visible, unmissable notice: the assistant only understands Arabic
              script (plus Latin letters, Arabic-Indic/Latin numerals and
              punctuation). This is intentionally placed right above the
              action buttons so nobody can miss it before they start typing. */}
          <div
            dir="rtl"
            className="mt-6 mx-auto max-w-2xl flex items-center justify-center gap-2 rounded-xl border border-yellow-300/40 bg-yellow-400/10 px-4 py-2.5 text-yellow-100"
          >
            <Languages className="w-5 h-5 shrink-0" />
            <p className="text-xs md:text-sm font-semibold leading-relaxed">
              تنبيه: يفهم مرشد اللغة العربية فقط (مع الأرقام والحروف اللاتينية وعلامات الترقيم) — يُرجى عدم الكتابة بلغات أخرى، لن يتم قبولها.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
            {/* Student test view — free, 10-message trial */}
            <form action={handleFreeStart}>
              <button
                type="submit"
                className="inline-flex items-center gap-3 px-7 py-2.5 rounded-full font-bold text-base transition-all duration-150 hover:scale-105 active:scale-95 border border-white/30"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  color: '#ffffff',
                  boxShadow: '0 4px 14px 0 rgba(0,0,0,0.15)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <GraduationCap className="w-4 h-4" />
                <span>تجربة الطلبة – 10 رسائل مجانًا</span>
              </button>
            </form>

            {/* Enterprise — redirects to the main Morched platform */}
            <form action={handleEnterpriseStart}>
              <button
                type="submit"
                className="inline-flex items-center gap-3 px-7 py-2.5 rounded-full font-bold text-base transition-all duration-150 hover:scale-105 active:scale-95 border border-white/30"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  color: '#ffffff',
                  boxShadow: '0 4px 14px 0 rgba(0,0,0,0.15)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <Building2 className="w-4 h-4" />
                <span>للمؤسسات – منصة مرشد الكاملة</span>
              </button>
            </form>

            {/* Paid subscription — single yearly plan */}
            <form action={subscribeWithAmount}>
              <button
                type="submit"
                className="inline-flex items-center gap-3 px-7 py-2.5 rounded-full font-bold text-base transition-all duration-150 hover:scale-105 active:scale-95"
                style={{
                  backgroundColor: '#ffffff',
                  color: '#ef4444',
                  boxShadow: '0 4px 24px 0 rgba(239,68,68,0.25)',
                }}
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>94 دينار / سنة عبر Flouci — اشترك</span>
              </button>
            </form>
          </div>

          <p className="text-xs text-gray-400 mt-2 text-center">
            تجربة الطلبة: 10 رسائل فقط &nbsp;·&nbsp; المشتركون: رسائل غير محدودة طوال السنة
          </p>

          <div className="mt-16 mb-8">
            <div className="group relative m-auto max-w-6xl">
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
