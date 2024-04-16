import React from 'react'
import VideoBackground from './VideoBackground'
import WaveOverlay from './WaveOverlay'
import VideoContent from './VideoContent'

import './styles.css'
import { Box } from '@mui/material'
import { useSelector } from 'react-redux'

const HomePage = () => {
  const { isAuthenticated } = useSelector((state) => state.auth)
  return (
    <Box
      sx={{
        position: 'relative',
        height: '500px',
      }}>
      <VideoBackground />
      {!isAuthenticated && <VideoContent />}
      <WaveOverlay />
    </Box>
  )
}

export default HomePage
