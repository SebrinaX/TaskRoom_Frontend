import * as React from 'react'
import TextField from '@mui/material/TextField'

const NakedTextField = ({ fontSize, sx, style }) => {
  return (
    <div>
      <TextField
        sx={sx}
        variant="standard"
        style={style}
        multiline
        maxRows={2}
        InputProps={{ disableUnderline: true, style: { fontSize } }}
      />
    </div>
  )
}
export default NakedTextField
