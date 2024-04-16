import React, { useEffect, useState } from 'react'
import { TextField, Container, Alert, Snackbar } from '@mui/material'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { login } from '../../API/login'
import { useDispatch, useSelector } from 'react-redux'
import { login as loginAction } from '../../store/authSlice'
import VerifyEmailButton from '../../components/VerifyEmailButton'

const LoginPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const userState = useSelector((state) => state.auth)

  const [verifyEmailAlertOpen, setVerifyEmailAlertOpen] = useState(false)
  const [verifyEmailButtonOpen, setVerifyEmailButtonOpen] = useState(false)

  const [formValues, setFormValues] = useState({
    email: location.state?.email,
    password: '',
  })

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  })

  const isAuthenticated = userState.isAuthenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated])

  const validateForm = () => {
    let valid = true
    const newErrors = { ...errors }

    if (!formValues.email) {
      newErrors.email = 'Email is required'
      valid = false
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      newErrors.email = 'Email is invalid'
      valid = false
    } else {
      newErrors.email = ''
    }

    if (!formValues.password) {
      newErrors.password = 'Password is required'
      valid = false
    } else {
      newErrors.password = ''
    }

    setErrors(newErrors)
    return valid
  }

  const handleOnSubmit = async (event) => {
    event.preventDefault()
    const isValid = validateForm()
    if (!isValid) return
    try {
      const response = await login(formValues)
      dispatch(loginAction(response.data))
    } catch (error) {
      const err = error.response
      if (err.status === 401 && err.data.message === 'Email not verified') {
        setVerifyEmailButtonOpen(true)
        setVerifyEmailAlertOpen(true)
      }
      console.log(error)
    }
  }

  const handleOnChange = (event) => {
    const { name, value } = event.target
    setFormValues({
      ...formValues,
      [name]: value,
    })
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#ffffff">
      <Snackbar
        open={verifyEmailAlertOpen}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={5000}
        onClose={() => setVerifyEmailAlertOpen(false)}>
        <Alert severity={'error'}>
          Your email address hasn&apos;t been verified. <br />
          Please click the button below and verify through the link sent to your
          email
        </Alert>
      </Snackbar>
      <Container
        maxWidth="sm"
        sx={{
          borderRadius: '3px',
          padding: '25px 40px',
          boxShadow: 'rgba(0,0,0,0.1) 0 0 10px',
        }}>
        <form onSubmit={handleOnSubmit}>
          <h2 style={{ textAlign: 'center', fontSize: '45px' }}>Login</h2>
          <TextField
            label="Email"
            variant="outlined"
            margin="normal"
            fullWidth
            onChange={handleOnChange}
            name="email"
            type="text"
            error={Boolean(errors.email)}
            helperText={errors.email}
            defaultValue={location.state?.email}
          />

          <TextField
            label="Password"
            variant="outlined"
            margin="normal"
            fullWidth
            onChange={handleOnChange}
            name="password"
            type="password"
            error={Boolean(errors.password)}
            helperText={errors.password}
          />
          {verifyEmailButtonOpen ? (
            <VerifyEmailButton email={formValues.email} />
          ) : (
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              style={{ margin: '25px auto' }}>
              Login
            </Button>
          )}

          <p style={{ textAlign: 'center' }}>
            <span>Not a member?</span>
            <Button
              component={Link}
              to="/register"
              variant="outlined"
              size="small"
              style={{ marginLeft: '10px' }}>
              Register
            </Button>
          </p>
        </form>
      </Container>
    </Box>
  )
}

export default LoginPage
