import React, { FC, useState } from 'react';
import { Dispatch } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import { PathState } from '../store/types';
import Api from '../services/api';
import { Box } from '@mui/material';
import PhotoHeader from '../components/file/photo/PhotoHeader';
import PhotoView from '../components/file/photo/PhotoView';
import PhotoContent from '../components/file/photo/PhotoContent';

interface PhotoPageProps {
	path: string;
	actions: ActionCreatorsMapObject;
}

const PhotoPage: FC<PhotoPageProps> = ({ path, actions }): JSX.Element => {
	const [branch, setSwitch] = useState(true);
	const [fileId, setFileId] = useState('');
	return (
		<Box>
			<PhotoHeader path={path} branch={branch} setSwitch={setSwitch} />
			<PhotoView actions={actions} fileId={fileId} />
			<PhotoContent actions={actions} branch={branch} setFileId={setFileId} />
		</Box>
	);
};

const mapStateToProps = (state: any) => ({
	path: (state.path as PathState).filePath,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	actions: bindActionCreators(Api.file, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PhotoPage);
