import React, { FC, ChangeEvent } from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { DataInfo } from '../../store/types';
import useFilePathPageList from '../../hooks/useFilePathPageList';
import { Box, Grid, Paper, Typography } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import DescriptionIcon from '@mui/icons-material/Description';
import ContentHeader from './cmmn/ContentHeader';
import ContentFooder from './cmmn/ContentFooder';

interface FileContentProps {
	actions: ActionCreatorsMapObject;
}

interface FileContentSwitch {
	datas: Array<DataInfo>;
}

const FileContentGrid: FC<FileContentSwitch> = ({ datas }): JSX.Element => {
	return (
		<Grid container spacing={3}>
			{datas &&
				datas.map((data: DataInfo) => (
					<Grid item key={data.dataId} xs={6} md={3} lg={2}>
						<Paper sx={{ p: 2 }}>
							<ContentHeader
								dataId={data.dataId}
								isLike={data.isLike || false}
							/>
							<DescriptionIcon fontSize="large" />
							<Typography variant="subtitle2" sx={{ fontSize: '0.8rem' }}>
								{data.filename}
							</Typography>
							<ContentFooder fileSize={data.fileSize} />
						</Paper>
					</Grid>
				))}
		</Grid>
	);
};

const FileContent: FC<FileContentProps> = ({ actions }): JSX.Element => {
	const [data, setPage] = useFilePathPageList({
		actions,
		path: '/',
		type: 'download',
	});

	const pageChange = (event: ChangeEvent<unknown>, page: number) => {
		const value = (event.target as HTMLButtonElement).textContent as any;
		if (value && value === String(page)) setPage(page);
	};

	const datas = data.datas as Array<DataInfo>;
	return (
		<Box sx={{ mt: 2 }}>
			<FileContentGrid datas={datas} />
			<Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
				<Pagination
					count={10}
					variant="outlined"
					color="primary"
					siblingCount={0}
					boundaryCount={1}
					showFirstButton
					showLastButton
					onChange={pageChange}
					size="small"
				/>
			</Box>
		</Box>
	);
};

export default FileContent;
