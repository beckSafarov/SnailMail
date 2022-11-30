import './globals.css'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import LandingScreen from './pages/LandingScreen'
import SignUpScreen from './pages/auth/SignUpScreen'
import LoginScreen from './pages/auth/LoginScreen'
import AllMessages from './pages/AllMessages'
import NewMailScreen from './pages/NewMailScreen'
import MessagesScreen from './pages/MessagesScreen'
import useAuthContext from './hooks/useAuthContext'
import { useEffect } from 'react'
import useMailsContext from './hooks/useMailsContext'
import Loading from './components/Loading'

function App() {
  const {user} = useAuthContext()
  const {getUsers, getMails, loading, users, mails, checkInbox} = useMailsContext()

  useEffect(() => {
    if (user) {
      handleGetData()
      setInterval(updateMails, 5000)
    }
  }, [user]);

  const handleGetData = async () => {
    await getUsers()
    await getMails(user._id)
  }

  const updateMails = async()=>{
    await getUsers()
    await checkInbox(user._id)
  }
  return (
    <>
    {loading && <Loading/>}
      <Router>
        <Routes>
          <Route path={'/'} element={<LandingScreen />} />
          <Route path={'/signup'} element={<SignUpScreen />} />
          <Route path={'/login'} element={<LoginScreen />} />
          <Route path={'/home'} element={<AllMessages />} />
          <Route path={'/new-mail'} element={<NewMailScreen />} />
          <Route path={'/messages/:id'} element={<MessagesScreen />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
