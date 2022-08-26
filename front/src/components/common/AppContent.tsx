import React, { FC, useState, ReactElement } from 'react';
import { Outlet } from 'react-router';
import AppHeader from './AppHeader';
import AppMenu from './AppMenu';
import AppMain from './AppMain';
import AppPreview from './AppPreview';
import { CssBaseline, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const mdTheme = createTheme({
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
});

const drawerMenuWidth = 160;
const drawerPreviewWidth = 200;

interface LayoutDefaultProps {
	children?: ReactElement;
}

const AppContent: FC<LayoutDefaultProps> = ({ children }): JSX.Element => {
	const [open, setOpen] = useState(true);
	return (
		<ThemeProvider theme={mdTheme}>
			<Box sx={{ display: 'flex' }}>
				<CssBaseline />
				<AppHeader open={open} setOpen={setOpen} width={drawerMenuWidth} />
				<AppMenu open={open} setOpen={setOpen} width={drawerMenuWidth} />
				<AppMain width={drawerPreviewWidth}>{children || <Outlet />}</AppMain>
				<AppPreview width={drawerPreviewWidth} />
			</Box>
		</ThemeProvider>
	);
};

export default AppContent;
