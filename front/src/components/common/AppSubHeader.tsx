import React, { FC, useState } from 'react';
import { Dispatch as DispatchAction } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import { TitleState } from '../../store/types';
import Api from '../../services/api';
import useDownloadCount from '../../hooks/useDownloadCount';
import { Box, IconButton, Badge, Divider } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import LogoutIcon from '@mui/icons-material/Logout';
import Title from '../Title';
import AlertModal from '../modal/AlertModal';
import SearchModal from '../modal/SearchModal';
import UploadModal from '../modal/UploadModal';

interface AppSubHeaderProps extends TitleState {
	title: string;
	auth: ActionCreatorsMapObject;
	file: ActionCreatorsMapObject;
	status: ActionCreatorsMapObject;
}

const AppSubHeader: FC<AppSubHeaderProps> = ({
	title,
	auth,
	file,
	status,
}): JSX.Element => {
	const [openAlert, setOpenAlert] = useState(false);
	const [openSearch, setOpenSearch] = useState(false);
	const [openUpload, setOpenUpload] = useState(false);
	const [count, fetchData] = useDownloadCount({ status });

	const logoutClick = () => {
		auth.logout();
	};
	const alertOpen = () => {
		setOpenAlert(true);
		fetchData(); // → Refresh
	};
	const searchOpen = () => setOpenSearch(true);
	const uploadOpen = () => setOpenUpload(true);

	return (
		<Box sx={{ mb: 2 }}>
			<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
				<Title>{title}</Title>
				<Box>
					<IconButton color="inherit" onClick={uploadOpen}>
						<UploadFileIcon />
					</IconButton>
					<IconButton color="inherit" onClick={alertOpen}>
						<Badge badgeContent={count} color="secondary">
							<NotificationsIcon />
						</Badge>
					</IconButton>
					<IconButton color="inherit" onClick={searchOpen}>
						<ManageSearchIcon />
					</IconButton>
					<IconButton color="inherit" onClick={logoutClick}>
						<LogoutIcon />
					</IconButton>
				</Box>
			</Box>
			<AlertModal
				count={count}
				openAlert={openAlert}
				setOpenAlert={setOpenAlert}
			/>
			<SearchModal
				file={file}
				openSearch={openSearch}
				setOpenSearch={setOpenSearch}
			/>
			<UploadModal
				actions={file}
				openUpload={openUpload}
				setOpenUpload={setOpenUpload}
			/>
			<Divider sx={{ borderColor: 'primary.main' }} />
		</Box>
	);
};

const mapStateToProps = (state: any) => ({
	title: (state.title as TitleState).title,
});

const mapDispatchToProps = (dispatch: DispatchAction) => ({
	auth: bindActionCreators(Api.auth, dispatch),
	file: bindActionCreators(Api.file, dispatch),
	status: bindActionCreators(Api.status, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppSubHeader);
