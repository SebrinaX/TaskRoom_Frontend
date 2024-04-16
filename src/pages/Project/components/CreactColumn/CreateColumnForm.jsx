import React from 'react'
import { Button, Box } from '@mui/material'
import { Input } from '@mui/joy'
import { Check as CheckIcon, Close as CloseIcon } from '@mui/icons-material'
import http from '../../../../utils/axios'
import { styled } from '@mui/material/styles'
import OutsideClick from '../../../../hooks/OutsideClick'
import { useDispatch } from 'react-redux'
import { createColumn } from '../../../../store/projectSlice'
import { StyledColumnCard } from '../../../../components/Column'

const ColumnForm = styled(StyledColumnCard)(() => ({
  padding: '10px 16px',
  '& .MuiInput-root': {
    
    fontSize: '14px',
    fontWeight: '500',
    fontFamily: 'inherit',
  },
}))

const CreateColumnForm = ({ projectId, setCreateColumnFormOpen }) => {
  const [columnTitle, setColumnTitle] = React.useState('')
  const dispatch = useDispatch()

  const handleColumnTitleChange = (e) => {
    setColumnTitle(e.target.value)
  }

  const handleCreateColumn = async (e) => {
    e.preventDefault()
    const res = await http('/columns/', {
      method: 'POST',
      data: { parent_project: projectId, name: columnTitle },
    })
    delete res.data.parent_project
    dispatch(createColumn(res.data))
    setCreateColumnFormOpen(false)
  }

  const closeForm = () => {
    setCreateColumnFormOpen(false)
  }

  return (
    <OutsideClick onClickOutside={closeForm} className='columnHeader'>
      <ColumnForm>
        <form onSubmit={handleCreateColumn}>
          <Input
            id="outlined-basic"
            placeholder="Column Title"
            variant="standard"
            value={columnTitle}
            onChange={handleColumnTitleChange}
          />
          <Box className="createColumnFormButtonContainer">
            <Button
              type="submit"
              disabled={
                !columnTitle ||
                columnTitle.length < 1 ||
                columnTitle.length > 30
              }>
              <CheckIcon />
            </Button>
            <Button onClick={closeForm}>
              <CloseIcon />
            </Button>
          </Box>
        </form>
      </ColumnForm>
    </OutsideClick>
  )
}

export default CreateColumnForm
