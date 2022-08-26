import React, { FC } from 'react';
import { Dispatch } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import Api from '../services/api';
import { Box } from '@mui/material';
import RecentHeader from '../components/file/recent/RecentHeader';
import RecentContent from '../components/file/recent/RecentContent';

interface RecentPageProps {
	actions: ActionCreatorsMapObject;
}

const RecentPage: FC<RecentPageProps> = ({ actions }): JSX.Element => {
	return (
		<Box>
			<RecentHeader />
			<RecentContent actions={actions} />
		</Box>
	);
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
	actions: bindActionCreators(Api.file, dispatch),
});

export default connect(null, mapDispatchToProps)(RecentPage);
