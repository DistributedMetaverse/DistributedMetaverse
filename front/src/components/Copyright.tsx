import React from 'react';
import { Link, Typography } from '@mui/material';

const Copyright = (props: any): JSX.Element => {
	return (
		<Typography
			variant="body2"
			color="text.secondary"
			align="center"
			{...props}
		>
			{'Copyright © '}
			<Link color="inherit" href="http://localhost:3000">
				DistributedMetaverse
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
};

export default Copyright;
