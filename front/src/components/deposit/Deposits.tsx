import React, { FC, MouseEvent } from 'react';
import { Link, Typography } from '@mui/material';
import Title from '../Title';

const preventDefault = (event: MouseEvent) => {
	event.preventDefault();
};

const Deposits: FC = (): JSX.Element => {
	return (
		<React.Fragment>
			<Title>Recent Deposits</Title>
			<Typography component="p" variant="h4">
				$3,024.00
			</Typography>
			<Typography color="text.secondary" sx={{ flex: 1 }}>
				on 15 March, 2019
			</Typography>
			<div>
				<Link color="primary" href="#" onClick={preventDefault}>
					View balance
				</Link>
			</div>
		</React.Fragment>
	);
};

export default Deposits;
