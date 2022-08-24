import React, { FC } from 'react';
import { Dispatch } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import { TitleState } from '../../store/types';
import Api from '../../services/api';
import { Box, IconButton, Badge, Divider } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import LogoutIcon from '@mui/icons-material/Logout';
import Title from '../Title';

interface AppSubHeaderProps extends TitleState {
	title: string;
	actions: ActionCreatorsMapObject;
}

const AppSubHeader: FC<AppSubHeaderProps> = ({
	title,
	actions,
}): JSX.Element => {
	const logoutClick = () => {
		actions.logout();
	};
	return (
		<Box sx={{ mb: 2 }}>
			<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
				<Title>{title}</Title>
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

const mapStateToProps = (state: any) => ({
	title: (state.title as TitleState).title,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	actions: bindActionCreators(Api.auth, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppSubHeader);
