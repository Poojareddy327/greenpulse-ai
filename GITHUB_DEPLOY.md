# 🚀 GitHub + Vercel + Render Deployment Guide

## Step 1: Push to GitHub

### 1.1 Initialize Git (if not already)
```bash
git init
git add .
git commit -m "Initial commit: GreenPulse AI - Carbon Footprint Platform"
```

### 1.2 Create GitHub Repository
1. Go to https://github.com/new
2. Repository name: `greenpulse-ai` or `carbon-footprint-platform`
3. Description: "AI-powered Carbon Footprint Awareness Platform with 3D visualizations"
4. Keep it **Public** or **Private**
5. **DO NOT** initialize with README (we already have one)
6. Click "Create repository"

### 1.3 Push to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/greenpulse-ai.git
git branch -M main
git push -u origin main
```

---

## Step 2: Deploy Frontend to Vercel

### 2.1 Sign Up / Log In
1. Go to https://vercel.com
2. Sign up with GitHub account
3. Import your repository

### 2.2 Configure Vercel
1. Click "New Project"
2. Import `greenpulse-ai` repository
3. **Framework Preset**: Vite
4. **Root Directory**: `frontend`
5. **Build Command**: `npm run build`
6. **Output Directory**: `dist`
7. **Install Command**: `npm install`

### 2.3 Environment Variables
Add in Vercel dashboard:
```
VITE_API_URL=https://your-backend-url.onrender.com
```
(You'll update this after deploying backend)

### 2.4 Deploy
1. Click "Deploy"
2. Wait 2-3 minutes
3. Your frontend will be live at: `https://greenpulse-ai.vercel.app`

### 2.5 Custom Domain (Optional)
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

---

## Step 3: Deploy Backend to Render

### 3.1 Sign Up / Log In
1. Go to https://render.com
2. Sign up with GitHub account

### 3.2 Create Web Service
1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Select `greenpulse-ai`

### 3.3 Configure Render
**Basic Settings:**
- Name: `greenpulse-api`
- Region: Choose closest to your users
- Branch: `main`
- Root Directory: `backend`
- Runtime: `Python 3`
- Build Command: `pip install -r requirements.txt`
- Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

**Instance Type:**
- Free tier (or paid for better performance)

### 3.4 Environment Variables
Add in Render dashboard:
```
PYTHON_VERSION=3.11.0
DATABASE_URL=your_database_url_here
DEBUG=False
```

### 3.5 Deploy
1. Click "Create Web Service"
2. Wait 5-10 minutes for first deployment
3. Your API will be live at: `https://greenpulse-api.onrender.com`

### 3.6 Test Backend
Visit: `https://greenpulse-api.onrender.com/docs`
You should see FastAPI interactive documentation

---

## Step 4: Update Frontend with Backend URL

### 4.1 Update Vercel Environment Variable
1. Go to Vercel project → Settings → Environment Variables
2. Update `VITE_API_URL` with your Render URL:
   ```
   VITE_API_URL=https://greenpulse-api.onrender.com
   ```
3. Redeploy frontend (Vercel will auto-deploy on change)

---

## Step 5: Database Setup (Optional - PostgreSQL)

### 5.1 Neon PostgreSQL (Recommended - Free)
1. Go to https://neon.tech
2. Create account
3. Create new project: `greenpulse-db`
4. Copy connection string
5. Add to Render environment variables:
   ```
   DATABASE_URL=postgresql://user:pass@host/greenpulse
   ```

### 5.2 Alternative: Render PostgreSQL
1. In Render dashboard
2. New + → PostgreSQL
3. Name: `greenpulse-db`
4. Plan: Free
5. Auto-connects to your web service

---

## Step 6: Verify Deployment

### 6.1 Test Frontend
```
✅ Visit: https://greenpulse-ai.vercel.app
✅ Check home page loads
✅ Navigate to calculator
✅ Try all pages
```

### 6.2 Test Backend
```
✅ Visit: https://greenpulse-api.onrender.com
✅ Check: https://greenpulse-api.onrender.com/docs
✅ Test API endpoints
```

### 6.3 Test Integration
```
✅ Calculate carbon footprint
✅ Check if frontend connects to backend
✅ Verify API responses
```

---

## Step 7: Update README

Add deployment badges to README.md:
```markdown
[![Deployed on Vercel](https://img.shields.io/badge/Vercel-Deployed-success)](https://greenpulse-ai.vercel.app)
[![API on Render](https://img.shields.io/badge/Render-API-blue)](https://greenpulse-api.onrender.com)
```

---

## Quick Deploy Commands

### Update Code and Deploy
```bash
# 1. Make changes
# 2. Commit
git add .
git commit -m "Your update message"

# 3. Push (auto-deploys on Vercel and Render)
git push origin main
```

Both Vercel and Render will automatically deploy on push!

---

## Troubleshooting

### Frontend Issues
**Problem**: White screen
**Solution**: Check browser console for errors, verify API URL

**Problem**: Build fails
**Solution**: Check `npm run build` locally first

### Backend Issues
**Problem**: 503 errors
**Solution**: Render free tier sleeps after 15min inactivity, first request wakes it (takes 30s)

**Problem**: CORS errors
**Solution**: Update `main.py` with your Vercel URL:
```python
allow_origins=["https://greenpulse-ai.vercel.app"]
```

### Database Issues
**Problem**: Connection refused
**Solution**: Check DATABASE_URL format, ensure database is running

---

## Free Tier Limits

### Vercel (Free)
- ✅ Unlimited deployments
- ✅ 100 GB bandwidth/month
- ✅ Auto HTTPS
- ✅ Custom domains

### Render (Free)
- ✅ 750 hours/month
- ⚠️ Sleeps after 15min inactivity
- ⚠️ 512 MB RAM
- ✅ Auto HTTPS

### Neon (Free)
- ✅ 1 project
- ✅ 10 GB storage
- ✅ 1 compute unit

---

## Production Checklist

Before going live:
- [ ] Update environment variables
- [ ] Test all features
- [ ] Check mobile responsiveness
- [ ] Verify API responses
- [ ] Test authentication (when integrated)
- [ ] Add analytics (Google Analytics, etc.)
- [ ] Set up error tracking (Sentry)
- [ ] Configure custom domain
- [ ] Update social media tags
- [ ] Add favicon
- [ ] Test SEO

---

## Continuous Deployment

### Auto-Deploy Setup (Already Working!)
```
Code Change → Push to GitHub → Auto Deploy

Vercel: Deploys frontend automatically
Render: Deploys backend automatically
```

### Branch Protection (Recommended)
1. GitHub → Settings → Branches
2. Add rule for `main` branch
3. Require pull request reviews
4. Enable status checks

---

## Monitoring

### Vercel Dashboard
- Deployments
- Analytics
- Logs
- Performance metrics

### Render Dashboard
- Service logs
- Metrics
- Deployment history
- Environment variables

---

## Cost Optimization

### Stay on Free Tier
- Frontend: Always free on Vercel
- Backend: Free with sleep mode (Render)
- Database: Free tier adequate for MVP

### Upgrade When Needed
- More traffic → Vercel Pro ($20/month)
- No sleep backend → Render Starter ($7/month)
- Larger database → Neon Pro ($19/month)

---

## Next Steps After Deployment

1. ✅ Share your live link
2. ✅ Add to portfolio
3. ✅ Get user feedback
4. ✅ Monitor analytics
5. ✅ Iterate based on data

---

**Your Carbon Footprint Platform will be live in ~15 minutes!** 🚀
