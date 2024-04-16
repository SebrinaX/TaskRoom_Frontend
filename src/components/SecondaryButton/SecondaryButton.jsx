import * as React from 'react'
import Button from '@mui/material/Button'

const SecondaryButton = ({ children, onClick, style }) => {
  return (
    <>
      <Button
        style={style}
        onClick={onClick}
        variant="contained"
        sx={{
          backgroundColor: '#091e420f',
          color: '#44546F',
          boxShadow: 'none',
          textTransform: 'none',
          '&:hover': {
            backgroundColor: '#091E4224',
            boxShadow: 'none',
          },
          '&:press': {
            backgroundColor: '#091E424F',
            boxShadow: 'none',
          },
        }}>
        {children}
      </Button>
    </>
  )
}

export default SecondaryButton
