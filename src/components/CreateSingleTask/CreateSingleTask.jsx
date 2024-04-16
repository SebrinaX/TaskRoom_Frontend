import React, { useState, useRef } from 'react'
import { Box, Card, Button, IconButton, TextField } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'
import http from '../../utils/axios'
import { styled } from '@mui/material/styles'
import { useDispatch } from 'react-redux'
import { createTask } from '../../store/projectSlice'

const StyledCard = styled(Card)(() => ({
	borderRadius: '8px',
	margin: '8px',
	border: 'none',
	'& .MuiCardContent-root': {
		outline: 'none',
		alignItems: 'center',
	},
	'& .MuiTextField-root': {
		width: '100%',
		height: '100%',
		'& .MuiInput-underline:after': {
			borderBottomColor: 'transparent',
		},
		'& label.Mui-focused': {
			color: 'transparent',
		},
		'& .MuiOutlinedInput-root': {
			'& fieldset': {
				borderColor: 'transparent',
				backgroundColor: 'transparent',
			},
			'&:hover fieldset': {
				borderColor: 'transparent',
			},
			'&.Mui-focused fieldset': {
				borderColor: 'transparent',
			},
		},
	},
}))

const StyledIconButton = styled(IconButton)(() => ({
	color: '#44546f',
	'&:hover': {
		backgroundColor: 'transparent',
		borderRadius: '50%',
		color: '#172b4d',
	},
}))

const StyledButton = styled(Button)(() => ({
	textTransform: 'none',
	backgroundColor: '#0C66E4',
	color: '#fff',
	'&:hover': { backgroundColor: '#0055CC' },
	marginRight: '8px',
}))

function CreateSingleTask({ columnId, onCancel }) {
	const [newTaskTitle, setNewTaskTitle] = useState('')
	// const columnData = useSelector((state) => state.project.columnData)

	const dispatch = useDispatch()

	const cardRef = useRef(null)

	const handleCancel = () => {
		setNewTaskTitle('')
		onCancel()
	}

	const handleBlur = (event) => {
		if (!event.nativeEvent.relatedTarget?.matches('button[type="submit"]')) {
			handleCancel()
		}
	}

	const handleOnChange = (e) => {
		const inputValue = e.target.value
		setNewTaskTitle(inputValue)
	}

	const handleSubmit = async (event) => {
		event.preventDefault()
		if (newTaskTitle.trim() !== '')
			try {
				const response = await http('/tasks', {
					method: 'POST',
					data: {
						title: newTaskTitle,
						parent_column: columnId,
					},
				})
				if (response.status === 201) {
					dispatch(createTask({ columnId, newTask: response.data }))
					handleCancel()
				} else {
					console.error('failed to create task:', response.statusText)
				}
			} catch (err) {
				console.error('failed to create task:', err)
			}
	}

	return (
		<form>
			<StyledCard ref={cardRef}>
				<TextField
					value={newTaskTitle}
					onChange={handleOnChange}
					onBlur={handleBlur}
					autoComplete='off'
					placeholder='Enter a title for this task...'
				/>
			</StyledCard>
			<Box
				boxSizing='border-box'
				display='flex'
				alignItems='center'
				margin='8px'
				padding='none'
				backgroundColor='transparent'
			>
				<StyledButton type='submit' variant='contained' onClick={handleSubmit}>
					Add Task
				</StyledButton>
				<StyledIconButton onClick={handleCancel} size='small'>
					<ClearIcon fontSize='medium' />
				</StyledIconButton>
			</Box>
		</form>
	)
}

export default CreateSingleTask
