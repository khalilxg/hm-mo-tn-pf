"use client"

import type React from "react"
import { Inter, JetBrains_Mono, Playfair_Display } from "next/font/google"
import { Suspense, useEffect } from "react"
import { PWAInstallPrompt } from "@/components/pwa-install-prompt"
import { AnythingLLMWidget } from "@/components/anythingllm-widget"
import { ChatInputGuard } from "@/components/chat-input-guard"
import { WidgetLanguageBadge } from "@/components/widget-language-badge"
import { DonationButton } from "@/components/donation-button"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "700"],
})

function ClientLayoutContent({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // Installability still works without it in most browsers; fail silently.
      })
    }
  }, [])

  return (
    <html lang="ar" dir="rtl">
      <body className={`font-sans ${inter.variable} ${jetbrainsMono.variable} ${playfair.variable}`}>
        {children}
        <PWAInstallPrompt />

        {/* Arabic-only enforcement: best-effort input filter (site-wide,
            including the chat widget where the browser lets us reach it —
            see chat-input-guard.tsx for the honest limitations). */}
        <ChatInputGuard />

        {/* "Students test view" label + Arabic-only reminder that floats
            right above the chat bubble. */}
        <WidgetLanguageBadge />

        {/* Floating donation / support button. */}
        <DonationButton />

        {/* Morched-branded AnythingLLM chat widget (loaded last, near the
            end of body, per Mintplex-Labs' own recommendation). */}
        <AnythingLLMWidget />
      </body>
    </html>
  )
}

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Suspense
      fallback={
        <html lang="en">
          <body className={`font-sans ${inter.variable} ${jetbrainsMono.variable} ${playfair.variable}`}>
            <div>Loading...</div>
          </body>
        </html>
      }
    >
      <ClientLayoutContent>{children}</ClientLayoutContent>
    </Suspense>
  )
}
