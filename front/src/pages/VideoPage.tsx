import React, { FC, useState } from 'react';
import { Dispatch } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import { PathState } from '../store/types';
import Api from '../services/api';
import { Box } from '@mui/material';
import VideoHeader from '../components/file/video/VideoHeader';
import VideoPlay from '../components/file/video/VideoPlay';
import VideoContent from '../components/file/video/VideoContent';

interface VideoPageProps {
	path: string;
	actions: ActionCreatorsMapObject;
}

const VideoPage: FC<VideoPageProps> = ({ path, actions }): JSX.Element => {
	const [branch, setSwitch] = useState(true);
	const [fileId, setFileId] = useState('');
	return (
		<Box>
			<VideoHeader path={path} branch={branch} setSwitch={setSwitch} />
			<VideoPlay actions={actions} fileId={fileId} />
			<VideoContent actions={actions} branch={branch} setFileId={setFileId} />
		</Box>
	);
};

const mapStateToProps = (state: any) => ({
	path: (state.path as PathState).filePath,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	actions: bindActionCreators(Api.file, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoPage);
