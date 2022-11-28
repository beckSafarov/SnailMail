import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import Stack from '@mui/system/Stack'
import React from 'react'
import { trunc } from 'src/utils'

const samplePeople = ['John Doe', 'Tom Smith', 'Justin Time']
const sampleMessages = [
  {
    author: 'John Doe',
    message:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium, autem',
  },
  {
    author: 'Tom Smith',
    message:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium, autem',
  },
  {
    author: 'Justin Time',
    message:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium, autem',
  },
]

const Sidebar = ({}) => {
  return (
    <Stack
      style={{
        minHeight: '100%',
        background: '#f4f4f4',
        position: 'fixed',
        width: '200px',
      }}
    >
      {sampleMessages.map((msg, i) => (
        <Box
          key={i}
          style={{
            padding: '10px 20px',
            width: '100%',
            borderBottom: '1px solid #ccc',
            cursor: 'pointer',
          }}
        >
          <Typography fontWeight='500' fontSize='18px'>{msg.author}</Typography>
          <p>{trunc(msg.message, 40)}</p>
        </Box>
      ))}
    </Stack>
  )
}

Sidebar.defaultProps = {
  flex: 1,
}

export default Sidebar
