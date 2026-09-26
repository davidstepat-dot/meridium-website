// Copy for the two ad landing pages, in both languages:
//   /singapore-subsidiary/   foreign companies establishing in Singapore
//   /singapore-operations/   companies already operating in Singapore
// Rendered by src/components/LandingPage.astro. House rules apply: no
// guarantees of outcomes or processing times, no invented statistics.
// Statutory facts: change of company officers and registered office must be
// lodged with ACRA within 14 days (acra.gov.sg).

export type LandingKey = 'subsidiary' | 'operations';
type Link = { label: string; href: 'planner' | 'booking' | 'contact' | 'calendar' };
type Item = { title: string; body: string };

export interface LandingCopy {
  meta: { title: string; description: string };
  hero: { eyebrow: string; heading: string; intro: string; primary: Link; secondary: Link; facts: string[] };
  list: { eyebrow: string; heading: string; intro?: string; items: Item[] };
  planner?: { eyebrow: string; heading: string; intro: string };
  steps: { eyebrow: string; heading: string; items: Item[] };
  services: { heading: string; slugs: string[] };
  offer?: { heading: string; body: string; cta: Link };
  faqHeading: string;
  faqs: { q: string; a: string }[];
  cta: { heading: string };
}

const facts = {
  en: [
    'Licensed corporate services firm in Singapore',
    'Senior advisers only, one named contact',
    'Fixed fees wherever the work allows',
    'We work in English and German',
  ],
  de: [
    'Lizenzierte Corporate-Services-Firma in Singapur',
    'Nur erfahrene Berater, ein fester Ansprechpartner',
    'Festpreise, wo immer die Arbeit es zulässt',
    'Wir beraten auf Deutsch und Englisch',
  ],
};

