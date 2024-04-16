import * as React from 'react'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import IconTitle from '../IconTitle'
import FormatAlignLeftOutlinedIcon from '@mui/icons-material/FormatAlignLeftOutlined'
import ViewListOutlinedIcon from '@mui/icons-material/ViewListOutlined'
import LensOutlinedIcon from '@mui/icons-material/LensOutlined'
import TaskCardDetailSideBar from './components/TaskCardDetailSideBar/TaskCardDetailSideBar'
import SaveTextEditor from '../../../SaveTextEditor'

const TaskCardDetails = () => {
  const [isEditingDescription, setIsEditingDescription] = React.useState(false)
  const [description, setDescription] = React.useState('')
  const [isEditingActivity, setIsEditingActivity] = React.useState(false)
  const [activity, setActivity] = React.useState('')

  return (
    <Container style={{ padding: 0 }}>
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <div style={{ marginTop: '10px' }}>
            <IconTitle
              title="Description"
              icon={<FormatAlignLeftOutlinedIcon sx={{ fontSize: '20px' }} />}
            />
            <SaveTextEditor
              style={{ marginLeft: '35px' }}
              isEditingContent={isEditingDescription}
              setIsEditingContent={setIsEditingDescription}
              content={description}
              setContent={setDescription}>
              Add a more detailed description...
            </SaveTextEditor>
          </div>
          <div style={{ marginTop: '40px' }}>
            <IconTitle
              title="Activity"
              icon={<ViewListOutlinedIcon sx={{ fontSize: '20px' }} />}
            />
            <div style={{ marginTop: '10px' }}>
              <IconTitle
                icon={<LensOutlinedIcon sx={{ fontSize: '20px' }} />}
                title={
                  <SaveTextEditor
                    isEditingContent={isEditingActivity}
                    setIsEditingContent={setIsEditingActivity}
                    content={activity}
                    setContent={setActivity}>
                    Write a comment...
                  </SaveTextEditor>
                }
                style={{
                  width: '550px',
                }}
              />
            </div>
          </div>
        </Grid>
        <Grid item xs={3}>
          <div style={{ marginTop: '10px' }}></div>
          <TaskCardDetailSideBar />
        </Grid>
      </Grid>
    </Container>
  )
}

export default TaskCardDetails
