import * as React from 'react'
import Box from '@mui/material/Box'

const IconTitle = ({ icon, title, style }) => {
  return (
    <Box display={'flex'} gap={2} alignItems={'center'}>
      <div>{icon}</div>
      <div style={style}>{title}</div>
    </Box>
  )
}

export default IconTitle
