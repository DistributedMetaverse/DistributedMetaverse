import React, { FC } from 'react';
import AppSubHeader from '../components/common/AppSubHeader';
import { Box, Container, Grid, Paper } from '@mui/material';
import Chart from '../components/chart/Chart';
import Deposits from '../components/deposit/Deposits';
import Orders from '../components/order/Orders';
import Copyright from '../components/Copyright';

const HomePage: FC = (): JSX.Element => {
	return (
		<Box
			component="main"
			sx={{
				flexGrow: 1,
				height: '100vh',
				overflow: 'auto',
				bgcolor: 'background.default',
				zIndex: 1201,
			}}
		>
			<Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
				<AppSubHeader />
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
				<Copyright sx={{ pt: 4 }} />
			</Container>
		</Box>
	);
};

export default HomePage;
