# 🧪 Testing Guide - GreenPulse AI

## Manual Testing Checklist

### 🏠 Home Page
- [ ] Page loads without errors
- [ ] Stats cards display correctly
- [ ] Animations play smoothly
- [ ] CTA buttons navigate properly
- [ ] Features section displays
- [ ] Responsive on mobile
- [ ] All icons render

### 📊 Calculator Page
- [ ] Form accepts numeric input
- [ ] Dropdown menus work
- [ ] Calculate button triggers calculation
- [ ] Results display correctly
- [ ] Carbon footprint shows
- [ ] Water footprint shows
- [ ] Sustainability score displays
- [ ] Recommendations appear
- [ ] Works with zero values
- [ ] Works with large values

**Test Cases:**

**Test 1 - Low Impact User:**
```
Input:
- Car miles: 20
- Public transport: 10
- Flights: 2
- Electricity: 150
- Heating: 20
- Shower: 5
- Laundry: 2
- Diet: Vegan
- Recycling: Always

Expected:
- Low carbon footprint (~100-150 kg)
- Low water usage (~2000-2500 L)
- High score (85-95)
- Rating: Excellent
```

**Test 2 - High Impact User:**
```
Input:
- Car miles: 200
- Public transport: 0
- Flights: 20
- Electricity: 500
- Heating: 100
- Shower: 20
- Laundry: 10
- Diet: Meat-heavy
- Recycling: Rarely

Expected:
- High carbon footprint (>400 kg)
- High water usage (>5000 L)
- Low score (<50)
- Rating: Needs Improvement
```

### 📈 Dashboard Page
- [ ] Stat cards display
- [ ] Line chart renders
- [ ] Bar chart renders
- [ ] Trends show correctly
- [ ] Categories display
- [ ] Badges render
- [ ] Locked badges are dimmed
- [ ] Hover effects work
- [ ] Charts are responsive
- [ ] Tooltips appear on hover

### 🤖 AI Advisor Page
- [ ] Initial message displays
- [ ] Suggestion chips render
- [ ] Can type in input
- [ ] Send button works
- [ ] Enter key sends message
- [ ] Messages appear in chat
- [ ] AI responses display
- [ ] Scroll works in chat
- [ ] Suggestions are clickable
- [ ] Chat bubbles styled correctly

**Test Queries:**
- "How can I reduce my carbon footprint?"
- "What are easy eco-friendly habits?"
- "Suggest a weekly sustainability goal"
- "Tell me about water conservation"
- Random text

### 🎯 Challenges Page
- [ ] Challenge cards display
- [ ] Tabs switch correctly
- [ ] Progress bars work
- [ ] Participant count shows
- [ ] Points display
- [ ] Icons render
- [ ] Completed tab works
- [ ] Stats boxes show
- [ ] Hover effects work

### 📚 Learning Page
- [ ] Featured articles show
- [ ] Category cards display
- [ ] Article lists appear
- [ ] Icons render correctly
- [ ] Read time displays
- [ ] Hover effects work
- [ ] All categories visible

### 🔐 Authentication
- [ ] Login page renders
- [ ] Can enter email/password
- [ ] Register page renders
- [ ] Can enter name/email/password
- [ ] Form validation works
- [ ] Login redirects to dashboard
- [ ] Register redirects to dashboard
- [ ] User name displays in navbar
- [ ] Logout works
- [ ] Session persists on refresh

### 🧭 Navigation
- [ ] Logo links to home
- [ ] All nav links work
- [ ] Active page highlighted
- [ ] Hover effects work
- [ ] User menu displays
- [ ] Logout button works
- [ ] Mobile view (if responsive menu added)

---

## API Testing

### Using Swagger UI (http://localhost:8000/docs)

#### 1. Health Check
```http
GET /
Expected: {"message": "Welcome to GreenPulse AI API"}
```

