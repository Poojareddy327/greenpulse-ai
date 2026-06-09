import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Calculator from './pages/Calculator'
import Dashboard from './pages/Dashboard'
import Analytics from './pages/Analytics'
import AIAdvisor from './pages/AIAdvisor'
import Challenges from './pages/Challenges'
import Learning from './pages/Learning'
import CarbonOffsets from './pages/CarbonOffsets'
import CarbonComparison from './pages/CarbonComparison'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-dark">
          <Navbar />
          <main id="main-content" role="main" tabIndex="-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/calculator" element={<Calculator />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/comparison" element={<CarbonComparison />} />
              <Route path="/offsets" element={<CarbonOffsets />} />
              <Route path="/ai-advisor" element={<AIAdvisor />} />
              <Route path="/challenges" element={<Challenges />} />
              <Route path="/learning" element={<Learning />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
