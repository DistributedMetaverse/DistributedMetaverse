import React, { FC, useState } from 'react';
import { Dispatch } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import { PathState, DataState } from '../store/types';
import Api from '../services/api';
import useCSRFToken from '../hooks/useCSRFToken';
import { Box } from '@mui/material';
import VideoHeader from '../components/file/video/VideoHeader';
import VideoPlay from '../components/file/video/VideoPlay';
import VideoContent from '../components/file/video/VideoContent';

interface VideoPageProps {
	auth: ActionCreatorsMapObject;
	file: ActionCreatorsMapObject;
	block: ActionCreatorsMapObject;
	path: string;
	time: number;
}

const VideoPage: FC<VideoPageProps> = ({
	auth,
	file,
	block,
	path,
	time,
}): JSX.Element => {
	const [branch, setSwitch] = useState(true);
	const [fileId, setFileId] = useState('');
	const [csrfData, fetchCSRFTokenData] = useCSRFToken({ auth });
	return (
		<Box>
			<VideoHeader path={path} branch={branch} setSwitch={setSwitch} />
			<VideoPlay file={file} block={block} fileId={fileId} time={time} />
			<VideoContent
				file={file}
				path={path}
				time={time}
				branch={branch}
				setFileId={setFileId}
				csrfData={csrfData}
				fetchData={fetchCSRFTokenData}
			/>
		</Box>
	);
};

const mapStateToProps = (state: any) => ({
	path: (state.path as PathState).filePath,
	time: (state.data as DataState).time,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	auth: bindActionCreators(Api.auth, dispatch),
	file: bindActionCreators(Api.file, dispatch),
	block: bindActionCreators(Api.block, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoPage);
