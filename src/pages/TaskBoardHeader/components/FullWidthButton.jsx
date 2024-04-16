import React from 'react'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'

const WidthButton = styled(Button)(() => ({
	width: '100%',
	margin: '0.5rem',
	textTransform: 'capitalize',
}))

function FullWidthButton({ children, disable, onClick }) {
	return (
		<WidthButton variant='contained' disabled={disable} onClick={onClick}>
			{children}
		</WidthButton>
	)
}

export default FullWidthButton
