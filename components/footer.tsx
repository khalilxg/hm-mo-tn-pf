"use client"

import { useState } from "react"
import { LeLoLogo } from "./lelo-logo"

const MENTIONS_LEGALES_TEXT = `Mentions légales

Éditeur du site
AIBC SARL
Activités informatiques
Identifiant fiscal : 1876014/F/M/000
Siège social : Pépinière de l'ISTC, Borj Cedria 8020, Tunisie
Le site et les applications édités par AIBC proposent des services logiciels et applications SaaS accessibles en ligne.

Contact
Pour toute question ou demande d'assistance :
Email : contact@aibc.tn`

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

          {/* حقوق النشر وPowered by */}
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-white/50">
            <p >&copy; 2026 مرشد قانون. جميع الحقوق محفوظة.</p>
            <p>&copy; Powered by AIBC</p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-3 text-white/40 hover:text-white/80 text-sm underline underline-offset-2 transition-colors cursor-pointer"
            >
              Mentions légales
            </button>
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

              <Section title="Éditeur du site">
                <p><strong>AIBC SARL</strong></p>
                <p>Activités informatiques</p>
                <p>Identifiant fiscal : 1876014/F/M/000</p>
                <p>Siège social : Pépinière de l'ISTC, Borj Cedria 8020, Tunisie</p>
                <p>Le site et les applications édités par AIBC proposent des services logiciels et applications SaaS accessibles en ligne.</p>
              </Section>

              <Section title="Contact">
                <p>Pour toute question ou demande d'assistance :</p>
                <p>Email : <a href="mailto:contact@aibc.tn" className="text-red-800 underline">contact@aibc.tn</a></p>
              </Section>

              <Divider />

              <Section title="Conditions Générales de Vente (CGV)">
                <SubSection title="Article 1 – Objet">
                  <p>Les présentes Conditions Générales de Vente régissent l'utilisation des services numériques proposés par AIBC SARL, notamment ses applications web et SaaS, y compris l'application « Morched ».</p>
                  <p>Toute utilisation des services implique l'acceptation pleine et entière des présentes conditions.</p>
                </SubSection>

                <SubSection title="Article 2 – Description des services">
                  <p>AIBC SARL développe et exploite des applications et services numériques accessibles en ligne. Les services peuvent inclure :</p>
                  <ul className="list-disc list-inside space-y-1 mt-1">
                    <li>des outils logiciels accessibles via navigateur web ou application mobile ;</li>
                    <li>des fonctionnalités basées sur l'intelligence artificielle ;</li>
                    <li>des services numériques à usage ponctuel ou annuel.</li>
                  </ul>
                  <p className="mt-1">Les fonctionnalités peuvent évoluer à tout moment afin d'améliorer les services proposés.</p>
                </SubSection>

                <SubSection title="Article 3 – Modalités de paiement">
                  <p>Les paiements sont réalisés en ligne via la passerelle sécurisée <strong>Flouci</strong> et les services de <strong>Monétique Tunisie</strong>. Les prix sont affichés en dinars tunisiens (TND) et incluent les taxes applicables sauf indication contraire. Le paiement est exigible immédiatement lors de la validation de la commande. AIBC SARL ne stocke aucune donnée bancaire.</p>
                </SubSection>

                <SubSection title="Article 4 – Livraison des services">
                  <p>Les services numériques sont accessibles immédiatement ou dans un délai raisonnable après validation du paiement, via internet. AIBC SARL s'efforce d'assurer la disponibilité continue des services, sans garantie d'absence totale d'interruption.</p>
                </SubSection>

                <SubSection title="Article 5 – Comptes utilisateurs">
                  <p>Certains services nécessitent la création d'un compte utilisateur. Les utilisateurs sont responsables de la confidentialité de leurs identifiants. AIBC SARL peut suspendre ou supprimer un accès en cas d'utilisation abusive ou contraire à la loi tunisienne.</p>
                </SubSection>

                <SubSection title="Article 6 – Politique d'annulation et de remboursement">
                  <p>Sauf disposition contraire :</p>
                  <ul className="list-disc list-inside space-y-1 mt-1">
                    <li>tout achat de service numérique est ferme et définitif ;</li>
                    <li>aucun remboursement après activation ou utilisation du service.</li>
                  </ul>
                  <p className="mt-1">En cas de dysfonctionnement technique majeur, AIBC SARL pourra proposer un remboursement partiel ou total, ou une prolongation d'accès.</p>
                </SubSection>

                <SubSection title="Article 7 – Responsabilité">
                  <p>AIBC SARL ne pourra être tenue responsable des interruptions liées à la maintenance, des dommages indirects, ou d'une mauvaise utilisation des applications. L'utilisateur demeure responsable des informations qu'il transmet via les services.</p>
                </SubSection>

                <SubSection title="Article 8 – Données personnelles">
                  <p>AIBC SARL s'engage à protéger la confidentialité des utilisateurs conformément à la réglementation tunisienne. Les données collectées sont limitées au nécessaire. Les données bancaires ne sont jamais stockées.</p>
                </SubSection>

                <SubSection title="Article 9 – Résolution des litiges">
                  <p>En cas de litige, les parties s'efforceront de trouver une solution amiable. À défaut, les <strong>tribunaux tunisiens</strong> seront seuls compétents. Le droit applicable est le <strong>droit tunisien</strong>.</p>
                </SubSection>

                <SubSection title="Article 10 – Modification des conditions">
                  <p>AIBC SARL se réserve le droit de modifier les présentes CGV à tout moment. Les nouvelles conditions prennent effet dès leur publication.</p>
                </SubSection>
              </Section>

              <Divider />

              <Section title="Politique de confidentialité">
                <SubSection title="1. Données collectées">
                  <ul className="list-disc list-inside space-y-1">
                    <li>adresse e-mail ;</li>
                    <li>informations techniques de connexion ;</li>
                    <li>données nécessaires au support utilisateur.</li>
                  </ul>
                  <p className="mt-1">Les données de paiement ne sont pas stockées par AIBC SARL.</p>
                </SubSection>

                <SubSection title="2. Finalité de la collecte">
                  <ul className="list-disc list-inside space-y-1">
                    <li>fournir et améliorer les services ;</li>
                    <li>assurer le support technique ;</li>
                    <li>sécuriser les plateformes ;</li>
                    <li>communiquer avec les utilisateurs si besoin.</li>
                  </ul>
                </SubSection>

                <SubSection title="3. Conservation des données">
                  <p>Les données sont conservées uniquement pendant la durée nécessaire au fonctionnement des services et au respect des obligations légales.</p>
                </SubSection>

                <SubSection title="4. Protection des données">
                  <p>AIBC SARL met en œuvre des mesures raisonnables de sécurité pour protéger les données contre l'accès non autorisé. Les paiements sont sécurisés via Flouci et Monétique Tunisie.</p>
                </SubSection>

                <SubSection title="5. Droits des utilisateurs">
                  <p>Les utilisateurs peuvent demander l'accès, la correction ou la suppression de leurs données. Toute demande à :</p>
                  <p>Email : <a href="mailto:contact@aibc.tn" className="text-red-800 underline">contact@aibc.tn</a></p>
                </SubSection>

                <SubSection title="6. Cookies">
                  <p>Le site ou les applications peuvent utiliser des cookies techniques nécessaires au bon fonctionnement des services.</p>
                </SubSection>

                <SubSection title="7. Modification de la politique">
                  <p>AIBC SARL se réserve le droit de modifier la présente politique à tout moment. Les modifications prennent effet dès leur publication.</p>
                </SubSection>
              </Section>
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

// Helper sub-components for clean structure
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <h3 className="text-red-950 font-bold text-base border-b border-red-100 pb-1">{title}</h3>
      <div className="space-y-2 text-gray-700">{children}</div>
    </div>
  )
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-3">
      <h4 className="font-semibold text-gray-900 mb-1">{title}</h4>
      <div className="text-gray-600 space-y-1">{children}</div>
    </div>
  )
}

function Divider() {
  return <hr className="border-gray-200 my-2" />
}
