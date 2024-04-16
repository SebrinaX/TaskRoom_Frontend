import * as React from 'react'
import Button from '@mui/material/Button'

const PrimaryButton = ({ children, onClick, style }) => {
  return (
    <>
      <Button
        style={style}
        onClick={onClick}
        variant="contained"
        sx={{
          boxShadow: 'none',
          textTransform: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        }}>
        {children}
      </Button>
    </>
  )
}

export default PrimaryButton
