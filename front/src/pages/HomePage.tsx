import React, { FC } from 'react';
import { Grid, Paper } from '@mui/material';
import Chart from '../components/chart/Chart';
import Deposits from '../components/deposit/Deposits';
import Orders from '../components/order/Orders';

const HomePage: FC = (): JSX.Element => {
	return (
		<Grid container spacing={3}>
			{/* Chart */}
			<Grid item xs={12} md={8} lg={9}>
				<Paper
					sx={{
						p: 2,
						display: 'flex',
						flexDirection: 'column',
						height: 240,
					}}
				>
					<Chart />
				</Paper>
			</Grid>
			{/* Recent Deposits */}
			<Grid item xs={12} md={4} lg={3}>
				<Paper
					sx={{
						p: 2,
						display: 'flex',
						flexDirection: 'column',
						height: 240,
					}}
				>
					<Deposits />
				</Paper>
			</Grid>
			{/* Recent Orders */}
			<Grid item xs={12}>
				<Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
					<Orders />
				</Paper>
			</Grid>
		</Grid>
	);
};

export default HomePage;