export const landing: Record<'en' | 'de', Record<LandingKey, LandingCopy>> = {
  en: {
    subsidiary: {
      meta: {
        title: 'Set Up a Singapore Subsidiary or Regional HQ | Meridium',
        description:
          'Senior advisers set up your Singapore subsidiary or regional headquarters: structure, resident director, Employment Passes, bank account, licences and first-year compliance, at fixed fees wherever the work allows.',
      },
      hero: {
        eyebrow: 'For companies expanding into Asia',
        heading: 'Your Singapore subsidiary, set up properly and run by senior advisers.',
        intro:
          'Meridium sets up and runs Singapore subsidiaries, regional headquarters and holding companies for foreign groups. One senior team takes you from structure to first payroll, and stays accountable for the entity afterwards.',
        primary: { label: 'Plan your Singapore entity', href: 'planner' },
        secondary: { label: 'Book a scoping call', href: 'booking' },
        facts: facts.en,
      },
      list: {
        eyebrow: 'What we set up',
        heading: 'Everything a new Singapore entity needs, coordinated in one place.',
        items: [
          { title: 'Structure', body: 'Subsidiary, branch or representative office, holding structure and share capital, decided before anything is filed, with tax residency and treaty access in mind.' },
          { title: 'Resident director', body: 'A nominee resident director where you have nobody in Singapore. Your side keeps the board majority, so decisions stay with you.' },
          { title: 'Employment Passes', body: 'Passes for the people you relocate, planned against MOM’s salary thresholds and COMPASS, including cover for the gap before a relocating director’s pass is issued.' },
          { title: 'Corporate bank account', body: 'Introductions to banks that suit your ownership structure, with the documents they ask for prepared in advance.' },
          { title: 'Licences and registrations', body: 'The approvals your activity needs, and the tax, GST and CPF registrations, filed in the right order.' },
          { title: 'First-year compliance', body: 'Company secretary, registered office, accounting, tax and payroll from day one, with a compliance calendar handed to your named contact.' },
        ],
      },
      planner: {
        eyebrow: 'Setup planner',
        heading: 'See your structure, timeline and fees before you speak to anyone.',
        intro: 'Seven questions about your business. The planner recommends a structure and shows your critical path, government fees and tax position straight away.',
      },
      steps: {
        eyebrow: 'How it works',
        heading: 'From first call to operating entity.',
        items: [
          { title: 'Scoping call', body: 'A senior adviser reviews your plans, confirms the structure and flags what will take longest, usually the bank account, passes or licences.' },
          { title: 'Fixed-fee proposal', body: 'A written scope and fee, with a realistic timeline for your case.' },
          { title: 'KYC and documents', body: 'Identity checks done once, and every document prepared for signature, remotely if you prefer.' },
          { title: 'Incorporation and handover', body: 'The entity is registered and its roles are in place, the bank account and passes are progressed, and your named contact takes over the ongoing work.' },
        ],
      },
      services: { heading: 'Related services', slugs: ['incorporation', 'payroll-hr', 'licence-applications', 'asia-expansion'] },
      faqHeading: 'Common questions',
      faqs: [
        { q: 'How long does it take to set up a Singapore subsidiary?', a: 'Incorporation itself is usually quick once documents are signed. The overall timeline is set by the steps around it: the corporate bank account, Employment Passes and any licence. The setup planner on this page shows a typical timeline for your case, and we confirm it at the scoping call.' },
        { q: 'Do we need someone in Singapore to be a director?', a: 'Yes. Every Singapore company needs at least one director who is ordinarily resident in Singapore. If you have nobody suitable, a nominee director fills the role, and you appoint your own directors alongside, so your side controls the board.' },
        { q: 'Should we set up a subsidiary or a branch?', a: 'Most foreign groups choose a subsidiary: it keeps liabilities in Singapore, can be Singapore tax resident and can sponsor Employment Passes. A branch is part of the parent, which carries its liabilities directly. The setup planner weighs this for your case.' },
        { q: 'Can you also run the entity after incorporation?', a: 'Yes. Company secretarial, accounting and tax, GST, payroll and work passes are delivered by the same senior team, so nothing falls between providers.' },
      ],
      cta: { heading: 'Discuss your Singapore entity with a senior adviser.' },
    },
    operations: {
      meta: {
        title: 'Company Secretary, Accounting and Payroll for Singapore Companies | Meridium',
        description:
          'Already operating in Singapore? Senior advisers take over your company secretarial, accounting, tax and payroll, handle the change of provider and keep every deadline in view.',
      },
      hero: {
        eyebrow: 'For companies already operating in Singapore',
        heading: 'Your Singapore entity, run properly by senior advisers.',
        intro:
          'Many foreign-owned companies in Singapore sit with high-volume providers, where the file changes hands and deadlines are chased by ACRA reminders. Meridium takes over company secretarial, accounting, tax and payroll with one senior contact who knows your entity.',
        primary: { label: 'Book a review of your entity', href: 'booking' },
        secondary: { label: 'Send us your situation', href: 'contact' },
        facts: facts.en,
      },
      list: {
        eyebrow: 'Signs it is time for a change',
        heading: 'If any of these sound familiar, a review is worth half an hour.',
        items: [
          { title: 'No company secretary you can name', body: 'The secretary on record has changed or is hard to reach, and questions take days to answer.' },
          { title: 'Deadlines found out from reminders', body: 'Annual return, AGM or tax filing dates are raised by ACRA or IRAS letters rather than by your provider.' },
          { title: 'Books that close late', body: 'Accounts are prepared in a rush at year end, so the tax return is estimated or filed at the last moment.' },
          { title: 'Payroll that needs correcting', body: 'CPF contributions, IR8A forms or leave entitlements are fixed after the fact.' },
          { title: 'Registers nobody has looked at', body: 'The register of registrable controllers and other statutory registers have not been reviewed since incorporation.' },
          { title: 'Passes renewed at the last minute', body: 'Employment Pass renewals are not planned against MOM’s rising salary thresholds.' },
        ],
      },
      steps: {
        eyebrow: 'Changing provider',
        heading: 'How a change of provider works.',
        items: [
          { title: 'Review and fixed fee', body: 'We go through your entity’s current position with you and quote a fixed fee to take it over.' },
          { title: 'Engagement and KYC', body: 'Identity checks on directors and owners, done once.' },
          { title: 'Handover', body: 'We request the registers, records and accounting files from your current provider and lodge the change of company secretary and registered office with ACRA, which is due within 14 days of the change.' },
          { title: 'Ongoing delivery', body: 'Your named contact runs the compliance calendar, books and payroll, and raises issues before they become deadlines.' },
        ],
      },
      services: { heading: 'What we take over', slugs: ['company-secretarial', 'accounting-tax', 'payroll-hr', 'advisory-reports'] },
      offer: {
        heading: 'Not ready to talk yet?',
        body: 'Check your deadlines with our compliance calendar: every ACRA, IRAS and CPF date for a Singapore private company on one page.',
        cta: { label: 'Get the compliance calendar', href: 'calendar' },
      },
      faqHeading: 'Common questions',
      faqs: [
        { q: 'Can we change company secretary part-way through the year?', a: 'Yes. A company can appoint a new secretary at any time. The change must be lodged with ACRA within 14 days, and we handle the filing and the handover of records.' },
        { q: 'Do we need our current provider’s cooperation?', a: 'The company’s registers and records belong to the company. We request them from your current provider on your behalf, and in most cases the handover is routine.' },
        { q: 'Can you take over payroll or accounting part-way through the year?', a: 'Yes. We pick up from your last completed period and reconcile the year to date, so year-end reporting such as IR8A forms and the tax return is complete.' },
        { q: 'What does a review cost?', a: 'The first call costs nothing and commits you to nothing. If you engage us, the fee to take over your entity is quoted in writing beforehand.' },
      ],
      cta: { heading: 'Talk to a senior adviser about your Singapore entity.' },
    },
  },
  de: {
    subsidiary: {
      meta: {
        title: 'Tochtergesellschaft oder Regionalzentrale in Singapur gründen | Meridium',
        description:
          'Erfahrene Berater gründen Ihre Tochtergesellschaft oder Regionalzentrale in Singapur: Struktur, ansässiger Director, Employment Passes, Bankkonto, Lizenzen und Compliance im ersten Jahr, zu Festpreisen, wo immer die Arbeit es zulässt.',
      },
      hero: {
        eyebrow: 'Für Unternehmen auf dem Weg nach Asien',
        heading: 'Ihre Tochtergesellschaft in Singapur, sauber aufgesetzt und von erfahrenen Beratern betreut.',
        intro:
          'Meridium gründet und betreut Tochtergesellschaften, Regionalzentralen und Holdinggesellschaften ausländischer Unternehmensgruppen in Singapur. Ein erfahrenes Team begleitet Sie von der Struktur bis zur ersten Lohnabrechnung und bleibt danach für die Gesellschaft verantwortlich.',
        primary: { label: 'Markteintritt planen', href: 'planner' },
        secondary: { label: 'Erstgespräch vereinbaren', href: 'booking' },
        facts: facts.de,
      },
      list: {
        eyebrow: 'Was wir für Sie aufsetzen',
        heading: 'Alles, was eine neue Gesellschaft in Singapur braucht, aus einer Hand.',
        items: [
          { title: 'Struktur', body: 'Tochtergesellschaft, Zweigniederlassung oder Repräsentanz, Holdingstruktur und Stammkapital, entschieden, bevor irgendetwas eingereicht wird, mit Blick auf steuerliche Ansässigkeit und Doppelbesteuerungsabkommen.' },
          { title: 'Ansässiger Director', body: 'Ein Nominee Director, wenn Sie niemanden in Singapur haben. Ihre Seite behält die Mehrheit im Board, die Entscheidungen bleiben bei Ihnen.' },
          { title: 'Employment Passes', body: 'Pässe für entsandte Mitarbeitende, geplant anhand der Gehaltsschwellen des MOM und COMPASS, einschließlich der Überbrückung, bis der Pass eines umziehenden Directors erteilt ist.' },
          { title: 'Geschäftskonto', body: 'Kontakte zu Banken, die zu Ihrer Beteiligungsstruktur passen, und die dafür nötigen Unterlagen, vorab vorbereitet.' },
          { title: 'Lizenzen und Registrierungen', body: 'Die Genehmigungen, die Ihre Tätigkeit braucht, sowie Steuer-, GST- und CPF-Registrierungen, in der richtigen Reihenfolge eingereicht.' },
          { title: 'Compliance im ersten Jahr', body: 'Company Secretary, Geschäftsadresse, Buchhaltung, Steuern und Lohnabrechnung ab dem ersten Tag, mit einem Compliance-Kalender bei Ihrem festen Ansprechpartner.' },
        ],
      },
      planner: {
        eyebrow: 'Setup-Planer',
        heading: 'Sehen Sie Struktur, Zeitplan und Gebühren, bevor Sie mit jemandem sprechen.',
        intro: 'Sieben Fragen zu Ihrem Vorhaben. Der Planer empfiehlt eine Struktur und zeigt Ihnen sofort Ihren kritischen Pfad, die Behördengebühren und Ihre steuerliche Lage.',
      },
      steps: {
        eyebrow: 'So läuft es ab',
        heading: 'Vom ersten Gespräch zur operativen Gesellschaft.',
        items: [
          { title: 'Erstgespräch', body: 'Ein erfahrener Berater prüft Ihre Pläne, bestätigt die Struktur und benennt, was am längsten dauert, meist Bankkonto, Pässe oder Lizenzen.' },
          { title: 'Festpreisangebot', body: 'Ein schriftlicher Leistungsumfang mit Honorar und einem realistischen Zeitplan für Ihren Fall.' },
          { title: 'KYC und Unterlagen', body: 'Identitätsprüfung nur einmal, und alle Unterlagen unterschriftsreif vorbereitet, auf Wunsch aus der Ferne.' },
          { title: 'Gründung und Übergabe', body: 'Die Gesellschaft wird eingetragen und die Rollen sind besetzt, Bankkonto und Pässe laufen, und Ihr fester Ansprechpartner übernimmt die laufende Betreuung.' },
        ],
      },
      services: { heading: 'Verwandte Leistungen', slugs: ['incorporation', 'payroll-hr', 'licence-applications', 'asia-expansion'] },
      faqHeading: 'Häufige Fragen',
      faqs: [
        { q: 'Wie lange dauert die Gründung einer Tochtergesellschaft in Singapur?', a: 'Die Gründung selbst geht in der Regel zügig, sobald die Unterlagen unterschrieben sind. Die Gesamtdauer bestimmen die Schritte drumherum: das Geschäftskonto, Employment Passes und etwaige Lizenzen. Der Setup-Planer auf dieser Seite zeigt einen typischen Zeitplan für Ihren Fall, den wir im Erstgespräch bestätigen.' },
        { q: 'Brauchen wir einen Director mit Wohnsitz in Singapur?', a: 'Ja. Jede singapurische Gesellschaft braucht mindestens einen Director mit gewöhnlichem Aufenthalt in Singapur. Haben Sie niemanden, übernimmt ein Nominee Director diese Rolle, und Sie bestellen daneben eigene Directors, sodass Ihre Seite das Board kontrolliert.' },
        { q: 'Tochtergesellschaft oder Zweigniederlassung?', a: 'Die meisten ausländischen Gruppen wählen eine Tochtergesellschaft: Die Haftung bleibt in Singapur, sie kann in Singapur steuerlich ansässig sein und Employment Passes beantragen. Eine Zweigniederlassung ist Teil der Mutter, die direkt für sie haftet. Der Setup-Planer wägt das für Ihren Fall ab.' },
        { q: 'Betreuen Sie die Gesellschaft auch nach der Gründung?', a: 'Ja. Company Secretarial, Buchhaltung und Steuern, GST, Lohnabrechnung und Arbeitsgenehmigungen liefert dasselbe erfahrene Team, sodass nichts zwischen Anbietern verloren geht.' },
      ],
      cta: { heading: 'Besprechen Sie Ihre Gesellschaft in Singapur mit einem erfahrenen Berater.' },
    },
    operations: {
      meta: {
        title: 'Company Secretary, Buchhaltung und Lohnabrechnung für Gesellschaften in Singapur | Meridium',
        description:
          'Bereits in Singapur tätig? Erfahrene Berater übernehmen Company Secretarial, Buchhaltung, Steuern und Lohnabrechnung, begleiten den Anbieterwechsel und behalten jede Frist im Blick.',
      },
      hero: {
        eyebrow: 'Für Unternehmen, die bereits in Singapur tätig sind',
        heading: 'Ihre Gesellschaft in Singapur, professionell geführt von erfahrenen Beratern.',
        intro:
          'Viele ausländische Gesellschaften in Singapur sind bei Anbietern mit großem Mandatsvolumen, wo die Akte ständig den Bearbeiter wechselt und Fristen erst durch Erinnerungen von ACRA auffallen. Meridium übernimmt Company Secretarial, Buchhaltung, Steuern und Lohnabrechnung mit einem erfahrenen Ansprechpartner, der Ihre Gesellschaft kennt.',
        primary: { label: 'Überprüfung Ihrer Gesellschaft vereinbaren', href: 'booking' },
        secondary: { label: 'Schildern Sie uns Ihre Situation', href: 'contact' },
        facts: facts.de,
      },
      list: {
        eyebrow: 'Zeichen, dass es Zeit für einen Wechsel ist',
        heading: 'Wenn Ihnen etwas davon bekannt vorkommt, lohnt sich eine halbe Stunde.',
        items: [
          { title: 'Kein Company Secretary, den Sie benennen können', body: 'Der eingetragene Secretary hat gewechselt oder ist schwer erreichbar, und Fragen bleiben tagelang unbeantwortet.' },
          { title: 'Fristen erfahren Sie aus Erinnerungen', body: 'Annual Return, AGM oder Steuerfristen kommen durch Schreiben von ACRA oder IRAS, nicht durch Ihren Anbieter.' },
          { title: 'Abschlüsse kommen spät', body: 'Die Buchhaltung wird zum Jahresende hastig erstellt, die Steuererklärung geschätzt oder in letzter Minute eingereicht.' },
          { title: 'Lohnabrechnung mit Korrekturen', body: 'CPF-Beiträge, IR8A-Formulare oder Urlaubsansprüche werden nachträglich korrigiert.' },
          { title: 'Register, die niemand prüft', body: 'Das Register of Registrable Controllers und andere gesetzliche Register wurden seit der Gründung nicht überprüft.' },
          { title: 'Pässe in letzter Minute verlängert', body: 'Verlängerungen von Employment Passes werden nicht anhand der steigenden Gehaltsschwellen des MOM geplant.' },
        ],
      },
      steps: {
        eyebrow: 'Anbieterwechsel',
        heading: 'So läuft ein Anbieterwechsel ab.',
        items: [
          { title: 'Überprüfung und Festpreis', body: 'Wir gehen die aktuelle Lage Ihrer Gesellschaft mit Ihnen durch und nennen einen Festpreis für die Übernahme.' },
          { title: 'Mandat und KYC', body: 'Identitätsprüfung von Directors und Gesellschaftern, nur einmal.' },
          { title: 'Übergabe', body: 'Wir fordern Register, Unterlagen und Buchhaltungsdaten bei Ihrem bisherigen Anbieter an und melden den Wechsel von Company Secretary und Geschäftsadresse bei ACRA, was innerhalb von 14 Tagen nach dem Wechsel fällig ist.' },
          { title: 'Laufende Betreuung', body: 'Ihr fester Ansprechpartner führt Compliance-Kalender, Buchhaltung und Lohnabrechnung und spricht Probleme an, bevor sie zu Fristen werden.' },
        ],
      },
      services: { heading: 'Was wir übernehmen', slugs: ['company-secretarial', 'accounting-tax', 'payroll-hr', 'advisory-reports'] },
      offer: {
        heading: 'Noch nicht bereit für ein Gespräch?',
        body: 'Prüfen Sie Ihre Fristen mit unserem Compliance-Kalender: alle ACRA-, IRAS- und CPF-Termine einer Singapore Private Company auf einer Seite.',
        cta: { label: 'Compliance-Kalender öffnen', href: 'calendar' },
      },
      faqHeading: 'Häufige Fragen',
      faqs: [
        { q: 'Können wir den Company Secretary im laufenden Jahr wechseln?', a: 'Ja. Eine Gesellschaft kann jederzeit einen neuen Secretary bestellen. Der Wechsel ist innerhalb von 14 Tagen bei ACRA zu melden; die Meldung und die Übergabe der Unterlagen übernehmen wir.' },
        { q: 'Brauchen wir die Mitwirkung unseres bisherigen Anbieters?', a: 'Register und Unterlagen gehören der Gesellschaft. Wir fordern sie in Ihrem Namen bei Ihrem bisherigen Anbieter an, und in den meisten Fällen verläuft die Übergabe reibungslos.' },
        { q: 'Können Sie Lohnabrechnung oder Buchhaltung im laufenden Jahr übernehmen?', a: 'Ja. Wir setzen beim letzten abgeschlossenen Zeitraum an und stimmen das laufende Jahr ab, sodass die Jahresmeldungen wie IR8A und die Steuererklärung vollständig sind.' },
        { q: 'Was kostet eine Überprüfung?', a: 'Das erste Gespräch kostet nichts und verpflichtet Sie zu nichts. Wenn Sie uns beauftragen, nennen wir das Honorar für die Übernahme vorab schriftlich.' },
      ],
      cta: { heading: 'Sprechen Sie mit einem erfahrenen Berater über Ihre Gesellschaft in Singapur.' },
    },
  },
};
