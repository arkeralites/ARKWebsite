# ARK Website — Project Handover Guide

This document is the long-form handover guide for future ARK committee members and website maintainers.

Use it for:

- yearly committee handover
- Google Drive / Google Docs copy for non-technical maintainers
- keeping access, maintenance steps, and ownership details in one place

---

## 1. What this project is

The ARK website is the official website for:

- **ARK — Association of Rogaland Keralites**
- live website: **https://kerala.no**

The site is designed so that most routine content updates can be done without writing code.

Main purposes of the site:

- present ARK publicly
- list upcoming and past events
- show photo galleries from ARK gatherings
- help newcomers in Rogaland
- provide committee and contact details
- give visitors a simple way to reach ARK by email and social media

---

## 2. Quick project snapshot

| Item | Current value |
|---|---|
| Live website | `https://kerala.no` |
| GitHub repository | `https://github.com/arkeralites/ARKWebsite` |
| Framework | Next.js 16 |
| Language | TypeScript |
| Hosting | Vercel |
| Events source | Markdown files in `content/events/` |
| Gallery photos | `public/images/events/` |
| Contact system | `mailto:` email buttons |
| Languages | English (`en`) and Norwegian (`no`) |

---

## 3. Most common maintenance tasks

These are the most common non-technical tasks:

1. add or edit an event in `content/events/`
2. upload gallery photos to `public/images/events/`
3. update email / social links in `src/lib/metadata.ts`
4. confirm the site deployed after a change

If you are unsure, stay within those files and ask a developer before changing code under `src/app/` or `src/components/`.

---

## 4. Safe places to update

### Usually safe for committee maintenance

- `content/events/` — event files
- `public/images/events/` — gallery photos
- `src/lib/metadata.ts` — contact and social links
- `src/lib/committee.ts` — committee names and roles
- `src/lib/messages/en.ts` — English text
- `src/lib/messages/no.ts` — Norwegian text
- `docs/` — handover and maintenance documentation

### Usually developer-only

- `src/app/`
- `src/components/`
- `src/lib/events.ts`
- `src/lib/i18n.ts`
- `src/lib/i18n-server.ts`
- `next.config.mjs`
- `package.json`
- `eslint.config.mjs`
- `tailwind.config.ts`
- generated files such as `public/sitemap.xml`, `public/sitemap-0.xml`, and `public/robots.txt`

---

## 5. How to add or edit events

Events are stored as Markdown files in:

- `content/events/`

Each event file contains:

- `title`
- `date`
- `month`
- `venue`
- `category`
- `featured`
- `excerpt`
- full event content below the frontmatter

Reusable starter template:

- `docs/templates/event-template.md`

### Event filename format

Use lowercase letters and hyphens only.

Example:

- `onam-2026.md`
- `vishu-2027.md`

### Event categories currently used

- `Festival`
- `Family`
- `Celebration`
- `Cultural`
- `Community`

### Important behavior

- event dates decide whether an event is shown as upcoming or past
- each Markdown file becomes its own page under `/events/[slug]`
- homepage and events page content update automatically from these files

### Event writing guidance

- use clear headings and short paragraphs
- include practical information naturally in the main event description if needed
- avoid adding a separate `## Practical Details` section unless the site design is intentionally changed to support it again

---

## 6. How to maintain the photo gallery

Gallery photos are stored in grouped folders under:

- `public/images/events/`

Current gallery folders:

- `public/images/events/onam/`
- `public/images/events/christmas-diwali/`
- `public/images/events/easter-vishu-eid/`
- `public/images/events/other-activities/`

### Which photos go where

- Onam photos → `public/images/events/onam/`
- Christmas / Diwali photos → `public/images/events/christmas-diwali/`
- Easter / Vishu / Eid photos → `public/images/events/easter-vishu-eid/`
- Other ARK activities → `public/images/events/other-activities/`

### Supported gallery formats

Only these file types appear in the gallery:

- `.jpg`
- `.jpeg`
- `.png`
- `.webp`
- `.avif`

### Important gallery notes

- **Videos are ignored** right now, including `.mov` and `.mp4`
- a gallery category appears on `/events` only if the folder exists and contains at least one supported image
- if a folder contains only videos or unsupported file types, that category will not appear
- photos should be compressed to web-friendly sizes before upload whenever possible

### How visitors see the gallery

- `/events` shows category cards such as Onam Gatherings and Christmas/Diwali Gatherings
- clicking a category opens `/events/gallery/[category]`
- images open in the browser when clicked

---

## 7. Contact details and social links

These are stored in:

- `src/lib/metadata.ts`

This file controls:

- ARK email address
- location text
- organisation number
- Facebook group link
- Instagram link
- WhatsApp contact/join link
- YouTube link
- site URL and icon paths

Update only the obvious content values unless a developer asks for more.

---

## 8. Committee names and website text

### Committee data

Committee names and roles live in:

- `src/lib/committee.ts`

### Website text

Website text lives in:

- `src/lib/messages/en.ts`
- `src/lib/messages/no.ts`

This includes:

- navigation labels
- page hero text
- section intros
- committee notes
- event gallery labels
- footer text

---

## 9. Deployment and release notes

The project is hosted on **Vercel** and production deploys automatically after repository changes.

Additional deployment notes are documented in:

- `docs/deployment-handover.md`

### Important verification note

The separate deployment handover file currently describes a **GitHub Actions** deployment flow.

However, this repo checkout should be verified during handover to confirm the current real setup, including:

- whether GitHub Actions is still the active production deployment path
- whether the necessary Vercel secrets still exist
- whether Vercel is instead using direct Git integration

Do not assume the deployment path without checking the actual ARK accounts.

---

## 10. Access and ownership

Keep this section updated during every committee transition.

| Service | Current ownership / note |
|---|---|
| GitHub | `arkeralites` organization / repository owner |
| Vercel | ARK-owned project |
| Domain | `kerala.no` under ARK-controlled registrar account |
| Shared email | `arkeralites@gmail.com` |
| Google Drive / Docs | should remain under ARK-controlled access |

### Recommended access policy

At least 2 trusted current office bearers or web admins should have access to:

- GitHub repository administration
- Vercel project access
- domain / DNS account
- shared documentation / password manager entries

---

## 11. Yearly handover checklist

When committee responsibilities change:

- confirm who owns the GitHub repository
- confirm who owns the Vercel project
- confirm who controls the domain and DNS
- confirm who controls `arkeralites@gmail.com`
- verify deployment still works with a small safe content change
- verify event editing still works
- verify gallery images still appear on `/events`
- remove access for people who are no longer maintaining the site
- add access for new maintainers
- update this handover document and `README.md` if workflows changed

---

## 12. If something goes wrong

| Problem | What to check |
|---|---|
| Event not appearing | date format, filename, and Markdown frontmatter |
| Gallery category not appearing | folder name, supported image formats, and whether at least one valid image exists |
| Gallery photos missing | confirm files are in the correct folder and committed to the repo |
| Contact button wrong | `src/lib/metadata.ts` email value |
| Site not updating | check deployment status in Vercel and verify deployment flow |
| Domain issue | check DNS / domain registrar access |

---

## 13. Recommended handover practice

For each new committee:

1. keep this file in the repository
2. copy this file into Google Drive / Google Docs for non-technical handover
3. update access details once per year
4. keep `README.md` short and technical, and keep long-form process notes here

