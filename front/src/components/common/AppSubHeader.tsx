import React, { FC, useState } from 'react';
import { Dispatch as DispatchAction } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import { TitleState } from '../../store/types';
import Api from '../../services/api';
import useDownloadCount from '../../hooks/useDownloadCount';
import useKeywordPageList from '../../hooks/useKeywordPageList';
import { Box, Button, IconButton, Badge, Divider } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
import NotificationsIcon from '@mui/icons-material/Notifications';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import AppSearch from './AppSearch';
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
	const [keyword, setKeyword] = useState('');
	const [openAlert, setOpenAlert] = useState(false);
	const [openSearch, setOpenSearch] = useState(false);
	const [openUpload, setOpenUpload] = useState(false);
	const [count, fetchDownloadData] = useDownloadCount({ status });
	const [data, fetchKeywordData] = useKeywordPageList({ file, keyword });

	const alertOpen = () => {
		setOpenAlert(true);
		fetchDownloadData(); // → Refresh
	};
	const uploadOpen = () => setOpenUpload(true);

	const uploadButton: SxProps<Theme> = {
		color: 'primary.main',
		borderColor: 'primary.main',
		'&:hover': {
			color: 'text.secondary',
			backgroundColor: 'background.paper',
		},
		fontSize: '0.7rem',
		fontWeight: 'bold',
	};
	return (
		<Box sx={{ mb: 2 }}>
			<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
				<Title>{title}</Title>
				<Box sx={{ height: '1.8rem', display: 'flex' }}>
					<AppSearch
						keyword={keyword}
						setKeyword={setKeyword}
						setOpenSearch={setOpenSearch}
						data={data}
						fetchData={fetchKeywordData}
					/>
					<Button
						variant="outlined"
						onClick={uploadOpen}
						endIcon={<UploadFileIcon />}
						sx={uploadButton}
						size="small"
					>
						Upload
					</Button>
					<IconButton color="inherit" onClick={alertOpen}>
						<Badge badgeContent={count} color="secondary">
							<NotificationsIcon />
						</Badge>
					</IconButton>
				</Box>
			</Box>
			<AlertModal
				count={count}
				openAlert={openAlert}
				setOpenAlert={setOpenAlert}
			/>
			<SearchModal
				keyword={keyword}
				setKeyword={setKeyword}
				openSearch={openSearch}
				setOpenSearch={setOpenSearch}
				data={data}
				fetchData={fetchKeywordData}
			/>
			<UploadModal
				auth={auth}
				file={file}
				openUpload={openUpload}
				setOpenUpload={setOpenUpload}
			/>
			<Divider sx={{ mt: 1, borderColor: 'primary.main' }} />
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
