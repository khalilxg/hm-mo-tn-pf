import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import ClientLayout from "./ClientLayout"

export const metadata: Metadata = {
  title: "Morched Legale El Tounsi - مرشد القانوني التونسي",
  description: "Morched Legale est une plateforme AI sous format chat comme messenger, actualisé avec les documents legales de tunisie, qui vise les étudiants et les professionnels. Des abonnements et differents offres sont disponibles",
icons: {
icon: "/favicon.svg",
},
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <ClientLayout>{children}</ClientLayout>
}
