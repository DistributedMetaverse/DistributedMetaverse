import React, { FC, useState, ReactElement } from 'react';
import { Outlet } from 'react-router';
import AppHeader from './AppHeader';
import AppMenu from './AppMenu';
import AppMain from './AppMain';
import AppPreview from './AppPreview';
import { CssBaseline, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { contentTheme } from '../../utils/theme';

const mdTheme = createTheme(contentTheme);

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
