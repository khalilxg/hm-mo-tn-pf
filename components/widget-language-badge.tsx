"use client"

import { useEffect, useState } from "react"
import { GraduationCap } from "lucide-react"

/**
 * A small pill that floats just above the AnythingLLM chat bubble
 * (bottom-right corner), so the corner reads as "this is the students' quick
 * test chat" and repeats the Arabic-only reminder right where people are
 * about to start typing. Auto-hides after a few seconds so it doesn't get in
 * the way, but stays reachable since it re-appears if the page is reloaded.
 */
export function WidgetLanguageBadge() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 9000)
    return () => clearTimeout(timer)
  }, [])

  if (!visible) return null

  return (
    <div
      dir="rtl"
      className="fixed bottom-24 right-6 z-40 max-w-[220px] rounded-2xl rounded-br-sm border border-white/20 bg-red-950/95 px-3 py-2 text-white shadow-xl backdrop-blur-sm animate-in fade-in slide-in-from-bottom-2"
    >
      <div className="flex items-center gap-1.5 text-xs font-bold mb-1">
        <GraduationCap className="w-3.5 h-3.5 shrink-0" />
        نسخة اختبارية للطلبة
      </div>
      <p className="text-[11px] leading-snug text-white/80">
        اكتب بالعربية فقط (أرقام وحروف لاتينية وعلامات ترقيم مسموحة)
      </p>
    </div>
  )
}
