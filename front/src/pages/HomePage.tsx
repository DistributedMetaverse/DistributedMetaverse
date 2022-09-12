import React, { FC } from 'react';
import { Grid, Paper } from '@mui/material';
import PieMultiLineChart from '../components/chart/PieMultiLineChart';
import LineGradientChart from '../components/chart/LineGradientChart';
import RadarCustomChart from '../components/chart/RadarCustomChart';

const HomePage: FC = (): JSX.Element => {
	return (
		<Grid container spacing={3}>
			<Grid item xs={12}>
				<Paper sx={{ p: 2 }}>
					<PieMultiLineChart />
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
					<LineGradientChart />
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
					<RadarCustomChart />
				</Paper>
			</Grid>
		</Grid>
	);
};

export default HomePage;
