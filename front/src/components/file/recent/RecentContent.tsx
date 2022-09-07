import React, { FC, ChangeEvent } from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { FileInfo } from '../../../store/types';
import useFilePathPageList from '../../../hooks/useFilePathPageList';
import { Box, Grid, Paper, Typography } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import DescriptionIcon from '@mui/icons-material/Description';
import ContentHeader from '../cmmn/ContentHeader';
import ContentName from '../cmmn/ContentName';
import ContentAside from '../cmmn/ContentAside';
import ContentFooder from '../cmmn/ContentFooder';

interface RecentContentProps {
	file: ActionCreatorsMapObject;
	branch: boolean;
}

interface RecentContentDataProps {
	datas: Array<FileInfo>;
}

const RecentContentGrid: FC<RecentContentDataProps> = ({
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

const RecentContentRow: FC<RecentContentDataProps> = ({
	datas,
}): JSX.Element => {
	return (
		<Box>
			{datas &&
				datas.map((data: FileInfo) => (
					<Paper
						key={data.fileId}
						sx={{
							mb: 2,
							pt: 2,
							pb: 1,
							display: 'flex',
							justifyContent: 'space-between',
						}}
					>
						<ContentName filename={data.filename} />
						<ContentAside
							fileId={data.fileId}
							fileSize={data.fileSize}
							isLike={data.isLike || false}
						/>
					</Paper>
				))}
		</Box>
	);
};

const RecentContent: FC<RecentContentProps> = ({
	file,
	branch,
}): JSX.Element => {
	const [data, setPage] = useFilePathPageList({
		file,
		path: '/',
		type: 'recent',
	});

	const pageChange = (event: ChangeEvent<unknown>, page: number) => {
		const value = (event.target as HTMLButtonElement).textContent as any;
		if (value && value === String(page)) setPage(page);
	};

	return (
		<Box sx={{ mt: 2 }}>
			{branch ? (
				<RecentContentGrid datas={data} />
			) : (
				<RecentContentRow datas={data} />
			)}
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
