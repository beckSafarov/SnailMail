import { Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import {useMemo} from 'react'
import { useParams } from 'react-router-dom'
import useMailsContext from '../../hooks/useMailsContext'

const sampleMessages = [
  {
    author: 'John Doe',
    title: 'Hey what\'s up',
    date: 'May 20, 2022',
    body: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet, doloremque!'
  },
  {
    author: 'Robin Kruz',
    title: 'Hey what\'s up',
    date: 'May 20, 2022',
    body: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet, doloremque!'
  },
  {
    author: 'John Doe',
    title: 'Hey what\'s up',
    date: 'May 20, 2022',
    body: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet, doloremque!'
  },
]

const MessagesContainer = ({}) => {
  const {mails, users} = useMailsContext()
  const {id} = useParams()
  
  const mailsToDisplay = useMemo(() => {
    if(mails.length < 1) return []
    return mails[id].map(mail=>{
      const author = users.find((user=>user._id === mail.sender)).name
      const date = new Date(mail.date).toDateString()
      return {
        ...mail,
        author,
        date,
      }
    })
  },[mails, users])

  return (
    <Box
      style={{
        margin: '0 200px',
        height: '100%',
        padding: '20px 50px',
        overflowY: 'scroll',
      }}
    >
      <Stack gap={'5px'} style={{width: '100%'}}>
        {mailsToDisplay.map((msg) => (
          <Box
            key={msg._id}
            style={{
              flex: '1',
              display: 'flex',
              width: '100%',
              flexDirection: 'column',
              padding: '10px 20px',
            }}
          >
            <Box style={{display: 'flex', justifyContent: 'space-between'}}>
              <Typography fontSize='18px' fontWeight='500'>{msg.author}</Typography>
              <Typography color='#ccc' fontSize='14px'>
                {msg.date}
              </Typography>
            </Box>
            <p>{msg.body}</p>
          </Box>
        ))}
      </Stack>
    </Box>
  )
}

MessagesContainer.defaultProps = {
}

export default MessagesContainer