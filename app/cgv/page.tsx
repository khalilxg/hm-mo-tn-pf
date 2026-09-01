import type { Metadata } from "next"
import Link from "next/link"
import { CGVSection } from "@/components/legal-content"

export const metadata: Metadata = {
  title: "Conditions générales de vente - مرشد القانوني التونسي",
  description: "Conditions générales de vente de la plateforme مرشد القانوني التونسي, éditée par AIBC SARL.",
}

export default function CGVPage() {
  return (
    <main dir="ltr" className="min-h-screen bg-white py-16 px-4">
      <div className="container mx-auto max-w-3xl text-sm leading-relaxed space-y-6 text-gray-800">
        <Link href="/" className="text-red-800 underline text-sm">
          ← Retour à l'accueil
        </Link>
        <h1 className="text-2xl font-bold text-red-950">Conditions générales de vente</h1>
        <CGVSection />
      </div>
    </main>
  )
}
