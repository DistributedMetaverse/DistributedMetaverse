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
	file: ActionCreatorsMapObject;
}

const FilePage: FC<FilePageProps> = ({ path, file }): JSX.Element => {
	const { folderPath, filePath, folderType, fileType } = path as {
		folderPath: string;
		filePath: string;
		folderType: 'all' | 'video' | 'photo' | 'pdf' | 'doc';
		fileType: 'all' | 'video' | 'photo' | 'pdf' | 'doc';
	};
	return (
		<Box>
			<FolderHeader path={folderPath} type={folderType} />
			<FolderContent file={file} />
			<FileHeader path={filePath} type={fileType} />
			<FileContent file={file} />
		</Box>
	);
};

const mapStateToProps = (state: any) => ({
	path: state.path as PathState,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	file: bindActionCreators(Api.file, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(FilePage);
