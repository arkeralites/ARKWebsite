# ARK Website — Association of Rogaland Keralites

This is the website for **ARK (Association of Rogaland Keralites)**, hosted at [kerala.no](https://kerala.no).

Built with Next.js 16, React 19, TypeScript, and Tailwind CSS. Events are managed as simple text files — no coding required to add or edit events.

This README is split into two parts:

- **Committee / non-technical maintenance** — routine updates like events, contact details, and deployment checks
- **Developer notes** — setup, stack, build, lint, and implementation details

### Who should read which section?

- **Committee members / non-technical maintainers:** read everything under `Committee / non-technical maintenance`
- **Developers / technical maintainers:** read both sections, especially `Developer notes`

---

## ✅ Most common tasks

If you are maintaining the site without coding, these are the 3 tasks you will use most often:

1. **Add or edit an event** in `content/events/`
2. **Update contact details or social links** in `src/lib/metadata.ts`
3. **Wait for automatic deployment** — changes on `main` usually go live within 2–3 minutes

If you are unsure, stay within those files and sections only.

> [!WARNING]
> ## Do not edit these files unless a developer asks you to
>
> Avoid changing these folders and files during normal committee maintenance:
>
> - `src/app/`
> - `src/components/`
> - `next.config.mjs`
> - `package.json`
> - `tailwind.config.ts`
> - `tsconfig.json`
> - `eslint.config.mjs`
> - `.next/`
> - generated files such as `public/sitemap.xml`, `public/sitemap-0.xml`, and `public/robots.txt`

---

## 👥 Committee / non-technical maintenance

### Safe files to update

If you are not a developer, only update these places unless someone specifically asks you to do more:

- `content/events/` — add, edit, or remove events
- `src/lib/metadata.ts` — update contact details and social links

### How to add or edit an event

Events are stored as simple text files in the `content/events/` folder on GitHub.

#### Adding a new event

1. Go to the ARK website repository on GitHub
2. Navigate to the `content/events/` folder
3. Click **"Add file"** → **"Create new file"**
4. Name the file using this format: `event-name-year.md`
   - Example: `vishu-2027.md`
   - Use lowercase letters and hyphens only (no spaces)
5. Copy and paste this template into the file:

```
---
title: "Your Event Title"
date: "2027-04-14"
month: "April 2027"
venue: "Venue Name, City"
category: "Festival"
featured: true
excerpt: "A short one-line description of the event (shown on the events list)."
---

## Event heading

Write your full event description here. You can use:

- **Bold text** with asterisks
- Bullet lists like this one
- [Links](https://example.com) in square brackets

Add as many paragraphs as you like.
```

6. Change the values to match your event:
   - `title` — the full event name
   - `date` — the date in `YYYY-MM-DD` format (e.g., `2027-04-14`)
   - `month` — shown on the event card (e.g., `"April 2027"`)
   - `venue` — location name and city
   - `category` — one of: `Festival`, `Family`, `Celebration`, `Cultural`, `Community`
   - `featured` — `true` to show on homepage, `false` otherwise
   - `excerpt` — a short description (1–2 sentences)
7. Scroll down and click **"Commit new file"**
8. The site will automatically update within 2–3 minutes

#### Editing an existing event

1. Go to `content/events/` on GitHub
2. Click on the event file you want to edit (e.g., `onam-2026.md`)
3. Click the **pencil icon** (Edit this file) in the top right
4. Make your changes
5. Click **"Commit changes"**
6. The site updates automatically

#### Removing a past event

Events from previous years can be left as-is (they appear in the "Past Events" section automatically based on their date) or deleted by:

1. Opening the file on GitHub
2. Clicking the **trash icon** (Delete this file)
3. Committing the deletion

### How to update contact information

Contact details and social links are stored in one place:

- `src/lib/metadata.ts`

To update them on GitHub:

1. Open `src/lib/metadata.ts`
2. Click the **pencil icon** (Edit this file)
3. Update only these sections:
   - `siteConfig.contact` — email, location, organisation number
   - `siteConfig.social` — Facebook, Instagram, YouTube links
4. Click **"Commit changes"**
5. The site updates automatically within 2–3 minutes

Avoid changing anything else in that file unless a developer has asked you to.

### How deployment works

This site uses **automatic deployment** via **GitHub Actions + ARK-owned Vercel credentials**:

1. A change is pushed (or committed directly on GitHub) to the `main` branch
2. GitHub Actions runs the workflow in `.github/workflows/vercel-deploy.yml`
3. That workflow uses ARK's Vercel token and project details stored in GitHub Secrets
4. Vercel builds the site and publishes it to [kerala.no](https://kerala.no) within 2–3 minutes
5. You can monitor deployments at [vercel.com](https://vercel.com) (login details below)

**You do not need to do anything manually** — adding a file on GitHub is still enough.

This setup is important because contributors can keep using their own GitHub accounts, while the deployment remains owned by ARK's Vercel account.

Note: production builds also regenerate the sitemap and `robots.txt` automatically.

### Access and ownership

Keep this section updated with the correct login details.

| Service | Login / Details                                                                                                    |
|---|--------------------------------------------------------------------------------------------------------------------|
| **GitHub** | [github.com/arkeralites/ARKWebsite](https://github.com/arkeralites/ARKWebsite) — owner: `arkeralites`              |
| **Vercel** | [vercel.com](https://vercel.com) — https://vercel.com/arkeralites-projects/ark-website-main — owner: `arkeralites` |
| **Domain Registrar** | *(https://www.one.com/admin/frontpage.do?locale=en)* — domain: kerala.no login with `arkeralites@gmail.com` |
| **Google Account** | arkeralites@gmail.com — *(password kept by committee)*                                                             |

### If something breaks

If the website stops working or something looks wrong:

| Issue | Action |
|---|---|
| Site not loading | Check [vercel.com](https://vercel.com) for deployment errors |
| Event not showing | Make sure the date in the markdown file is correct (YYYY-MM-DD format) |
| Email button not working | Click the visible email address on the contact page, or copy `arkeralites@gmail.com` into your email app manually |
| Domain not resolving | Check domain registrar DNS settings |
| Everything else | *(Add developer contact name and email here)* |

---

## 🛠️ Developer notes

### Contact button implementation

The website now uses a simple **Email ARK** button instead of a contact form service.

When a visitor clicks the button:

1. Their device opens its default email app
2. A new email to `arkeralites@gmail.com` is created automatically
3. They can write their message and send it normally

The button is shown by:

- `src/components/EmailContactCard.tsx`

The email address used by that button comes from:

- `src/lib/metadata.ts` → `siteConfig.contact.email`

If you ever need to change the contact email, update `siteConfig.contact.email` only.

### Technical stack

- **Framework:** Next.js 16 with App Router
- **UI Runtime:** React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Fonts:** Cormorant Garamond (serif) + DM Sans (body) via Google Fonts
- **Events:** Markdown files parsed with gray-matter, rendered with next-mdx-remote
- **Sitemap:** Generated automatically by next-sitemap after each build
- **Hosting:** Vercel (automatic deployment triggered from GitHub Actions)
- **Contact:** Email button using the visitor's default mail app (`mailto:`)

### Local development

```bash
# Install dependencies
npm install

# Run development server (http://localhost:3000)
npm run dev

# Build for production (also regenerates sitemap + robots.txt)
npm run build

# Run the production server locally after building
npm run start

# Check for code issues with ESLint
npm run lint
```

### Notes for developers

- `npm run lint` uses the ESLint CLI (`eslint .`) with the flat config in `eslint.config.mjs`.
- `npm run build` currently runs `next build --webpack` for the most reliable production build on this setup.
- Generated files such as `.next/`, `public/sitemap.xml`, `public/sitemap-0.xml`, and `public/robots.txt` should not be edited manually.
- For free multi-maintainer deployment, ARK owns the Vercel project and a GitHub Actions workflow deploys using ARK-owned Vercel credentials stored as GitHub Secrets. This avoids the Vercel error that says the Git author must have direct project access.
- Setup and yearly handover notes are documented in `docs/deployment-handover.md`.

