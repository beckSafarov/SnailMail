import React from 'react'
import Box from '@mui/material/Box'
import useAuthContext from '../hooks/useAuthContext'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { baseUrl } from '../constants'
import { shortConfig } from '../utils/rxConfig'
import Stack from '@mui/system/Stack'
import Button from '@mui/material/Button'


const Header = () => {
  const { user, clearUser } = useAuthContext()
  const navigate = useNavigate()
  
  const handleLogout = async (confirm = true) => {
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
          <Link to='/home'>
            <h3>{user?.name}</h3>
          </Link>
          <Button onClick={handleLogout} variant='contained'>
            Logout
          </Button>
        </Stack>
      </Box>
    </>
  )
}

export default Header