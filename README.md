# Meridium Management Consultants website

Production website for Meridium Management Consultants Pte. Ltd., a Singapore corporate
services firm. Built with Astro 5 and Tailwind CSS 4, fully static, no CMS.

All three build phases are complete: homepage, eight service pages, About, contact form,
data protection policy, terms of use, SEO plumbing and deploy configuration. Items still
marked TODO in the interface are deliberate flags for facts only the firm can confirm;
they are listed at the bottom of this file.

## Run locally

Requires Node.js 20 or newer. This machine has Node 22 installed at `~/.local/opt/node22`.
Add it to your PATH once:

```
echo 'export PATH="$HOME/.local/opt/node22/bin:$PATH"' >> ~/.zshrc && source ~/.zshrc
```

Then, from the project folder:

```
npm install
npm run dev        # local preview at http://localhost:4321
npm run build      # static production build into dist/
npm run preview    # serve the production build locally
npm run check      # type-check the templates and content
```

## Edit copy without touching components

- **Service pages**: `src/content/services/en/*.md` (English) and
  `src/content/services/de/*.md` (German), one file per service and language. The
  frontmatter holds the structured sections (card copy, headline, intro, what's included,
  process, needs, FAQs); the markdown body below it is the long-form narrative. The
  homepage grid, header dropdown, footer and contact form select all read from these
  same files. Keep both languages in step when editing.
- **Languages**: English lives at `/`, German at `/de/`. Shared interface strings
  (navigation, footer, form labels, buttons) live in `src/data/i18n.ts`. The flag
  switcher in the header links between the two versions of the current page. The data
  protection policy and terms are maintained in English; the German pages carry a notice
  that the English version governs.
- **Firm facts** (legal name, UEN, licence number, address, email, booking link):
  `src/data/site.ts`. TODO values render with a visible amber flag until replaced.
- **Team members**: `src/data/team.ts`. Add one object per person; a missing photo or bio
  renders a visible TODO placeholder.
- **Homepage sections** (differentiators, engagement steps, regions): the arrays at the
  top of `src/pages/index.astro`.
- **Data protection policy**: `src/policies/data-protection-policy.md`.
- **Photos**: `src/assets/`. Replace a file and rebuild; Astro regenerates the optimised
  responsive variants.

House rules encoded in the copy: no em-dashes, no exclamation marks, British or Singapore
English spelling, no invented statistics or testimonials, no guarantees of regulatory
outcomes or processing times. Work pass figures cite mom.gov.sg in comments next to the
copy; re-verify them at each MOM revision.

## Book a call (Calendly)

Every "Book a call" button (header, homepage hero, service pages, CTA band and the
alternative button on the contact form) links to the Calendly event "Call with Meridium"
at `https://calendly.com/enquiries-meridium/30min` and opens it in a new tab. The link is
`site.bookingHref` in `src/data/site.ts`. No Calendly script or cookie is loaded on the
site; the booking page runs entirely on calendly.com.

Change the event's length, availability, video link or booking questions in Calendly
under the enquiries@meridium.sg account; nothing on the site needs to change for that.
Only edit `bookingHref` if the event URL itself changes (for example a renamed event
slug or a new event type).

## Contact form (HubSpot)

`src/components/ContactForm.astro` submits straight from the visitor's browser to
HubSpot's Forms API, the same way the newsletter popup does. Every enquiry creates or
updates a HubSpot contact (first name, last name, email, company, country, service of
interest, message) with the consent text recorded, and HubSpot notifies the team. No
HubSpot script, tracking or cookie is loaded on the site, and no build secret is needed.

One HubSpot form serves both languages. The service select always sends the English
service title, so the CRM property stays uniform; the submission's conversion page
(`/contact/` or `/de/contact/`) shows which language the visitor used.

The HubSpot side is already set up (September 2026): a custom contact property "Service
of interest" (`service_of_interest`, single-line text) and the form "Website contact form
(meridium.sg)" with exactly these fields, all required: First name, Last name, Email,
Company name, Country/Region, Service of interest, Message. Submission notifications go
to the users chosen in the form's Options tab; reCAPTCHA is off and must stay off, because
HubSpot's API rejects submissions to reCAPTCHA-protected forms (the site's honeypot and
HubSpot's spam filtering cover the gap). Contacts created by this form are not set as
marketing contacts, so enquiries do not consume the marketing contacts tier; they become
marketing contacts only if they subscribe to the newsletter.

