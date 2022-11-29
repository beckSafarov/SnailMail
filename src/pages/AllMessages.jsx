import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import useAuthContext from '../hooks/useAuthContext'
import SendMailButton from '../components/Home/SendMailButton'
import sampleMessages from '../data/sampleMessages'
import { trunc } from '../utils'
import Header from '../components/Header'


const AllMessages = () => {
  const { user, clearUser } = useAuthContext()
  const [modal, setModal] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) navigate('/login')
  }, [user])

  return (
    <>
      <Header/>
      <Box
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          padding: '0 0',
          margin: '80px 0',
        }}
      >
        {sampleMessages.map((msg, i) => (
          <Box
            key={i}
            sx={{
              width: '100%',
              padding: '10px 20px',
              cursor: 'pointer',
              display: 'flex',
              '&:hover': {
                background: '#eee',
              },
            }}
          >
            <h3 style={{ flex: 1 }}>{msg.author}</h3>
            <h5 style={{ flex: 1 }}>{msg.title}</h5>
            <p style={{ flex: 3 }}>{trunc(msg.body, 100)}</p>
          </Box>
        ))}
      </Box>
      <SendMailButton
        onClick={() => navigate('/new-mail')}
      />
    </>
  )
}

export default AllMessages
