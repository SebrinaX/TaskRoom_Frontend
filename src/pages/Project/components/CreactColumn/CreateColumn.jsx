import React from 'react'
import { StyledColumnCard } from '../../../../components/Column'
import { styled } from '@mui/material/styles'
import { Box, CardHeader, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import CreateColumnForm from './CreateColumnForm'

const AddColumn = styled(StyledColumnCard)({
  backgroundColor: 'rgba(0,0,0,0.05)',
  boxShadow: 'none',

  '& .columnTitle': {
    fontSize: '14px',
    fontWeight: '500',
    height: '41px',
    display: 'flex',
    alignItems: 'center',
  },
  '&:hover': {
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  '& .MuiBox-root': {
    display: 'flex',
    alignItems: 'center',
  },
  '& .MuiSvgIcon-root': {
    fontSize: '20px',
    margin: '0 4px 0 0',
  },
  '& .MuiCardHeader-root': {
    cursor: 'pointer',
    padding: '10px',
  },
})

const CreateColumn = ({ projectId, setColumnData }) => {
  const [createColumnFormOpen, setCreateColumnFormOpen] = React.useState(false)
  return (
    <Box className="column">
      <AddColumn>
        {createColumnFormOpen ? (
          <CreateColumnForm
            setCreateColumnFormOpen={setCreateColumnFormOpen}
            projectId={projectId}
            setColumnData={setColumnData}
          />
        ) : (
          <CardHeader
            onClick={() => setCreateColumnFormOpen(true)}
            title={
              <Box>
                <AddIcon />
                <Typography className="columnTitle">Add a column</Typography>
              </Box>
            }
          />
        )}
      </AddColumn>
    </Box>
  )
}

export default CreateColumn
