import React, { FC } from 'react';
import { Typography, Breadcrumbs } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

interface NavigationPathProps {
	path: string;
}

const NavigationPath: FC<NavigationPathProps> = ({ path }): JSX.Element => {
	return (
		<Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
			<Typography variant="subtitle2" color="inherit">
				Path
			</Typography>
			<Typography
				variant="subtitle2"
				color="inherit"
				sx={{ wordBreak: 'break-all' }}
			>
				{path}
			</Typography>
		</Breadcrumbs>
	);
};

export default NavigationPath;
