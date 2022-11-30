import Typography from '@mui/material/Typography'
import React from 'react'
import FullyCentered from './FullyCentered'

const NothingMessage = () => {
  return (
    <FullyCentered top='40%'>
      <Typography color='gray' fontSize='30px' fontWeight='300'>
        No Messages Yet
      </Typography>
    </FullyCentered>
  )
}

export default NothingMessage