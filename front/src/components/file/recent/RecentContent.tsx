import React, { FC, ChangeEvent } from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { FileInfo } from '../../../store/types';
import useFilePathPageList from '../../../hooks/useFilePathPageList';
import { Box, Grid, Paper, Typography } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import DescriptionIcon from '@mui/icons-material/Description';
import ContentHeader from '../cmmn/ContentHeader';
import ContentFooder from '../cmmn/ContentFooder';

interface RecentContentProps {
	actions: ActionCreatorsMapObject;
}

interface RecentContentGridProps {
	datas: Array<FileInfo>;
}

const RecentContentGrid: FC<RecentContentGridProps> = ({
	datas,
}): JSX.Element => {
	return (
		<Grid container spacing={3}>
			{datas &&
				datas.map((data: FileInfo) => (
					<Grid item key={data.fileId} xs={4} md={3} lg={2}>
						<Paper sx={{ p: 2 }}>
							<ContentHeader
								fileId={data.fileId}
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

const RecentContent: FC<RecentContentProps> = ({ actions }): JSX.Element => {
	const [data, setPage] = useFilePathPageList({
		actions,
		path: '/',
		type: 'download',
	});

	const pageChange = (event: ChangeEvent<unknown>, page: number) => {
		const value = (event.target as HTMLButtonElement).textContent as any;
		if (value && value === String(page)) setPage(page);
	};

	const datas = data.datas as Array<FileInfo>;
	return (
		<Box sx={{ mt: 2 }}>
			<RecentContentGrid datas={datas} />
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

export default RecentContent;
