import React, { FC, useState } from 'react';
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
	const [branch, setSwitch] = useState(true);
	return (
		<Box>
			<RecentHeader branch={branch} setSwitch={setSwitch} />
			<RecentContent actions={actions} branch={branch} />
		</Box>
	);
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
	actions: bindActionCreators(Api.file, dispatch),
});

export default connect(null, mapDispatchToProps)(RecentPage);
