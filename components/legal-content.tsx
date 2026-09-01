import type React from "react"

export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <h3 className="text-red-950 font-bold text-base border-b border-red-100 pb-1">{title}</h3>
      <div className="space-y-2 text-gray-700">{children}</div>
    </div>
  )
}

export function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-3">
      <h4 className="font-semibold text-gray-900 mb-1">{title}</h4>
      <div className="text-gray-600 space-y-1">{children}</div>
    </div>
  )
}

export function Divider() {
  return <hr className="border-gray-200 my-2" />
}

export function EditeurSection() {
  return (
    <Section title="Éditeur du site">
      <p>
        <strong>AIBC SARL</strong>
      </p>
      <p>Forme juridique : Société à Responsabilité Limitée (SARL)</p>
      <p>Activités informatiques</p>
      <p>Identifiant fiscal : 1876014/F/M/000</p>
      <p>Siège social : Pépinière de l'ISTC, Borj Cedria 8020, Tunisie</p>
      <p>
        Le site et les applications édités par AIBC proposent des services logiciels et applications SaaS
        accessibles en ligne.
      </p>
    </Section>
  )
}

export function ContactInfoSection() {
  return (
    <Section title="Contact">
      <p>Pour toute question ou demande d'assistance :</p>
      <p>
        Email :{" "}
        <a href="mailto:contact@aibc.tn" className="text-red-800 underline">
          contact@aibc.tn
        </a>
      </p>
      <p>
        Téléphone / WhatsApp :{" "}
        <a href="tel:+21628888612" className="text-red-800 underline" dir="ltr">
          +216 28 888 612
        </a>
      </p>
      <p>
        Formulaire de contact :{" "}
        <a href="/#contact" className="text-red-800 underline">
          accessible depuis la page d'accueil
        </a>
      </p>
    </Section>
  )
}

