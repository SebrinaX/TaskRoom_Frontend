import { createTheme } from '@mui/material/styles'

const theme = createTheme({
	components: {
		MuiAppBar: {
			styleOverrides: {
				root: {
					backgroundColor: 'transparent',
					position: 'relative',
				},
			},
		},
	},
})

export default theme
