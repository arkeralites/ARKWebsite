# ARK Website — Project Handover Guide

This is the main guide for future ARK committee members and website maintainers.

It is written for a committee that may have **no developer at all**. If you can
use Gmail and Google Docs, you can do everything in sections 1 to 8 without
installing anything on your computer.

Use it for:

- the yearly committee handover
- a Google Drive / Google Docs copy for non-technical maintainers
- keeping access, maintenance steps, and ownership details in one place

> [!IMPORTANT]
> **Two things to fill in before this document is trustworthy.** Search this file
> for `TO CONFIRM` — those are the places where only the outgoing maintainer can
> supply the real answer (who owns which account, and how deployment is wired).
> Fill them in during handover, then delete this box.

---

## 1. What this project is

The official website for:

- **ARK — Association of Rogaland Keralites**
- live website: **https://kerala.no**

It exists to present ARK publicly, list upcoming and past events, show photo
galleries from gatherings, help newcomers to Rogaland, and give visitors a simple
way to reach ARK by email and social media.

The site is designed so that **most routine updates need no code and no developer**.

---

## 2. Quick project snapshot

| Item | Current value |
|---|---|
| Live website | `https://kerala.no` |
| GitHub repository | `https://github.com/arkeralites/ARKWebsite` |
| Framework | Next.js 16 (React 19, TypeScript, Tailwind CSS) |
| Hosting | Vercel (free plan) |
| Events source | Markdown files in `content/events/` |
| Gallery photos | `public/images/events/` |
| Contact system | `mailto:` email buttons — no forms, no server, no database |
| Languages | English (`en`), Norwegian (`no`), Malayalam (`ml`) — all complete, auto-selected from the visitor's device language |
| Cost to run | Domain renewal only. Hosting is on the free plan. |

There is no login, no user accounts, no payment handling, and no personal data
stored anywhere in this project. That is deliberate — it keeps ARK's obligations
and running costs at effectively zero.

---

## 3. The five most common jobs

1. Add or edit an event → `content/events/`
2. Upload gallery photos → `public/images/events/`
3. Update the email or social links → `src/lib/metadata.ts`
4. Update committee names after an election → `src/lib/committee.ts`
5. Change wording on a page → `src/lib/messages/en.ts` (and `no.ts`, `ml.ts`)

All five are step-by-step below. If a job is not on this list, ask a developer
before changing anything under `src/app/` or `src/components/`.

---

## 4. Editing the website without installing anything

You can do everything in section 3 from the GitHub website in a browser. **You do
not need to install Node.js, an editor, or anything else.**

You need a free GitHub account, added to the `arkeralites` organisation by a
current maintainer.

### The loop you will always follow

1. Go to `https://github.com/arkeralites/ARKWebsite`.
2. Click into the file you want to change.
3. Click the **pencil icon** (Edit this file), top right.
4. Make your change.
5. Scroll down. Under **Commit changes**, write a short description of what you
   did, for example `Add Onam 2027 event`.
6. Choose **Create a new branch for this commit and start a pull request**, then
   click **Propose changes**, then **Create pull request**.
7. **Wait for the checks.** A yellow dot means still running, a green tick means
   safe, a red X means something is broken. This takes a couple of minutes.
8. Green tick → click **Merge pull request**. Red X → see section 9.
9. Wait 1–2 minutes, then open <https://kerala.no> and confirm your change is live.

> [!TIP]
> Always use a pull request rather than committing straight to `main`. The checks
> in step 7 only protect you if they run *before* the change is merged. While a
> pull request is open and red, the live site is completely unaffected.

### Uploading photos in the browser

1. Navigate to the right folder, for example `public/images/events/onam/`.
2. Click **Add file** → **Upload files**.
3. Drag your photos in.
4. Commit via a pull request exactly as above.

Compress photos first — see section 7.

### Adding a new event in the browser

1. Open `docs/templates/event-template.md` and copy everything in it.
2. Go to `content/events/`, click **Add file** → **Create new file**.
3. Name the file in lowercase with hyphens and `.md` at the end, for example
   `onam-2027.md`.
4. Paste the template, then edit the values. The template's own instructions are
   inside `#` comment lines and never appear on the website, so you can leave
   them or delete them.
5. Commit via a pull request.

---

## 5. Events in detail

