# GitHub Setup

## Step 1: Create Repository on GitHub

1. Go to: https://github.com/new
2. Repository name: `greenpulse-ai`
3. Make it **Public**
4. **DON'T** check "Initialize with README"
5. Click "Create repository"

## Step 2: Push Your Code

Run these commands in PowerShell (in your project folder):

```powershell
git remote remove origin
git remote add origin https://github.com/Poojareddy327/greenpulse-ai.git
git branch -M main
git push -u origin main
```

Done! Your code will be on GitHub.

## Step 3: Deploy

**Backend (Render):**
1. Go to https://render.com
2. New → Web Service
3. Connect GitHub repo
4. Root: `backend`
5. Build: `pip install -r requirements.txt`
6. Start: `uvicorn main:app --host 0.0.0.0 --port $PORT`

**Frontend (Vercel):**
1. Go to https://vercel.com
2. Import project
3. Root: `frontend`
4. Add env variable: `VITE_API_URL=https://your-render-url.onrender.com`
5. Deploy!
