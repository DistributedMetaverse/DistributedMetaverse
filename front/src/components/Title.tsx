import React, { FC } from 'react';
import { Typography, TypographyProps } from '@mui/material';

const Title: FC<TypographyProps> = ({ children }): JSX.Element => {
	return (
		<Typography component="h1" variant="h6" color="inherit">
			{children}
		</Typography>
	);
};

export default Title;
