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
	file: ActionCreatorsMapObject;
}

const VideoPage: FC<VideoPageProps> = ({ path, file }): JSX.Element => {
	const [branch, setSwitch] = useState(true);
	const [fileId, setFileId] = useState('');
	return (
		<Box>
			<VideoHeader path={path} branch={branch} setSwitch={setSwitch} />
			<VideoPlay file={file} fileId={fileId} />
			<VideoContent file={file} branch={branch} setFileId={setFileId} />
		</Box>
	);
};

const mapStateToProps = (state: any) => ({
	path: (state.path as PathState).filePath,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	file: bindActionCreators(Api.file, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoPage);
