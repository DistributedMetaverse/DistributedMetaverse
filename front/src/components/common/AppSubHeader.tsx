import React, { FC } from 'react';
import { Dispatch } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import Api from '../../services/api';
import { Box, Typography, IconButton, Badge, Divider } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import LogoutIcon from '@mui/icons-material/Logout';

interface AppSubHeaderProps {
	actions: ActionCreatorsMapObject;
}

const AppSubHeader: FC<AppSubHeaderProps> = ({ actions }): JSX.Element => {
	const logoutClick = () => {
		actions.logout();
	};
	return (
		<Box sx={{ mb: 2 }}>
			<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
				<Typography component="h1" variant="h6" color="inherit" noWrap>
					Dashboard
				</Typography>
				<Box>
					<IconButton color="inherit">
						<Badge badgeContent={4} color="secondary">
							<NotificationsIcon />
						</Badge>
					</IconButton>
					<IconButton color="inherit">
						<ManageSearchIcon />
					</IconButton>
					<IconButton color="inherit" onClick={logoutClick}>
						<LogoutIcon />
					</IconButton>
				</Box>
			</Box>
			<Divider sx={{ borderColor: 'primary.main' }} />
		</Box>
	);
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
	actions: bindActionCreators(Api.auth, dispatch),
});

export default connect(null, mapDispatchToProps)(AppSubHeader);
