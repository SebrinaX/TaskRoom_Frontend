import React, { useState, useEffect, useRef } from 'react'
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Avatar,
  Link,
  Modal,
  TextField,
  InputLabel,
  // Backdrop,
} from '@mui/material'
import SpaceDashboardTwoToneIcon from '@mui/icons-material/SpaceDashboardTwoTone'
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import { useSelector, useDispatch } from 'react-redux'
import { login } from '../../store/authSlice'
import http from '../../utils/axios'
import stringAvatar from '../../utils/stringAvatar'
import AvatarMenu from './components/AvatarMenu'
import ProjectMenu from './components/ProjectMenu'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { useNavigate } from 'react-router'
import CreateBoardImageList from './components/CreateBoardImageList'
import FullWidthButton from './components/FullWidthButton'

export default function TaskBoardHeader({ children }) {
  const [anchorEl, setAnchorEl] = useState(null)
  const [projectAnchorEl, setProjectAnchorEl] = useState(null)

  const { isAuthenticated, user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSubModalOpen, setIsSubModalOpen] = useState(false)
  const [boardTitle, setBoardTitle] = useState('')
  const [isTitleValid, setIsTitleValid] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
    setIsSubModalOpen(false)
  }
  const closeModal = () => {
    setIsModalOpen(false)
  }

  const openSubModal = () => {
    setIsSubModalOpen(true)
    setIsModalOpen(false)
  }
  const closeSubModal = () => {
    setIsSubModalOpen(false)
    setIsModalOpen(true)
  }

  const buttonRect = useRef(null)
  const [modalLeft, setModalLeft] = useState(0)
  const [modalTop, setModalTop] = useState(0)

  useEffect(() => {
    if (buttonRect.current) {
      const buttonRectLeft = buttonRect.current.getBoundingClientRect().left
      const buttonRectTop = buttonRect.current.getBoundingClientRect().top
      setModalLeft(buttonRectLeft)
      setModalTop(buttonRectTop)
    }
  }, [isModalOpen])

  const [isUserLoaded, setIsUserLoaded] = useState(false)
  const fetchUserProfile = async () => {
    try {
      const response = await http('/users/profile', {
        method: 'GET',
      })
      if (response.status === 200) {
        const { data: userProfile } = response
        dispatch(login({ ...user, ...userProfile }))
      }
      setIsUserLoaded(true)
    } catch (error) {
      console.log(error)
    }
  }

  const [isProjectLoaded, setIsProjectLoaded] = useState(false)
  const fetchProjects = async () => {
    try {
      const response = await http(`/users/projects`, {
        method: 'GET',
      })
      dispatch({ type: 'project/updateProject', payload: response.data })
      setIsProjectLoaded(true)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      fetchUserProfile()
      fetchProjects()
    } else {
      setIsUserLoaded(true)
      setIsProjectLoaded(true)
    }
  }, [])

  if (!isUserLoaded || !isProjectLoaded) {
    return null
  }

  // const open = Boolean(anchorEl)
  // const handleClick = (event) => {
  // 	setAnchorEl(event.currentTarget)
  // }
  // const handleClose = () => {
  // 	setAnchorEl(null)
  // }

  const createNewProject = async () => {
    try {
      const response = await http('/projects', {
        method: 'POST',
        data: {
          name: boardTitle,
        },
      })

      console.log('Response from server:', response)

      if (response.status === 201) {
        const { data: newProject } = response
        const projectId = newProject.message.split(' ')[0]
        closeSubModal()
        closeModal()
        fetchUserProfile()
        fetchProjects()
        navigate('/project', { state: { projectId } })
      }
    } catch (error) {
      console.error('Error creating new project:', error)
    }
  }

  return (
    <Box>
      <AppBar
        sx={{
          backgroundColor: 'rgba(255,255,255,0.5)',
          backdropFilter: 'blur(5px)',
          elevation: '2',
          borderBottom: 'none',
          // position: 'relative',
        }}>
        <Toolbar sx={{ paddingLeft: 0, paddingRight: 0 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              flexGrow: 2,
              alignItems: 'center',
            }}>
            <Button>
              <Avatar
                src="/images/TR_logo.png"
                alt="TR_Logo"
                variant="rounded"
              />
              <Typography variant="h6" sx={{ ml: 1, color: '#42526e' }}>
                TaskRoom
              </Typography>
            </Button>
            {isAuthenticated ? (
              <Box
                sx={{
                  display: 'flex',
                }}>
                <Button
                  sx={{ color: '#42526e' }}
                  onClick={(event) => setProjectAnchorEl(event.currentTarget)}>
                  Project
                  <KeyboardArrowDownIcon fontSize="small" />
                </Button>
                <Box>
                  <Button
                    ref={buttonRect}
                    onClick={openModal}
                    sx={{ color: '#42526e', backgroundColor: '#fff' }}>
                    Create
                  </Button>
                  <Modal
                    open={isModalOpen}
                    onClose={closeModal}
                    closeAfterTransition>
                    <Box
                      sx={{
                        position: 'absolute',
                        top: `${modalTop}px`,
                        left: `${modalLeft}px`,
                        transform: 'translateY(55px)',
                        backgroundColor: 'background.paper',
                        boxShadow: 24,
                        padding: 2,
                        borderRadius: 4,
                        width: 304,
                        height: 'auto',
                        zIndex: 3,
                      }}>
                      <Box
                        onClick={openSubModal}
                        variant="text"
                        sx={{
                          cursor: 'pointer',
                          color: '#42526e',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'left',
                          alignContent: 'center',
                        }}>
                        <Box
                          sx={{
                            display: 'flex',
                            alignContent: 'center',
                            mb: 1,
                          }}>
                          <SpaceDashboardTwoToneIcon />
                          <Typography
                            variant="subtitle1"
                            sx={{ ml: 1, color: '#42526e' }}>
                            Create board
                          </Typography>
                        </Box>
                        <Typography variant="body2" sx={{ color: '#42526e' }}>
                          A board is made up of cards ordered on lists. Use it
                          to manage projects, track information, or organize
                          anything
                        </Typography>
                      </Box>
                    </Box>
                  </Modal>
                  <Modal
                    open={isSubModalOpen}
                    onClose={() => {
                      closeSubModal()
                      closeModal()
                    }}
                    closeAfterTransition>
                    <Box
                      sx={{
                        position: 'absolute',
                        top: `${modalTop}px`,
                        left: `${modalLeft}px`,
                        // transform: 'translateY(13%)',
                        transform: 'translateY(55px)',
                        backgroundColor: 'background.paper',
                        boxShadow: 24,
                        padding: 1,
                        borderRadius: 4,
                        width: 304,
                        height: 'auto',
                        zIndex: 3,
                      }}>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginLeft: 0,
                          marginRight: 0,
                        }}>
                        <Button
                          onClick={closeSubModal}
                          startIcon={<ArrowBackIosRoundedIcon margin={0} />}
                          sx={{
                            color: '#42526e',
                            margin: 0,
                            minWidth: '0px',
                          }}></Button>
                        <Typography variant="body1" sx={{ color: '#42526e' }}>
                          Create board
                        </Typography>
                        <Button
                          onClick={() => {
                            closeSubModal()
                            closeModal()
                          }}
                          endIcon={<CloseRoundedIcon margin={0} />}
                          sx={{
                            color: '#42526e',
                            margin: 0,
                            minWidth: '0px',
                          }}></Button>
                      </Box>
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        margin={2}
                        backgroundColor="#9254de">
                        <img src="https://trello.com/assets/14cda5dc635d1f13bc48.svg" />
                      </Box>
                      <Typography
                        variant="body2"
                        sx={{ color: '#42526e', padding: 1 }}>
                        Background
                        <CreateBoardImageList />
                      </Typography>
                      <Box padding={1}>
                        <InputLabel sx={{ color: '#42526e', fontSize: '14px' }}>
                          Border title <span style={{ color: 'red' }}>*</span>
                        </InputLabel>
                        <TextField
                          required
                          id="outlined-required"
                          helperText="👋 Board title is required"
                          fullWidth
                          size="small"
                          focused
                          FormHelperTextProps={{
                            sx: { alignSelf: 'flex-start', marginLeft: 0 },
                          }}
                          value={boardTitle}
                          onChange={(e) => {
                            const inputTitle = e.target.value
                            setBoardTitle(inputTitle)
                            setIsTitleValid(inputTitle.trim() !== '')
                          }}
                          error={!isTitleValid}
                          autoComplete="off"
                        />
                      </Box>
                      <Box display="flex">
                        <FullWidthButton
                          disable={!isTitleValid}
                          onClick={createNewProject}>
                          Create
                        </FullWidthButton>
                      </Box>
                    </Box>
                  </Modal>
                </Box>
              </Box>
            ) : (
              ''
            )}
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            {isAuthenticated ? (
              <Tooltip title="Account settings">
                <IconButton
                  onClick={(event) => setAnchorEl(event.currentTarget)}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={anchorEl ? 'account-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={anchorEl ? 'true' : undefined}>
                  {user.username ? (
                    <Avatar {...stringAvatar(`${user.username}`)} />
                  ) : (
                    ''
                  )}
                </IconButton>
              </Tooltip>
            ) : (
              <Link href="/login">
                <Button sx={{ color: '#42526e' }}>Login</Button>
              </Link>
            )}
          </Box>
        </Toolbar>
        <AvatarMenu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          handleClose={() => setAnchorEl(null)}
          userProfile={user}
        />
        <ProjectMenu
          anchorEl={projectAnchorEl}
          open={Boolean(projectAnchorEl)}
          handleClose={() => setProjectAnchorEl(null)}
          userId={user.id}
        />
      </AppBar>
      {children}
    </Box>
  )
}
