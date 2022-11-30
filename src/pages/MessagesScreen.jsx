import { Box } from '@mui/material'
import React from 'react'
import GoHomeLink from '../components/GoHomeLink'
import Header from '../components/Header'
import MessagesContainer from '../components/Home/MessagesContainer'
import SendMailButton from '../components/Home/SendMailButton'

const MessagesScreen = () => {
  return (
    <>
      <Header />
      <GoHomeLink/>
      <Box style={{margin: '80px 0',}}>
        <MessagesContainer />
      </Box>
      <SendMailButton/>
    </>
  )
}

export default MessagesScreen