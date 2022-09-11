import React, { FC } from 'react';
import { Dispatch } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import { PathState, DataState } from '../store/types';
import Api from '../services/api';
import useCSRFToken from '../hooks/useCSRFToken';
import { Box } from '@mui/material';
import FolderHeader from '../components/file/all/FolderHeader';
import FolderContent from '../components/file/all/FolderContent';
import FileHeader from '../components/file/all/FileHeader';
import FileContent from '../components/file/all/FileContent';

interface FilePageProps {
	auth: ActionCreatorsMapObject;
	file: ActionCreatorsMapObject;
	path: PathState;
	time: number;
}

const FilePage: FC<FilePageProps> = ({
	auth,
	file,
	path,
	time,
}): JSX.Element => {
	const [csrfData, fetchCSRFTokenData] = useCSRFToken({ auth });
	const { folderPath, filePath, folderType, fileType } = path as {
		folderPath: string;
		filePath: string;
		folderType: 'all' | 'video' | 'photo';
		fileType: 'all' | 'video' | 'photo';
	};
	return (
		<Box>
			<FolderHeader path={folderPath} type={folderType} />
			<FolderContent file={file} path={folderPath} type={folderType} />
			<FileHeader path={filePath} type={fileType} />
			<FileContent
				file={file}
				time={time}
				path={filePath}
				type={fileType}
				csrfData={csrfData}
				fetchData={fetchCSRFTokenData}
			/>
		</Box>
	);
};

const mapStateToProps = (state: any) => ({
	path: state.path as PathState,
	time: (state.data as DataState).time,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	auth: bindActionCreators(Api.auth, dispatch),
	file: bindActionCreators(Api.file, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(FilePage);
