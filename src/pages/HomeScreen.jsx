import { useNavigate } from 'react-router-dom'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import axios from 'axios'
import useAuthContext from '../hooks/useAuthContext'
import { useEffect, useState} from 'react'
import { baseUrl } from '../constants'
import { shortConfig } from '../utils/rxConfig'

const HomeScreen = () => {
  const { user, clearUser } = useAuthContext()
  const [modal, setModal] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    if(!user) navigate('/login')
  }, [user])

  const handleLogout = async (confirm=true) => {
    if (confirm && !window.confirm('Are you sure to logout?!')) return
    try {
      await axios.put(`${baseUrl}/auth/logout`, {}, shortConfig)
      clearUser()
      navigate('/login')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Box
        style={{
          position: 'fixed',
          top: '0',
          left: '0',
          height: 'fit-content',
          background: '#f4f4f4',
          width: '100%',
        }}
      >
        <Stack
          spacing={2}
          direction='row'
          style={{
            padding: '10px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <h3>{user?.name}</h3>
          <Button onClick={handleLogout} variant='contained'>
            Logout
          </Button>
        </Stack>
      </Box>
    </>
  )
}

export default HomeScreen
