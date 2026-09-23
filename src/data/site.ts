// Firm-level facts.
const addressLines = ['143 Cecil Street, #09-01 GB Building', 'Singapore 069542'] as const;

// The Meridium HubSpot account. Both the contact form and the newsletter
// popup submit to forms in this portal.
const hubspotPortalId = '247165002';

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
  // Resources page (src/pages/resources.astro). The compliance calendar is a
  // gated PDF hosted on the HubSpot content domain resources.meridium.sg; the
  // UTM parameters mark visits that come from the website, as distinct from
  // the LinkedIn campaign link, in HubSpot's traffic analytics.
  resources: {
    complianceCalendarHref:
      'https://resources.meridium.sg/en/singapore-compliance-calendar?utm_source=meridium.sg&utm_medium=website&utm_campaign=compliance-calendar',
    // Gated PDF guide "Singapore for HR and Payroll Professionals" on the same
    // HubSpot content domain (HubSpot form "HR and payroll guide download (meridium.sg)").
    hrPayrollGuideHref:
      'https://resources.meridium.sg/en/singapore-hr-payroll-guide?utm_source=meridium.sg&utm_medium=website&utm_campaign=hr-payroll-guide',
    irasRatesHref:
      'https://www.iras.gov.sg/taxes/individual-income-tax/basics-of-individual-income-tax/tax-residency-and-tax-rates/individual-income-tax-rates',
  },
  defaultDescription:
    'Licensed Singapore corporate services firm for foreign companies entering Asia: incorporation, compliance, tax and expansion, delivered by senior advisers.',
  // Contact form (src/components/ContactForm.astro). Submissions go straight
  // from the visitor's browser to HubSpot's Forms API, so every enquiry
  // becomes a HubSpot contact and HubSpot notifies the team; no HubSpot
  // script or cookie runs on the site. One form serves both languages; the
  // submission's conversion page (meridium.sg/contact/ or /de/contact/) shows
  // which language the visitor used. HubSpot rejects submissions that carry
  // fields the form does not have, so the HubSpot form must contain exactly
  // these contact properties: firstname, lastname, email, company, country,
  // the property named in serviceProperty, and message. Find the form ID in
  // the editor URL under Marketing > Forms. reCAPTCHA must stay off: HubSpot's
  // API does not accept submissions to reCAPTCHA-protected forms. If formId
  // is ever emptied, the form shows its error state with the mailto fallback.
  contact: {
    portalId: hubspotPortalId,
    formId: '4e60a667-2073-42b6-b63e-a98e42a1c527', // Website contact form (meridium.sg)
    // Internal name of the custom single-line text contact property that
    // stores the service the visitor selected (English title on both
    // language versions of the site).
    serviceProperty: 'service_of_interest',
  },
  // Newsletter sign-up (src/components/NewsletterPopup.astro). Same
  // direct-to-HubSpot approach as the contact form. One HubSpot form and one
  // subscription type per language, so English and German subscribers are
  // kept apart and each welcome email and newsletter goes only to its own
  // list. Find the IDs in HubSpot under Marketing > Forms (form ID in the
  // editor URL) and Settings > Marketing > Email > Subscription Types.
  // reCAPTCHA must stay off on both forms.
  newsletter: {
    portalId: hubspotPortalId,
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

