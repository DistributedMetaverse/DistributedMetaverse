import React, { FC } from 'react';
import { Dispatch } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import { PathState } from '../store/types';
import Api from '../services/api';
import { Box } from '@mui/material';
import PhotoHeader from '../components/file/photo/PhotoHeader';
import PhotoContent from '../components/file/photo/PhotoContent';

interface PhotoPageProps {
	path: string;
	actions: ActionCreatorsMapObject;
}

const PhotoPage: FC<PhotoPageProps> = ({ path, actions }): JSX.Element => {
	return (
		<Box>
			<PhotoHeader path={path} />
			<PhotoContent actions={actions} />
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
