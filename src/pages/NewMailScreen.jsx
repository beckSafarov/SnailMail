import Header from '../components/Header'
import React, { useState } from 'react'
import Box from '@mui/material/Box'
import { Autocomplete, Button, TextField, Typography } from '@mui/material'
import sampleMessages from 'src/data/sampleMessages'
import { Stack } from '@mui/system'
import FullyCentered from '../components/FullyCentered'
import { Link } from 'react-router-dom'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import compact from 'lodash/compact'

const recipientOptions = ['John Doe', 'Tom Smith', 'Begzod Safarov']

const NewMailScreen = ({}) => {
  const [fields, setFields] = useState({recipient: '', title: '', message: ''});


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
    if(!isValidated()) return
    console.log(fields)
  }

  return (
    <>
      <Header />
      <Box
        sx={{
          margin: '80px 0',
          padding: '20px 50px',
        }}
      >
        <Link to='/all-messages'>
          <ArrowBackIosIcon/>
        </Link>
        <FullyCentered top='40%'>
          <Box sx={{ p: '20px 0' }}>
            <Typography fontWeight='500' fontSize='20px'>
              Your Message
            </Typography>
          </Box>
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
              <Button type='submit' sx={{ width: '100%' }} variant='contained'>
                Send
              </Button>
            </Box>
          </form>
        </FullyCentered>
      </Box>
    </>
  )
}

export default NewMailScreen