import React, { FC } from 'react';
import { Dispatch } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import Api from '../services/api';
import useDashboard from '../hooks/useDashboard';
import { Grid, Paper } from '@mui/material';
import PieMultiLineChart from '../components/chart/PieMultiLineChart';
import LineGradientChart from '../components/chart/LineGradientChart';
import RadarCustomChart from '../components/chart/RadarCustomChart';

interface MonitorPageProps {
	status: ActionCreatorsMapObject;
}

const HomePage: FC<MonitorPageProps> = ({ status }): JSX.Element => {
	const [category, daliy, indicator] = useDashboard({ status });
	return (
		<Grid container spacing={3}>
			<Grid item xs={12}>
				<Paper sx={{ p: 2 }}>
					<PieMultiLineChart datas={category} />
				</Paper>
			</Grid>
			<Grid item xs={12} md={8} lg={8}>
				<Paper
					sx={{
						p: 2,
						display: 'flex',
						flexDirection: 'column',
					}}
				>
					<LineGradientChart datas={daliy} />
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
					<RadarCustomChart data={indicator} />
				</Paper>
			</Grid>
		</Grid>
	);
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
	status: bindActionCreators(Api.status, dispatch),
});

export default connect(null, mapDispatchToProps)(HomePage);
