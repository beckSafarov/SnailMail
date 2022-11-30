import { Box } from '@mui/material'
import React from 'react'
import Header from '../components/Header'
import MessagesContainer from '../components/Home/MessagesContainer'
import SendMailButton from '../components/Home/SendMailButton'

const MessagesScreen = () => {
  return (
    <>
      <Header />
      <Box
        style={{margin: '80px 0',}}
      >
        <MessagesContainer />
      </Box>
      <SendMailButton/>
    </>
  )
}

export default MessagesScreen