#### 2. Calculate Impact
```http
POST /api/calculate-impact
Body:
{
  "carMiles": 100,
  "electricity": 300,
  "showerMinutes": 10,
  "diet": "mixed",
  "recycling": "sometimes"
}

Expected: 
{
  "carbon": 180.5,
  "water": 2800,
  "score": 88,
  "rating": "Excellent",
  "recommendations": [...]
}
```

#### 3. AI Advisor
```http
POST /api/ai-advisor
Body:
{
  "message": "How can I reduce my carbon footprint?",
  "userId": "test123"
}

Expected:
{
  "message": "...",
  "tips": [...],
  "impact": "..."
}
```

#### 4. Get Challenges
```http
GET /api/challenges

Expected:
{
  "active": [...],
  "completed": []
}
```

#### 5. Get Dashboard
```http
GET /api/dashboard/user123

Expected:
{
  "monthlyData": [...],
  "currentStats": {...},
  "badges": [...]
}
```

---

## Performance Testing

### Frontend
- [ ] Page loads in < 2 seconds
- [ ] Images load properly
- [ ] No console errors
- [ ] No console warnings
- [ ] Animations are smooth (60fps)
- [ ] No layout shifts

### Backend
- [ ] API responds in < 500ms
- [ ] All endpoints return 200
- [ ] No server errors
- [ ] Handles invalid input
- [ ] CORS works

---

## Browser Compatibility

Test on:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

---

## Responsive Design Testing

### Breakpoints to Test:
- [ ] Mobile: 375px width
- [ ] Mobile: 414px width
- [ ] Tablet: 768px width
- [ ] Tablet: 1024px width
- [ ] Desktop: 1280px width
- [ ] Desktop: 1920px width

### Elements to Check:
- [ ] Navigation adapts
- [ ] Cards stack properly
- [ ] Text is readable
- [ ] Buttons are tappable
- [ ] Charts resize
- [ ] Forms are usable

---

## Accessibility Testing

- [ ] Can navigate with keyboard
- [ ] Tab order is logical
- [ ] Focus indicators visible
- [ ] Screen reader friendly
- [ ] Color contrast is sufficient
- [ ] Alt text on images
- [ ] ARIA labels present

---

## Error Handling

### Test Error Cases:
- [ ] Backend server down
- [ ] Network timeout
- [ ] Invalid API response
- [ ] Empty form submission
- [ ] Invalid email format
- [ ] Negative numbers in calculator
- [ ] Very large numbers in calculator

---

## Security Testing

- [ ] XSS prevention
- [ ] SQL injection prevention (ORM)
- [ ] CORS configured correctly
- [ ] No API keys in frontend
- [ ] Environment variables used
- [ ] HTTPS in production

---

## Load Testing (Optional)

Use tools like Apache JMeter or k6:

```javascript
// Sample k6 test
import http from 'k6/http';

export default function() {
  http.post('http://localhost:8000/api/calculate-impact', {
    carMiles: 100,
    electricity: 300,
    // ... other fields
  });
}
```

---

## Automated Testing (Future)

### Frontend (Jest + React Testing Library)
```bash
npm test
```

### Backend (Pytest)
```bash
pytest
```

---

## Bug Reporting Template

```markdown
**Bug Title:** Clear, descriptive title

**Steps to Reproduce:**
1. Go to '...'
2. Click on '...'
3. Enter '...'
4. See error

**Expected Behavior:**
What should happen

**Actual Behavior:**
What actually happens

**Screenshots:**
If applicable

**Environment:**
- OS: Windows/Mac/Linux
- Browser: Chrome 120
- Screen size: 1920x1080
```

---

## Testing Tools

- **Browser DevTools** (F12)
- **React DevTools** (Chrome Extension)
- **Lighthouse** (Performance audit)
- **Postman** (API testing)
- **Swagger UI** (Interactive API docs)

---

## Pre-Deployment Checklist

- [ ] All tests pass
- [ ] No console errors
- [ ] No broken links
- [ ] Images optimized
- [ ] Environment variables set
- [ ] API keys secured
- [ ] Database connected
- [ ] HTTPS enabled
- [ ] Error tracking configured
- [ ] Analytics set up

---

**Happy Testing!** 🧪✅
