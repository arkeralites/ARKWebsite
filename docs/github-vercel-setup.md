# GitHub ↔ Vercel setup

This guide explains how this repository is wired to Vercel, and how to recreate
that setup safely under **ARK-owned** accounts.

Use this file for the **one-time connection setup**. For broader ownership and
handover checks, also read `docs/deployment-handover.md`.

If you only need the quick handover answer for where the Vercel secrets are
stored and how to recover them, use `docs/vercel-secrets-cheatsheet.md`.

## Short answer

This repository is already prepared to deploy to Vercel through
`.github/workflows/vercel-deploy.yml`.

That workflow needs these GitHub repository secrets:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

The recommended production setup for this project is:

1. the **GitHub repository** stays owned by ARK
2. the **Vercel project** stays owned by ARK
3. GitHub **Actions** deploys to Vercel on pushes to `main`
4. Vercel's own **Git auto-deploy** for production is turned **off** to avoid
   duplicate deployments

That arrangement lets maintainers publish changes using only GitHub access,
without each contributor needing their own Vercel account.

## Where the secrets are set, and where the values come from

This is the fastest answer for future maintainers.

### Where the secrets are set

The secret names are stored in the **GitHub repository**, not in the code.

GitHub path:

1. open the repository
2. go to **Settings**
3. go to **Secrets and variables**
4. open **Actions**

The repository should contain these three Actions secrets:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

Important:

- GitHub does **not** show secret values after they are saved
- if you forgot a value, the normal recovery path is to get it again from
  Vercel and replace the secret

### Where each value comes from

| GitHub secret name | Get it from | Notes |
|---|---|---|
| `VERCEL_TOKEN` | Vercel → **Settings** → **Tokens** | Create a token under the **ARK-owned** Vercel account/team |
| `VERCEL_ORG_ID` | Vercel team/account ID, or local `.vercel/project.json` | Sometimes shown as **Team ID** or **Org ID** |
| `VERCEL_PROJECT_ID` | Vercel project settings, or local `.vercel/project.json` | Must match the production project for this repo |

### Fastest way to recover `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID`

If the repository is linked locally to the right Vercel project, run:

```powershell
Get-Content .vercel\project.json
```

You should see values like:

```json
{
  "projectId": "...",
  "orgId": "...",
  "projectName": "..."
}
```

Map them like this:

- `projectId` → `VERCEL_PROJECT_ID`
- `orgId` → `VERCEL_ORG_ID`

If `.vercel/project.json` does not exist yet, run:

```powershell
npx vercel link
Get-Content .vercel\project.json
```

### Fastest way to recover `VERCEL_TOKEN`

The token does **not** live in `.vercel/project.json`.

To replace it:

1. sign in to the **ARK-owned** Vercel account/team
2. go to **Settings** → **Tokens**
3. create a new token
4. copy it immediately
5. update the `VERCEL_TOKEN` secret in GitHub

### If you forgot all three values

Use this recovery sequence:

1. create a new `VERCEL_TOKEN` in Vercel
2. open the correct Vercel project and confirm the **Project ID**
3. confirm the owning **Team ID / Org ID**
4. update all three GitHub Actions secrets in the repository

## What exists in this repository today

- `.github/workflows/ci.yml` runs checks only
- `.github/workflows/vercel-deploy.yml` publishes to Vercel production
- local Vercel linking creates `.vercel/project.json`, which contains the Vercel
  **project ID** and **org/team ID** for the machine that ran `vercel link`

Important:

- `.vercel/` is local machine metadata and is gitignored
- GitHub secrets are the real production connection for automated deploys
- if Vercel Git integration is also enabled, one merge can trigger two deploys

## Recommended setup: GitHub Actions deploys to Vercel

### 1. Make sure ARK owns both sides

Before connecting anything, confirm:

- the GitHub repository is under the ARK organisation or ARK-controlled account
- the Vercel project is under an ARK-controlled team or account
- at least two current maintainers can access both

Do **not** use a departing member's personal Vercel token or personal GitHub
account as the long-term production path.

### 2. Create or open the Vercel project

In Vercel:

1. Sign in to the **ARK-owned** Vercel account/team.
2. Create the project if it does not exist yet.
3. Use the correct production domain (`kerala.no`) on that project.

There are two safe ways to create the project:

- **Import from GitHub in the Vercel UI**
- or create/link it with the **Vercel CLI**

If you use the Vercel UI import, you may still later disable Vercel's Git-based
production deployment and keep only the GitHub Actions deployment path.

### 3. Get the Vercel IDs used by the workflow

The deploy workflow needs:

- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

You can get them in either of these ways.

