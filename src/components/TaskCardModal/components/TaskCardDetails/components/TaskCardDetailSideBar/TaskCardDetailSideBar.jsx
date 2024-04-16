import * as React from 'react'
import IconButton from './components/IconButton'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined'
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined'
const TaskCardDetailSideBar = () => {
  return (
    <>
      <div style={{ fontSize: '12px' }}>Add to card</div>
      <IconButton
        icon={<PersonOutlineOutlinedIcon sx={{ fontSize: '20px' }} />}
        text="Members"
      />
      <IconButton
        icon={<AccessTimeIcon sx={{ fontSize: '20px' }} />}
        text="Dates"
      />
      <div style={{ fontSize: '12px', marginTop: '20px' }}>Actions</div>
      <IconButton
        icon={<ArrowForwardIcon sx={{ fontSize: '20px' }} />}
        text="Move"
      />
      <IconButton
        icon={<ContentCopyOutlinedIcon sx={{ fontSize: '20px' }} />}
        text="Copy"
      />
      <IconButton
        icon={<ArchiveOutlinedIcon sx={{ fontSize: '20px' }} />}
        text="Archive"
      />
    </>
  )
}
export default TaskCardDetailSideBar
