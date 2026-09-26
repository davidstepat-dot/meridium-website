// Singapore Setup Planner (/resources/setup-planner/ and /de/resources/setup-planner/).
// Copy for both languages, the question set and the rule data the planner
// uses. The logic lives in src/components/SetupPlanner.astro and runs entirely
// in the visitor's browser; answers leave the browser only if the visitor
// sends the review form, which submits to the existing HubSpot contact form
// ("Website contact form (meridium.sg)") with the plan summary in the message.
//
// Facts verified 26 Sep 2026. Re-verify after each Singapore Budget and when
// MOM, ACRA or Enterprise Singapore announce changes.
//   - ACRA fees: name application S$15, registration S$300 (local company and
//     foreign company / branch). acra.gov.sg
//   - Representative office (Enterprise Singapore): parent sales turnover above
//     US$250,000, at least 3 years in operation, fewer than 5 staff in the RO;
//     approved for 1 year at a time, up to 3 years; S$200 a year.
//     enterprisesg.gov.sg/about-us/contact-us/representative-office
//   - Corporate income tax 17%. Start-up tax exemption: 75% of the first
//     S$100,000 and 50% of the next S$100,000 for the first 3 YAs; needs no
//     more than 20 shareholders, all individuals or at least one individual
//     holding 10% or more; excludes investment holding and property
//     development companies. Partial tax exemption: 75% of the first S$10,000
//     and 50% of the next S$190,000. iras.gov.sg
//   - GST registration is compulsory when taxable turnover exceeds S$1 million
//     (at the end of a calendar year, or expected in the next 12 months). iras.gov.sg
//   - Employment Pass qualifying salaries: taken from src/data/ep-salary.ts so
//     the two tools never disagree. EP fees: S$105 per application, S$225 per
//     pass issued. MOM (cited as plain text; MOM asks for permission before
//     deep-linking).
//   - Singapore has comprehensive tax treaties with every country in
//     TREATY_COUNTRIES below. With the United States it has only a limited
//     agreement (shipping and air transport), no comprehensive treaty.
//   - Tax residency (control and management in Singapore) is a condition of the
//     start-up tax exemption and of treaty access, not of the partial exemption.
//   - MOM does not allow an employer of record to sponsor a work pass for work
//     done for an overseas company (MOM, July 2024).

export type PlannerLang = 'en' | 'de';

// Countries offered in the first question. `treaty` marks a comprehensive
// double tax agreement with Singapore; `german` marks German-speaking markets.
export const COUNTRY_CODES = ['de', 'at', 'ch', 'uk', 'eu', 'us', 'au', 'cn', 'in', 'other'] as const;
export const TREATY_COUNTRIES = ['de', 'at', 'ch', 'uk', 'au', 'cn', 'in'];
export const GERMAN_SPEAKING = ['de', 'at', 'ch'];

// Weeks from instruction, as [start, end], for the licence bar on the timeline.
// Indicative allowances for planning, not regulator service standards.
export const LICENCE_WEEKS: Record<string, [number, number]> = {
  fin: [3, 36],
  edu: [3, 16],
  health: [3, 16],
  recruit: [2, 8],
  fnb: [3, 9],
  trading: [2, 3],
};

// Target dates for the timing question, in weeks.
export const TARGET_WEEKS: Record<string, number> = { asap: 4, q: 13, h: 26 };

// Government fees shown in the plan (S$).
export const FEES = {
  acraName: 15,
  acraRegistration: 300,
  roPerYear: 200,
  epApplication: 105,
  epIssuance: 225,
};

// Service title sent to HubSpot's service_of_interest property. Must match the
// English service titles used by the contact form.
export const CRM_SERVICE = 'Incorporation';

