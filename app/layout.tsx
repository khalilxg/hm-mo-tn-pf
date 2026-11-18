import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import ClientLayout from "./ClientLayout"

export const metadata: Metadata = {
  title: "مرشد | المساعد القانوني الذكي في تونس",
  description: "مرشد منصة ذكية تساعد طلبة القانون والباحثين والمهنيين على فهم القانون التونسي ومراجعة النصوص والمراجع القانونية.",
  metadataBase: new URL("https://legale.morched.tn"),
  openGraph: { title: "مرشد | المساعد القانوني الذكي في تونس", description: "افهم القانون التونسي وراجع دروسك ومراجعك بمساعدة مرشد.", url: "https://legale.morched.tn", siteName: "مرشد", locale: "ar_TN", type: "website" },
  twitter: { card: "summary_large_image", title: "مرشد | المساعد القانوني الذكي في تونس", description: "مساعدة ذكية لفهم القانون التونسي ومراجعته." },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/favicon.svg",
    apple: "/apple-icon.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "مرشد",
  },
}

export const viewport = {
  themeColor: "#990000",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <ClientLayout>{children}</ClientLayout>
}
