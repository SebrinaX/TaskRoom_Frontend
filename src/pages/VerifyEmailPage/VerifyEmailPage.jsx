import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Alert, Snackbar } from '@mui/material'
import http from '../../utils/axios'

const VerifyEmailPage = () => {
  const { token } = useParams()
  const navigate = useNavigate()
  const [alertOpen, setAlertOpen] = React.useState(false)
  const [alert, setAlert] = React.useState({
    duration: 2,
    severity: 'info',
    message: `Verifying your email, please wait...`,
  })

  const verifyEmail = async () => {
    try {
      const res = await http('/auth/verifyEmail', {
        method: 'PATCH',
        data: { token },
      })
      if (res.status === 200) {
        setAlert({
          duration: 3,
          severity: 'success',
          message: `Your email has been verified successfully, redirecting to login page`,
        })
      }
    } catch (err) {
      setAlert({
        duration: 5,
        severity: 'error',
        message: `Failed to verify your email, please try again later. 
        Redirecting to login page...`,
      })
      console.log(err)
      setTimeout(() => {
        navigate('/login')
      }, 5000)
    }
  }

  useEffect(() => {
    setAlertOpen(true)
    verifyEmail()
  }, [])

  const handleAlertClose = () => {
    setAlertOpen(false)
    if (
      alert?.message ===
      'Your email has been verified successfully, redirecting to login page'
    ) {
      navigate('/login')
    }
  }
  if (!alert?.severity) {
    return null
  }
  return (
    <Snackbar
      open={alertOpen}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      autoHideDuration={alert.duration * 1000}
      onClose={handleAlertClose}>
      <Alert severity={alert.severity}>{alert.message}</Alert>
    </Snackbar>
  )
}

export default VerifyEmailPage