Rules when editing the HubSpot form or this component:

- Keep the field sets identical. HubSpot rejects API submissions whose fields do not
  match the form definition, and submissions missing a required field. To add a field,
  add it to the HubSpot form first, then to the markup and to the `fieldsPayload` list
  in the component's script.
- If the form is ever recreated, set the new ID in `site.contact.formId`
  (`src/data/site.ts`); it is in the form editor's URL. If `formId` is empty the form
  shows its error state on submit, with a mailto fallback.
- The form includes a hidden `botcheck` honeypot; the PDPA consent checkbox is required
  and its wording is sent to HubSpot as the consent-to-process text.

- **Copy** (both languages): `ui.<lang>.form` in `src/data/i18n.ts`.
- **HubSpot identifiers**: `site.contact` in `src/data/site.ts`.

## Newsletter popup (HubSpot)

`src/components/NewsletterPopup.astro` is rendered on every page from `Base.astro`. It
opens after 10 seconds or at 40% scroll depth, never on the contact, data protection or
terms pages, once per visitor per 30 days, and never again after a successful sign-up.
The footer's "Newsletter" link opens it on demand; `meridium.sg/?newsletter` forces it
open for testing on any page.

Submissions go from the visitor's browser straight to HubSpot's Forms API, with both
consents (communications and data processing) recorded against the contact. No HubSpot
script, tracking or cookie is loaded on the site.

There are two newsletters, one per language. English pages submit to the English HubSpot
form and record consent against the "Meridium Newsletter (English)" subscription type;
German pages use the German form and "Meridium Newsletter (Deutsch)". Each form has its
own welcome-email workflow in HubSpot, and each newsletter send goes only to its own
subscription type, so the lists never mix.

- **Copy** (both languages): `ui.<lang>.newsletter` in `src/data/i18n.ts`.
- **HubSpot identifiers** (portal, form and subscription type per language):
  `site.newsletter` in `src/data/site.ts`. Find them in HubSpot under Marketing > Forms
  (the form ID is in the editor URL) and Settings > Marketing > Email > Subscription
  Types.
- **Timing and rules**: the constants at the top of the component's script.
- **reCAPTCHA must stay off** on both HubSpot forms; HubSpot's API rejects submissions to
  reCAPTCHA-protected forms. A honeypot field in the popup and HubSpot's own spam
  filtering cover the gap.
- **Welcome emails**: sent by the workflow attached to each form in HubSpot (the form's
  Automation tab), not by the site.

## Deploy (GitHub Pages)

The repository ships with `.github/workflows/deploy.yml`: every push to `main` builds
the site and publishes it to GitHub Pages. One-time setup after pushing:

1. Create a repository on GitHub and push this folder to its `main` branch.
2. In the repository: Settings > Pages > Build and deployment > Source: **GitHub
   Actions**.
3. Custom domain: Settings > Pages > Custom domain: `meridium.sg` (the repo also
   carries `public/CNAME`), and tick Enforce HTTPS once the certificate is issued.
4. At your DNS provider for meridium.sg, create four A records on the apex pointing to
   GitHub Pages: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`,
   `185.199.111.153`, and a `www` CNAME record pointing to
   `<your-github-username>.github.io`.

DNS changes can take up to a day to propagate; the Pages settings screen shows when the
domain check and certificate are ready.

**Alternatives**: `netlify.toml` is included for Netlify; Cloudflare Pages and Vercel
work with build command `npm run build`, output `dist` and Node 22. No environment
variables are required.

## Parked until the facts exist

1. ACRA registration number under the CSP regime: set `cspLicence` in
   `src/data/site.ts` and restore the licence line in `src/components/Footer.astro`.
2. Team section: intentionally empty for launch (`src/data/team.ts`); portrait files
   remain locally in `src/assets/team/` (gitignored, so nothing personal is in the
   public repository).
3. DPO contact in the data protection policy currently routes to
   enquiries@meridium.sg; change to a dedicated dpo@ mailbox when one exists.
4. Terms and data protection policy: counsel review recommended.
5. A designed reversed (white) logo file to replace the CSS-inverted footer marks.