const en = {
  meta: {
    title: 'Singapore Setup Planner: Subsidiary, Branch or Representative Office | Meridium',
    description:
      'Free planner for foreign companies and founders. Find out whether you need a Singapore subsidiary, branch or representative office, with a tailored timeline, checklist, government fees and tax position.',
  },
  hero: {
    crumb: 'Resources',
    eyebrow: 'Singapore Setup Planner',
    heading: 'Plan your Singapore entity in about two minutes.',
    intro:
      'Answer seven short questions about your business. The planner shows the structure that fits, the approvals you need, a typical timeline, the government fees and your tax position, straight away on this page.',
    points: [
      { title: 'The right structure', body: 'Subsidiary, branch or representative office, and the reasons.' },
      { title: 'Your critical path', body: 'Director, work passes, bank account and licences, week by week.' },
      { title: 'Your tax position', body: 'Which exemption applies and what affects treaty access.' },
    ],
    start: 'Start planning',
    startNote: 'No sign-up needed to see your result.',
  },
  noscript: 'The planner needs JavaScript. Please enable it in your browser, or write to {email} and a senior adviser will help.',
  ui: {
    step: 'Step {n} of {total}',
    restart: 'Start again',
    back: 'Back',
    next: 'Continue',
    seePlan: 'See my plan',
    change: 'Change answers',
    resultEyebrow: 'Your Singapore setup plan',
    print: 'Save or print this plan',
    printNote: 'Choose "Save as PDF" in the print dialog to keep a copy.',
  },
  steps: {
    you: 'About you',
    activity: 'Activity',
    invoicing: 'Trading',
    separate: 'Structure',
    director: 'Director',
    hires: 'People',
    plans: 'Plans',
  },
  q: {
    who: {
      title: 'Who is setting up in Singapore?',
      options: [
        ['parent', 'An established company abroad', 'A subsidiary or office of your existing business'],
        ['founder', 'An individual founder or founding team', 'A new business owned by people rather than a company'],
        ['group', 'A group creating a regional headquarters or holding company', 'To own or manage operations across Asia'],
      ],
    },
    country: {
      title: 'Where is the parent company or founder based?',
      options: [
        ['de', 'Germany'],
        ['at', 'Austria'],
        ['ch', 'Switzerland'],
        ['uk', 'United Kingdom'],
        ['eu', 'Other Europe'],
        ['us', 'United States'],
        ['au', 'Australia'],
        ['cn', 'China'],
        ['in', 'India'],
        ['other', 'Other'],
      ],
    },
    activity: {
      title: 'What will the Singapore business do?',
      help: 'Pick the main activity. It decides which licences apply and how the company is taxed.',
      options: [
        ['sales', 'Sales, distribution or customer support', 'Serving customers in Singapore and the region'],
        ['trading', 'Importing, exporting or trading goods', 'Physical goods moving through Singapore'],
        ['services', 'Consulting or professional services', 'Advice, engineering, design and similar'],
        ['tech', 'Software, SaaS or digital products', 'Built or sold from Singapore'],
        ['fnb', 'Food, retail or hospitality', 'Shops, restaurants, cafés and hotels'],
        ['regulated', 'Financial services, education, healthcare or recruitment', 'Activities that need a licence before you start'],
        ['holding', 'Holding shares in other companies', 'A holding or investment company'],
        ['explore', 'Market research only, no sales yet', 'Building relationships before committing'],
      ],
    },
    regSector: {
      title: 'Which regulated activity?',
      options: [
        ['fin', 'Financial services or payments'],
        ['edu', 'Private education'],
        ['health', 'Healthcare'],
        ['recruit', 'Recruitment or employment agency'],
      ],
    },
    invoicing: {
      title: 'Will the Singapore business sign contracts or invoice customers in its first year?',
      options: [
        ['yes', 'Yes', 'It will trade from the start'],
        ['no', 'No, not in the first year', 'We want a presence first, to research the market'],
        ['unsure', 'Not sure yet', ''],
      ],
    },
    separate: {
      title: 'Should the Singapore business stand on its own legally?',
      help: 'This is the main difference between a subsidiary and a branch.',
      options: [
        ['yes', 'Yes, keep its liabilities in Singapore', 'A separate company. The parent’s risk is limited to what it invests.'],
        ['no', 'No, the parent can carry it directly', 'We would rather not run a separate company'],
        ['unsure', 'Not sure, advise us', ''],
      ],
    },
    director: {
      title: 'Who will be the director who lives in Singapore?',
      help: 'Singapore law requires at least one locally resident director. For a branch, the equivalent role is a resident authorised representative.',
      options: [
        ['resident', 'Someone who already lives in Singapore', 'A citizen, permanent resident, or Employment Pass or EntrePass holder'],
        ['relocate', 'An executive moving to Singapore', 'They will need an Employment Pass'],
        ['nominee', 'Nobody yet', 'We will need a nominee director'],
      ],
    },
    hires: {
      title: 'Who will work for the Singapore business in the first 12 months?',
      options: [
        ['none', 'Nobody yet', ''],
        ['local', 'Local hires only', 'Singapore citizens or permanent residents'],
        ['foreign', 'People we relocate from abroad', 'Employment Pass or S Pass holders'],
        ['both', 'Both local hires and relocated staff', ''],
      ],
    },
    revenue: {
      title: 'Expected annual revenue in the first two years',
      options: [
        ['under', 'Under S$1 million'],
        ['over', 'Over S$1 million'],
        ['unsure', 'Too early to say'],
      ],
    },
    timing: {
      title: 'When do you want to be operational?',
      options: [
        ['asap', 'Within 4 weeks'],
        ['q', 'In 1 to 3 months'],
        ['h', 'In 3 to 6 months'],
        ['explore', 'Just exploring'],
      ],
    },
  },
  r: {
    recommended: 'Recommended structure',
    pteTitle: 'Singapore private limited company',
    pteFormParent: 'A wholly owned subsidiary of your parent company',
    pteFormGroup: 'A regional holding or headquarters company',
    pteFormFounder: 'Owned by you and your co-founders',
    whyPteSeparate: 'A separate legal entity, so liabilities stay in Singapore and the owners’ risk is limited to what they invest.',
    whyPteEp: 'It can sponsor Employment Passes for the people you relocate.',
    whyPteTreaty: 'It can be Singapore tax resident and use Singapore’s tax treaties, provided the board manages it from Singapore.',
    whyPteExempt: 'It can use Singapore’s corporate tax exemptions, and it is the form banks, landlords and customers expect.',
    whyPteUnsure: 'You were unsure about liability. A subsidiary is the safer default, and it keeps the Singapore business separate from the parent.',
    altPteRo: 'Considered: a representative office. It only works if you will not sign contracts or invoice anyone. You said you might, so a company is the safer choice.',
    altPteBranch: 'Considered: a branch. Possible if the parent is content to carry the Singapore liabilities directly, but a branch cannot use the start-up tax exemption and is usually not Singapore tax resident.',
    altFounderRo: 'Considered: a representative office. It is not open to founders, because it needs a parent company that has operated for at least three years.',
    branchTitle: 'Branch of your foreign company',
    branchForm: 'Registered with ACRA as a foreign company, not a new legal entity',
    whyBranch1: 'No new company to own: the branch is part of the parent.',
    whyBranch2: 'You said the parent can carry the liabilities, which a branch requires, because the parent is fully liable for its debts.',
    whyBranch3: 'Each year the branch files its own audited accounts and the parent’s financial statements with ACRA.',
    altBranch: 'Worth comparing: a subsidiary. A branch cannot claim the start-up tax exemption and is usually not Singapore tax resident, so it cannot use Singapore’s tax treaties in its own right. Most foreign companies choose a subsidiary for these reasons.',
    roTitle: 'Representative office',
    roForm: 'Registered with Enterprise Singapore, for market research and liaison only',
    whyRo1: 'You will not trade in the first year, which is the condition for a representative office.',
    whyRo2: 'Your parent needs sales above US$250,000, at least three years in operation, and fewer than five staff planned for the office.',
    whyRo3: 'Approval runs for one year at a time, up to three years. After that you register a company or branch with ACRA.',
    altRo: 'Watch for this: a representative office cannot sign contracts, invoice customers or earn revenue. If a first deal comes sooner than planned, you will need a company quickly.',

    flagsHeading: 'What to plan around',
    flagTimingLabel: 'Timing',
    flagTiming: 'You want to be operational {target}. On the path below, allow about {weeks} weeks. {pace} Preparing documents early closes much of the gap.',
    paceLicence: 'The licence sets the pace.',
    paceBank: 'The bank account usually sets the pace.',
    targetPhrase: { asap: 'within four weeks', q: 'within one to three months', h: 'within three to six months' },
    flagGapLabel: 'Director gap',
    flagGap: 'Your executive can apply for an Employment Pass only once the company exists, but the company needs a resident director before it can exist. Most clients bridge this with an interim nominee director who steps down when the pass is issued.',
    flagEpLabel: 'Employment Pass',
    flagEp: 'Relocated staff need an Employment Pass. MOM does not allow an employer of record to sponsor a pass for work done for an overseas company, so in practice your own Singapore entity needs to be in place first. {salary} Most applicants must also score at least 40 points under COMPASS.',
    epSalary: 'The minimum qualifying salary starts at {g} a month ({f} in financial services) and rises with age.',
    epSalaryNext: 'For new applications from 1 January 2027 it starts at {g} ({f}).',
    flagOkLabel: 'On track',
    flagOk: 'Your target of being operational {target} looks achievable for this setup, at about {weeks} weeks, provided documents and bank checks run smoothly.',

    timelineHeading: 'Your timeline',
    timelineIntro: 'Typical weeks from the day you instruct us, if documents come back promptly. Actual timings depend on the authorities and the bank.',
    timelineReady: 'Operational in about {weeks} weeks.',
    timelineAria: 'Timeline: operational in about {weeks} weeks',
    legendCore: 'Core steps',
    legendLicence: 'Licence',
    legendDirector: 'Director cover',
    legendTarget: 'Your target',
    weeks: 'weeks',
    ph: {
      roDocs: ['Prepare parent documents', 'Incorporation certificate and latest audited accounts, in English'],
      roCorppass: ['Corppass for the parent', 'Needs an administrator with a Singapore ID, or a proxy'],
      roApp: ['Enterprise Singapore application', 'Approval runs for one year at a time'],
      scope: ['Scoping, proposal and KYC', 'Identity checks completed once'],
      certify: ['Certify parent documents', 'Notarised, and translated where not in English'],
      nomineeInterim: ['Interim nominee director', 'Steps down once your executive’s pass is issued'],
      nominee: ['Nominee resident director', 'Appointed at incorporation and continues'],
      incorp: ['Incorporation with ACRA', 'Typically quick once documents are signed, unless the name is referred for review'],
      branchReg: ['Registration with ACRA', 'Typically quick once documents are signed, unless the name is referred for review'],
      bank: ['Corporate bank account', 'Depends on the bank and your ownership chain'],
      regs: ['Tax and employer registrations', '{list}'],
      ep: ['Employment Pass', 'Processing time is set by MOM'],
    },
    lic: {
      fin: { tag: 'MAS licence', cta: 'a MAS licence', name: 'Licence or exemption from the Monetary Authority of Singapore (MAS)', note: 'For example a capital markets services or payment services licence. Allow several months.' },
      edu: { tag: 'CPE registration', cta: 'CPE registration', name: 'Registration with the Committee for Private Education (CPE)', note: 'Required for private education institutions, under SkillsFuture Singapore. Allow several months.' },
      health: { tag: 'MOH licence', cta: 'an MOH licence', name: 'Licence from the Ministry of Health under the Healthcare Services Act', note: 'Premises and key appointment holders are assessed. Allow several months.' },
      recruit: { tag: 'EA licence', cta: 'an employment agency licence', name: 'Employment agency licence from the Ministry of Manpower (MOM)', note: 'Needs a certified key appointment holder and a security deposit.' },
      fnb: { tag: 'SFA licence', cta: 'an SFA licence', name: 'Food shop licence from the Singapore Food Agency (SFA)', note: 'Issued once premises are ready. Selling liquor needs a separate police licence.' },
      trading: { tag: 'Customs account', cta: 'a customs account', name: 'Customs account activation with Singapore Customs', note: 'Needed to apply for import and export permits through TradeNet. Typically quick once the company exists.' },
    },

    checklistHeading: 'What you will need',
    ck: {
      roDocs: ['Parent company documents', 'Certificate of incorporation and latest audited accounts, in English'],
      roCorppass: ['Corppass account', 'For the parent, managed by someone with a Singapore ID or through a proxy'],
      roOffice: ['Office address', 'Where the representative office will operate'],
      roRenewal: ['Annual renewal', 'S$200 a year, up to three years in total'],
      pteName: ['Company name and constitution', 'Name approved through ACRA, with a standard or tailored constitution'],
      branchName: ['Name approval and ACRA registration', 'Using the parent’s name, with certified parent documents'],
      directorPte: 'Resident director',
      directorBranch: 'Resident authorised representative',
      directorResident: 'Your Singapore-based person. If they hold a work pass, confirm it allows the appointment.',
      directorRelocate: 'An interim nominee until your executive’s pass is issued',
      directorNominee: 'A nominee director. When Meridium provides one, you appoint two directors of your own, so your side holds the board majority.',
      office: ['Registered office address', 'A Singapore address, not a PO box'],
      secretary: ['Company secretary', 'Must be appointed within six months of incorporation'],
      capital: ['Paid-up capital and shareholder', 'From S$1, though banks, licensing bodies and MOM look for credible capitalisation'],
      rorc: ['Register of registrable controllers', 'Records who ultimately owns and controls the company'],
      bank: ['Corporate bank account', 'Opened after incorporation, with checks on every owner in the chain'],
      cpf: ['CPF registration and payroll', 'Before the first payroll run, including the Skills Development Levy'],
      gst: ['GST registration', 'Compulsory once taxable turnover exceeds S$1 million a year'],
      dpo: ['Data Protection Officer', 'Every organisation must appoint one under the PDPA'],
    },

    feesHeading: 'Government fees',
    feesIntro: 'Statutory fees only. Our professional fees are quoted as a fixed fee after a scoping call.',
    fee: {
      roFee: ['Enterprise Singapore processing fee', 'Per year, non-refundable'],
      acraName: ['ACRA name application', ''],
      acraReg: ['ACRA incorporation', ''],
      acraBranch: ['ACRA foreign company registration', ''],
      epApp: ['Employment Pass application', 'Per applicant, paid on submission'],
      epIssue: ['Employment Pass issuance', 'Per pass, paid on approval'],
      gst: ['GST registration', ''],
    },
    noFee: 'No fee',

    taxHeading: 'Tax position',
    rateLabel: 'corporate income tax',
    taxRo: 'A representative office should not earn income, so it normally has no corporate tax to pay. Its staff are taxed on their employment income as usual.',
    taxBranch: 'Branch profits are taxed at 17%. A branch cannot claim the start-up tax exemption, and because a branch of a foreign company is usually not Singapore tax resident, it generally cannot use Singapore’s tax treaties in its own right.',
    taxHolding: 'Investment holding companies are excluded from the start-up tax exemption. The partial exemption applies instead: 75% of the first S$10,000 and 50% of the next S$190,000 of chargeable income.',
    taxFounder: 'A new company owned by individuals usually qualifies for the start-up tax exemption for its first three years of assessment: 75% of the first S$100,000 and 50% of the next S$100,000 of chargeable income.',
    taxCorp: 'The start-up tax exemption needs at least one individual holding 10% or more of the shares, so a subsidiary owned only by its parent usually does not qualify. The partial exemption applies instead: 75% of the first S$10,000 and 50% of the next S$190,000 of chargeable income.',
    taxResidency: 'Tax residency follows where the board makes its decisions. If your directors decide matters from abroad, the company may not be Singapore tax resident, which rules out the start-up tax exemption and limits treaty access. Plan where board meetings are held.',
    treaty: 'Singapore has a comprehensive tax treaty with {country}, which can reduce withholding tax on dividends, interest and royalties, provided the Singapore entity is tax resident.',
    treatyUs: 'Singapore has no comprehensive income tax treaty with the United States, so plan dividend and service fee flows with US tax advice alongside ours.',
    treatyOther: 'Singapore has around 100 tax treaties. We check the one that applies to you during scoping.',

    ctaHeading: 'Talk it through with a senior adviser',
    ctaMany: 'Your setup needs {items}, coordinated so each step unlocks the next. That is the kind of file we handle end to end.',
    ctaOne: 'Your setup needs {item} alongside the entity itself. A senior adviser can confirm the sequence and give you a fixed fee.',
    ctaNone: 'Your setup is straightforward. A short call confirms the details and gets you a fixed fee quote.',
    and: 'and',
    ctaDirector: 'a resident director',
    ctaEp: 'an Employment Pass',
    german: 'We work in German as well as English.',
    book: 'Book a scoping call',
    writeTo: 'Or write to',
    needs: {
      incorp: 'Incorporation',
      branch: 'Branch registration',
      ro: 'Representative office',
      secretary: 'Company secretary',
      nominee: 'Nominee director',
      nomineeInterim: 'Interim nominee director',
      ep: 'Employment Pass',
      payroll: 'Payroll and CPF',
      accounting: 'Accounting and tax',
      gst: 'GST registration',
      structuring: 'Structuring advice',
    },
    disclaimer:
      'This planner gives general guidance for planning purposes. It is not legal or tax advice, and it does not cover every scheme, licence or exception. Whether a pass, licence or registration is granted is decided by the authority concerned.',
    sources: 'Rules and fees checked in September 2026 against published guidance from ACRA, Enterprise Singapore, IRAS and the Ministry of Manpower (MOM).',
  },
  lead: {
    heading: 'Have a senior adviser review your plan',
    body: 'Send us your plan and a senior adviser will reply, usually within one business day, with comments on your situation and a fixed-fee quote. Your answers come with it, so there is nothing to repeat.',
    firstName: 'First name',
    firstNameError: 'Please enter your first name.',
    lastName: 'Last name',
    lastNameError: 'Please enter your last name.',
    company: 'Company',
    companyError: 'Please enter your company.',
    email: 'Work email',
    emailError: 'Please enter a valid email address.',
    country: 'Country',
    countryError: 'Please enter your country.',
    note: 'Anything else we should know?',
    optional: 'optional',
    consent: 'I consent to Meridium collecting and using the personal data in this form, together with my planner answers, to review my plan and respond to me.',
    consentError: 'Consent is required so we can respond to you.',
    policyPre: 'How we handle personal data is described in our',
    policyLink: 'data protection policy',
    sensitive: 'Please do not include NRIC, passport or financial details. We will ask for anything of that kind through a secure channel once an engagement begins.',
    send: 'Send my plan',
    busy: 'Sending your plan.',
    successTitle: 'Thank you. Your plan has been sent.',
    successBody: 'A senior adviser will reply from {email}, usually within one business day.',
    errorTitle: 'Your plan could not be sent.',
    errorPre: 'Please write to',
    errorPost: 'instead, or try again in a moment.',
  },
  explainer: {
    eyebrow: 'Structures compared',
    heading: 'Subsidiary, branch or representative office?',
    intro:
      'Foreign companies have three ways to establish in Singapore. Most choose a private limited company, but the other two have their uses. The planner above weighs these differences for you.',
    cols: ['', 'Private limited company', 'Branch', 'Representative office'],
    rows: [
      ['Legal status', 'Separate Singapore company', 'Part of the foreign parent', 'No legal status'],
      ['Sign contracts and earn revenue', 'Yes', 'Yes', 'No'],
      ['Liability', 'Limited to the capital invested', 'Parent fully liable', 'Rests with the parent'],
      ['Resident officer', 'At least one resident director', 'At least one resident authorised representative', 'Not required; fewer than five staff'],
      ['Start-up tax exemption', 'Available if the shareholder conditions are met', 'Not available', 'Not applicable'],
      ['Registered with', 'ACRA', 'ACRA', 'Enterprise Singapore'],
      ['Duration', 'Unlimited', 'Unlimited', 'One year at a time, up to three years'],
      ['Government fee', 'S$315', 'S$315', 'S$200 a year'],
    ],
  },
  faqHeading: 'Common questions',
  faqs: [
    {
      q: 'Can a foreign company own 100 per cent of a Singapore company?',
      a: 'Yes. Singapore places no restriction on foreign shareholding in a private limited company. The residency requirement applies to directors: at least one director must be ordinarily resident in Singapore. Where you have nobody suitable, a nominee director fills the role.',
    },
    {
      q: 'What is the difference between a subsidiary and a branch in Singapore?',
      a: 'A subsidiary is a separate Singapore company, so its liabilities stay in Singapore, it can be Singapore tax resident and it can qualify for tax exemptions. A branch is part of the foreign parent: the parent is fully liable for its debts, the branch is usually not tax resident, and it cannot claim the start-up tax exemption.',
    },
    {
      q: 'When does a representative office make sense?',
      a: 'When you want a presence for market research and relationship building without trading. A representative office cannot sign contracts or earn revenue. It is registered with Enterprise Singapore for one year at a time, up to three years, and the parent needs sales above US$250,000 and at least three years in operation.',
    },
    {
      q: 'Can I relocate to Singapore as the director of my new company?',
      a: 'Yes, through an Employment Pass sponsored by the Singapore company. Because the company must exist before it can apply, and needs a resident director to exist, most founders appoint an interim nominee director who steps down once the pass is issued.',
    },
    {
      q: 'Does a Singapore subsidiary qualify for the start-up tax exemption?',
      a: 'Usually not when it is wholly owned by a foreign company. The exemption needs at least one individual holding 10 per cent or more of the shares. Subsidiaries owned only by a corporate parent receive the partial tax exemption instead.',
    },
  ],
};

