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
  // Opens the visitor's mail program, per client instruction. Swap for a
  // scheduling link (for example Calendly) if one is adopted later.
  bookingHref: 'mailto:enquiries@meridium.sg?subject=Scoping%20call%20request',
  defaultDescription:
    'Licensed Singapore corporate services firm for foreign companies entering Asia: incorporation, compliance, tax and expansion, delivered by senior advisers.',
  // Newsletter sign-up (src/components/NewsletterPopup.astro). Submissions go
  // straight from the visitor's browser to HubSpot's Forms API, so no HubSpot
  // script or cookie runs on the site. The IDs identify the "Meridium
  // Newsletter" form in HubSpot (Marketing > Forms) and the subscription type
  // the consent is recorded against. reCAPTCHA must stay off on that form:
  // HubSpot's API does not accept submissions to reCAPTCHA-protected forms.
  newsletter: {
    portalId: '247165002',
    formId: '8da7e77c-43f2-42f8-918a-ba3029476714',
    subscriptionTypeId: 3651514761,
  },
} as const;

