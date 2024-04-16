import React from 'react'
import './styles.css'
import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

const StyledBox = styled(Box)(() => ({
	position: 'absolute',
  top: '-64px',
	zIndex: '-100',
  '& .background-video': {
    width: '100vw',
		height: '544px',
		objectFit: 'cover',
		
		// height: '100vh',
  },
}))

const VideoBackground = () => {
  return (
    <StyledBox className="video-background-container">
      <video autoPlay loop muted className="background-video">
        <source src="/videos/colorfulBook.mp4" type="video/mp4" />
      </video>
    </StyledBox>
  )
}

export default VideoBackground
