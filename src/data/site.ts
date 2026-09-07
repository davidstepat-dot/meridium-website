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
} as const;

