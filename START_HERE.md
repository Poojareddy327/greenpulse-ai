# 🎯 START HERE - GreenPulse AI

Welcome to **GreenPulse AI** - Your AI-powered sustainability tracker! 🌍

## 📦 What You Have

A complete modern web application with:
- ✅ React frontend with beautiful dark theme
- ✅ FastAPI backend with REST API
- ✅ Calculator for carbon & water footprint
- ✅ AI Advisor for eco recommendations
- ✅ Dashboard with analytics & charts
- ✅ Gamified challenges system
- ✅ Learning hub with articles
- ✅ Authentication ready

---

## 🚀 Quick Start (2 Steps!)

### Step 1: Install Dependencies

Open terminal in this folder and run:

**For Windows (PowerShell):**
```powershell
# Install frontend dependencies
cd frontend
npm install

# Go back and install backend
cd ..
cd backend
pip install -r requirements.txt
```

**For Mac/Linux:**
```bash
# Install frontend dependencies
cd frontend && npm install

# Install backend
cd ../backend && pip install -r requirements.txt
```

### Step 2: Start the Application

**Open TWO terminals:**

**Terminal 1 - Frontend:**
```bash
cd frontend
npm run dev
```
✅ Opens at: http://localhost:3000

**Terminal 2 - Backend:**
```bash
cd backend
uvicorn main:app --reload
```
✅ Opens at: http://localhost:8000

---

## 🎨 What to Explore

### 1. Home Page (http://localhost:3000)
- Beautiful landing page
- Statistics showcase
- Feature highlights

### 2. Calculator (http://localhost:3000/calculator)
- Enter your habits:
  - Car miles per week
  - Electricity usage
  - Water consumption
  - Diet type
- Get instant results:
  - Carbon footprint
  - Water footprint
  - Sustainability score
  - Recommendations

### 3. Dashboard (http://localhost:3000/dashboard)
- Monthly trend charts
- Category breakdown
- Achievement badges
- Progress tracking

### 4. AI Advisor (http://localhost:3000/ai-advisor)
- Chat with AI eco advisor
- Get personalized tips
- Quick suggestions

### 5. Challenges (http://localhost:3000/challenges)
- Join eco challenges
- Track progress
- Earn points
- View completed challenges

### 6. Learning Hub (http://localhost:3000/learning)
- Read climate articles
- Sustainability guides
- Eco-friendly tips

---

## 🛠️ Tech Stack

**Frontend:**
- React 18 + Vite ⚡
- Tailwind CSS 🎨
- Framer Motion 🎬
- Recharts 📊
- React Router 🛣️

**Backend:**
- FastAPI 🚀
- Python 3.11 🐍
- SQLAlchemy 💾
- PostgreSQL ready 🗄️

---

## 📁 Project Structure

```
greenpulse-ai/
├── frontend/               ← React App
│   ├── src/
│   │   ├── pages/         ← All pages (Home, Calculator, etc.)
│   │   ├── components/    ← Reusable components (Navbar)
│   │   ├── context/       ← Auth context
│   │   └── App.jsx        ← Main app
│   └── package.json
│
├── backend/               ← FastAPI Server
│   ├── main.py           ← API endpoints
│   ├── database.py       ← Database models
│   └── requirements.txt
│
└── Documentation files
```

---

## 🎯 Features Checklist

- ✅ Home Page with stats
- ✅ Environmental Impact Calculator
- ✅ Analytics Dashboard with charts
- ✅ AI Eco Advisor chat
- ✅ Sustainability Challenges
- ✅ Learning Hub with articles
- ✅ Login/Register pages
- ✅ Authentication context
- ✅ Responsive design
- ✅ Dark theme with glassmorphism
- ✅ Smooth animations
- ✅ API endpoints
- ✅ Database models

---

## 🔧 Customization

### Change Colors
Edit `frontend/tailwind.config.js`:
```javascript
colors: {
  primary: '#22C55E',    // Change green
  secondary: '#14B8A6',  // Change teal
  bgDark: '#030712',     // Change background
}
```

### Modify Calculator Logic
Edit `backend/main.py` - look for `calculate_impact` function

### Add New Pages
1. Create file in `frontend/src/pages/YourPage.jsx`
2. Add route in `frontend/src/App.jsx`
3. Add link in `frontend/src/components/Navbar.jsx`

---

## 📚 Documentation

- **QUICKSTART.md** - Fastest way to start
- **SETUP.md** - Detailed setup instructions
- **FEATURES.md** - Complete feature documentation
- **ARCHITECTURE.md** - Technical architecture
- **DEPLOYMENT.md** - Deploy to production
- **CONTRIBUTING.md** - How to contribute

---

## 🐛 Troubleshooting

### "Port 3000 already in use"
```bash
npx kill-port 3000
# Or change port in frontend/vite.config.js
```

### "Module not found"
```bash
cd frontend
rm -rf node_modules
npm install
```

### Backend not connecting
- Make sure backend is running on port 8000
- Check `http://localhost:8000/docs` for API docs
- Verify CORS settings in `backend/main.py`

### Python errors
```bash
cd backend
pip install -r requirements.txt --upgrade
```

---

## 🎓 Next Steps

### For Learning:
1. ✅ Run the app and explore all features
2. 📝 Read FEATURES.md to understand components
3. 🏗️ Check ARCHITECTURE.md for technical details
4. 🎨 Customize the theme and colors

### For Development:
1. 🔧 Integrate real AI API (Gemini/OpenAI)
2. 🔐 Set up Firebase Authentication
3. 💾 Connect PostgreSQL database
4. 🚀 Deploy to production (see DEPLOYMENT.md)

### For Production:
1. 📖 Follow DEPLOYMENT.md
2. 🌐 Deploy frontend to Vercel
3. 🖥️ Deploy backend to Render
4. 🗄️ Set up Neon PostgreSQL

---

## 💡 Tips

- Use **Ctrl+C** in terminal to stop servers
- Check `http://localhost:8000/docs` for interactive API docs
- Frontend auto-reloads on file changes
- Backend auto-reloads with `--reload` flag
- Use browser DevTools (F12) to debug

---

## 🆘 Need Help?

1. Check the documentation files
2. Review the code comments
3. Test API at `http://localhost:8000/docs`
4. Open browser console (F12) for errors

---

## 🌟 Features to Add

Want to extend the project? Here are ideas:

- [ ] Real-time notifications
- [ ] Social sharing
- [ ] Export reports as PDF
- [ ] Mobile app version
- [ ] Multiplayer challenges
- [ ] Carbon offset marketplace
- [ ] IoT device integration
- [ ] Community leaderboards

---

## 🎉 You're Ready!

Everything is set up and ready to run. Open those two terminals, start the servers, and visit **http://localhost:3000** to see your app!

**Happy coding!** 🌱💚

---

## 📞 Support

If you encounter issues:
- Read the error messages carefully
- Check all documentation files
- Verify Node.js and Python are installed
- Make sure both servers are running

**Made with 💚 for a greener planet!**
