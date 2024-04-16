import React from 'react'

import {
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  Typography,
  Avatar,
} from '@mui/material'
import { PersonAdd, Settings, Logout } from '@mui/icons-material'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'

import { logout } from '../../../store/authSlice'
import stringAvatar from '../../../utils/stringAvatar'
import { Box } from '@mui/system'
import { styled } from '@mui/material/styles'

// const UserNameTypography = styled(Typography)((theme) => ({

const AccountSection = styled(Box)(({ theme }) => ({
  margin: '0 10px 15px 10px',
  '& .title': {
    color: theme.palette.grey[600],
    fontWeight: 'Bold',
    padding: '0',
  },
  '& .profile': {
    display: 'flex',
    alignItems: 'center',
    marginLeft: theme.spacing(1),
    '& .MuiAvatar-root': {
      width: 40,
      height: 40,
      marginRight: theme.spacing(1),
    },
    '& .userName': {
      fontSize: '1rem',
      // fontWeight: 'bold',
    },
    '& .email': {
      fontSize: '0.8rem',
      color: theme.palette.grey[600],
    },
  },
}))


const AvatarMenu = ({ anchorEl, open, handleClose, userProfile }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onLogout = () => {
    dispatch(logout())
    navigate('/')
  }
  return (
    <Menu
      anchorEl={anchorEl}
      id="account-menu"
      open={open}
      onClose={handleClose}
      onClick={handleClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          borderRadius: '8px',
          mt: 1.5,
          '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 20,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      <AccountSection>
        <Typography
          variant="overline"
          className='title'
        >
          Account
        </Typography>
        <Box className='profile'>
          <Avatar {...stringAvatar(`${userProfile.username}`)} />
          <Box>
            <Typography className="userName">{userProfile.username}</Typography>
            <Typography className="email">{userProfile.email}</Typography>
          </Box>
        </Box>
      </AccountSection>
      <Divider sx={{margin: '8px 0'}}/>
      <MenuItem onClick={handleClose}>
        <ListItemIcon>
          <PersonAdd fontSize="small" />
        </ListItemIcon>
        Add another account
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <ListItemIcon>
          <Settings fontSize="small" />
        </ListItemIcon>
        Settings
      </MenuItem>
      <Divider />
      <MenuItem onClick={onLogout}>
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  )
}

export default AvatarMenu
