import React, { useState } from 'react'
import { Box, Typography, Button } from '@mui/material'
import { FormControl, FormHelperText, Input, Textarea } from '@mui/joy'
import CheckIcon from '@mui/icons-material/Check'
import http from '../../utils/axios'
import { styled } from '@mui/material/styles'

const StyledBox = styled(Box)(() => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',

  '& .MuiFormControl-root': {
    display: 'flex',
    flexDirection: 'row',
    '& .MuiInput-root': {
      color: 'inherit',
      width: '100%',
      padding: '10px 2px',
      '--joy-focus-thickness': '1px',
      lineHeight: '1.5',
    },
    '& .MuiTextarea-root': {
      color: 'inherit',
      width: '100%',
      padding: '10px 2px',
      '--joy-focus-thickness': '1px',
      lineHeight: '1.5',
    },
    '& .MuiButton-root': {
      padding: '0',
      minWidth: 'auto',
    },
  },
  '& .MuiFormHelperText-root': {
    color: 'RED',
  },
  '& .MuiTypography-root': {
    margin: '10px 0',
    padding: '0 2px',
    width: 'fit-content',
    cursor: 'text',
  },
}))

const generateHelperText = (validation, text) => {
  if (validation.required && text.length === 0) {
    return `${validation.name} is required`
  }
  if (validation.min && text.length < validation.min) {
    return `The minimum length of ${validation.name} is ${validation.min}`
  }
  if (validation.max && text.length > validation.max) {
    return `The maximum length of ${validation.name} is ${validation.max}`
  }
  return ''
}

const EditableText = ({
  className,
  state,
  setState,
  submitHttpConfig,
  validation,
  textarea,
}) => {
  const [text, setText] = useState(state)
  const [editing, setEditing] = useState(false)
  const [helperText, setHelperText] = useState('')
  const handleOnChange = (event) => {
    setText(event.target.value)
    setHelperText(generateHelperText(validation, event.target.value))
  }
  const handleCancel = () => {
    setText(state)
    setState(state)
    setHelperText('')
    setEditing(false)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (text === state) {
      handleCancel()
      return
    }
    try {
      if (helperText) {
        setHelperText('')
        handleCancel()
        return
      }
      Object.entries(submitHttpConfig.data).forEach(
        ([key, value]) =>
          value === undefined && (submitHttpConfig.data[key] = text)
      )
      await http(submitHttpConfig.endPoint, {
        method: submitHttpConfig.method,
        data: submitHttpConfig.data,
      })
      setState(text)
      setHelperText('')
      setEditing(false)
    } catch (error) {
      console.log(error)
    }
  }

  const handleBlur = (event) => {
    if (!event.nativeEvent.relatedTarget?.matches('button[type="submit"]')) {
      handleCancel(event)
    }
  }

  return (
    <StyledBox className={className}>
      {editing ? (
        <form onSubmit={handleSubmit}>
          <FormControl>
            {textarea ? (
              <Textarea
                autoFocus
                variant="soft"
                size="sm"
                color={`${helperText ? 'danger' : 'primary'}`}
                defaultValue={text}
                onChange={handleOnChange}
                onBlur={handleBlur}
                onKeyDown={(event) =>
                  event.key === 'Escape' && handleCancel(event)
                }
                maxRows={3}
              />
            ) : (
              <Input
                autoFocus
                variant="soft"
                size="sm"
                color={`${helperText ? 'danger' : 'primary'}`}
                defaultValue={text}
                onChange={handleOnChange}
                onBlur={handleBlur}
                onKeyDown={(event) =>
                  event.key === 'Escape' && handleCancel(event)
                }
              />
            )}
            <Button
              type="submit"
              disabled={!!helperText}
              sx={{ zIndex: '2300' }}>
              <CheckIcon />
            </Button>
          </FormControl>
          {!!helperText && <FormHelperText>{helperText}</FormHelperText>}
        </form>
      ) : (
        <Box>
          <Typography className="columnTitle" onClick={() => setEditing(true)}>
            {state}
          </Typography>
        </Box>
      )}
    </StyledBox>
  )
}

export default EditableText
