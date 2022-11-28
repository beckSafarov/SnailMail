import React from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'fit-content',
  bgcolor: 'background.paper',
  // border: '1px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
}

const SendMailModal = ({open, handleClose}) => {
  return (
    <Modal
      hideBackdrop
      open={open}
      onClose={handleClose}
      aria-labelledby='child-modal-title'
      aria-describedby='child-modal-description'
    >
      <Box sx={{ ...style}}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto voluptate
        aliquid nostrum rerum velit labore eum, nemo excepturi omnis in
        doloremque ratione, dolorem similique esse ab perspiciatis, dicta animi
        tenetur.
      </Box>
    </Modal>
  )
}

SendMailModal.defaultProps = {
  open: false,
  onClose() {},
}

export default SendMailModal