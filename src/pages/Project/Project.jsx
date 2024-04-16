import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import { TaskColumn } from '../../components/Column'
import http from '../../utils/axios'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { useLocation } from 'react-router'
import { Alert, Snackbar } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import CreateColumn from './components/CreactColumn/CreateColumn'
import { useDispatch, useSelector } from 'react-redux'
import { updateColumnData } from '../../store/projectSlice'
import SideMenu from './components/SideMenu'
import onDragEnd from './dndOnDragEnd'

const drawerWidth = 240

const ProjectBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  height: `100vh`,
  overflowY: 'clip',
  overflowX: 'auto',
  display: 'flex',
  flexGrow: 1,
  backgroundColor: 'lightblue',

  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth - 10}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),

  '& .columns': {
    display: 'flex',
    padding: '10px 20px',
    height: 'fit-content',
    width: '100%',

    marginTop: '64px',
    '& .column': {
      borderRadius: '12px',
      margin: '6px',
      height: '100%',

    },
  },
}))

function Project() {
  // const [columnData, setColumnData] = useState([])
  const dispatch = useDispatch()
  const columnData = useSelector((state) => state.project.columnData)
  const dispatchColumnData = (data) => {
    dispatch(updateColumnData(data))
  }
  const location = useLocation()
  const navigate = useNavigate()
  const projectId = location.state?.projectId
  if (!projectId) {
    return (
      <Snackbar
        open={true}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={() => {
          navigate(-1)
        }}>
        <Alert severity="error">Project not found</Alert>
      </Snackbar>
    )
  }

  const fetchColumnData = async () => {
    try {
      const response = await http(`/projects/data/${projectId}`, {
        method: 'GET',
      })
      dispatchColumnData(response.data.columns)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchColumnData()
  }, [projectId])

  const [sideMenuOpen, setSideMenuOpen] = useState(false)

  return (
    <ProjectBox open={sideMenuOpen}>
      <SideMenu
        sideMenuOpen={sideMenuOpen}
        toggleMenu={setSideMenuOpen}
        projectId={projectId}
      />

      <DragDropContext
        onDragEnd={(result) =>
          onDragEnd(result, dispatchColumnData, columnData, projectId)
        }>
        <Droppable droppableId={projectId} direction="horizontal" type="column">
          {(provided) => (
            <Box
              className="columns"
              {...provided.droppableProps}
              ref={provided.innerRef}>
              {columnData.map((column, index) => (
                <Draggable
                  key={column.id}
                  draggableId={column.id}
                  index={index}
                  type="column">
                  {(provided) => (
                    <Box
                      className="column"
                      key={column.id}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}>
                      <TaskColumn
                        column={column}
                        key={column.id}
                        projectId={projectId}
                      />
                    </Box>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              <CreateColumn
                projectId={projectId}
                setColumnData={dispatchColumnData}
              />
            </Box>
          )}
        </Droppable>
      </DragDropContext>
    </ProjectBox>
  )
}

export default Project
