# 🏗️ GreenPulse AI - System Architecture

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     CLIENT LAYER                         │
│  ┌──────────────────────────────────────────────────┐   │
│  │           React SPA (Vite + Tailwind)            │   │
│  │  • Home • Calculator • Dashboard • AI Advisor    │   │
│  │  • Challenges • Learning • Auth                  │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                           │
                    HTTPS/REST API
                           │
┌─────────────────────────────────────────────────────────┐
│                    API GATEWAY LAYER                     │
│  ┌──────────────────────────────────────────────────┐   │
│  │              FastAPI Backend                      │   │
│  │  • /calculate-impact  • /ai-advisor              │   │
│  │  • /challenges        • /dashboard               │   │
│  │  • Authentication & Authorization                │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                           │
                           ├───────────────────┐
                           │                   │
┌──────────────────────────────┐   ┌──────────────────────┐
│      DATA LAYER              │   │    AI/ML LAYER       │
│  ┌────────────────────────┐  │   │  ┌────────────────┐  │
│  │  PostgreSQL/SQLite     │  │   │  │  Gemini API    │  │
│  │  • Users               │  │   │  │  or            │  │
│  │  • Impact Records      │  │   │  │  OpenAI API    │  │
│  │  • Challenges          │  │   │  └────────────────┘  │
│  └────────────────────────┘  │   └──────────────────────┘
└──────────────────────────────┘
                           │
┌──────────────────────────────────────────────────────────┐
│                  EXTERNAL SERVICES                        │
│  • Firebase Auth  • Vercel (Frontend)  • Render (Backend) │
└──────────────────────────────────────────────────────────┘
```

---

## Frontend Architecture

### Component Hierarchy

```
App.jsx
├── AuthProvider (Context)
│   └── Router
│       ├── Navbar
│       │   ├── Logo
│       │   ├── Navigation Links
│       │   └── User Menu
│       │
│       └── Routes
│           ├── Home
│           │   ├── Hero Section
│           │   ├── Stats Grid
│           │   ├── Features
│           │   └── CTA Section
│           │
│           ├── Calculator
│           │   ├── Transportation Section
│           │   ├── Energy Section
│           │   ├── Water Section
│           │   ├── Diet & Waste Section
│           │   └── Results Display
│           │
│           ├── Dashboard
│           │   ├── Stats Cards
│           │   ├── Monthly Trends Chart
│           │   ├── Category Breakdown Chart
│           │   └── Badges Display
│           │
│           ├── AIAdvisor
│           │   ├── Chat Container
│           │   ├── Message Bubbles
│           │   ├── Suggestions
│           │   └── Input Box
│           │
│           ├── Challenges
│           │   ├── Stats Overview
│           │   ├── Tab Navigation
│           │   ├── Active Challenges Grid
│           │   └── Completed Challenges Grid
│           │
│           ├── Learning
│           │   ├── Featured Articles
│           │   └── Category Sections
│           │
│           ├── Login
│           └── Register
```

### State Management

```javascript
// Global State (Context API)
AuthContext
├── user (object | null)
├── loading (boolean)
├── login(email, password)
├── register(email, password, name)
└── logout()

// Local State (useState)
Calculator
├── formData (object)
└── result (object | null)

AIAdvisor
├── messages (array)
└── input (string)

Challenges
└── activeTab (string)

Dashboard
└── userData (object)
```

### Data Flow

```
User Action
    │
    ↓
Component Event Handler
    │
    ↓
API Call (axios/fetch)
    │
    ↓
Backend Endpoint
    │
    ↓
Process & Calculate
    │
    ↓
Database Query (if needed)
    │
    ↓
Return Response
    │
    ↓
Update Component State
    │
    ↓
Re-render UI
```

---

## Backend Architecture

### API Layer Structure

```python
main.py
├── FastAPI App Instance
├── CORS Middleware
├── Route Handlers
│   ├── GET  /              # Health check
│   ├── POST /api/calculate-impact
│   ├── POST /api/ai-advisor
│   ├── GET  /api/challenges
│   └── GET  /api/dashboard/{user_id}
│
└── Pydantic Models
    ├── ImpactCalculation
    ├── ImpactResult
    └── AIQuery

database.py
├── SQLAlchemy Engine
├── Session Maker
├── Base Model
└── Database Models
    ├── User
    ├── ImpactRecord
    └── Challenge
```

### Request/Response Flow

```
1. Client Request
   POST /api/calculate-impact
   Body: {
     carMiles: 100,
     electricity: 300,
     ...
   }

2. FastAPI Receives
   └── Pydantic validates data
       └── Passes to handler function

3. Handler Processes
   ├── Extract values
   ├── Apply calculation formulas
   ├── Generate recommendations
   └── Build response object

