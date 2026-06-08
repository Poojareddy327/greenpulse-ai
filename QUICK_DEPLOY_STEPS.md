# ⚡ Quick Deployment Steps

## 🎯 Deploy in 10 Minutes!

### Step 1: Create GitHub Repository (2 min)
1. Go to https://github.com/new
2. Name: `greenpulse-ai` or `carbon-footprint-platform`
3. Public or Private
4. **DON'T** initialize with README
5. Click "Create repository"

### Step 2: Push Code (1 min)
```bash
# Run these commands in your project folder:
git remote add origin https://github.com/YOUR_USERNAME/greenpulse-ai.git
git branch -M main
git push -u origin main
```

### Step 3: Deploy Backend to Render (4 min)
1. Go to https://render.com
2. Sign up with GitHub
3. Click "New +" → "Web Service"
4. Select `greenpulse-ai` repository
5. Configure:
   - **Name**: `greenpulse-api`
   - **Root Directory**: `backend`
   - **Runtime**: Python 3
   - **Build**: `pip install -r requirements.txt`
   - **Start**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
6. Click "Create Web Service"
7. **Copy your backend URL**: `https://greenpulse-api.onrender.com`

### Step 4: Deploy Frontend to Vercel (3 min)
1. Go to https://vercel.com
2. Sign up with GitHub
3. Click "New Project"
4. Import `greenpulse-ai`
5. Configure:
   - **Framework**: Vite
   - **Root Directory**: `frontend`
   - **Build**: `npm run build`
   - **Output**: `dist`
6. **Environment Variables** → Add:
   ```
   VITE_API_URL=https://greenpulse-api.onrender.com
   ```
   (Use your Render URL from Step 3)
7. Click "Deploy"

### Step 5: Done! ✅
- **Frontend**: https://greenpulse-ai.vercel.app
- **Backend**: https://greenpulse-api.onrender.com
- **API Docs**: https://greenpulse-api.onrender.com/docs

---

## 🔧 If Backend Shows Error

Update CORS in `backend/main.py`:
```python
allow_origins=[
    "https://greenpulse-ai.vercel.app",
    "https://*.vercel.app",
    "http://localhost:3000"
]
```

Then push update:
```bash
git add .
git commit -m "Update CORS"
git push
```

---

## 📱 Test Your Deployment

1. Visit your Vercel URL
2. Go to Calculator page
3. Enter data and calculate
4. If it works → ✅ You're live!
5. If error → Check browser console

---

## 🆘 Common Issues

**Problem**: 503 Backend Error
**Fix**: Render free tier sleeps. First request wakes it (30 seconds)

**Problem**: CORS Error
**Fix**: Add your Vercel URL to backend CORS settings

**Problem**: White Screen
**Fix**: Check browser console, verify VITE_API_URL is set

---

## 🎉 You're Live!

Share your link:
- ✅ https://greenpulse-ai.vercel.app

**Total Time**: ~10 minutes
**Cost**: $0 (Free tier)
**Auto-Deploy**: Yes (on every push)
