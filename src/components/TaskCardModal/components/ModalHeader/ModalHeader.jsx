import * as React from 'react'
import Grid from '@mui/material/Grid'
import DvrIcon from '@mui/icons-material/Dvr'
import NakedTextField from '../../../NakedTextField'
import IconTitle from '../IconTitle'
import ClearIcon from '@mui/icons-material/Clear'
import Button from '@mui/material/Button'
// import Paper from '@mui/material/Paper'

const ModalHeader = ({ onClose }) => {
  return (
    <Grid container direction="column">
      <Grid item>
        <span>
          <Grid
            container
            direction="row"
            justifyContent={'space-between'}
            alignItems={'center'}>
            <Grid item>
              <IconTitle
                icon={<DvrIcon sx={{ fontSize: '20px' }} />}
                title={
                  <NakedTextField fontSize={20} style={{ width: '100%' }} />
                }
                style={{ width: '600px' }}
              />
            </Grid>
            <Grid item>
              <Button onClick={onClose} variant="text" sx={{ color: 'black' }}>
                <ClearIcon sx={{ fontSize: '20px' }} />
              </Button>
            </Grid>
          </Grid>
        </span>
      </Grid>
      <Grid item>
        <span
          style={{ marginLeft: '38px', fontSize: '14px', color: '#44546f' }}>
          in list <u>Current Sprint</u>
        </span>
      </Grid>
    </Grid>
  )
}

export default ModalHeader