4. Response Sent
   {
     carbon: 180.5,
     water: 2800,
     score: 88,
     rating: "Excellent",
     recommendations: [...]
   }

5. Client Receives
   └── Update state
       └── Display results
```

---

## Database Schema

### PostgreSQL Tables

```sql
-- Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Impact Records Table
CREATE TABLE impact_records (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    carbon FLOAT NOT NULL,
    water FLOAT NOT NULL,
    score FLOAT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Challenges Table
CREATE TABLE challenges (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    challenge_id INTEGER NOT NULL,
    progress INTEGER DEFAULT 0,
    completed BOOLEAN DEFAULT FALSE,
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP NULL
);

-- Indexes
CREATE INDEX idx_user_email ON users(email);
CREATE INDEX idx_impact_user ON impact_records(user_id);
CREATE INDEX idx_challenge_user ON challenges(user_id);
```

### Entity Relationships

```
User (1) ──< (Many) ImpactRecord
User (1) ──< (Many) Challenge
```

---

## API Endpoints Specification

### 1. Calculate Impact
```http
POST /api/calculate-impact
Content-Type: application/json

Request:
{
  "carMiles": 100,
  "publicTransport": 5,
  "flights": 10,
  "electricity": 300,
  "heating": 50,
  "showerMinutes": 10,
  "laundry": 3,
  "diet": "mixed",
  "recycling": "sometimes"
}

Response:
{
  "carbon": 180.5,
  "water": 2800,
  "score": 88,
  "rating": "Excellent",
  "recommendations": [
    "Consider using public transport...",
    "Switch to LED bulbs...",
    "Reduce shower time..."
  ]
}
```

### 2. AI Advisor
```http
POST /api/ai-advisor
Content-Type: application/json

Request:
{
  "message": "How can I reduce my carbon footprint?",
  "userId": "user123"
}

Response:
{
  "message": "To reduce your carbon footprint:\n\n1. 🚲 ...",
  "tips": ["Use renewable energy", "Fly less"],
  "impact": "These changes can reduce emissions by 30-40%"
}
```

### 3. Get Challenges
```http
GET /api/challenges

Response:
{
  "active": [
    {
      "id": 1,
      "title": "Plastic-Free Week",
      "description": "Avoid single-use plastics for 7 days",
      "progress": 0,
      "goal": 7,
      "points": 250,
      "participants": 1250
    }
  ],
  "completed": []
}
```

### 4. Get Dashboard
```http
GET /api/dashboard/{user_id}

Response:
{
  "monthlyData": [
    {"month": "Jan", "carbon": 320, "water": 4200, "score": 65},
    ...
  ],
  "currentStats": {
    "carbon": 180,
    "water": 2800,
    "score": 88,
    "points": 1250
  },
  "badges": [...]
}
```

---

## Security Architecture

### Authentication Flow
```
1. User submits credentials
   ↓
2. Frontend → Firebase Authentication
   ↓
3. Firebase returns JWT token
   ↓
4. Store token in localStorage
   ↓
5. Include token in API requests
   ↓
6. Backend verifies token
   ↓
7. Authorize & process request
```

### Security Measures
- HTTPS encryption
- CORS configuration
- JWT token validation
- Input sanitization
- SQL injection prevention (ORM)
- Rate limiting (future)
- API key protection

---

## Deployment Architecture

### Production Setup

```
┌──────────────────────────────────────────┐
│           Vercel (Frontend CDN)           │
│   • Static files                          │
│   • Edge caching                          │
│   • Auto SSL                              │
└──────────────────────────────────────────┘
                    │
                    │ API Proxy
                    ↓
┌──────────────────────────────────────────┐
│           Render (Backend)                │
│   • FastAPI server                        │
│   • Auto scaling                          │
│   • Health checks                         │
└──────────────────────────────────────────┘
                    │
                    ↓
┌──────────────────────────────────────────┐
│       Neon PostgreSQL (Database)          │
│   • Managed service                       │
│   • Auto backups                          │
│   • Connection pooling                    │
└──────────────────────────────────────────┘
```

### Environment Separation
- **Development**: localhost, SQLite
- **Staging**: Test deployments
- **Production**: Vercel + Render + Neon

---

## Performance Optimization

### Frontend
- Code splitting by route
- Lazy loading images
- Memoized components
- Debounced inputs
- Chart virtualization

### Backend
- Database connection pooling
- Response caching
- Async/await operations
- Efficient queries
- Pagination

### Network
- CDN for static assets
- Gzip compression
- HTTP/2
- Request batching
- WebSocket (future)

---

## Monitoring & Logging

### Frontend Monitoring
- Vercel Analytics
- Error tracking
- Performance metrics
- User sessions

### Backend Monitoring
- Render logs
- API response times
- Error rates
- Database queries

### Alerts
- High error rates
- Slow responses
- Database issues
- Security events