Events live in `content/events/`, one Markdown file per event. The filename
becomes the web address: `onam-2027.md` → `https://kerala.no/events/onam-2027`.

The block at the top between the `---` lines is the event's data:

```md
---
title: "Onam 2027"
date: "2027-09-12"
venue: "Lura Bydelshus, Sandnes"
category: "Festival"
featured: true
excerpt: "A short one-line description shown on the events list."
---
```

| Field | Rules |
|---|---|
| `title` | Shown as the page heading |
| `date` | **Must be `YYYY-MM-DD`, in quotes.** See the warning below |
| `venue` | Free text, shown on the card and the event page |
| `category` | One of `Festival`, `Family`, `Celebration`, `Cultural`, `Community` |
| `featured` | `true` puts this event first in the 3 shown on the homepage, even if another event is sooner. Use it for the big one, like Onam |
| `excerpt` | One line, shown on the events list and in link previews |

Below that block, write the event description using simple headings (`##`) and
short paragraphs.

> [!WARNING]
> **The `date` field is the one thing that can fail a build.** If you write
> `14/09/2027`, or a date that does not exist like `2027-02-30`, the checks will
> **fail on purpose** with a message naming your file. That is the safety net
> working: it stops the website from displaying the words "Invalid Date" to
> visitors. Fix the date to `YYYY-MM-DD` and the check turns green.

Other things worth knowing:

- There is **no `month` field**. The month shown on the event card is worked out
  from `date` automatically. Older event files may still contain a `month:` line;
  it is ignored and can be deleted.
- Whether an event shows as upcoming or past is decided by comparing `date` to
  today's date. Nothing needs to be moved or archived by hand.
- Event descriptions are **English only in all three languages.** A Norwegian or
  Malayalam visitor reading an event page will see English. Translating event
  bodies would need a developer.

---

## 6. The photo gallery in detail

Photos live in grouped folders under `public/images/events/`:

| Folder | Used for |
|---|---|
| `onam/` | Onam photos |
| `christmas-diwali/` | Christmas and Diwali photos |
| `easter-vishu-eid/` | Easter, Vishu and Eid photos |
| `other-activities/` | Everything else |

- Supported: `.jpg` `.jpeg` `.png` `.webp` `.avif`
- **Videos are ignored completely**, including `.mov` and `.mp4`. Uploading a
  video does nothing visible — it just makes the repository bigger.
- A gallery category only appears on `/events` if its folder contains at least
  one supported image.
- Visitors see category cards on `/events`; clicking one opens
  `/events/gallery/<category>`, where photos open in a large viewer.
- A file named `cover.jpg`, `thumbnail.jpg`, or `thumb.jpg` is shown first and
  becomes the category's cover image. Otherwise photos are sorted by filename.

---

## 7. Photos: compress before uploading

`public/images/` currently holds about **79 MB**, including single photos up to
**10.8 MB** and a 12 MB `.MOV` video file that the website never displays.

This matters because:

- Vercel's free plan has a monthly limit on image processing. Very large source
  photos consume it faster.
- Every maintainer who downloads the repository downloads all of it.

Before uploading, resize photos to about **2000 pixels** on the long edge and
save as JPEG at around 80% quality. Any free online image compressor or your
phone's "resize when sharing" option is fine. Aim for **under 500 KB per photo**.

---

## 8. Contact details, committee, and website text

### Contact and social links — `src/lib/metadata.ts`

Controls the ARK email address, location text, organisation number, and the
Facebook, Instagram, WhatsApp and YouTube links. Change the value in quotes and
nothing else. The email address here is used automatically by every "Email us"
button across the site.

One exception: the ARK email address is also written inside some page *text* in
`src/lib/messages/en.ts` (the Local page cards). If the address ever changes,
search the whole project for the old address to catch those too.

### Committee members — `src/lib/committee.ts`

Two lists: `executiveMembers` (office bearers) and `generalMembers`. Edit the
`name` and `role` values, add or remove lines. Keep the surrounding punctuation
exactly as it is.

Recognised roles that translate automatically: `Styreleder`, `Nesteleder`,
`Committee Member`. Any other role text is shown as typed in all three languages.

The "ARK Committee 2026/2027" label rolls over automatically each **July**.

### Website text — `src/lib/messages/`

| File | Language |
|---|---|
| `en.ts` | English — the master file |
| `no.ts` | Norwegian |
| `ml.ts` | Malayalam |

