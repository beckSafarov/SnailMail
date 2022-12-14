import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import useAuthContext from '../hooks/useAuthContext'
import SendMailButton from '../components/Home/SendMailButton'
import { trunc } from '../utils'
import Header from '../components/Header'
import FullyCentered from '../components/FullyCentered'
import { Typography } from '@mui/material'
import last from 'lodash/last'
import useMailsContext from '../hooks/useMailsContext'
import NothingMessage from '../components/NothingMessage'

const AllMessages = () => {
  const { user } = useAuthContext()
  const {users, mails} = useMailsContext()
  const navigate = useNavigate()
  console.log(mails)
  useEffect(() => {
    if (!user) navigate('/login')
  }, [user, mails])
  
  const mailsData = useMemo(() => {
    if(Object.keys(mails).length < 1 || users.length < 1) return []
    
    return Object.keys(mails).map((partnerId) => {
      console.log(partnerId)
      const partner = users.find((user) => user._id === partnerId)
      const lastMail = last(mails[partnerId])
      return {
        id: partner?._id,
        partner: partner?.name, 
        title: lastMail?.title,
        date: new Date(lastMail?.date)?.toDateString?.(),
        body: lastMail?.body,
      }
    })
  }, [mails, users])

  return (
    <>
      <Header />

      <Box
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          padding: '0 0',
          margin: '80px 0',
        }}
      >
        {mailsData.length < 1 && <NothingMessage />}
        {mailsData.map((msg) => (
          <Box
            key={msg.id}
            onClick={() => navigate(`/messages/${msg.id}`)}
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
            <h3 style={{ flex: 1 }}>{msg.partner}</h3>
            <h5 style={{ flex: 1 }}>{msg.title}</h5>
            <p style={{ flex: 3 }}>{trunc(msg.body, 100)}</p>
          </Box>
        ))}
      </Box>
      <SendMailButton />
    </>
  )
}

export default AllMessages
