import React, { FC, useState } from 'react';
import { Dispatch } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import { PathState, DataState } from '../store/types';
import Api from '../services/api';
import useCSRFToken from '../hooks/useCSRFToken';
import { Box } from '@mui/material';
import PhotoHeader from '../components/file/photo/PhotoHeader';
import PhotoView from '../components/file/photo/PhotoView';
import PhotoContent from '../components/file/photo/PhotoContent';

interface PhotoPageProps {
	auth: ActionCreatorsMapObject;
	file: ActionCreatorsMapObject;
	infra: ActionCreatorsMapObject;
	path: string;
	time: number;
}

const PhotoPage: FC<PhotoPageProps> = ({
	auth,
	file,
	infra,
	path,
	time,
}): JSX.Element => {
	const [branch, setSwitch] = useState(true);
	const [fileId, setFileId] = useState('');
	const [type, setType] = useState('');
	const [csrfData, fetchCSRFTokenData] = useCSRFToken({ auth });
	return (
		<Box>
			<PhotoHeader path={path} branch={branch} setSwitch={setSwitch} />
			<PhotoView infra={infra} fileId={fileId} type={type} />
			<PhotoContent
				file={file}
				path={path}
				time={time}
				branch={branch}
				setFileId={setFileId}
				setType={setType}
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
	infra: bindActionCreators(Api.infra, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PhotoPage);
