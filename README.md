# ARK Website — Association of Rogaland Keralites

The website for **ARK (Association of Rogaland Keralites)**, live at [kerala.no](https://kerala.no).

Built with **Next.js 16**, **React 19**, **TypeScript**, and **Tailwind CSS**.

## Documentation

| File | Audience |
|---|---|
| `docs/project-handover.md` | **Start here.** Committee maintenance and yearly handover — written for non-developers |
| `docs/deployment-handover.md` | Deployment ownership, secrets, and Vercel handover |
| `CLAUDE.md` | Context for AI coding assistants and new developers |

This `README.md` is the **short repo guide**. If you have never worked on this
project before and you are not a developer, read `docs/project-handover.md`
instead — it explains how to make changes entirely from the GitHub website,
without installing anything.

---

## Most common maintenance tasks

1. add or edit an event in `content/events/`
2. upload gallery photos to `public/images/events/`
3. update contact details or social links in `src/lib/metadata.ts`
4. update committee names in `src/lib/committee.ts`
5. change page wording in `src/lib/messages/`

If you are a non-technical maintainer, stay within those files unless a developer
asks you to do more.

---

## Safe files for routine updates

Usually safe for committee/content maintenance:

- `content/events/`
- `public/images/events/`
- `src/lib/metadata.ts`
- `src/lib/committee.ts`
- `src/lib/messages/en.ts`, `no.ts`, `ml.ts`
- `docs/`

Usually developer-only:

- `src/app/`
- `src/components/`
- `src/lib/events.ts`
- `src/lib/i18n.ts`, `src/lib/i18n-server.ts`
- `next.config.mjs`
- `next-sitemap.config.js`
- `package.json`
- `eslint.config.mjs`
- `tailwind.config.ts`
- `.github/workflows/`
- generated files such as `public/sitemap.xml`, `public/sitemap-0.xml`, and `public/robots.txt`

---

## Events

Event files live in `content/events/`. Each event is a Markdown file whose
filename becomes its URL:

```md
---
title: "Your Event Title"
date: "2027-04-14"
venue: "Venue Name, City"
category: "Festival"
featured: true
excerpt: "A short one-line description shown on the events list."
---
```

Reusable starter template: `docs/templates/event-template.md` — safe to copy
verbatim into `content/events/`.

Use lowercase filenames with hyphens, for example `onam-2027.md`.

Supported categories: `Festival`, `Family`, `Celebration`, `Cultural`, `Community`.

> [!IMPORTANT]
> `date` must be `YYYY-MM-DD` in quotes. A malformed or impossible date **fails
> the build on purpose**, naming the offending file, rather than publishing the
> text "Invalid Date" to visitors.
>
> There is **no `month` field** — the month label is derived from `date`.

When writing the event body, use simple headings and short paragraphs. Event
bodies are English-only in all three languages.

---

## Event gallery

Gallery photos live in:

- `public/images/events/onam/`
- `public/images/events/christmas-diwali/`
- `public/images/events/easter-vishu-eid/`
- `public/images/events/other-activities/`

Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`

> [!NOTE]
> - **Videos are ignored**, including `.mov` and `.mp4`.
> - A gallery category appears on `/events` only if its folder exists and
>   contains at least one supported image.
> - A file named `cover`, `thumbnail`, or `thumb` is used as the category cover.
> - Compress photos before uploading — target under 500 KB each. `public/images/`
>   is already ~79 MB.

---

## Contact and social links

Stored in `src/lib/metadata.ts` — the ARK email, organisation number, location,
and all social URLs. Every "Email us" button on the site reads the email from
here, so change it in one place.

---

## Website text and languages

Three languages, in `src/lib/messages/`:

- `en.ts` — English, the source of truth
- `no.ts` — Norwegian, **enforced complete** by TypeScript
- `ml.ts` — Malayalam, **enforced complete** by TypeScript

Adding a key to `en.ts` without adding it to `no.ts` and `ml.ts` is a type error,
so no language can silently fall back to English.

Message values are **plain text, not Markdown** — `**bold**` renders as literal
asterisks.

### Which language a visitor sees

No `/en` or `/no` URLs. Each request picks the language from:

1. the `ark-locale` cookie, if the visitor chose a language in the switcher
2. otherwise their device/browser language (`Accept-Language`) — a phone set to
   Malayalam gets Malayalam on the first visit
3. otherwise English

---

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint     # ESLint
npx tsc --noEmit # type check
npm run build    # production build + sitemap generation
npm run start    # run the built app locally
```

All three of `npm run lint`, `npx tsc --noEmit`, and `npm run build` must pass
before a change can be merged — `.github/workflows/ci.yml` runs exactly those on
every pull request.

---

## Technical overview

- **Framework:** Next.js 16 App Router (all routes dynamically rendered — see `CLAUDE.md`)
- **UI:** React 19
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS
- **Content:** Markdown via `gray-matter` and `next-mdx-remote`
- **Sitemap:** `next-sitemap` (runs on `postbuild`)
- **Analytics:** Vercel Analytics and Speed Insights
- **Hosting:** Vercel

---

## Deployment

Merging to `main` publishes to production. Ownership, secrets, and the active
deployment path are documented in `docs/deployment-handover.md`. If the
deployment path changes, update that file and section 10 of
`docs/project-handover.md` rather than expanding this README.
