import React, { useState } from 'react'
import { TextField, Button, Box, Container } from '@mui/material'
import { Link } from 'react-router-dom'
import {
  useLocation,
  // useNavigate
} from 'react-router-dom'
import register from '../../API/register'
import VerifyEmailButton from '../../components/VerifyEmailButton'

const RegisterPage = () => {
  const location = useLocation()
  const [formValues, setFormValues] = useState({
    name: '',
    email: location.state?.email,
    password: '',
  })

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
  })

  const validateForm = (errorArgs) => {
    let valid = true
    const newErrors = { ...errors }

    if (!formValues.name) {
      newErrors.name = 'Name is required'
      valid = false
    } else {
      newErrors.name = ''
    }

    if (!formValues.email) {
      newErrors.email = 'Email is required'
      valid = false
    } else if (
      !/\S+@\S+\.\S+/.test(formValues.email) ||
      errorArgs?.invalidEmail
    ) {
      newErrors.email = 'Email is invalid'
      valid = false
    } else if (errorArgs?.dupalicateEmail) {
      newErrors.email = 'Email is registered already'
      valid = false
    } else {
      newErrors.email = ''
    }

    if (!formValues.password) {
      newErrors.password = 'Password is required'
      valid = false
    } else if (formValues.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
      valid = false
    } else {
      newErrors.password = ''
    }

    setErrors(newErrors)
    return valid
  }

  // const [successAlertOpen, setSuccessAlertOpen] = useState(false)
  // const navigate = useNavigate()
  const handleOnSubmit = async (event) => {
    event.preventDefault()
    const isValid = validateForm()

    if (isValid) {
      try {
        const registerRes = await register(formValues)
        if (registerRes.status !== 201) {
          throw new Error('Register failed')
        }
        setVerifyEmailButtonOpen(true)
        // setSuccessAlertOpen(true)
        // navigate('/verifyEmail', { state: { email: formValues.email } })
        // setTimeout(() => {}, 2000)
      } catch (error) {
        if (error.response?.data?.message === 'User already exists') {
          validateForm({ dupalicateEmail: true })
        }
        if (error.response?.data?.message.includes('Invalid email format')) {
          validateForm({ invalidEmail: true })
        }
      }
    }
  }

  const handleOnChange = (event) => {
    const { name, value } = event.target
    setFormValues({
      ...formValues,
      [name]: value,
    })
  }

  const [verifyEmailButtonOpen, setVerifyEmailButtonOpen] = useState(false)

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#ffffff">
      <Container
        maxWidth="sm"
        sx={{
          borderRadius: '3px',
          padding: '25px 40px',
          boxShadow: 'rgba(0,0,0,0.1) 0 0 10px',
        }}>
        <form onSubmit={handleOnSubmit}>
          <h2 style={{ textAlign: 'center', fontSize: '45px' }}>Register</h2>
          <TextField
            label="Name"
            variant="outlined"
            margin="normal"
            fullWidth
            onChange={handleOnChange}
            name="name"
            type="text"
            error={Boolean(errors.name)}
            helperText={errors.name}
          />

          <TextField
            label="Email"
            variant="outlined"
            margin="normal"
            fullWidth
            onChange={handleOnChange}
            name="email"
            type="text"
            error={Boolean(errors.email)}
            defaultValue={location.state?.email}
            helperText={errors.email}
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
              Register
            </Button>
          )}
          <p style={{ textAlign: 'center' }}>
            <span>Already a member?</span>
            <Button
              component={Link}
              to="/login"
              variant="outlined"
              size="small"
              style={{ marginLeft: '10px' }}>
              Login
            </Button>
          </p>
        </form>
      </Container>
    </Box>
  )
}

export default RegisterPage
