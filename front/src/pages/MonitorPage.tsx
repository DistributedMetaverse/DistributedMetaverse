import React, { FC } from 'react';
import { Dispatch } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import Api from '../services/api';
import useBlockChain from '../hooks/useBlockChain';
import { Grid, Paper } from '@mui/material';
import SettingInfo from '../components/block/SettingInfo';
import CurrentList from '../components/block/CurrentList';
import BarLineGradientChart from '../components/chart/BarLineGradientChart';

interface MonitorPageProps {
	offchain: ActionCreatorsMapObject;
}

const MonitorPage: FC<MonitorPageProps> = ({ offchain }): JSX.Element => {
	const data = useBlockChain({ offchain });
	const transactions = data.transactions;
	return (
		<Grid container spacing={3}>
			<Grid item xs={12} md={8} lg={8}>
				<Paper
					sx={{
						p: 2,
						display: 'flex',
						flexDirection: 'column',
					}}
				>
					<BarLineGradientChart />
				</Paper>
			</Grid>
			<Grid item xs={12} md={4} lg={4}>
				<Paper
					sx={{
						p: 2,
						display: 'flex',
						flexDirection: 'column',
					}}
				>
					<SettingInfo />
				</Paper>
			</Grid>
			<Grid item xs={12}>
				<Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
					<CurrentList datas={transactions} />
				</Paper>
			</Grid>
		</Grid>
	);
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
	offchain: bindActionCreators(Api.block, dispatch),
});

export default connect(null, mapDispatchToProps)(MonitorPage);
