import Header from '../components/Header'
import React, { useEffect, useMemo, useState } from 'react'
import Box from '@mui/material/Box'
import { Autocomplete, Button, TextField, Typography } from '@mui/material'
import FullyCentered from '../components/FullyCentered'
import { Link } from 'react-router-dom'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import compact from 'lodash/compact'
import useMailsContext from '../hooks/useMailsContext'
import useAuthContext from '../hooks/useAuthContext'
import AlertBox from '../components/AlertBox'
import GoHomeLink from '../components/GoHomeLink'

const defs = { recipient: '', title: '', message: '' }

const NewMailScreen = ({}) => {
  const {user} = useAuthContext()
  const {users, mails, sendMail, success, resetState, loading} = useMailsContext()
  const [fields, setFields] = useState(defs);
  const [alert, setAlert] = useState('');

  useEffect(()=>{
    if (success) handleSuccess()
  }, [success])

  const handleSuccess = () => {
    setAlert('Mail sent successfully')
    resetState('success')
    setFields(defs)
  }

  const handleChange = (e) => {
    setFields({
      ...fields, 
      [e.target.name]:e.target.value
    })
  }

  const isValidated = () => {
    return compact(Object.values(fields)).length === 3
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!isValidated()) return
    sendMail({
      sender: user._id,
      recipient: fields.recipient._id,
      title: fields.title,
      body: fields.message,
    })
  }

  const recipientOptions = useMemo(() => {
    if (users.length < 1) return []
    return users.map((user) => ({ label: user.name, _id: user._id }))
  }, [users, mails])

  return (
    <>
      <Header />
      <Box
        sx={{
          margin: '80px 0',
          padding: '20px 50px',
        }}
      >
        <GoHomeLink/>
        <FullyCentered top='40%'>
          <Box sx={{ p: '20px 0' }}>
            <Typography fontWeight='500' fontSize='20px'>
              Your Message
            </Typography>
          </Box>
          <AlertBox severity='success'>{alert}</AlertBox>

          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Autocomplete
                disablePortal
                name='recipient'
                onChange={(_, newVal) =>
                  setFields({ ...fields, recipient: newVal })
                }
                value={fields.recipient}
                id='combo-box-demo'
                options={recipientOptions}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label='Recipient' />
                )}
              />
              <TextField
                id='outlined-basic'
                name='title'
                value={fields.title}
                onChange={handleChange}
                placeholer='Recipient'
                label='Title'
                variant='outlined'
              />
              <TextField
                id='outlined-basic'
                name='message'
                value={fields.message}
                onChange={handleChange}
                placeholer='Recipient'
                label='Message'
                variant='outlined'
                rows={3}
                multiline
              />
              <Button
                disabled={loading}
                type='submit'
                sx={{ width: '100%' }}
                variant='contained'
              >
                {loading ? 'Sending...' : 'Send'}
              </Button>
            </Box>
          </form>
        </FullyCentered>
      </Box>
    </>
  )
}

export default NewMailScreen