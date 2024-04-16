import React, { useState } from 'react'
import { Box, Card, Typography } from '@mui/material'
import TaskItem from '../TaskItem'
import { Droppable } from 'react-beautiful-dnd'
import { styled } from '@mui/material/styles'
import AddIcon from '@mui/icons-material/Add'
import CreateSingleTask from '../CreateSingleTask'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import ColumnMenu from './components/ColumnMenu'
import { updateColumnTitle } from '../../store/projectSlice'
import EditableText from '../EditableText'
import { useDispatch } from 'react-redux'

export const StyledColumnCard = styled(Card)(() => ({
  width: 256,
  borderRadius: '12px',
  display: 'flex',
  flexDirection: 'column',
  padding: 1,
  backgroundColor: '#edeff1',
  '& .columnHeader': {
    margin: '10px 8px 0 8px',
    padding: '0 8px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& .MuiSvgIcon-root:hover': {
      cursor: 'pointer',
    },
    '& .MuiInput-root': {
      fontSize: '14px',
      fontWeight: '500',
    },
    '& .MuiTypography-root': {
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'text',
    },
  },
  '& .tasks': {
    maxHeight: 'calc(100vh - 250px)',
    overflowY: 'scroll',
  },
  '& .onePxSpace': {
    minHeight: '1px',
  },
}))

const CreateTaskCard = styled(Card)(() => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: 'transparent',
  boxShadow: 'none',
  margin: '8px',
  padding: '6px',

  '& .MuiTypography-root': {
    fontSize: '14px',
    fontWeight: '400',
  },
  '& .MuiSvgIcon-root': {
    fontSize: '20px',
    margin: '0 4px 0 0',
  },
  '&:hover': {
    backgroundColor: '#CDD0D6',
    cursor: 'pointer',
  },
}))

function Column({ column, projectId }) {
  const dispatch = useDispatch()
  const onTitleChange = (update) => {
    dispatch(updateColumnTitle({ id: column.id, name: update }))
  }

  const [columnMenuAnchorEl, setColumnMenuAnchorEl] = useState(null)

  const updateTitleHttpConfig = {
    endPoint: `/columns/${column.id}`,
    data: { name: undefined },
    method: 'PATCH',
  }

  const titleValidation = {
    required: true,
    min: undefined,
    max: 80,
    name: 'Column Title',
  }

  const [addTaskMenuOpen, setAddTaskMenuOpen] = useState(false)

  const handleAddTaskClick = () => {
    setAddTaskMenuOpen(true)
  }

  return (
    <StyledColumnCard>
      <Box className="columnHeader" key={column.id}>
        <EditableText
          state={column.name}
          submitHttpConfig={updateTitleHttpConfig}
          setState={onTitleChange}
          validation={titleValidation}
        />
        <MoreHorizIcon
          onClick={(event) => {
            setColumnMenuAnchorEl(event.currentTarget)
          }}
        />
        <ColumnMenu
          columnMenuAnchorEl={columnMenuAnchorEl}
          columnId={column.id}
          setColumnMenuAnchorEl={setColumnMenuAnchorEl}
        />
      </Box>
      <Box className="tasks">
        <Droppable droppableId={column.id} type="task">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {column.tasks &&
                column.tasks.length > 0 &&
                column.tasks.map((task, index) => (
                  <TaskItem task={task} key={task.id} index={index} />
                ))}
              <div className="onePxSpace"></div>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </Box>
      {addTaskMenuOpen ? (
        <CreateSingleTask
          columnId={column.id}
          projectId={projectId}
          onCancel={() => setAddTaskMenuOpen(false)}
        />
      ) : (
        <CreateTaskCard onClick={handleAddTaskClick}>
          <AddIcon />
          <Typography>Add a card</Typography>
        </CreateTaskCard>
      )}
    </StyledColumnCard>
  )
}

export default Column
