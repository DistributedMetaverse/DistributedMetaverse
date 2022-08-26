import React, { FC } from 'react';
import { Box, Grid } from '@mui/material';

const RecentHeader: FC = (): JSX.Element => {
	return (
		<Box sx={{ mb: 2 }}>
			<Box sx={{ mb: 1, display: 'flex', justifyContent: 'space-between' }}>
				<Grid container spacing={1} sx={{ width: 350 }}>
					<Grid item sx={{ ml: 1 }}></Grid>
				</Grid>
			</Box>
		</Box>
	);
};

export default RecentHeader;
