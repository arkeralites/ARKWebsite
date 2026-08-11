# Deployment handover

How a change to this repository becomes the live <https://kerala.no>, and what
future maintainers must own.

For day-to-day content work, read `docs/project-handover.md` instead. This file is
about **ownership and plumbing**.

## The goal of this setup

- the **GitHub repository** is owned by **ARK**, not by an individual
- the **Vercel project** is owned by **ARK**
- the **domain** stays under **ARK** control
- contributors keep using their **own personal GitHub accounts**
- everything runs on the **free** plan

## Two workflows, doing different jobs

| File | Trigger | What it does |
|---|---|---|
| `.github/workflows/ci.yml` | every pull request, and pushes to `main` | Runs lint, TypeScript, and a full build. **Publishes nothing.** Needs no secrets |
| `.github/workflows/vercel-deploy.yml` | pushes to `main` | Deploys to Vercel production. Needs the three ARK secrets below |

The first one protects the site. The second one publishes it. Requiring the first
to pass before merging is what keeps a broken change off kerala.no.

## The active production deployment path

Production can be deployed either by **GitHub Actions** or by **Vercel's direct
Git integration**. Exactly one should be enabled — if both are, every merge
produces two deployments racing each other.

> [!IMPORTANT]
> **TO CONFIRM — the active path is: ..............................................**
>
> Fill this in during handover and delete this box. To determine it:
>
> 1. Open the ARK Vercel project → **Settings** → **Git**. Note whether the
>    repository is connected and whether production deployments are enabled.
> 2. Merge one small change and watch both the repository's **Actions** tab and
>    the Vercel **Deployments** list.
> 3. One deployment per merge = correctly configured. Two = disable one path.
>
> The recommendation is to keep **GitHub Actions** and disable the Vercel Git
> integration for production, for the reason in the next section.

## Why GitHub Actions may be preferred here

Direct Git-to-Vercel deployment can fail with:

> Git author `<username>` must have access to the project on Vercel to create deployments.

This happens when a contributor pushes using a personal GitHub account while the
Vercel project belongs to a different ARK-owned account. Deploying through GitHub
Actions with ARK-owned Vercel credentials in GitHub Secrets avoids it: committee
members need **GitHub access only**, never Vercel access, to publish content.

## If GitHub Actions is the active path

1. Someone merges a pull request into `main`.
2. GitHub runs `.github/workflows/vercel-deploy.yml`.
3. The workflow uses `VERCEL_TOKEN`, `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID` from
   the repository secrets.
4. Vercel creates a new production deployment.

The workflow checks that all three secrets exist and fails immediately with a
clear message if any is missing — so an expired or deleted token shows up as a
red X, not as a silently stale website.

## Handover checks — GitHub

In the ARK GitHub repository:

1. Confirm `.github/workflows/vercel-deploy.yml` and `.github/workflows/ci.yml`
   both exist.
2. **Settings** → **Secrets and variables** → **Actions**, and confirm:
   - `VERCEL_TOKEN`
   - `VERCEL_ORG_ID`
   - `VERCEL_PROJECT_ID`
3. Confirm those values belong to the **ARK-owned** Vercel account, not a
   personal one. A token tied to a departing member's account is a time bomb —
   it will keep working until they delete it or it expires.
4. **Settings** → **Branches** → require the **Checks** workflow to pass before
   merging to `main`. This is the single most valuable setting in the repository:
   without it, the checks are advisory and a bad merge can still go live.

## Handover checks — Vercel

Log in to the **ARK-owned** Vercel account:

1. Open the ARK project and note the **Project ID** and **Org/Team ID**.
2. Create or rotate the deployment token ARK uses, and update the GitHub secret
   to match. Rotate it whenever a maintainer with access leaves.
3. Check **Settings** → **Git** to determine the active deployment path (above).
4. Confirm the custom domain `kerala.no` is attached and its certificate is valid.
5. Note that `www.kerala.no` → `kerala.no` redirection is handled in application
   code, in `next.config.mjs`, not in Vercel settings.

## Who should have access

At least **two** current office bearers or web admins for each of:

- GitHub repository admin or maintainer access
- the Vercel account
- the domain / DNS account
- the shared password manager entry

## Yearly checklist

- [ ] confirm who owns the GitHub repository
- [ ] confirm who owns the Vercel project
- [ ] confirm who owns the domain and DNS, and its renewal date
- [ ] confirm which deployment path is active and that it produces one deployment
- [ ] confirm the three `VERCEL_*` secrets exist and belong to ARK
- [ ] confirm branch protection still requires the Checks workflow
- [ ] merge one small test change and confirm it goes live
- [ ] rotate the Vercel token if anyone with access has left
- [ ] remove access for people no longer maintaining the site
- [ ] add access for new maintainers

## Emergency fallback

If GitHub Actions fails and something must go live:

1. Log in to the ARK Vercel account.
2. Open the project → **Deployments**.
3. **Redeploy** the current commit, or **Promote to Production** the last known
   good deployment to roll back.

To undo a bad change at the source instead, revert the merge commit on GitHub —
see section 9 of `docs/project-handover.md`.

## Notes

- Contributors should commit using their **own** GitHub accounts.
- Do **not** share personal GitHub accounts between committee members.
- Keep ARK ownership of GitHub, Vercel, and the domain. Of the three, **losing
  the domain account is the only unrecoverable failure** — everything else can be
  rebuilt from this repository.
