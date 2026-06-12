# Aklak Delivery - Deployment Checklist

Follow these exact steps to deploy the prototype to Vercel and test it.

## 1. Push project to GitHub
- [ ] Initialize git repository if not already done (`git init`).
- [ ] Add all files (`git add .`).
- [ ] Commit changes (`git commit -m "Initial commit"`).
- [ ] Create a new repository on GitHub.
- [ ] Add remote and push (`git remote add origin <URL>`, `git branch -M main`, `git push -u origin main`).

## 2. Import project in Vercel
- [ ] Log into [Vercel](https://vercel.com).
- [ ] Click **"Add New"** > **"Project"**.
- [ ] Find your newly created GitHub repository in the list and click **"Import"**.

## 3. Configure Build Settings
- [ ] Vercel will auto-detect "Vite". Ensure the settings match:
  - **Framework Preset:** Vite
  - **Build Command:** `npm run build`
  - **Output Directory:** `dist`
- [ ] Do NOT add any Environment Variables (the prototype does not require them).
- [ ] Click **"Deploy"**.

## 4. Test main routes after deployment
Wait for the deployment to finish, then visit the provided Vercel URL. Ensure you click through and verify the following routes work perfectly (and refreshing the page on these routes does not cause a 404 error, thanks to `vercel.json`):

- [ ] `/` (Main Portal Page)
- [ ] `/customer` (Customer Splash/Login)
- [ ] `/customer/home` (Customer Main Menu)
- [ ] `/restaurant-dashboard` (Restaurant Overview)
- [ ] `/admin-dashboard` (Admin Overview)
- [ ] `/driver` (Driver Login)

Once all checks are complete, the prototype is ready to be shared with partners and investors!
