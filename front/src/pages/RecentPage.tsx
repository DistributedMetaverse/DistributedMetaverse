import React, { FC, useState } from 'react';
import { Dispatch } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import { DataState } from '../store/types';
import Api from '../services/api';
import useCSRFToken from '../hooks/useCSRFToken';
import { Box } from '@mui/material';
import RecentHeader from '../components/file/recent/RecentHeader';
import RecentContent from '../components/file/recent/RecentContent';

interface RecentPageProps {
	auth: ActionCreatorsMapObject;
	file: ActionCreatorsMapObject;
	time: number;
}

const RecentPage: FC<RecentPageProps> = ({ auth, file, time }): JSX.Element => {
	const [branch, setSwitch] = useState(true);
	const [csrfData, fetchCSRFTokenData] = useCSRFToken({ auth });
	return (
		<Box>
			<RecentHeader branch={branch} setSwitch={setSwitch} />
			<RecentContent
				file={file}
				time={time}
				branch={branch}
				csrfData={csrfData}
				fetchData={fetchCSRFTokenData}
			/>
		</Box>
	);
};

const mapStateToProps = (state: any) => ({
	time: (state.data as DataState).time,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	auth: bindActionCreators(Api.auth, dispatch),
	file: bindActionCreators(Api.file, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(RecentPage);
