import React from 'react'

import { Menu, MenuItem, Divider, Typography, Box, Avatar } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import stringAvatar from '../../../utils/stringAvatar'

const StyledMenu = styled((props) => <Menu {...props} />)(({ theme }) => ({
  '& .MuiPaper-root': {
    // overflow: 'ellipsis',
    marginLeft: '5px',
    width: '350px',
    borderRadius: '8px',
  },
  '& .MuiPaper-root:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '30px',
    height: '10px',
    width: '10px',
    backgroundColor: '#fff',
    transform: 'translateY(-50%) rotate(45deg)',
  },
  '& .sectionName': {
    color: theme.palette.grey[600],
    fontWeight: 'Bold',
    marginLeft: '10px',
  },
  '& .Typography-root': {
    width: '300px',
    wordWrap: 'break-word',
  },
  '& .MuiMenuItem-root': {
    width: '100%',
    display: 'flex',
    '& .MuiAvatar-root': {
      marginRight: '8px',
    },
    '& .MuiBox-root': {
      textOverflow: 'ellipsis',
      maxWidth: '270px',
    },
  },
  '& .projectDescription': {
    fontSize: '0.8rem',
    color: theme.palette.grey[600],
  },
}))

const ProjectMenu = ({ anchorEl, open, handleClose }) => {
  const navigate = useNavigate()
  const projects = useSelector((state) => state.project.projects)
  const {
    isAuthenticated,
    user: { joined_projects, owned_projects },
  } = useSelector((state) => state.auth)

  if (!isAuthenticated) return null

  const menuData = [
    {
      sectionName: 'Created Projects',
      projectItems: owned_projects,
    },
    {
      sectionName: 'Joined Projects',
      projectItems: joined_projects,
    },
  ]
  const emptyProjects = menuData.every(
    (section) => section.projectItems.length === 0
  )

  return (
    <StyledMenu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      onClick={handleClose}>
      {emptyProjects ? (
        <MenuItem disabled>
          <Typography className="projectName">
            You have no projects, try to create one
          </Typography>
        </MenuItem>
      ) : (
        menuData.map(
          (section) =>
            section.projectItems.length > 0 && (
              <Box key={section.sectionName}>
                {menuData.indexOf(section) !== 0 &&
                  section.projectItems.length > 0 && <Divider />}
                <Typography className="sectionName" variant="overline">
                  {section.sectionName.toUpperCase()}
                </Typography>
                {section.projectItems.map((projectId) => {
                  const project = projects[projectId]
                  if (!project) return null
                  return (
                    <MenuItem
                      key={projectId}
                      onClick={() =>
                        navigate('/project', { state: { projectId } })
                      }>
                      <Avatar
                        variant="rounded"
                        {...stringAvatar(`${project.name}`)}
                      />
                      <Box>
                        <Typography className="projectName">
                          {project.name}
                        </Typography>
                        <Typography className="projectDescription" noWrap>
                          {project.profile}
                        </Typography>
                      </Box>
                    </MenuItem>
                  )
                })}
              </Box>
            )
        )
      )}
    </StyledMenu>
  )
}

export default ProjectMenu
