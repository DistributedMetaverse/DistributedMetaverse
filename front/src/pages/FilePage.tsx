import React, { FC } from 'react';
import { Dispatch } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import { PathState } from '../store/types';
import Api from '../services/api';
import { Box } from '@mui/material';
import FolderHeader from '../components/file/all/FolderHeader';
import FolderContent from '../components/file/all/FolderContent';
import FileHeader from '../components/file/all/FileHeader';
import FileContent from '../components/file/all/FileContent';

interface FilePageProps {
	path?: PathState;
	actions: ActionCreatorsMapObject;
}

const FilePage: FC<FilePageProps> = ({ path, actions }): JSX.Element => {
	const { folderPath, filePath, folderType, fileType } = path as {
		folderPath: string;
		filePath: string;
		folderType: 'all' | 'video' | 'photo' | 'pdf' | 'doc';
		fileType: 'all' | 'video' | 'photo' | 'pdf' | 'doc';
	};
	return (
		<Box>
			<FolderHeader path={folderPath} type={folderType} />
			<FolderContent actions={actions} />
			<FileHeader path={filePath} type={fileType} />
			<FileContent actions={actions} />
		</Box>
	);
};

const mapStateToProps = (state: any) => ({
	path: state.path as PathState,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	actions: bindActionCreators(Api.file, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(FilePage);
