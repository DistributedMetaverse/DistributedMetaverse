import React, { FC, ReactElement } from 'react';
import { connect } from 'react-redux';
import { PreviewState } from '../../store/types';
import AppSubHeader from './AppSubHeader';
import Copyright from '../Copyright';
import { Box, Container } from '@mui/material';
import { styled } from '@mui/material/styles';

interface DrawerProps {
	open?: boolean;
	width: number;
}

interface AppMainProps {
	open?: boolean;
	children?: ReactElement;
	width: number;
}

const Main = styled('main', {
	shouldForwardProp: (prop) => prop !== 'open',
})<DrawerProps>(({ theme, open, width }) => ({
	flexGrow: 1,
	padding: theme.spacing(0),
	zIndex: 1201,
	transition: theme.transitions.create('margin', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	marginRight: -width,
	...(open && {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginRight: 0,
	}),
}));

const AppMain: FC<AppMainProps> = ({ open, children, width }): JSX.Element => {
	return (
		<Main open={open} width={width}>
			<Box
				component="main"
				sx={{
					height: '100vh',
					overflow: 'auto',
					bgcolor: 'background.default',
				}}
			>
				<Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
					<AppSubHeader />
					{children}
					<Copyright sx={{ pt: 4 }} />
				</Container>
			</Box>
		</Main>
	);
};

const mapStateToProps = (state: any) => ({
	open: (state.preview as PreviewState).isActive,
});

export default connect(mapStateToProps, null)(AppMain);
