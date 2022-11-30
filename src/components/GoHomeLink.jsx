import React from 'react'
import { Link } from 'react-router-dom'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { Box } from '@mui/system'

const GoHomeLink = () => {
  return (
    <Box sx={{position: 'fixed', top: '100px', left: '50px'}}>
      <Link to='/home'>
        <ArrowBackIosIcon />
      </Link>
    </Box>
  )
}

export default GoHomeLink