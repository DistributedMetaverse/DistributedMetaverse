import { ThemeOptions } from '@mui/material/styles';

const defaultTheme: ThemeOptions = {
	palette: {
		text: {
			primary: '#fff', // Main Text
			secondary: '#fff', // Validation Text
		},
		action: {
			disabled: '#fff', // Button Disabled Text
			disabledBackground: '#34343B', // Button Disabled Background Color
		},
		background: {
			default: '#1D1B22',
			paper: '#26262E',
		},
		secondary: {
			main: '#86868A', // LockOut Icon Background Color
		},
	},
	spacing: 6, // Spacing(간격) - Default : 8px
};

const contentTheme: ThemeOptions = {
	palette: {
		text: {
			primary: '#fff', // Main Text
			secondary: '#fff', // Validation Text
		},
		action: {
			active: '#505056',
			hover: '#34343B',
			selected: '#505056',
			disabled: '#fff', // Button Disabled Text
			disabledBackground: '#34343B', // Button Disabled Background Color
		},
		background: {
			default: '#1D1B22',
			paper: '#26262E',
		},
		primary: {
			main: '#505056', // Border Color
		},
		secondary: {
			main: '#86868A', // ListItemText Color
		},
	},
	spacing: 6, // Spacing(간격) - Default : 8px
};

export { defaultTheme, contentTheme };