export function CGVSection() {
  return (
    <Section title="Conditions Générales de Vente (CGV)">
      <SubSection title="Article 1 – Objet">
        <p>
          Les présentes Conditions Générales de Vente régissent l'utilisation des services numériques proposés par
          AIBC SARL, notamment ses applications web et SaaS, y compris l'application « Morched ».
        </p>
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

      <SubSection title="Article 3 – Prix et modalités de paiement">
        <p>
          Les prix sont affichés en dinars tunisiens (TND) et incluent les taxes applicables, sauf indication
          contraire. Aucun frais supplémentaire n'est appliqué en dehors du prix affiché avant paiement. Les
          paiements sont réalisés en ligne via la passerelle sécurisée <strong>Flouci</strong> et les services de{" "}
          <strong>Monétique Tunisie</strong>. Le paiement est exigible immédiatement lors de la validation de la
          commande. AIBC SARL ne stocke aucune donnée bancaire.
        </p>
      </SubSection>

      <SubSection title="Article 4 – Modalités de livraison">
        <p>
          Les services numériques sont accessibles immédiatement ou dans un délai raisonnable après validation du
          paiement, via internet (aucune livraison physique n'est nécessaire). AIBC SARL s'efforce d'assurer la
          disponibilité continue des services, sans garantie d'absence totale d'interruption.
        </p>
      </SubSection>

      <SubSection title="Article 5 – Comptes utilisateurs">
        <p>
          Certains services nécessitent la création d'un compte utilisateur. Les utilisateurs sont responsables de
          la confidentialité de leurs identifiants. AIBC SARL peut suspendre ou supprimer un accès en cas
          d'utilisation abusive ou contraire à la loi tunisienne.
        </p>
      </SubSection>

      <SubSection title="Article 6 – Politique d'annulation, de retour et de remboursement">
        <p>Sauf disposition contraire :</p>
        <ul className="list-disc list-inside space-y-1 mt-1">
          <li>tout achat de service numérique est ferme et définitif ;</li>
          <li>aucun remboursement après activation ou utilisation du service.</li>
        </ul>
        <p className="mt-1">
          En cas de dysfonctionnement technique majeur, AIBC SARL pourra proposer un remboursement partiel ou
          total, ou une prolongation d'accès. Toute demande de retour ou d'annulation peut être adressée à{" "}
          <a href="mailto:contact@aibc.tn" className="text-red-800 underline">
            contact@aibc.tn
          </a>
          .
        </p>
      </SubSection>

      <SubSection title="Article 7 – Responsabilité">
        <p>
          AIBC SARL ne pourra être tenue responsable des interruptions liées à la maintenance, des dommages
          indirects, ou d'une mauvaise utilisation des applications. L'utilisateur demeure responsable des
          informations qu'il transmet via les services.
        </p>
      </SubSection>

      <SubSection title="Article 8 – Données personnelles">
        <p>
          AIBC SARL s'engage à protéger la confidentialité des utilisateurs conformément à la réglementation
          tunisienne. Les données collectées sont limitées au nécessaire. Les données bancaires ne sont jamais
          stockées. Voir la <a href="/politique-de-confidentialite" className="text-red-800 underline">politique de confidentialité</a> pour le détail.
        </p>
      </SubSection>

      <SubSection title="Article 9 – Résolution des litiges et droit applicable">
        <p>
          En cas de litige, les parties s'efforceront de trouver une solution amiable. À défaut, les{" "}
          <strong>tribunaux tunisiens</strong> seront seuls compétents. Le droit applicable est le{" "}
          <strong>droit tunisien</strong>.
        </p>
      </SubSection>

      <SubSection title="Article 10 – Modification des conditions">
        <p>
          AIBC SARL se réserve le droit de modifier les présentes CGV à tout moment. Les nouvelles conditions
          prennent effet dès leur publication.
        </p>
      </SubSection>
    </Section>
  )
}

export function PrivacyPolicySection() {
  return (
    <Section title="Politique de confidentialité">
      <SubSection title="1. Données collectées">
        <ul className="list-disc list-inside space-y-1">
          <li>nom et adresse e-mail (compte utilisateur, formulaire de contact) ;</li>
          <li>numéro de téléphone (lorsqu'il est fourni volontairement, ex. WhatsApp) ;</li>
          <li>informations techniques de connexion (adresse IP, journaux d'accès) ;</li>
          <li>données nécessaires au support utilisateur (contenu des messages envoyés via le formulaire de contact).</li>
        </ul>
        <p className="mt-1">Les données de paiement ne sont pas stockées par AIBC SARL.</p>
      </SubSection>

      <SubSection title="2. Finalité de la collecte">
        <ul className="list-disc list-inside space-y-1">
          <li>fournir et améliorer les services ;</li>
          <li>gérer les comptes et les abonnements ;</li>
          <li>assurer le support technique et répondre aux demandes de contact ;</li>
          <li>sécuriser les plateformes ;</li>
          <li>communiquer avec les utilisateurs si besoin.</li>
        </ul>
      </SubSection>

      <SubSection title="3. Durée de conservation des données">
        <p>
          Les données des utilisateurs (compte, e-mail, données techniques de connexion) sont conservées pendant
          toute la durée de la relation contractuelle (durée de l'abonnement), puis pendant un délai supplémentaire
          de <strong>12 mois</strong> après la fin de l'abonnement ou la dernière activité du compte, à des fins de
          support et de sécurité. Les messages envoyés via le formulaire de contact sont conservés au maximum{" "}
          <strong>12 mois</strong> après traitement de la demande. Au-delà de ces délais, les données sont
          supprimées ou anonymisées, sauf obligation légale, comptable ou fiscale imposant une durée de conservation
          plus longue (notamment les données de facturation).
        </p>
      </SubSection>

      <SubSection title="4. Protection des données">
        <p>
          AIBC SARL met en œuvre des mesures raisonnables de sécurité pour protéger les données contre l'accès non
          autorisé. Les paiements sont sécurisés via Flouci et Monétique Tunisie.
        </p>
      </SubSection>

      <SubSection title="5. Droits des utilisateurs">
        <p>
          Conformément à la réglementation tunisienne relative à la protection des données à caractère personnel,
          chaque utilisateur dispose des droits suivants concernant ses données :
        </p>
        <ul className="list-disc list-inside space-y-1 mt-1">
          <li>droit d'accès à ses données personnelles ;</li>
          <li>droit de rectification ou de correction des données inexactes ;</li>
          <li>droit de suppression (effacement) des données ;</li>
          <li>droit d'opposition à certains traitements ;</li>
          <li>droit de retirer son consentement à tout moment, lorsque le traitement en dépend.</li>
        </ul>
      </SubSection>

      <SubSection title="6. Coordonnées pour l'exercice des droits">
        <p>Toute demande relative à l'exercice de ces droits peut être adressée à :</p>
        <p>
          <strong>AIBC SARL</strong> — Pépinière de l'ISTC, Borj Cedria 8020, Tunisie
        </p>
        <p>
          Email :{" "}
          <a href="mailto:contact@aibc.tn" className="text-red-800 underline">
            contact@aibc.tn
          </a>
        </p>
        <p>
          Téléphone / WhatsApp :{" "}
          <a href="tel:+21628888612" className="text-red-800 underline" dir="ltr">
            +216 28 888 612
          </a>
        </p>
        <p className="mt-1">
          Une réponse est apportée dans un délai raisonnable, et au plus tard dans le mois suivant la réception de
          la demande.
        </p>
      </SubSection>

      <SubSection title="7. Cookies">
        <p>Le site ou les applications peuvent utiliser des cookies techniques nécessaires au bon fonctionnement des services.</p>
      </SubSection>

      <SubSection title="8. Modification de la politique">
        <p>AIBC SARL se réserve le droit de modifier la présente politique à tout moment. Les modifications prennent effet dès leur publication.</p>
      </SubSection>
    </Section>
  )
}
