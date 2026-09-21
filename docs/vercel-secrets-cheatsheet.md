# Vercel secrets cheatsheet

Use this page during handover if someone asks:

- where did we save the Vercel secrets?
- where do we get the values again?

For the full background and setup flow, see `docs/github-vercel-setup.md`.

## Where the secrets are saved

In the GitHub repository:

1. open the repo
2. go to **Settings**
3. go to **Secrets and variables**
4. open **Actions**

Look for these secret names:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

Important: GitHub hides secret values after saving them.

## Where each value comes from

| Secret | Get it from |
|---|---|
| `VERCEL_TOKEN` | Vercel → **Settings** → **Tokens** |
| `VERCEL_ORG_ID` | Vercel team/account ID, or local `.vercel/project.json` |
| `VERCEL_PROJECT_ID` | Vercel project settings, or local `.vercel/project.json` |

## Fast recovery method

If this repo is linked locally to Vercel, run:

```powershell
Get-Content .vercel\project.json
```

Use:

- `orgId` → `VERCEL_ORG_ID`
- `projectId` → `VERCEL_PROJECT_ID`

If the file does not exist yet, run:

```powershell
npx vercel link
Get-Content .vercel\project.json
```

## Token recovery

If you do not know the token value anymore:

1. sign in to the **ARK-owned** Vercel account/team
2. go to **Settings** → **Tokens**
3. create a new token
4. save it as `VERCEL_TOKEN` in GitHub Actions secrets

## If you forgot everything

1. create a new `VERCEL_TOKEN` in Vercel
2. confirm the correct Vercel project
3. get `projectId` and `orgId`
4. update all three GitHub Actions secrets

## One-minute checklist

- [ ] GitHub repo has `VERCEL_TOKEN`
- [ ] GitHub repo has `VERCEL_ORG_ID`
- [ ] GitHub repo has `VERCEL_PROJECT_ID`
- [ ] token comes from an ARK-owned Vercel account/team
- [ ] IDs point to the correct ARK Vercel project
