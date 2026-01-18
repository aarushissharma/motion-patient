# Deploy API Endpoints to Vercel

## Quick Deployment Steps

### Option 1: Using Vercel CLI (Recommended)

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy to production**:
   ```bash
   cd /Users/riddhi/Downloads/motion-patient-main
   vercel --prod
   ```

### Option 2: Using Git (if connected to GitHub)

1. **Check if git is initialized**:
   ```bash
   cd /Users/riddhi/Downloads/motion-patient-main
   git status
   ```

2. **If not a git repo, initialize it**:
   ```bash
   git init
   git add .
   git commit -m "Add API endpoints"
   ```

3. **Push to GitHub** (if you have a remote):
   ```bash
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

4. **Vercel will auto-deploy** if connected to GitHub

### Option 3: Manual Upload via Vercel Dashboard

1. Go to: https://vercel.com/dashboard
2. Select your project: `motion-patient`
3. Go to Settings → Deployments
4. Upload the `api/` folder and `vercel.json` file

## Verify Deployment

After deploying, test these URLs:

- Status: `https://motion-patient-j2bhlcp4a-aarushi-sharmas-projects-d3182694.vercel.app/api/status`
- Alerts: `https://motion-patient-j2bhlcp4a-aarushi-sharmas-projects-d3182694.vercel.app/api/alerts`
- Patient: `https://motion-patient-j2bhlcp4a-aarushi-sharmas-projects-d3182694.vercel.app/api/patient`

They should return JSON, not "Not Found".

## Troubleshooting

### Still getting "Not Found"?

1. **Check file structure**:
   - Files should be in `/api/` folder (not `/api/api/`)
   - Files should be named exactly: `status.js`, `alerts.js`, `patient.js`, `motion.js`

2. **Check vercel.json exists**:
   - Should be in root directory
   - Should have correct configuration

3. **Redeploy**:
   - Sometimes Vercel needs a redeploy to pick up new files
   - Try: `vercel --prod --force`

4. **Check Vercel logs**:
   - Go to Vercel dashboard → Your project → Functions
   - Check for any errors