#### Option A — from the Vercel dashboard

Open the Vercel project and note:

- the **Project ID**
- the **Team ID** or **Org ID**

#### Option B — from the CLI after linking locally

From the repository root:

```powershell
npm install
npx vercel link
Get-Content .vercel\project.json
```

After `vercel link`, the local `.vercel/project.json` file will contain values
like:

- `projectId`
- `orgId`

Those map to:

- `VERCEL_PROJECT_ID` = `projectId`
- `VERCEL_ORG_ID` = `orgId`

### 4. Create the deployment token in Vercel

In the ARK-owned Vercel account:

1. Open **Settings** → **Tokens**.
2. Create a token dedicated to this repository.
3. Copy it immediately.

That token becomes the GitHub secret `VERCEL_TOKEN`.

Use an ARK-owned token, not a personal one.

### 5. Add the secrets in GitHub

In the GitHub repository:

1. Open **Settings** → **Secrets and variables** → **Actions**.
2. Create these repository secrets:
   - `VERCEL_TOKEN`
   - `VERCEL_ORG_ID`
   - `VERCEL_PROJECT_ID`

The deploy workflow already expects exactly those names.

### 6. Check the workflow file

This repository already contains the production deploy workflow:

- `.github/workflows/vercel-deploy.yml`

It does three key things:

1. confirms all three `VERCEL_*` secrets exist
2. runs `vercel pull` and `vercel build`
3. runs `vercel deploy --prebuilt --prod`

If those secrets are correct, no extra code changes should be needed.

### 7. Disable duplicate production deploys in Vercel

If GitHub Actions is your production path, then in Vercel:

1. open the project
2. go to **Settings** → **Git**
3. confirm whether the GitHub repository is connected
4. if Vercel production auto-deploy is enabled as well, disable that production
   path so one merge creates only one deployment

Keeping the repository connected in Vercel for visibility is fine; the important
thing is to avoid **two production deployments per merge**.

### 8. Verify the connection end-to-end

Choose one of these verification methods:

- run the deploy workflow manually from the repository's **Actions** tab using
  `workflow_dispatch`
- or merge a tiny harmless change into `main`

Then confirm:

1. the **Deploy to Vercel** workflow succeeds in GitHub
2. exactly **one** new deployment appears in Vercel
3. the change appears on <https://kerala.no>

## Optional alternative: Vercel Git integration

You can also connect GitHub to Vercel directly inside Vercel and let Vercel
deploy on every push.

High-level setup:

1. in Vercel, add the GitHub integration if it is not already installed
2. grant Vercel access to the correct GitHub organisation/repository
3. import this repository into Vercel
4. set `main` as the production branch
5. verify the domain and environment settings

However, for this project, GitHub Actions is usually the better production path
because Vercel Git deploys can fail when the person who authored the Git commit
does not have Vercel project access.

If you intentionally switch to direct Vercel Git deployment:

- disable `.github/workflows/vercel-deploy.yml`, or remove the trigger
- update `docs/deployment-handover.md`
- update section 10 of `docs/project-handover.md`

## Failure modes to watch for

### Missing GitHub secrets

Symptom: the deploy workflow fails immediately with a message saying one or more
`VERCEL_*` secrets are missing.

Fix: recreate the missing repository secrets.

### Expired or deleted token

Symptom: checks pass, but the deploy workflow fails during Vercel CLI commands.

Fix: create a new Vercel token and replace `VERCEL_TOKEN` in GitHub.

### Wrong project or wrong team IDs

Symptom: the workflow authenticates but deploys fail or target the wrong Vercel
project.

Fix: re-check `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID` against the ARK-owned
project.

### Double deployments

Symptom: one merge triggers both GitHub Actions and Vercel Git production
deployments.

Fix: choose one production path and disable the other.

## Yearly maintenance

- verify ARK still owns the Vercel team/account
- verify ARK still owns the GitHub repository
- rotate `VERCEL_TOKEN` if a maintainer with access has left
- verify `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID` still point to the correct Vercel project
- test one real deployment after committee handover
- keep this file, `docs/deployment-handover.md`, and `docs/project-handover.md` in sync

## Fast checklist

- [ ] Vercel project exists under ARK ownership
- [ ] `kerala.no` is attached to that project
- [ ] `VERCEL_TOKEN` created under ARK ownership
- [ ] `VERCEL_ORG_ID` noted
- [ ] `VERCEL_PROJECT_ID` noted
- [ ] all three values saved in GitHub Actions secrets
- [ ] `.github/workflows/vercel-deploy.yml` is present
- [ ] only one production deploy path is enabled
- [ ] one test deployment succeeds


