import React, { FC } from 'react';
import { Typography } from '@mui/material';

interface TitleProps {
	children?: React.ReactNode;
}

const Title: FC<TitleProps> = ({ children }): JSX.Element => {
	return (
		<Typography component="h2" variant="h6" color="primary" gutterBottom>
			{children}
		</Typography>
	);
};

export default Title;
