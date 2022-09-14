import React, { FC, useState } from 'react';
import { TransactionData } from '../../services/types';
import {
	Box,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	TableContainer,
} from '@mui/material';
import AlertModal from '../modal/AlertModal';
import { linkFormat } from '../../utils/format';

interface CurrentListProps {
	datas: Array<TransactionData>;
}

const CurrentList: FC<CurrentListProps> = ({ datas }): JSX.Element => {
	const [link, setLink] = useState('');
	const [openAlert, setOpenAlert] = useState(false);

	const transactionClick = (qmhash: string) => {
		setLink(linkFormat(qmhash, '/'));
		setOpenAlert(true);
	};
	return (
		<Box>
			<TableContainer>
				<Table size="small">
					<TableHead>
						<TableRow>
							<TableCell>ID</TableCell>
							<TableCell align="center">Filename</TableCell>
							<TableCell align="center">MimeType</TableCell>
							<TableCell align="center">Datetime</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{datas &&
							datas.map((data: TransactionData) => {
								const subdata = JSON.parse(data.data);
								return (
									<TableRow
										key={data.id}
										sx={{
											'&:hover': {
												cursor: 'pointer',
												backgroundColor: 'action.hover',
											},
										}}
										onClick={() => transactionClick(subdata.qmhash)}
									>
										<TableCell>{data.id}</TableCell>
										<TableCell align="center">{subdata.filename}</TableCell>
										<TableCell align="center">{subdata.mimetype}</TableCell>
										<TableCell align="center">
											{data.datetime.split(' ')[0]}
										</TableCell>
									</TableRow>
								);
							})}
					</TableBody>
				</Table>
			</TableContainer>
			<AlertModal
				title={'IPFS에 저장된 링크 주소입니다.'}
				content={link}
				openAlert={openAlert}
				setOpenAlert={setOpenAlert}
			/>
		</Box>
	);
};

export default CurrentList;
