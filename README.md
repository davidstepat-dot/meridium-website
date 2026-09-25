# Meridium Management Consultants website

Source of https://meridium.sg, the website of Meridium Management Consultants Pte. Ltd.,
a Singapore corporate services firm. Built with Astro 5 and Tailwind CSS 4, fully static,
no CMS. Every push to `main` builds the site and publishes it to GitHub Pages under the
custom domain.

The only third-party script is the Google tag (Google Analytics and Google Ads,
`src/components/GoogleTag.astro`), which runs in Google Consent Mode v2 with everything
denied until the visitor clicks Accept in the cookie banner
(`src/components/ConsentBanner.astro`); the measurement ID is `site.googleTag.id` in
`src/data/site.ts`, and emptying it removes both the tag and the banner. If tracking
changes, update section 6.6 of the data protection policy (both languages) first. Apart
from that, the site loads no trackers or cookies. The two things that talk to
outside services (the contact form and the newsletter sign-up) send data from the
visitor's browser directly to HubSpot's Forms API; "Book a call" opens Calendly in a new
tab. Nothing in this repository is secret: the HubSpot portal, form and subscription IDs
are the same public identifiers the browser sends, and no API keys or credentials are
needed to build or deploy.

## Run locally

Requires Node.js 20 or newer. From the project folder:

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
- **Firm facts** (legal name, UEN, licence number, address, email, booking link, HubSpot
  identifiers): `src/data/site.ts`.
- **Team members**: `src/data/team.ts`. The About page shows the team section only when
  this array has entries.
- **Homepage sections** (differentiators, engagement steps, regions): the arrays at the
  top of `src/pages/index.astro`.
- **Resources page** (`/resources/`, `/de/resources/`): copy in `ui.<lang>.resources` in
  `src/data/i18n.ts`; the compliance calendar link (a gated PDF on the HubSpot content
  domain resources.meridium.sg, tagged with website UTM parameters) and the IRAS source
  link in `site.resources` in `src/data/site.ts`. The individual income tax calculator
  (`src/components/TaxCalculator.astro`) runs entirely in the browser and sends nothing
  anywhere. Its resident bands, the non-resident rules (employment income at 15% or the
  resident rates, whichever is higher; director's fees and other income at 24%) and the
  S$80,000 relief cap are hard-coded in that component in two places (template and
  script); re-verify them against IRAS after each Budget and update the "basis" line in
  `i18n.ts` with the year checked.
- **Employment Pass salary calculator** (`src/components/EpSalaryCalculator.astro`, on
  the Resources page at `#ep-salary-calculator`) also runs entirely in the browser and
  sends nothing anywhere. Its copy is in `ui.<lang>.resources.epCalculator`; every figure
  and rule-change date is in `src/data/ep-salary.ts`, with the MOM sources in comments.
  Update that file each August when MOM publishes the next COMPASS C1 salary benchmark
  table (add the new table, move the switch dates) and whenever MOM announces a new EP
  qualifying salary. Sources are cited as plain text; MOM's terms of use ask for
  permission before deep-linking to its pages.
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
HubSpot's Forms API. Every enquiry creates or updates a HubSpot contact (first name, last
name, email, company, country, service of interest, message) with the consent text
recorded as the legal basis, and HubSpot emails the team. One HubSpot form serves both
languages: the service select always sends the English service title, so the CRM
property stays uniform, and the submission's conversion page (`/contact/` or
`/de/contact/`) shows which language the visitor used.

On the HubSpot side (set up September 2026): a custom contact property "Service of
interest" (`service_of_interest`, single-line text) and the form "Website contact form
(meridium.sg)" with exactly these fields, all required: First name, Last name, Email,
Company name, Country/Region, Service of interest, Message. Submission notifications go
to the users chosen in the form's Options tab. Contacts created by this form are not set
as marketing contacts, so enquiries do not consume the marketing contacts tier; they
become marketing contacts only if they subscribe to the newsletter.

Rules when editing the HubSpot form or this component:

- Keep the field sets identical. HubSpot rejects API submissions whose fields do not
  match the form definition, and submissions missing a required field. To add a field,
  add it to the HubSpot form first, then to the markup and to the `fieldsPayload` list
  in the component's script.
- reCAPTCHA must stay off on the HubSpot form; HubSpot's API rejects submissions to
  reCAPTCHA-protected forms. The form's hidden `botcheck` honeypot and HubSpot's own spam
  filtering cover the gap.
- If the form is ever recreated in HubSpot, set the new ID in `site.contact.formId`
  (`src/data/site.ts`); it is in the form editor's URL. With `formId` empty the form
  shows its error state on submit, with a mailto fallback.
- The PDPA consent checkbox is required and its wording is sent to HubSpot as the
  consent-to-process text. Copy for both languages: `ui.<lang>.form` in
  `src/data/i18n.ts`.

## Newsletter popup (HubSpot)

`src/components/NewsletterPopup.astro` is rendered on every page from `Base.astro`. It
opens after 10 seconds or at 40% scroll depth, never on the contact, data protection or
terms pages, once per visitor per 30 days, and never again after a successful sign-up.
The footer's "Newsletter" link opens it on demand; `meridium.sg/?newsletter` forces it
open for testing on any page.

Submissions go from the visitor's browser straight to HubSpot's Forms API, with both
consents (communications and data processing) recorded against the contact.

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
- **reCAPTCHA must stay off** on both newsletter forms, for the same reason as above.
- **Welcome emails**: sent by the workflow attached to each form in HubSpot (the form's
  Automation tab), not by the site.

## Deploy (GitHub Pages)

`.github/workflows/deploy.yml` builds the site and publishes it to GitHub Pages on every
push to `main`; a deploy takes under a minute. The repository is configured with Pages
served from GitHub Actions and the custom domain `meridium.sg` (also in `public/CNAME`),
served over HTTPS. DNS for meridium.sg points the apex at GitHub Pages' four A records
(`185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`) and `www`
at `davidstepat-dot.github.io`. No repository secrets or environment variables are
needed.

To re-run a deploy without a code change: Actions > Deploy to GitHub Pages > Run
workflow.

**Alternatives**: `netlify.toml` is included for Netlify; Cloudflare Pages and Vercel
work with build command `npm run build`, output `dist` and Node 22. No environment
variables are required.
