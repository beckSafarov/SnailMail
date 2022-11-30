import { Fab, Tooltip } from '@mui/material'
import { Box } from '@mui/system'
import SendIcon from '@mui/icons-material/Send'
import { useNavigate } from 'react-router-dom'

const SendMailButton = ({}) => {
  const navigate = useNavigate()
  return (
    <Box style={{ position: 'fixed', bottom: '30px', right: '40px' }}>
      <Tooltip title='Send a Mail'>
        <Fab
          color='primary'
          aria-label='new message'
          style={{ width: '80px', height: '80px' }}
          onClick={()=>navigate('/new-mail')}
        >
          <SendIcon style={{ fontSize: '40px' }} />
        </Fab>
      </Tooltip>
    </Box>
  )
}

export default SendMailButton