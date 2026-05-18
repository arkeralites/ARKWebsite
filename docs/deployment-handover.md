# Deployment handover

This document explains the **intended ARK-owned deployment setup** and what future maintainers should verify during handover.

The goal is that:

- the **GitHub repo** is owned by **ARK**
- the **Vercel project** is owned by **ARK**
- the **domain** stays under **ARK** control
- contributors can keep using their **own GitHub accounts**
- deployment still works on the **free** plan

> [!IMPORTANT]
> ## Verify the real deployment path during handover
>
> This document describes a **GitHub Actions → Vercel** deployment flow.
>
> Before relying on that, future maintainers should verify the actual current setup in the ARK GitHub and Vercel accounts, including:
>
> - whether `.github/workflows/vercel-deploy.yml` is present in the repository
> - whether the repository still has the required GitHub Actions secrets
> - whether Vercel is instead using direct Git integration for production deployment
>
> Do **not** assume this file is still accurate unless the live accounts and repository settings confirm it.

## Why this setup may exist

Direct Git-to-Vercel deployment can fail with this error:

> Git author `<username>` must have access to the project on Vercel to create deployments.

That happens when a contributor pushes to the repo using a personal GitHub account, but the Vercel project belongs to a different ARK-owned account.

One way to avoid that is to trigger deployment through **GitHub Actions** using **ARK-owned Vercel credentials stored in GitHub Secrets**.

## If GitHub Actions is the active deployment path

1. Someone pushes to `main`
2. GitHub runs `.github/workflows/vercel-deploy.yml`
3. The workflow uses the ARK Vercel token, org ID, and project ID stored in GitHub Secrets
4. Vercel creates a new production deployment

If this workflow is active, contributors do **not** need direct Vercel project access just to deploy content changes.

## Vercel checks during handover

Log in to the **ARK-owned Vercel account** and check:

1. Open the ARK project
2. Go to **Settings** → **Tokens** (or create a token from the account settings area)
3. Create a token that ARK will use for deployments
4. Open the project and collect the **Project ID** and **Org ID**
5. Whether production is deploying through GitHub Actions or through direct Git integration
6. If direct Git-triggered deployments keep failing, disconnect the Git integration for this project or disable that deployment path so GitHub Actions is the only production deploy route

## GitHub checks during handover

In the **ARK GitHub repo**, check:

1. Whether `.github/workflows/vercel-deploy.yml` exists and is still the production workflow
2. Go to **Settings** → **Secrets and variables** → **Actions**
3. Confirm these repository secrets exist:
   - `VERCEL_TOKEN`
   - `VERCEL_ORG_ID`
   - `VERCEL_PROJECT_ID`
4. Confirm the values still belong to the ARK-owned Vercel account

If GitHub Actions is the active deployment route, every push to `main` should trigger deployment automatically.

## Who should have access

At least 2 current office bearers or web admins should have access to:

- GitHub repo admin or maintainer access
- Vercel login or shared credentials
- Domain/DNS account
- Shared password manager entry

## Yearly handover checklist

When ARK responsibilities change, do all of these:

- confirm who owns the GitHub repo
- confirm who owns the Vercel project
- confirm who owns the domain and DNS
- verify whether production currently deploys via GitHub Actions or direct Vercel Git integration
- if GitHub Actions is used, verify the `VERCEL_TOKEN`, `VERCEL_ORG_ID`, and `VERCEL_PROJECT_ID` secrets still exist in GitHub
- make one small test change and confirm deployment works
- remove access for people who no longer maintain the site
- add access for new maintainers
- update the access table in `README.md`

## Emergency fallback

If GitHub Actions fails, a maintainer can still:

1. Log in to the ARK Vercel account
2. Open the project
3. Trigger a redeploy manually

## Notes

- Contributors should commit using their **own** GitHub accounts.
- Do **not** share personal GitHub accounts between committee members.
- Keep ARK ownership on GitHub, Vercel, and the domain.

