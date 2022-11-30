import './globals.css'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import LandingScreen from './pages/LandingScreen'
import SignUpScreen from './pages/auth/SignUpScreen'
import LoginScreen from './pages/auth/LoginScreen'
import HomeScreen from './pages/HomeScreen'
import AllMessages from './pages/AllMessages'
import NewMailScreen from './pages/NewMailScreen'
import MessagesScreen from './pages/MessagesScreen'

function App() {
  return (
    <Router>
      <Routes>
        <Route path={'/'} element={<LandingScreen />} />
        <Route path={'/signup'} element={<SignUpScreen />} />
        <Route path={'/login'} element={<LoginScreen />} />
        <Route path={'/home'} element={<HomeScreen />} />
        <Route path={'/all-messages'} element={<AllMessages />} />
        <Route path={'/new-mail'} element={<NewMailScreen />} />
        <Route path={'/messages/:id'} element={<MessagesScreen />} />
      </Routes>
    </Router>
  )
}

export default App
