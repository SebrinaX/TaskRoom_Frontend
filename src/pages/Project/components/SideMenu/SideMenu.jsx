import React from 'react' // useEffect, useState
import { Box, Drawer, IconButton, Typography, Divider } from '@mui/material'
import { styled } from '@mui/material/styles'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import OutsideClick from '../../../../hooks/OutsideClick'
import EditableText from '../../../../components/EditableText'
import { useDispatch, useSelector } from 'react-redux'
import { updateProjectTitle } from '../../../../store/projectSlice'
import { List, ListItem } from '@mui/joy'

const SideMenuBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  position: 'relative',
  backgroundColor: 'rgba(255,255,255,0.5)',
  backdropFilter: 'blur(5px)',
  '& .MuiDrawer-root': {
    width: '240px',
    flexShrink: 0,
    marginTop: '48px',
    '& .MuiDrawer-paper': {
      width: '240px',
      border: 'none',
      boxSizing: 'border-box',
      top: 'auto !important',
      backgroundColor: 'inherit',
    },
  },
  '& .MuiList-root': {
    display: 'flex',
    flexDirection: 'column',
    '& .MuiDivider-root': {
      margin: '10px 0',
    },
    '& .projectTitle': {
      width: '95%',
    },
    '& .MuiListItem-root': {
      padding: '8px 8px',
      flexDirection: 'column',
      alignItems: 'flex-start',
      cursor: 'default',

      '& .MuiListItem-root': {
        width: '100%',
        '&:hover': {
          backgroundColor: theme.palette.grey[300],
          cursor: 'pointer',
        },
        '& .MuiTypography-root': {
          fontWeight: '350',
        },
        color: theme.palette.grey[600],
      },
    },
  },
  '& .projectDesc': {
    '& .MuiTypography-root': {
      paddingRight: '20px',
      margin: '0',
      fontSize: '0.8rem',
      color: theme.palette.grey[500],
      wordBreak: 'break-all',
    },
  },
  '& .toggleMenuButton': {
    position: 'absolute',
    color: '#000',
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: '16px 16px',
    backdropFilter: 'blur(5px)',
    right: '-16px',
    top: '8%',
    zIndex: theme.zIndex.drawer + 1,
    '&:hover': {
      backgroundColor: '#fff',
    },
    '& .MuiSvgIcon-root': {
      fontSize: '1rem',
    },
  },
}))

const DrawerHeader = styled('div')(() => ({
  padding: '10px 2px',
}))

const menuList = [
  {
    name: 'Project Settings',
    items: [
      {
        name: 'Settings',
        action: '/settings',
      },
      {
        name: 'Background',
        action: '/Background',
      },
    ],
  },
  {
    name: 'User Settings',
    items: [
      {
        name: 'Members',
        action: '/members',
      },
      {
        name: 'Invite',
        action: '/invite',
      },
    ],
  },
]

const SideMenu = ({ sideMenuOpen, toggleMenu, projectId }) => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.auth.user)

  const onProjectTitleChange = (update) => {
    dispatch(updateProjectTitle({ projectId, update }))
  }

  const projectData = useSelector((state) => state.project.projects[projectId])
  if (!projectData) return null
  return (
    <SideMenuBox key={projectId}>
      <OutsideClick
        onClickOutside={() => {
          toggleMenu(false)
        }}
        className="clickOutSide">
        <IconButton
          className="toggleMenuButton"
          variant="contained"
          onClick={() => {
            toggleMenu(!sideMenuOpen)
          }}>
          {sideMenuOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
        <Drawer variant="persistent" anchor="left" open={sideMenuOpen}>
          <DrawerHeader>
            <List>
              {user.owned_projects.includes(projectId) ? (
                <ListItem>
                  <EditableText
                    className="projectTitle"
                    state={projectData.name}
                    submitHttpConfig={{
                      endPoint: `/projects/${projectId}`,
                      data: { name: undefined },
                      method: 'PATCH',
                    }}
                    setState={onProjectTitleChange}
                    validation={{
                      required: true,
                      min: 3,
                      max: 30,
                      name: 'Project Title',
                    }}
                  />
                  <EditableText
                    className="projectDesc"
                    state={projectData.profile}
                    submitHttpConfig={{
                      endPoint: `/projects/${projectId}`,
                      data: { profile: undefined },
                      method: 'PATCH',
                    }}
                    setState={(update) =>
                      dispatch({
                        type: 'project/updateProjectDesc',
                        payload: { projectId, update },
                      })
                    }
                    validation={{
                      required: true,
                      min: 0,
                      max: 200,
                      name: 'Project Description',
                    }}
                    textarea={true}
                  />
                </ListItem>
              ) : (
                <Typography
                  sx={{ margin: '10px 0', padding: '0 2px' }}
                  className="projectTitle">
                  {projectData.name}
                </Typography>
              )}
              <Divider variant="middle" />
              {menuList.map((section) => (
                <ListItem key={section.name}>
                  <Typography>{section.name}</Typography>
                  {section.items.map((item) => (
                    <ListItem key={item.name}>
                      <Typography>{item.name}</Typography>
                    </ListItem>
                  ))}
                </ListItem>
              ))}
            </List>
          </DrawerHeader>
        </Drawer>
      </OutsideClick>
    </SideMenuBox>
  )
}

export default SideMenu
