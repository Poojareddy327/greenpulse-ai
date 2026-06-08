# 🚀 Quick Start Guide - GreenPulse AI

Get up and running in 5 minutes!

## Option 1: Standard Setup (Recommended)

### Step 1: Install Dependencies

**Frontend:**
```bash
cd frontend
npm install
```

**Backend:**
```bash
cd backend
pip install -r requirements.txt
```

### Step 2: Start Development Servers

**Terminal 1 - Frontend:**
```bash
cd frontend
npm run dev
```
✅ Frontend running at: http://localhost:3000

**Terminal 2 - Backend:**
```bash
cd backend
uvicorn main:app --reload
```
✅ Backend running at: http://localhost:8000
✅ API docs at: http://localhost:8000/docs

### Step 3: Test the App

Open http://localhost:3000 in your browser and:
1. Navigate to Calculator
2. Enter your environmental data
3. See your carbon footprint results!

---

## Option 2: Docker Setup (Advanced)

### Prerequisites
- Docker Desktop installed

### One Command to Rule Them All:
```bash
docker-compose up
```

This starts:
- Frontend at http://localhost:3000
- Backend at http://localhost:8000
- PostgreSQL database

---

## What You Can Do Now

### 🏠 Home Page
Beautiful landing page with stats and CTA

### 📊 Calculator
Calculate your carbon and water footprint

### 📈 Dashboard
View your sustainability trends and badges

### 🤖 AI Advisor
Get personalized eco-friendly recommendations

### 🎯 Challenges
Join sustainability challenges and earn points

### 📚 Learning Hub
Read articles about climate and sustainability

---

## Project Structure

```
greenpulse-ai/
├── frontend/           # React + Vite
│   ├── src/
│   │   ├── pages/     # Home, Calculator, Dashboard, etc.
│   │   ├── components/# Navbar, etc.
│   │   └── context/   # Auth context
│   └── package.json
│
├── backend/           # FastAPI
│   ├── main.py       # API endpoints
│   ├── database.py   # DB models
│   └── requirements.txt
│
└── README.md
```

---

## Next Steps

### For Local Development:
1. ✅ Everything is running!
2. 🔧 Customize the UI colors in `tailwind.config.js`
3. 🔧 Add real AI API in `backend/main.py`
4. 🔧 Set up Firebase auth

### For Production:
1. See [DEPLOYMENT.md](DEPLOYMENT.md)
2. Deploy frontend to Vercel
3. Deploy backend to Render
4. Connect PostgreSQL database

---

## Troubleshooting

### Port Already in Use?
```bash
# Kill process on port 3000
npx kill-port 3000

# Or change port in vite.config.js
server: { port: 3001 }
```

### Dependencies Not Installing?
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### API Not Connecting?
- Check backend is running on port 8000
- Check CORS settings in `backend/main.py`
- Verify `VITE_API_URL` in frontend

---

## Need Help?

- 📖 Read [SETUP.md](SETUP.md) for detailed instructions
- 🚀 Check [DEPLOYMENT.md](DEPLOYMENT.md) for production
- 🐛 Open an issue on GitHub

Happy coding! 🌱
