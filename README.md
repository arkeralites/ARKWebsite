# ARK Website — Association of Rogaland Keralites

This is the website for **ARK (Association of Rogaland Keralites)**, hosted at [kerala.no](https://kerala.no).

Built with **Next.js 16**, **React 19**, **TypeScript**, and **Tailwind CSS**.

## Documentation

For day-to-day and handover guidance, use these files:

- `docs/project-handover.md` — committee-facing maintenance and yearly handover guide
- `docs/deployment-handover.md` — deployment ownership and Vercel handover notes

Use this `README.md` as the **short repo guide**.

---

## Most common maintenance tasks

The most common content updates are:

1. add or edit an event in `content/events/`
2. upload gallery photos to `public/images/events/`
3. update contact details or social links in `src/lib/metadata.ts`

If you are a non-technical maintainer, stay within those files unless a developer asks you to do more.

---

## Safe files for routine updates

Usually safe for committee/content maintenance:

- `content/events/`
- `public/images/events/`
- `src/lib/metadata.ts`
- `src/lib/committee.ts`
- `src/lib/messages/en.ts`
- `src/lib/messages/no.ts`
- `docs/`

Usually developer-only:

- `src/app/`
- `src/components/`
- `src/lib/events.ts`
- `next.config.mjs`
- `package.json`
- `eslint.config.mjs`
- `tailwind.config.ts`
- generated files such as `public/sitemap.xml`, `public/sitemap-0.xml`, and `public/robots.txt`

---

## Events

Event files live in:

- `content/events/`

Each event is a Markdown file with frontmatter such as:

```md
---
title: "Your Event Title"
date: "2027-04-14"
month: "April 2027"
venue: "Venue Name, City"
category: "Festival"
featured: true
excerpt: "A short one-line description shown on the events list."
---
```

Reusable starter template:

- `docs/templates/event-template.md`

Use lowercase filenames with hyphens, for example:

- `onam-2026.md`
- `vishu-2027.md`

Supported event categories:

- `Festival`
- `Family`
- `Celebration`
- `Cultural`
- `Community`

When writing the event body:

- use simple headings and short paragraphs
- include practical information naturally in the main description if needed
- avoid adding a separate `## Practical Details` section unless a developer specifically wants that layout back

---

## Event gallery

Gallery photos live in:

- `public/images/events/onam/`
- `public/images/events/christmas-diwali/`
- `public/images/events/easter-vishu-eid/`
- `public/images/events/other-activities/`

Supported gallery image formats:

- `.jpg`
- `.jpeg`
- `.png`
- `.webp`
- `.avif`

> [!NOTE]
> - Only supported image files are shown in the gallery.
> - **Videos are ignored**, including `.mov` and `.mp4` files.
> - A gallery category appears on `/events` only if its folder exists and contains at least one supported image.
> - If a folder contains only videos or unsupported file types, that category will not appear.
> - Use compressed, web-friendly images whenever possible.

---

## Contact and social links

Contact details and social links are stored in:

- `src/lib/metadata.ts`

If you need to update the ARK email, organisation number, or social links, this is the main file to edit.

---

## Local development

```bash
npm install
npm run dev
npm run lint
npm run build
npm run start
```

- `npm run dev` — run locally at `http://localhost:3000`
- `npm run lint` — run ESLint
- `npm run build` — production build and sitemap generation
- `npm run start` — run the built app locally

---

## Technical overview

- **Framework:** Next.js 16 App Router
- **UI:** React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Content:** Markdown via `gray-matter` and `next-mdx-remote`
- **Sitemap:** `next-sitemap`
- **Hosting:** Vercel

---

## Deployment note

Deployment ownership and yearly access notes are documented in:

- `docs/deployment-handover.md`

If the production deployment path changes in the future, update both handover docs rather than expanding this README again.
