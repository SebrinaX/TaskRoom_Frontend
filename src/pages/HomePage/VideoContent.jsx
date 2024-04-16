import React from 'react'
import './styles.css'
import { Button, Card, CardContent, TextField, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useNavigate } from 'react-router'

const StyledCard = styled(Card)(() => ({
  position: 'absolute',
  top: '100px',
  right: '10%',
  zIndex: 2,
  width: '348px',
  height: '354x',
  borderRadius: '12px',
  display: 'flex',
  flexDirection: 'column',
  padding: 1,
  '& .cardTitle': {
    fontSize: '24px',
    fontWeight: '500',
    lineHeight: '32px',
    marginBottom: '16px',
  },
  '& .cardContent': {
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '24px',
    marginBottom: '16px',
  },
  '& .MuiTextField-root': {
    marginBottom: '16px',
    width: '100%',
  },
  '& .MuiButton-root': {
    backgroundColor: '#0079BF',
    color: '#FFFFFF',
    fontSize: '16px',
    fontWeight: '700',
    lineHeight: '24px',
    padding: '8px 24px',
  },
}))

const VideoContent = () => {
	const navigate = useNavigate()
  const [email, setEmail] = React.useState('')
	const handleRegisterButtonClick = () => {
		navigate('/register', { state: { email } })
	}
  return (
    <StyledCard>
      <CardContent>
        <Typography className="cardTitle">
          TaskRoom brings all your tasks, teammates, and tools together
        </Typography>
        <Typography className="cardContent">
          Keep everything in the same place—even if your team isn&apos;t.
        </Typography>
        <TextField
          placeholder="Type your email..."
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
          <Button onClick={handleRegisterButtonClick}>Sign up - it&apos;s free</Button>
      </CardContent>
    </StyledCard>
  )
}

export default VideoContent
