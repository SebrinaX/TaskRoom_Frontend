import * as React from 'react'
import Button from '@mui/material/Button'
import RemoveIcon from '@mui/icons-material/Remove'

const DeleteButton = ({ children }) => {
  return (
    <>
      <Button
        variant="contained"
        startIcon={<RemoveIcon />}
        sx={{
          width: '100%',
          backgroundColor: '#ca3521',
          boxShadow: 'none',
          textTransform: 'none',
          justifyContent: 'flex-start',
          '&:hover': {
            backgroundColor: '#AE2A19',
            boxShadow: 'none',
          },
          '&:press': {
            backgroundColor: '#601E16',
            boxShadow: 'none',
          },
        }}>
        {children}
      </Button>
    </>
  )
}

export default DeleteButton
