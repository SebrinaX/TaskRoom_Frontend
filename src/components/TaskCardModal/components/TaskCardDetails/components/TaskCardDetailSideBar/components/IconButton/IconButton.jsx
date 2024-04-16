import * as React from 'react'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

const IconButton = ({ icon, text }) => {
  return (
    <Button
      variant="contained"
      style={{ marginTop: '10px', padding: '5px 0px 0 5px', boxShadow: 'none' }}
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        width: '85%',
        color: 'black',
        backgroundColor: '#091E420F',
        fontSize: '14px',
        ':hover': {
          backgroundColor: '#091E4224',
        },
        ':select': { backgroundColor: '#091E424F' },
      }}>
      <Box display={'flex'} gap={1} alignItems={'center'}>
        <div>{icon}</div>
        <div>{text}</div>
      </Box>
    </Button>
  )
}

export default IconButton
