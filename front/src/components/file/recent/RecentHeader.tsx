import React, { FC, Dispatch, SetStateAction } from 'react';
import { Box, Grid } from '@mui/material';
import SwitchGridTabButton from '../cmmn/SwitchGridTabButton';

interface RecentHeaderProps {
	branch: boolean;
	setSwitch: Dispatch<SetStateAction<boolean>>;
}

const RecentHeader: FC<RecentHeaderProps> = ({
	branch,
	setSwitch,
}): JSX.Element => {
	return (
		<Box sx={{ mb: 2 }}>
			<Box sx={{ mb: 1, display: 'flex', justifyContent: 'space-between' }}>
				<Grid container spacing={1} sx={{ width: 350 }}>
					<Grid item sx={{ ml: 1 }}></Grid>
				</Grid>
				<SwitchGridTabButton branch={branch} setSwitch={setSwitch} />
			</Box>
		</Box>
	);
};

export default RecentHeader;
