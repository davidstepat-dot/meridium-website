// /llms.txt: a plain-text guide to the site for AI assistants (see llmstxt.org).
// Built from the same service files and firm facts as the rest of the site, so it
// stays in step with the pages. Edit the service markdown or src/data/site.ts,
// not this output.
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { site } from '@/data/site';

export const GET: APIRoute = async () => {
  const all = await getCollection('services', ({ data }) => !data.stub);
  const byOrder = (a: (typeof all)[number], b: (typeof all)[number]) => a.data.order - b.data.order;
  const en = all.filter(({ id }) => id.startsWith('en/')).sort(byOrder);
  const de = all.filter(({ id }) => id.startsWith('de/')).sort(byOrder);
  const slug = (id: string) => id.split('/')[1];

  const lines: string[] = [
    `# ${site.legalName}`,
    '',
    `> ${site.defaultDescription}`,
    '',
    `${site.brand} is a Singapore corporate services firm (UEN ${site.uen}) at ${site.registeredAddress}. ` +
      'It supports foreign companies and founders setting up and running a Singapore entity, and advises on expansion into the wider region. ' +
      'Every client has a named senior contact. The website is available in English and German.',
    '',
    '## Key facts',
    '',
    `- Legal name: ${site.legalName}`,
    `- Brand: ${site.brand} (${site.tagline})`,
    `- Singapore UEN: ${site.uen}`,
    `- Office: ${site.registeredAddress}`,
    `- Enquiries: ${site.email}`,
    `- Book a 30-minute call: ${site.bookingHref}`,
    `- LinkedIn: ${site.linkedin}`,
    '- Languages: English and German',
    '',
    '## Services',
    '',
    ...en.map((s) => `- [${s.data.title}](${site.url}/services/${slug(s.id)}/): ${s.data.outcome}`),
    '',
    '## Frequently asked questions',
    '',
    ...en.flatMap((s) =>
      s.data.faqs.length
        ? [
            `### ${s.data.title}`,
            '',
            ...s.data.faqs.flatMap((f) => [`**${f.q}**`, f.a, '']),
          ]
        : []
    ),
    '## Free resources',
    '',
    `- [Setting up a Singapore subsidiary or regional HQ](${site.url}/singapore-subsidiary/): what Meridium sets up for foreign groups, how it works and common questions`,
    `- [Already operating in Singapore](${site.url}/singapore-operations/): taking over company secretarial, accounting, tax and payroll, and how a change of provider works`,
    `- [Singapore Setup Planner](${site.url}/resources/setup-planner/): seven questions that recommend a Singapore private limited company, branch or representative office, with a typical timeline, checklist, government fees and tax position; includes a comparison of the three structures`,
    `- [Resources](${site.url}/resources/): Singapore compliance calendar, Employment Pass salary calculator and individual income tax calculator`,
    '',
    '## Company',
    '',
    `- [About](${site.url}/about/)`,
    `- [Contact](${site.url}/contact/)`,
    '',
    '## Deutsch',
    '',
    `- [Startseite](${site.url}/de/)`,
    ...de.map((s) => `- [${s.data.title}](${site.url}/de/services/${slug(s.id)}/): ${s.data.outcome}`),
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