export type PlannerCopy = typeof en;

const de: PlannerCopy = {
  meta: {
    title: 'Setup-Planer Singapur: Tochtergesellschaft, Zweigniederlassung oder Repräsentanz | Meridium',
    description:
      'Kostenloser Planer für ausländische Unternehmen und Gründer. Finden Sie heraus, ob Sie in Singapur eine Tochtergesellschaft, eine Zweigniederlassung oder eine Repräsentanz brauchen, mit Zeitplan, Checkliste, Behördengebühren und steuerlicher Einordnung.',
  },
  hero: {
    crumb: 'Ressourcen',
    eyebrow: 'Setup-Planer Singapur',
    heading: 'Planen Sie Ihre Gesellschaft in Singapur in rund zwei Minuten.',
    intro:
      'Beantworten Sie sieben kurze Fragen zu Ihrem Vorhaben. Der Planer zeigt Ihnen sofort die passende Struktur, die nötigen Genehmigungen, einen typischen Zeitplan, die Behördengebühren und Ihre steuerliche Situation.',
    points: [
      { title: 'Die passende Struktur', body: 'Tochtergesellschaft, Zweigniederlassung oder Repräsentanz, mit Begründung.' },
      { title: 'Ihr kritischer Pfad', body: 'Director, Arbeitsgenehmigungen, Bankkonto und Lizenzen, Woche für Woche.' },
      { title: 'Ihre steuerliche Lage', body: 'Welche Steuerbefreiung greift und was den Zugang zu Doppelbesteuerungsabkommen bestimmt.' },
    ],
    start: 'Planung starten',
    startNote: 'Für das Ergebnis ist keine Anmeldung nötig.',
  },
  noscript: 'Der Planer benötigt JavaScript. Bitte aktivieren Sie es in Ihrem Browser oder schreiben Sie an {email}; ein erfahrener Berater hilft Ihnen gern.',
  ui: {
    step: 'Schritt {n} von {total}',
    restart: 'Neu beginnen',
    back: 'Zurück',
    next: 'Weiter',
    seePlan: 'Meinen Plan anzeigen',
    change: 'Antworten ändern',
    resultEyebrow: 'Ihr Plan für Singapur',
    print: 'Plan speichern oder drucken',
    printNote: 'Wählen Sie im Druckdialog „Als PDF speichern“, um eine Kopie zu behalten.',
  },
  steps: {
    you: 'Über Sie',
    activity: 'Tätigkeit',
    invoicing: 'Geschäftsbetrieb',
    separate: 'Struktur',
    director: 'Director',
    hires: 'Personal',
    plans: 'Pläne',
  },
  q: {
    who: {
      title: 'Wer gründet in Singapur?',
      options: [
        ['parent', 'Ein bestehendes Unternehmen im Ausland', 'Eine Tochter oder Niederlassung Ihres bestehenden Geschäfts'],
        ['founder', 'Ein Gründer oder ein Gründerteam', 'Ein neues Unternehmen im Besitz von Personen statt einer Gesellschaft'],
        ['group', 'Eine Gruppe, die eine regionale Zentrale oder Holding aufbaut', 'Um Aktivitäten in Asien zu halten oder zu steuern'],
      ],
    },
    country: {
      title: 'Wo sitzt die Muttergesellschaft oder der Gründer?',
      options: [
        ['de', 'Deutschland'],
        ['at', 'Österreich'],
        ['ch', 'Schweiz'],
        ['uk', 'Vereinigtes Königreich'],
        ['eu', 'Übriges Europa'],
        ['us', 'Vereinigte Staaten'],
        ['au', 'Australien'],
        ['cn', 'China'],
        ['in', 'Indien'],
        ['other', 'Anderes Land'],
      ],
    },
    activity: {
      title: 'Was wird die Gesellschaft in Singapur tun?',
      help: 'Wählen Sie die Haupttätigkeit. Sie entscheidet, welche Lizenzen nötig sind und wie die Gesellschaft besteuert wird.',
      options: [
        ['sales', 'Vertrieb, Distribution oder Kundenservice', 'Kunden in Singapur und der Region betreuen'],
        ['trading', 'Import, Export oder Warenhandel', 'Physische Waren, die über Singapur laufen'],
        ['services', 'Beratung oder Fachdienstleistungen', 'Beratung, Engineering, Design und Ähnliches'],
        ['tech', 'Software, SaaS oder digitale Produkte', 'In Singapur entwickelt oder von dort verkauft'],
        ['fnb', 'Gastronomie, Einzelhandel oder Hotellerie', 'Geschäfte, Restaurants, Cafés und Hotels'],
        ['regulated', 'Finanzdienstleistungen, Bildung, Gesundheit oder Personalvermittlung', 'Tätigkeiten, die vor dem Start eine Lizenz erfordern'],
        ['holding', 'Halten von Beteiligungen an anderen Gesellschaften', 'Eine Holding- oder Beteiligungsgesellschaft'],
        ['explore', 'Nur Marktforschung, noch kein Umsatz', 'Beziehungen aufbauen, bevor Sie sich festlegen'],
      ],
    },
    regSector: {
      title: 'Welche regulierte Tätigkeit?',
      options: [
        ['fin', 'Finanzdienstleistungen oder Zahlungsdienste'],
        ['edu', 'Private Bildung'],
        ['health', 'Gesundheitswesen'],
        ['recruit', 'Personalvermittlung'],
      ],
    },
    invoicing: {
      title: 'Wird die Gesellschaft im ersten Jahr Verträge schließen oder Kunden Rechnungen stellen?',
      options: [
        ['yes', 'Ja', 'Der Geschäftsbetrieb beginnt sofort'],
        ['no', 'Nein, nicht im ersten Jahr', 'Wir wollen zunächst vor Ort sein und den Markt erkunden'],
        ['unsure', 'Noch unklar', ''],
      ],
    },
    separate: {
      title: 'Soll das Geschäft in Singapur rechtlich eigenständig sein?',
      help: 'Das ist der wesentliche Unterschied zwischen Tochtergesellschaft und Zweigniederlassung.',
      options: [
        ['yes', 'Ja, die Haftung soll in Singapur bleiben', 'Eine eigene Gesellschaft. Das Risiko der Mutter beschränkt sich auf ihre Einlage.'],
        ['no', 'Nein, die Mutter kann es direkt tragen', 'Wir möchten keine eigene Gesellschaft führen'],
        ['unsure', 'Unklar, bitte beraten Sie uns', ''],
      ],
    },
    director: {
      title: 'Wer wird der in Singapur ansässige Director?',
      help: 'Das Gesetz verlangt mindestens einen in Singapur ansässigen Director. Bei einer Zweigniederlassung übernimmt ein ansässiger Authorised Representative diese Rolle.',
      options: [
        ['resident', 'Jemand, der bereits in Singapur lebt', 'Staatsbürger, Permanent Resident oder Inhaber eines Employment Pass bzw. EntrePass'],
        ['relocate', 'Eine Führungskraft, die nach Singapur umzieht', 'Sie benötigt einen Employment Pass'],
        ['nominee', 'Noch niemand', 'Wir brauchen einen Nominee Director'],
      ],
    },
    hires: {
      title: 'Wer wird in den ersten 12 Monaten für die Gesellschaft arbeiten?',
      options: [
        ['none', 'Noch niemand', ''],
        ['local', 'Nur lokale Mitarbeitende', 'Singapurische Staatsbürger oder Permanent Residents'],
        ['foreign', 'Entsandte Mitarbeitende aus dem Ausland', 'Inhaber eines Employment Pass oder S Pass'],
        ['both', 'Lokale und entsandte Mitarbeitende', ''],
      ],
    },
    revenue: {
      title: 'Erwarteter Jahresumsatz in den ersten zwei Jahren',
      options: [
        ['under', 'Unter 1 Mio. S$'],
        ['over', 'Über 1 Mio. S$'],
        ['unsure', 'Noch nicht absehbar'],
      ],
    },
    timing: {
      title: 'Wann möchten Sie operativ starten?',
      options: [
        ['asap', 'Innerhalb von 4 Wochen'],
        ['q', 'In 1 bis 3 Monaten'],
        ['h', 'In 3 bis 6 Monaten'],
        ['explore', 'Wir sondieren nur'],
      ],
    },
  },
  r: {
    recommended: 'Empfohlene Struktur',
    pteTitle: 'Singapore Private Limited Company',
    pteFormParent: 'Eine hundertprozentige Tochtergesellschaft Ihrer Muttergesellschaft',
    pteFormGroup: 'Eine regionale Holding- oder Zentralgesellschaft',
    pteFormFounder: 'Im Besitz von Ihnen und Ihren Mitgründern',
    whyPteSeparate: 'Eine eigene juristische Person: Die Haftung bleibt in Singapur, und das Risiko der Gesellschafter beschränkt sich auf ihre Einlage.',
    whyPteEp: 'Sie kann Employment Passes für die Mitarbeitenden beantragen, die Sie entsenden.',
    whyPteTreaty: 'Sie kann in Singapur steuerlich ansässig sein und die Doppelbesteuerungsabkommen Singapurs nutzen, sofern das Board sie von Singapur aus führt.',
    whyPteExempt: 'Sie kann die Steuerbefreiungen für Gesellschaften nutzen und ist die Form, die Banken, Vermieter und Kunden erwarten.',
    whyPteUnsure: 'Bei der Haftungsfrage waren Sie unsicher. Eine Tochtergesellschaft ist die sichere Wahl und hält das Geschäft in Singapur von der Mutter getrennt.',
    altPteRo: 'Geprüft: eine Repräsentanz. Sie kommt nur infrage, wenn Sie keine Verträge schließen und keine Rechnungen stellen. Das haben Sie nicht ausgeschlossen, daher ist eine Gesellschaft die sicherere Wahl.',
    altPteBranch: 'Geprüft: eine Zweigniederlassung. Möglich, wenn die Mutter die Verbindlichkeiten in Singapur direkt tragen will. Eine Zweigniederlassung kann die Start-up Tax Exemption jedoch nicht nutzen und ist in der Regel nicht in Singapur steuerlich ansässig.',
    altFounderRo: 'Geprüft: eine Repräsentanz. Sie steht Gründern nicht offen, denn sie setzt eine Muttergesellschaft voraus, die seit mindestens drei Jahren tätig ist.',
    branchTitle: 'Zweigniederlassung Ihres ausländischen Unternehmens',
    branchForm: 'Bei ACRA als ausländische Gesellschaft registriert, keine neue juristische Person',
    whyBranch1: 'Keine neue Gesellschaft: Die Zweigniederlassung ist Teil der Mutter.',
    whyBranch2: 'Sie haben angegeben, dass die Mutter die Verbindlichkeiten tragen kann. Genau das setzt eine Zweigniederlassung voraus, denn die Mutter haftet voll für ihre Schulden.',
    whyBranch3: 'Jedes Jahr reicht die Zweigniederlassung ihren eigenen geprüften Abschluss und den Abschluss der Mutter bei ACRA ein.',
    altBranch: 'Zum Vergleich: eine Tochtergesellschaft. Eine Zweigniederlassung kann die Start-up Tax Exemption nicht nutzen und ist in der Regel nicht in Singapur steuerlich ansässig, kann die Doppelbesteuerungsabkommen Singapurs also nicht aus eigenem Recht nutzen. Deshalb wählen die meisten ausländischen Unternehmen eine Tochtergesellschaft.',
    roTitle: 'Repräsentanz (Representative Office)',
    roForm: 'Bei Enterprise Singapore registriert, nur für Marktforschung und Kontaktpflege',
    whyRo1: 'Sie wollen im ersten Jahr keinen Geschäftsbetrieb aufnehmen. Das ist die Voraussetzung für eine Repräsentanz.',
    whyRo2: 'Ihre Muttergesellschaft braucht einen Umsatz von über 250.000 US$, mindestens drei Jahre Geschäftstätigkeit und weniger als fünf geplante Mitarbeitende in der Repräsentanz.',
    whyRo3: 'Die Genehmigung gilt jeweils ein Jahr, höchstens drei Jahre. Danach registrieren Sie eine Gesellschaft oder Zweigniederlassung bei ACRA.',
    altRo: 'Beachten Sie: Eine Repräsentanz darf keine Verträge schließen, keine Rechnungen stellen und keinen Umsatz erzielen. Kommt ein erster Auftrag früher als geplant, brauchen Sie schnell eine Gesellschaft.',

    flagsHeading: 'Worauf Sie achten sollten',
    flagTimingLabel: 'Zeitplan',
    flagTiming: 'Sie möchten {target} operativ starten. Auf dem Pfad unten sollten Sie rund {weeks} Wochen einplanen. {pace} Wer die Unterlagen früh vorbereitet, schließt einen guten Teil der Lücke.',
    paceLicence: 'Das Tempo bestimmt die Lizenz.',
    paceBank: 'Das Tempo bestimmt meist das Bankkonto.',
    targetPhrase: { asap: 'innerhalb von vier Wochen', q: 'innerhalb von ein bis drei Monaten', h: 'innerhalb von drei bis sechs Monaten' },
    flagGapLabel: 'Director-Lücke',
    flagGap: 'Ihre Führungskraft kann den Employment Pass erst beantragen, wenn die Gesellschaft existiert. Die Gesellschaft braucht aber einen ansässigen Director, bevor sie gegründet werden kann. Die meisten Mandanten überbrücken das mit einem Interims-Nominee-Director, der zurücktritt, sobald der Pass erteilt ist.',
    flagEpLabel: 'Employment Pass',
    flagEp: 'Entsandte Mitarbeitende brauchen einen Employment Pass. Das MOM erlaubt einem Employer of Record nicht, einen Pass für Tätigkeiten für ein ausländisches Unternehmen zu beantragen. In der Praxis muss Ihre eigene Gesellschaft in Singapur also zuerst stehen. {salary} Die meisten Antragsteller müssen außerdem im COMPASS-Punktesystem mindestens 40 Punkte erreichen.',
    epSalary: 'Das Mindestgehalt beginnt bei {g} im Monat ({f} im Finanzsektor) und steigt mit dem Alter.',
    epSalaryNext: 'Für Neuanträge ab dem 1. Januar 2027 beginnt es bei {g} ({f}).',
    flagOkLabel: 'Im Plan',
    flagOk: 'Ihr Ziel, {target} operativ zu starten, erscheint für dieses Setup erreichbar: rund {weeks} Wochen, sofern Unterlagen und Bankprüfung reibungslos laufen.',

    timelineHeading: 'Ihr Zeitplan',
    timelineIntro: 'Typische Wochen ab Ihrer Beauftragung, wenn die Unterlagen zügig zurückkommen. Die tatsächliche Dauer hängt von den Behörden und der Bank ab.',
    timelineReady: 'Operativ nach rund {weeks} Wochen.',
    timelineAria: 'Zeitplan: operativ nach rund {weeks} Wochen',
    legendCore: 'Kernschritte',
    legendLicence: 'Lizenz',
    legendDirector: 'Director-Abdeckung',
    legendTarget: 'Ihr Ziel',
    weeks: 'Wochen',
    ph: {
      roDocs: ['Unterlagen der Mutter vorbereiten', 'Gründungsurkunde bzw. Handelsregisterauszug und letzter geprüfter Abschluss, auf Englisch'],
      roCorppass: ['Corppass für die Mutter', 'Braucht einen Administrator mit singapurischem Ausweis oder einen Bevollmächtigten'],
      roApp: ['Antrag bei Enterprise Singapore', 'Die Genehmigung gilt jeweils ein Jahr'],
      scope: ['Erstgespräch, Angebot und KYC', 'Identitätsprüfung nur einmal'],
      certify: ['Unterlagen der Mutter beglaubigen', 'Notariell beglaubigt und übersetzt, falls nicht auf Englisch'],
      nomineeInterim: ['Interims-Nominee-Director', 'Tritt zurück, sobald der Pass Ihrer Führungskraft erteilt ist'],
      nominee: ['Ansässiger Nominee Director', 'Ab der Gründung und fortlaufend'],
      incorp: ['Gründung bei ACRA', 'In der Regel zügig nach Unterzeichnung, sofern der Name nicht zur Prüfung weitergeleitet wird'],
      branchReg: ['Registrierung bei ACRA', 'In der Regel zügig nach Unterzeichnung, sofern der Name nicht zur Prüfung weitergeleitet wird'],
      bank: ['Geschäftskonto', 'Hängt von der Bank und Ihrer Beteiligungskette ab'],
      regs: ['Steuer- und Arbeitgeberregistrierungen', '{list}'],
      ep: ['Employment Pass', 'Die Bearbeitungsdauer bestimmt das MOM'],
    },
    lic: {
      fin: { tag: 'MAS-Lizenz', cta: 'eine MAS-Lizenz', name: 'Lizenz oder Befreiung der Monetary Authority of Singapore (MAS)', note: 'Zum Beispiel eine Capital-Markets-Services- oder Payment-Services-Lizenz. Planen Sie mehrere Monate ein.' },
      edu: { tag: 'CPE-Registrierung', cta: 'eine CPE-Registrierung', name: 'Registrierung beim Committee for Private Education (CPE)', note: 'Pflicht für private Bildungseinrichtungen, unter SkillsFuture Singapore. Planen Sie mehrere Monate ein.' },
      health: { tag: 'MOH-Lizenz', cta: 'eine MOH-Lizenz', name: 'Lizenz des Gesundheitsministeriums nach dem Healthcare Services Act', note: 'Räumlichkeiten und Schlüsselpersonen werden geprüft. Planen Sie mehrere Monate ein.' },
      recruit: { tag: 'EA-Lizenz', cta: 'eine Lizenz als Arbeitsvermittlung', name: 'Employment-Agency-Lizenz des Ministry of Manpower (MOM)', note: 'Erfordert eine zertifizierte Schlüsselperson und eine Sicherheitsleistung.' },
      fnb: { tag: 'SFA-Lizenz', cta: 'eine SFA-Lizenz', name: 'Food-Shop-Lizenz der Singapore Food Agency (SFA)', note: 'Wird erteilt, sobald die Räumlichkeiten bereit sind. Für den Verkauf oder Ausschank von Alkohol ist eine gesonderte Lizenz der Polizei nötig.' },
      trading: { tag: 'Zollkonto', cta: 'ein Zollkonto', name: 'Aktivierung des Zollkontos bei Singapore Customs', note: 'Nötig, um Import- und Exportgenehmigungen über TradeNet zu beantragen. In der Regel zügig, sobald die Gesellschaft existiert.' },
    },

    checklistHeading: 'Was Sie benötigen',
    ck: {
      roDocs: ['Unterlagen der Muttergesellschaft', 'Gründungsurkunde bzw. Handelsregisterauszug und letzter geprüfter Abschluss, auf Englisch'],
      roCorppass: ['Corppass-Konto', 'Für die Mutter, verwaltet von jemandem mit singapurischem Ausweis oder über einen Bevollmächtigten'],
      roOffice: ['Büroadresse', 'Wo die Repräsentanz tätig sein wird'],
      roRenewal: ['Jährliche Verlängerung', '200 S$ pro Jahr, höchstens drei Jahre insgesamt'],
      pteName: ['Firmenname und Satzung', 'Name über ACRA genehmigt, mit Standard- oder individueller Satzung'],
      branchName: ['Namensgenehmigung und ACRA-Registrierung', 'Mit dem Namen der Mutter und beglaubigten Unterlagen der Mutter'],
      directorPte: 'Ansässiger Director',
      directorBranch: 'Ansässiger Authorised Representative',
      directorResident: 'Ihre Person in Singapur. Hat sie eine Arbeitsgenehmigung, prüfen Sie, ob diese die Bestellung erlaubt.',
      directorRelocate: 'Ein Interims-Nominee, bis der Pass Ihrer Führungskraft erteilt ist',
      directorNominee: 'Ein Nominee Director. Stellt Meridium ihn, bestellen Sie zwei eigene Directors, damit Ihre Seite die Mehrheit im Board hält.',
      office: ['Eingetragene Geschäftsadresse', 'Eine Adresse in Singapur, kein Postfach'],
      secretary: ['Company Secretary', 'Muss innerhalb von sechs Monaten nach der Gründung bestellt werden'],
      capital: ['Eingezahltes Kapital und Gesellschafter', 'Ab 1 S$, doch Banken, Lizenzbehörden und das MOM achten auf eine glaubwürdige Kapitalausstattung'],
      rorc: ['Register of Registrable Controllers', 'Dokumentiert, wem die Gesellschaft letztlich gehört und wer sie kontrolliert'],
      bank: ['Geschäftskonto', 'Wird nach der Gründung eröffnet, mit Prüfung aller Eigentümer in der Kette'],
      cpf: ['CPF-Registrierung und Lohnabrechnung', 'Vor der ersten Lohnabrechnung, einschließlich Skills Development Levy'],
      gst: ['GST-Registrierung', 'Pflicht, sobald der steuerbare Umsatz 1 Mio. S$ im Jahr übersteigt'],
      dpo: ['Datenschutzbeauftragter', 'Jede Organisation muss nach dem PDPA einen benennen'],
    },

    feesHeading: 'Behördengebühren',
    feesIntro: 'Nur gesetzliche Gebühren. Unser Honorar nennen wir nach einem Erstgespräch als Festpreis.',
    fee: {
      roFee: ['Bearbeitungsgebühr Enterprise Singapore', 'Pro Jahr, nicht erstattungsfähig'],
      acraName: ['ACRA-Namensantrag', ''],
      acraReg: ['ACRA-Gründung', ''],
      acraBranch: ['ACRA-Registrierung als ausländische Gesellschaft', ''],
      epApp: ['Antrag Employment Pass', 'Pro Antragsteller, bei Einreichung'],
      epIssue: ['Ausstellung Employment Pass', 'Pro Pass, bei Genehmigung'],
      gst: ['GST-Registrierung', ''],
    },
    noFee: 'Gebührenfrei',

    taxHeading: 'Steuerliche Lage',
    rateLabel: 'Körperschaftsteuer',
    taxRo: 'Eine Repräsentanz soll keine Einkünfte erzielen und zahlt daher in der Regel keine Körperschaftsteuer. Ihre Mitarbeitenden versteuern ihr Gehalt wie üblich.',
    taxBranch: 'Gewinne der Zweigniederlassung werden mit 17 % besteuert. Sie kann die Start-up Tax Exemption nicht nutzen, und da die Zweigniederlassung einer ausländischen Gesellschaft meist nicht in Singapur steuerlich ansässig ist, kann sie die Doppelbesteuerungsabkommen Singapurs in der Regel nicht aus eigenem Recht nutzen.',
    taxHolding: 'Reine Beteiligungsgesellschaften sind von der Start-up Tax Exemption ausgeschlossen. Stattdessen gilt die Partial Tax Exemption: 75 % der ersten 10.000 S$ und 50 % der nächsten 190.000 S$ des steuerpflichtigen Einkommens sind befreit.',
    taxFounder: 'Eine neue Gesellschaft im Besitz natürlicher Personen erhält in der Regel die Start-up Tax Exemption für ihre ersten drei Veranlagungsjahre: 75 % der ersten 100.000 S$ und 50 % der nächsten 100.000 S$ des steuerpflichtigen Einkommens sind befreit.',
    taxCorp: 'Die Start-up Tax Exemption setzt voraus, dass mindestens eine natürliche Person 10 % oder mehr der Anteile hält. Eine Tochter, die allein der Muttergesellschaft gehört, erfüllt das meist nicht. Stattdessen gilt die Partial Tax Exemption: 75 % der ersten 10.000 S$ und 50 % der nächsten 190.000 S$ des steuerpflichtigen Einkommens sind befreit.',
    taxResidency: 'Die steuerliche Ansässigkeit richtet sich danach, wo das Board seine Entscheidungen trifft. Entscheiden Ihre Directors vom Ausland aus, ist die Gesellschaft womöglich nicht in Singapur ansässig. Dann entfällt die Start-up Tax Exemption, und der Zugang zu Doppelbesteuerungsabkommen ist eingeschränkt. Planen Sie, wo die Board-Sitzungen stattfinden.',
    treaty: 'Singapur hat ein umfassendes Doppelbesteuerungsabkommen mit {country}, das die Quellensteuer auf Dividenden, Zinsen und Lizenzgebühren senken kann, sofern die Gesellschaft in Singapur steuerlich ansässig ist.',
    treatyUs: 'Singapur hat kein umfassendes Doppelbesteuerungsabkommen mit den Vereinigten Staaten. Planen Sie Dividenden und Dienstleistungsvergütungen daher zusammen mit US-Steuerberatung.',
    treatyOther: 'Singapur hat rund 100 Doppelbesteuerungsabkommen. Welches für Sie gilt, prüfen wir im Erstgespräch.',

    ctaHeading: 'Besprechen Sie Ihren Plan mit einem erfahrenen Berater',
    ctaMany: 'Ihr Setup erfordert {items}, so abgestimmt, dass jeder Schritt den nächsten ermöglicht. Genau solche Mandate betreuen wir von Anfang bis Ende.',
    ctaOne: 'Ihr Setup erfordert neben der Gesellschaft selbst {item}. Ein erfahrener Berater bestätigt die Reihenfolge und nennt Ihnen einen Festpreis.',
    ctaNone: 'Ihr Setup ist überschaubar. Ein kurzes Gespräch klärt die Details, und Sie erhalten ein Festpreisangebot.',
    and: 'und',
    ctaDirector: 'einen ansässigen Director',
    ctaEp: 'einen Employment Pass',
    german: 'Wir beraten Sie auf Deutsch und Englisch.',
    book: 'Erstgespräch vereinbaren',
    writeTo: 'Oder schreiben Sie an',
    needs: {
      incorp: 'Gründung',
      branch: 'Registrierung der Zweigniederlassung',
      ro: 'Repräsentanz',
      secretary: 'Company Secretary',
      nominee: 'Nominee Director',
      nomineeInterim: 'Interims-Nominee-Director',
      ep: 'Employment Pass',
      payroll: 'Lohnabrechnung und CPF',
      accounting: 'Buchhaltung und Steuern',
      gst: 'GST-Registrierung',
      structuring: 'Strukturberatung',
    },
    disclaimer:
      'Dieser Planer bietet allgemeine Orientierung für Ihre Planung. Er ist keine Rechts- oder Steuerberatung und deckt nicht jedes Programm, jede Lizenz und jede Ausnahme ab. Ob ein Pass, eine Lizenz oder eine Registrierung erteilt wird, entscheidet die jeweilige Behörde.',
    sources: 'Regeln und Gebühren geprüft im September 2026 anhand der veröffentlichten Leitfäden von ACRA, Enterprise Singapore, IRAS und dem Ministry of Manpower (MOM).',
  },
  lead: {
    heading: 'Lassen Sie Ihren Plan von einem erfahrenen Berater prüfen',
    body: 'Senden Sie uns Ihren Plan. Ein erfahrener Berater antwortet in der Regel innerhalb eines Werktags mit Anmerkungen zu Ihrer Situation und einem Festpreisangebot. Ihre Antworten werden mitgesendet, Sie müssen nichts wiederholen.',
    firstName: 'Vorname',
    firstNameError: 'Bitte geben Sie Ihren Vornamen an.',
    lastName: 'Nachname',
    lastNameError: 'Bitte geben Sie Ihren Nachnamen an.',
    company: 'Unternehmen',
    companyError: 'Bitte geben Sie Ihr Unternehmen an.',
    email: 'Geschäftliche E-Mail',
    emailError: 'Bitte geben Sie eine gültige E-Mail-Adresse an.',
    country: 'Land',
    countryError: 'Bitte geben Sie Ihr Land an.',
    note: 'Möchten Sie uns noch etwas mitteilen?',
    optional: 'optional',
    consent: 'Ich willige ein, dass Meridium die personenbezogenen Daten in diesem Formular zusammen mit meinen Antworten im Planer erhebt und verwendet, um meinen Plan zu prüfen und mir zu antworten.',
    consentError: 'Ihre Einwilligung ist nötig, damit wir Ihnen antworten können.',
    policyPre: 'Wie wir mit personenbezogenen Daten umgehen, beschreibt unsere',
    policyLink: 'Datenschutzrichtlinie',
    sensitive: 'Bitte geben Sie keine Ausweis-, Pass- oder Finanzdaten an. Solche Angaben erfragen wir nach Mandatsbeginn über einen sicheren Kanal.',
    send: 'Plan senden',
    busy: 'Ihr Plan wird gesendet.',
    successTitle: 'Vielen Dank. Ihr Plan wurde gesendet.',
    successBody: 'Ein erfahrener Berater antwortet Ihnen von {email}, in der Regel innerhalb eines Werktags.',
    errorTitle: 'Ihr Plan konnte nicht gesendet werden.',
    errorPre: 'Bitte schreiben Sie stattdessen an',
    errorPost: 'oder versuchen Sie es gleich noch einmal.',
  },
  explainer: {
    eyebrow: 'Strukturen im Vergleich',
    heading: 'Tochtergesellschaft, Zweigniederlassung oder Repräsentanz?',
    intro:
      'Ausländische Unternehmen haben drei Wege, sich in Singapur niederzulassen. Die meisten wählen eine Private Limited Company, doch auch die anderen beiden haben ihren Platz. Der Planer oben wägt diese Unterschiede für Sie ab.',
    cols: ['', 'Private Limited Company', 'Zweigniederlassung', 'Repräsentanz'],
    rows: [
      ['Rechtsform', 'Eigene singapurische Gesellschaft', 'Teil der ausländischen Mutter', 'Keine eigene Rechtspersönlichkeit'],
      ['Verträge und Umsatz', 'Ja', 'Ja', 'Nein'],
      ['Haftung', 'Auf das eingesetzte Kapital beschränkt', 'Mutter haftet voll', 'Liegt bei der Mutter'],
      ['Ansässige Organperson', 'Mindestens ein ansässiger Director', 'Mindestens ein ansässiger Authorised Representative', 'Nicht erforderlich; weniger als fünf Mitarbeitende'],
      ['Start-up Tax Exemption', 'Möglich, wenn die Gesellschafterbedingungen erfüllt sind', 'Nicht möglich', 'Nicht anwendbar'],
      ['Registriert bei', 'ACRA', 'ACRA', 'Enterprise Singapore'],
      ['Dauer', 'Unbefristet', 'Unbefristet', 'Jeweils ein Jahr, höchstens drei Jahre'],
      ['Behördengebühr', '315 S$', '315 S$', '200 S$ pro Jahr'],
    ],
  },
  faqHeading: 'Häufige Fragen',
  faqs: [
    {
      q: 'Darf ein ausländisches Unternehmen 100 Prozent einer singapurischen Gesellschaft halten?',
      a: 'Ja. Singapur beschränkt ausländische Beteiligungen an einer Private Limited Company nicht. Die Ansässigkeitspflicht gilt für Directors: Mindestens ein Director muss seinen gewöhnlichen Aufenthalt in Singapur haben. Fehlt eine geeignete Person, übernimmt ein Nominee Director diese Rolle.',
    },
    {
      q: 'Was unterscheidet eine Tochtergesellschaft von einer Zweigniederlassung in Singapur?',
      a: 'Eine Tochtergesellschaft ist eine eigene singapurische Gesellschaft: Die Haftung bleibt in Singapur, sie kann in Singapur steuerlich ansässig sein und Steuerbefreiungen nutzen. Eine Zweigniederlassung ist Teil der ausländischen Mutter: Die Mutter haftet voll für ihre Schulden, die Zweigniederlassung ist meist nicht steuerlich ansässig und kann die Start-up Tax Exemption nicht nutzen.',
    },
    {
      q: 'Wann ist eine Repräsentanz sinnvoll?',
      a: 'Wenn Sie für Marktforschung und Kontaktpflege vor Ort sein möchten, ohne Geschäfte zu machen. Eine Repräsentanz darf keine Verträge schließen und keinen Umsatz erzielen. Sie wird bei Enterprise Singapore für jeweils ein Jahr registriert, höchstens drei Jahre, und die Mutter braucht einen Umsatz von über 250.000 US$ sowie mindestens drei Jahre Geschäftstätigkeit.',
    },
    {
      q: 'Kann ich als Director meiner neuen Gesellschaft nach Singapur umziehen?',
      a: 'Ja, mit einem Employment Pass, den die singapurische Gesellschaft beantragt. Da die Gesellschaft dafür bereits existieren muss und für ihre Gründung einen ansässigen Director braucht, bestellen die meisten Gründer einen Interims-Nominee-Director, der zurücktritt, sobald der Pass erteilt ist.',
    },
    {
      q: 'Erhält eine singapurische Tochtergesellschaft die Start-up Tax Exemption?',
      a: 'Meist nicht, wenn sie vollständig einer ausländischen Gesellschaft gehört. Die Befreiung setzt voraus, dass mindestens eine natürliche Person 10 Prozent oder mehr der Anteile hält. Tochtergesellschaften, die allein einer Muttergesellschaft gehören, erhalten stattdessen die Partial Tax Exemption.',
    },
  ],
};

export const planner: Record<PlannerLang, PlannerCopy> = { en, de };