These hold navigation labels, page headings, section intros, button labels,
footer text and more.

These hold navigation labels, page headings, section intros, button labels,
footer text and more. **All three languages are complete.**

Three rules:

1. **Only ever change the text inside the quotes.** Leave the key names, commas,
   and brackets alone. A missing comma or quote will fail the checks.
2. **Do not use `**bold**` or any other Markdown here.** These are plain text —
   asterisks will appear literally on the page. This was a real bug on the
   committee page.
3. **Change all three files together.** If you add a new piece of text to
   `en.ts`, you must add it to `no.ts` and `ml.ts` too. This is enforced: the
   checks fail with "Property ... is missing" and name the file, so you cannot
   accidentally ship a half-translated page.

If you genuinely do not have a translation yet, put something reasonable in as a
placeholder and raise an issue — do not remove the key. The enforcement exists
because Malayalam previously used a "fill in what you have" system where missing
text silently appeared in English, and roughly half the site was affected without
anyone noticing.

### Which language does a visitor see?

There are no separate `/english` or `/norsk` web addresses. The site decides per
visitor:

1. **If they picked a language** using the switcher in the menu, that choice is
   remembered for a year (in a cookie called `ark-locale`).
2. **Otherwise their device's own language is used.** A phone or computer set to
   Malayalam sees the site in Malayalam on the very first visit, without touching
   anything. Same for Norwegian, including `nb` and `nn` variants.
3. **Otherwise English**, which is also used for any other language.

A website can only see the languages a visitor has configured for *displaying*
websites. Which keyboards they have installed is not visible to any website — so
"show Malayalam to someone with a Malayalam keyboard" is done, in practice, by
reading their language setting, which is what happens here.

To test it yourself: change your browser's preferred language (Chrome →
Settings → Languages, move Malayalam to the top), then open kerala.no in a
private window. If you have used the switcher before, clear the site's cookies
first, otherwise your saved choice wins — which is correct behaviour.

---

## 9. When a check fails, and how to undo

Every pull request runs three automatic checks: lint, TypeScript, and a full
build of the site.

**A red X never affects the live website.** kerala.no keeps serving the last good
version. Nothing is broken for visitors while you sort it out.

To find out what went wrong:

1. Open the pull request and click **Details** next to the red X.
2. Click the failed step to expand the log.
3. Scroll to the **bottom** — the real error is usually in the last 20 lines.
4. The message normally names the file, for example
   `Invalid "date" in content/events/onam-2027.md`.

The three most common causes, in order:

| Message mentions | Almost always means |
|---|---|
| `Invalid "date" in content/events/...` | Wrong date format. Use `YYYY-MM-DD` in quotes |
| A missing comma, bracket or quote | A punctuation slip in a message or committee file |
| A missing property in `no.ts` | English text added without the Norwegian equivalent |

Fix it by editing the file again on the same pull request branch — the checks
re-run automatically.

### If something bad reached the live site

1. Go to the repository's **Commits** list on `main`.
2. Open the merge commit that caused it.
3. Click **Revert**, then merge the revert pull request.
4. The site returns to its previous state in 1–2 minutes.

If GitHub is not cooperating, a maintainer with Vercel access can open the ARK
Vercel project, find the last known good deployment, and use
**Promote to Production** / **Redeploy** instead.

---

## 10. Deployment — how a change reaches kerala.no

The project is hosted on **Vercel**. A change reaches the live site automatically
after it is merged into `main`.

There are two possible mechanisms, and **exactly one should be active**:

- **GitHub Actions** — `.github/workflows/vercel-deploy.yml` deploys using
  ARK-owned Vercel credentials stored as GitHub secrets (`VERCEL_TOKEN`,
  `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`).
- **Vercel Git integration** — Vercel watches the repository directly.

> [!IMPORTANT]
> **TO CONFIRM — the active deployment path is: ................................**
>
> The outgoing maintainer must fill this in. To check: open the ARK Vercel
> project → **Settings** → **Git**, and compare against the repository's
> **Actions** tab after a merge.
>
> - If **two** deployments appear per merge, both paths are active. Disable one
>   (normally the Vercel Git integration, keeping GitHub Actions) so there is a
>   single predictable route.
> - If GitHub Actions is the active path, contributors do **not** need their own
>   Vercel access to publish content — only GitHub access.
>
> Details and the reason this setup exists are in `docs/deployment-handover.md`.

