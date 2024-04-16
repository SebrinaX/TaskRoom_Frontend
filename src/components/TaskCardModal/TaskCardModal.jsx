import * as React from 'react'
import Container from '@mui/material/Container'
import ModalHeader from './components/ModalHeader'
import TaskCardDetails from './components/TaskCardDetails'
import { createPortal } from 'react-dom'

const TaskCardModal = ({ onClose }) => {
  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
  }
  return createPortal(
    <div style={modalStyle}>
      <Container
        style={{
          padding: '0px 0px 30px 0px',
        }}
        sx={{
          width: 750,
          height: 600,
          borderRadius: '8px',
          backgroundColor: '#091E420F',
          overflow: 'hidden',
        }}>
        <Container
          style={{ padding: '20px 0px 0px 30px' }}
          sx={{
            height: '10%',
          }}>
          <ModalHeader onClose={onClose} />
        </Container>
        <Container
          style={{ padding: '20px 0px 0px 30px', marginTop: '20px' }}
          sx={{
            height: '10%',
          }}>
          <TaskCardDetails />
        </Container>
      </Container>
    </div>,
    document.body
  )
}

export default TaskCardModal
