# Deployment handover

This project is set up so that:

- the **GitHub repo** is owned by **ARK**
- the **Vercel project** is owned by **ARK**
- the **domain** stays under **ARK** control
- contributors can keep using their **own GitHub accounts**
- deployment still works on the **free** plan

## Why this setup exists

Direct Git-to-Vercel deployment can fail with this error:

> Git author `<username>` must have access to the project on Vercel to create deployments.

That happens when a contributor pushes to the repo using a personal GitHub account, but the Vercel project belongs to a different ARK-owned account.

To avoid that, deployment is triggered through **GitHub Actions** using **ARK-owned Vercel credentials stored in GitHub Secrets**.

## How production deployment works

1. Someone pushes to `main`
2. GitHub runs `.github/workflows/vercel-deploy.yml`
3. The workflow uses the ARK Vercel token, org ID, and project ID stored in GitHub Secrets
4. Vercel creates a new production deployment

This means contributors do **not** need direct Vercel project access just to deploy content changes.

## One-time setup in Vercel

Log in to the **ARK-owned Vercel account** and:

1. Open the ARK project
2. Go to **Settings** → **Tokens** (or create a token from the account settings area)
3. Create a token that ARK will use for deployments
4. Open the project and collect the **Project ID** and **Org ID**
5. If direct Git-triggered deployments keep failing, disconnect the Git integration for this project or disable that deployment path so GitHub Actions is the only production deploy route

## One-time setup in GitHub

In the **ARK GitHub repo**:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Create these repository secrets:
   - `VERCEL_TOKEN`
   - `VERCEL_ORG_ID`
   - `VERCEL_PROJECT_ID`
3. Paste the values from the ARK-owned Vercel account

After that, every push to `main` triggers deployment automatically.

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
- verify the `VERCEL_TOKEN`, `VERCEL_ORG_ID`, and `VERCEL_PROJECT_ID` secrets still exist in GitHub
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

