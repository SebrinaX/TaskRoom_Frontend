import React from 'react'
import { Card, CardContent, Typography, Box } from '@mui/material'
import { Draggable } from 'react-beautiful-dnd'
import { styled } from '@mui/material/styles'
import TaskCardModal from '../TaskCardModal'

const StyledCard = styled(Card)(({ snapshot }) => ({
  borderRadius: '8px',
  margin: '8px',
  transform: snapshot.isDragging ? 'rotate(2.5deg)' : 'none',
  '& .MuiCardContent-root': {
    paddingBottom: '16px !important',
    display: 'flex',
    alignItems: 'center',
    '& .MuiTypography-root': {
      fontSize: '14px',
      fontWeight: '400',
    },
  },
}))

function TaskItem({ task, index }) {
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  return (
    <>
      <Draggable draggableId={task.id} index={index} type="task">
        {(provided, snapshot) => (
          <Box
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            key={task.id}
            onClick={() => {
              setIsModalOpen(true)
            }}>
            <StyledCard snapshot={snapshot}>
              <CardContent>
                <Typography>{task.title}</Typography>
              </CardContent>
            </StyledCard>
          </Box>
        )}
      </Draggable>
      {isModalOpen && <TaskCardModal onClose={() => setIsModalOpen(false)} />}
    </>
  )
}

export default TaskItem
