import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Calculator from './pages/Calculator'
import Dashboard from './pages/Dashboard'
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
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/comparison" element={<CarbonComparison />} />
            <Route path="/offsets" element={<CarbonOffsets />} />
            <Route path="/ai-advisor" element={<AIAdvisor />} />
            <Route path="/challenges" element={<Challenges />} />
            <Route path="/learning" element={<Learning />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
