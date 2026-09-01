import type { Metadata } from "next"
import Link from "next/link"
import { PrivacyPolicySection } from "@/components/legal-content"

export const metadata: Metadata = {
  title: "Politique de confidentialité - مرشد القانوني التونسي",
  description:
    "Politique de confidentialité de la plateforme مرشد القانوني التونسي : données collectées, finalité, durée de conservation et droits des utilisateurs.",
}

export default function PolitiqueDeConfidentialitePage() {
  return (
    <main dir="ltr" className="min-h-screen bg-white py-16 px-4">
      <div className="container mx-auto max-w-3xl text-sm leading-relaxed space-y-6 text-gray-800">
        <Link href="/" className="text-red-800 underline text-sm">
          ← Retour à l'accueil
        </Link>
        <h1 className="text-2xl font-bold text-red-950">Politique de confidentialité</h1>
        <PrivacyPolicySection />
      </div>
    </main>
  )
}
