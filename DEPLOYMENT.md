# Deployment Guide

This guide walks you through deploying the Telemetry Monitoring System to GitHub and hosting it live on free platforms.

## Step 1: Create GitHub Repository

### Option A: Using GitHub Web (Easiest)

1. Go to [github.com](https://github.com) and sign in
2. Click **+** → **New repository**
3. Name: `telemetry-monitor`
4. Description: "Professional real-time telemetry monitoring system for experimental hardware"
5. Choose **Public** (for free hosting)
6. **Create repository**

### Option B: Using GitHub CLI

```bash
gh repo create telemetry-monitor --public --source=. --remote=origin
```

## Step 2: Push Code to GitHub

```bash
cd /Users/aryanlodha/Desktop/telemetry-monitor

# Add GitHub remote
git remote add origin https://github.com/YOUR_USERNAME/telemetry-monitor.git

# Rename branch to main if needed
git branch -M main

# Push all commits
git push -u origin main
```

**Verify:** Go to your repo on GitHub and see all commits and files.

---

## Step 3: Deploy Backend (Railway)

Railway offers a free tier with automatic deployments from GitHub.

### Setup Backend on Railway

1. **Sign up:** Go to [railway.app](https://railway.app) → Sign up with GitHub
2. **New Project** → **Deploy from GitHub repo**
3. **Select repository:** Choose `telemetry-monitor`
4. **Configure:**
   - Platform: Node.js (auto-detected)
   - Start command: `node server.js` (auto-detected from Procfile)
5. **Add Environment Variables:**
   - Click "Add variable"
   - `PORT` = `8080`
   - `NODE_ENV` = `production`
6. **Deploy!** Railway builds and deploys automatically

### Get Backend URL

- Railway shows a public URL like: `https://telemetry-monitor-production.up.railway.app`
- Copy this URL (you'll need it for frontend)
- Test: Open `https://telemetry-monitor-production.up.railway.app/api/health`
- Should show: `{"status":"healthy","uptime":...}`

---

## Step 4: Deploy Frontend (Vercel)

Vercel auto-deploys on every push to GitHub and includes free SSL.

### Setup Frontend on Vercel

1. **Sign up:** Go to [vercel.com](https://vercel.com) → Sign up with GitHub
2. **Import Project** → Choose `telemetry-monitor` repository
3. **Configure Project:**
   - Framework: **Vite**
   - Build command: `cd frontend && npm install && npm run build`
   - Output directory: `frontend/dist`
   - Install command: `npm install`
4. **Environment Variables:**
   - Add variable:
     - Name: `VITE_API_BASE_URL`
     - Value: `https://telemetry-monitor-production.up.railway.app` (your Railway URL)
5. **Deploy!**

### Wait for Deployment

- Vercel shows deployment progress
- Once complete, you get a live URL like: `https://telemetry-monitor.vercel.app`

---

## Step 5: Connect Frontend to Backend

### Update Frontend Config

In `frontend/src/utils/constants.ts` or where the API is configured:

```typescript
const API_BASE_URL = process.env.VITE_API_BASE_URL || 'http://localhost:8080';
```

Vercel automatically injects the `VITE_API_BASE_URL` environment variable.

### Test Connection

1. Open your Vercel URL in browser
2. Should see the telemetry dashboard loading
3. Data should stream from Railway backend
4. Check browser console for any errors

---

## Step 6: Verify Live Deployment

### Frontend Tests

- [ ] Dashboard loads without white screen
- [ ] Charts render with data
- [ ] Real-time updates visible (400ms intervals)
- [ ] Anomaly feed shows data
- [ ] All colors and styling appear correct

### Backend Tests

```bash
# Test health endpoint
curl https://your-railway-url/api/health

# Response should be:
{"status":"healthy","uptime":...,"connectedClients":...,"messagesSent":...}
```

### WebSocket Test

```bash
# Test WebSocket connection from frontend
# Open browser DevTools → Console
# Should see connection logs and data streaming
```

---

## Continuous Deployment

Both platforms auto-deploy when you push to `main` branch:

```bash
# Make local changes
git add -A
git commit -m "Update feature"
git push origin main

# Vercel and Railway auto-deploy within 1-2 minutes
```

---

## Environment Variables Summary

### Railway (Backend)
```
PORT=8080
NODE_ENV=production
ALLOW_CORS_ORIGIN=*
```

### Vercel (Frontend)
```
VITE_API_BASE_URL=https://your-railway-url
```

---

## Troubleshooting

### Frontend Shows Blank/White Screen
- [ ] Check browser console for errors (DevTools → Console)
- [ ] Verify `VITE_API_BASE_URL` is set correctly in Vercel
- [ ] Check Vercel deployment logs (Deployments → View Logs)

### Backend Not Responding
- [ ] Verify Railway deployment succeeded (check logs)
- [ ] Verify `PORT` and `NODE_ENV` environment variables set
- [ ] Check Railway logs: Project → Logs

### WebSocket Connection Fails
- [ ] Ensure backend URL includes `https://` (not `http://`)
- [ ] Check CORS settings in backend
- [ ] Verify railway URL is correct in Vercel env variables

### Data Not Streaming
- [ ] Check browser console for connection errors
- [ ] Verify backend `/api/health` endpoint responds
- [ ] Check network requests (DevTools → Network tab)

---

## Free Tier Limits

### Vercel
- ✅ Free tier: Unlimited deployments, traffic, and sites
- ✅ Automatic SSL/HTTPS
- ✅ GitHub integration with auto-deploy

### Railway
- ✅ Free tier: $5/month credits (usually enough for this project)
- ✅ Auto-scaling
- ✅ GitHub integration with auto-deploy
- ⚠️ Monitor usage in dashboard

---

## Next Steps (Optional)

### Add Custom Domain
1. **Vercel:** Project Settings → Domains → Add custom domain
2. **Railway:** Not typically used for custom domains

### Add Analytics
- Vercel Analytics (free tier available)
- Google Analytics on frontend

### Add Alerts
- Railway can send deployment notifications
- Vercel can send deployment notifications

### Monitor Uptime
- Use free services like UptimeRobot to monitor endpoints

---

## Live Dashboard URLs

Once deployed:

- **Frontend:** `https://telemetry-monitor.vercel.app`
- **Backend API:** `https://telemetry-monitor-production.up.railway.app/api/health`
- **GitHub:** `https://github.com/YOUR_USERNAME/telemetry-monitor`

---

## Support

For issues:
1. Check the troubleshooting section above
2. Review Vercel/Railway deployment logs
3. Check browser console (DevTools)
4. Verify all environment variables are set correctly