Note that `.github/workflows/ci.yml` (the checks) and
`.github/workflows/vercel-deploy.yml` (the deploy) are different things. The
checks protect you; the deploy publishes.

---

## 11. Access and ownership

Keep this section updated at every committee transition. **TO CONFIRM** — replace
each placeholder with the real answer.

| Service | Who owns it | Who has access today |
|---|---|---|
| GitHub organisation `arkeralites` | ARK | *TO CONFIRM — names* |
| Vercel project | ARK | *TO CONFIRM — names* |
| Domain `kerala.no` registrar | ARK | *TO CONFIRM — registrar name and account holder* |
| Shared email `arkeralites@gmail.com` | ARK | *TO CONFIRM — names* |
| Password manager / shared credentials | ARK | *TO CONFIRM — where it lives* |
| Google Drive copy of these docs | ARK | *TO CONFIRM — folder link* |

### Access policy

At least **two** current office bearers or web admins must have access to each of:

- GitHub repository administration
- the Vercel project
- the domain / DNS account
- the shared password manager entry

One person holding sole access is the single biggest risk to this website — far
bigger than any technical issue in this document. Losing the domain account is
the only genuinely unrecoverable failure here.

---

## 12. Yearly handover checklist

When committee responsibilities change:

- [ ] confirm who owns the GitHub organisation and repository
- [ ] confirm who owns the Vercel project
- [ ] confirm who controls the domain and DNS, and when it next renews
- [ ] confirm who controls `arkeralites@gmail.com`
- [ ] confirm the deployment path in section 10 is still accurate
- [ ] make one small content change end to end and confirm it goes live
- [ ] update committee names in `src/lib/committee.ts` after the election
- [ ] check the term label rolled over correctly (it changes each July)
- [ ] confirm gallery images still appear on `/events`
- [ ] remove GitHub and Vercel access for people no longer maintaining the site
- [ ] add access for new maintainers — at least two people per service
- [ ] update this document and `README.md` if anything changed

This takes about 30 minutes and is the single most valuable thing a new committee
can do for the website.

---

## 13. Do I need AI tools to maintain this website?

**No.** Nothing here depends on AI, and the committee should not take on an AI
subscription or API key just to keep the site running. Two deliberate choices
support that:

1. **The automatic checks** (`.github/workflows/ci.yml`) catch broken changes
   before they go live. They are ordinary, free, and need no credentials.
2. **`CLAUDE.md`** in the repository root gives an AI assistant the correct
   context about this project. If a future maintainer *chooses* to use an AI
   coding tool, it will start out informed instead of guessing.

If you want help with a specific task, copying the relevant part of this document
into any AI chat assistant works fine and costs nothing to set up. What was
deliberately **not** done is wiring an AI reviewer into the repository, because
that would leave ARK with a recurring bill and an API key to rotate — a
liability for a committee with no developer. Revisit only if a future committee
has someone willing to own it.

---

## 14. Quick troubleshooting

| Problem | What to check |
|---|---|
| Event not appearing | `date` format (`YYYY-MM-DD`), filename ends in `.md`, top block wrapped in `---` |
| Event shows "Invalid Date" | Should be impossible now — the build fails first. Report it |
| Event in the wrong section | Upcoming vs past comes from `date` compared to today |
| Gallery category missing | Folder name, at least one supported image, videos do not count |
| Photos missing | Confirm the files were actually committed, and the format is supported |
| Wrong email on a button | `src/lib/metadata.ts`, then search the project for the old address |
| Wrong language shown | A saved choice in the switcher beats the device language. Clear site cookies to re-test |
| Event description in English on a Malayalam page | Expected — event descriptions are English only |
| Site not updating after merge | Check the Actions tab and the Vercel dashboard (section 10) |
| Whole site down | Check domain renewal first, then DNS, then Vercel status |
| Checks failing on a pull request | Section 9 |

---

## 15. Recommended handover practice

1. Keep this file in the repository — it is version-controlled and cannot be lost.
2. Also copy it into ARK's Google Drive for non-technical members.
3. Update the access table (section 11) once a year, at minimum.
4. Keep `README.md` short and technical; keep process notes here.
5. Fill in every `TO CONFIRM` before you consider the handover complete.
