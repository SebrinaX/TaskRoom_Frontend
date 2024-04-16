import React from 'react'
import { Button } from '@mui/material'
import { verifyEmailHttp } from '../../API/verifyEmail'
import { Alert, Snackbar } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'

const VerifyEmailButton = ({ email }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const [alertOpen, setAlertOpen] = React.useState(false)
  const [buttonDisabled, setButtonDisabled] = React.useState(false)
  const [buttonText, setButtonText] = React.useState(
    `Click to send verification email to ${email}`
  )
  const [alertMessage, setAlertMessage] = React.useState({
    duration: 10,
    severity: 'success',
    message: `Verification email sent to ${email},
  please check you mail box`,
  })

  const handleOnClick = async () => {
    setButtonDisabled(true)
    const res = await verifyEmailHttp(email)
    if (res?.data?.message === 'Email already verified') {
      setAlertMessage({
        duration: 3,
        severity: 'warning',
        message: 'Email already verified, redirecting to login page',
      })
      setAlertOpen(true)
      return
    }
    setAlertOpen(true)
    for (let i = 0; i < 60; i++) {
      setTimeout(() => {
        setButtonText(`Please wait ${60 - i} seconds to send another email`)
      }, i * 1000)
    }
    setTimeout(() => {
      setButtonDisabled(false)
      setButtonText(`Click to send verification email to ${email}`)
    }, 60000)
  }

  const handleAlertClose = () => {
    setAlertOpen(false)
    alertMessage.message ===
      'Email already verified, redirecting to login page' &&
      navigate(location.pathname === '/login' ? 0 : '/login')
  }

  return (
    <React.Fragment>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        style={{ margin: '25px auto', textTransform: 'none' }}
        onClick={handleOnClick}
        disabled={buttonDisabled}>
        {buttonText}
      </Button>
      <Snackbar
        open={alertOpen}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={alertMessage.duration * 1000}
        onClose={handleAlertClose}>
        <Alert severity={alertMessage.severity}>{alertMessage.message}</Alert>
      </Snackbar>
    </React.Fragment>
  )
}

export default VerifyEmailButton
