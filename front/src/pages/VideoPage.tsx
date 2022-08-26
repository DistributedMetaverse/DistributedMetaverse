import React, { FC } from 'react';
import { Dispatch } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import { PathState } from '../store/types';
import Api from '../services/api';
import { Box } from '@mui/material';
import VideoHeader from '../components/file/video/VideoHeader';
import VideoContent from '../components/file/video/VideoContent';

interface VideoPageProps {
	path: string;
	actions: ActionCreatorsMapObject;
}

const VideoPage: FC<VideoPageProps> = ({ path, actions }): JSX.Element => {
	return (
		<Box>
			<VideoHeader path={path} />
			<VideoContent actions={actions} />
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
