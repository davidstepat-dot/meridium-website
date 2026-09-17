// Firm-level facts.
const addressLines = ['143 Cecil Street, #09-01 GB Building', 'Singapore 069542'] as const;

export const site = {
  legalName: 'Meridium Management Consultants Pte. Ltd.',
  brand: 'Meridium',
  tagline: 'Corporate Services | Singapore',
  url: 'https://meridium.sg',
  email: 'enquiries@meridium.sg',
  uen: '202635066H',
  // ACRA registration number under the CSP regime: add here and restore the
  // footer line in Footer.astro once the number is issued.
  cspLicence: '',
  addressLines,
  registeredAddress: addressLines.join(', '),
  // Calendly event "Call with Meridium" (30 min, Google Meet), owned by the
  // enquiries@meridium.sg Calendly account. Every "Book a call" button on the
  // site links here and opens it in a new tab; no Calendly script or cookie
  // runs on meridium.sg. Edit the event itself (length, hours, questions) in
  // Calendly; only change this value if the event link changes.
  bookingHref: 'https://calendly.com/enquiries-meridium/30min',
  defaultDescription:
    'Licensed Singapore corporate services firm for foreign companies entering Asia: incorporation, compliance, tax and expansion, delivered by senior advisers.',
  // Newsletter sign-up (src/components/NewsletterPopup.astro). Submissions go
  // straight from the visitor's browser to HubSpot's Forms API, so no HubSpot
  // script or cookie runs on the site. One HubSpot form and one subscription
  // type per language, so English and German subscribers are kept apart and
  // each welcome email and newsletter goes only to its own list. Find the IDs
  // in HubSpot under Marketing > Forms (form ID in the editor URL) and
  // Settings > Marketing > Email > Subscription Types. reCAPTCHA must stay off
  // on both forms: HubSpot's API does not accept submissions to
  // reCAPTCHA-protected forms.
  newsletter: {
    portalId: '247165002',
    en: {
      formId: '8da7e77c-43f2-42f8-918a-ba3029476714',
      subscriptionTypeId: 3651514761, // Meridium Newsletter (English)
    },
    de: {
      formId: 'bc0e0bd7-2126-4879-bcd6-98b3bd2229dd',
      subscriptionTypeId: 3652718442, // Meridium Newsletter (Deutsch)
    },
  },
} as const;

