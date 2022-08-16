import React, { FC, MouseEvent } from 'react';
import {
	Link,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
} from '@mui/material';
import Title from '../Title';

// Generate Order Data
function createData(
	id: number,
	date: string,
	name: string,
	shipTo: string,
	paymentMethod: string,
	amount: number
) {
	return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
	createData(
		0,
		'16 Mar, 2019',
		'Elvis Presley',
		'Tupelo, MS',
		'VISA ⠀•••• 3719',
		312.44
	),
	createData(
		1,
		'16 Mar, 2019',
		'Paul McCartney',
		'London, UK',
		'VISA ⠀•••• 2574',
		866.99
	),
	createData(
		2,
		'16 Mar, 2019',
		'Tom Scholz',
		'Boston, MA',
		'MC ⠀•••• 1253',
		100.81
	),
	createData(
		3,
		'16 Mar, 2019',
		'Michael Jackson',
		'Gary, IN',
		'AMEX ⠀•••• 2000',
		654.39
	),
	createData(
		4,
		'15 Mar, 2019',
		'Bruce Springsteen',
		'Long Branch, NJ',
		'VISA ⠀•••• 5919',
		212.79
	),
];

const preventDefault = (event: MouseEvent) => {
	event.preventDefault();
};

const Order: FC = (): JSX.Element => {
	return (
		<React.Fragment>
			<Title>Recent Orders</Title>
			<Table size="small">
				<TableHead>
					<TableRow>
						<TableCell>Date</TableCell>
						<TableCell>Name</TableCell>
						<TableCell>Ship To</TableCell>
						<TableCell>Payment Method</TableCell>
						<TableCell align="right">Sale Amount</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row) => (
						<TableRow key={row.id}>
							<TableCell>{row.date}</TableCell>
							<TableCell>{row.name}</TableCell>
							<TableCell>{row.shipTo}</TableCell>
							<TableCell>{row.paymentMethod}</TableCell>
							<TableCell align="right">{`$${row.amount}`}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			<Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
				See more orders
			</Link>
		</React.Fragment>
	);
};

export default Order;
