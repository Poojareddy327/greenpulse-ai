# Deployment Guide

## Frontend Deployment (Vercel)

### Prerequisites
- Vercel account
- GitHub repository

### Steps

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/greenpulse-ai.git
git push -u origin main
```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Vite
   - Set root directory to `frontend`
   - Click "Deploy"

3. **Environment Variables** (in Vercel dashboard)
```
VITE_API_URL=https://your-backend.onrender.com
VITE_FIREBASE_API_KEY=your_firebase_key
```

## Backend Deployment (Render)

### Prerequisites
- Render account
- GitHub repository

### Steps

1. **Push Backend to GitHub** (already done above)

2. **Create Web Service on Render**
   - Go to [render.com](https://render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - Name: `greenpulse-api`
     - Environment: `Python 3`
     - Region: Choose closest to users
     - Branch: `main`
     - Root Directory: `backend`
     - Build Command: `pip install -r requirements.txt`
     - Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

3. **Add Environment Variables**
```
DATABASE_URL=postgresql://...
GEMINI_API_KEY=your_api_key
DEBUG=False
```

## Database (Neon PostgreSQL)

### Steps

1. **Create Neon Account**
   - Go to [neon.tech](https://neon.tech)
   - Create new project
   - Copy connection string

2. **Add to Render**
   - Go to your Render service
   - Add `DATABASE_URL` environment variable
   - Paste Neon connection string

## Firebase Authentication Setup

1. **Create Firebase Project**
   - Go to [console.firebase.google.com](https://console.firebase.google.com)
   - Create new project
   - Enable Authentication → Email/Password

2. **Get Credentials**
   - Project Settings → General
   - Copy Web API Key
   - Add to Vercel environment variables

3. **Update Frontend Config**
   Create `frontend/src/firebase.js`:
```javascript
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
```

## Post-Deployment Checklist

- [ ] Frontend deployed on Vercel
- [ ] Backend deployed on Render
- [ ] Database connected (Neon)
- [ ] Firebase authentication configured
- [ ] Environment variables set
- [ ] CORS configured correctly
- [ ] API endpoints tested
- [ ] SSL/HTTPS enabled
- [ ] Custom domain configured (optional)

## Monitoring & Maintenance

- Use Vercel Analytics for frontend metrics
- Use Render metrics for backend monitoring
- Set up Neon database backups
- Monitor API usage and costs
- Update dependencies regularly

## Troubleshooting

### CORS Errors
Update backend `main.py`:
```python
allow_origins=["https://your-vercel-app.vercel.app"]
```

### Build Failures
- Check Node.js version (18+)
- Check Python version (3.9+)
- Verify all dependencies in package.json/requirements.txt

### Database Connection Issues
- Verify DATABASE_URL format
- Check Neon project status
- Ensure IP allowlist includes Render IPs
