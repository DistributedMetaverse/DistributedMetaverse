import React, { FC, ChangeEvent } from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { FileInfo } from '../../../store/types';
import { CSRFData } from '../../../services/types';
import useFilePathPageList from '../../../hooks/useFilePathPageList';
import { Box, Grid, Paper, Typography } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import DescriptionIcon from '@mui/icons-material/Description';
import ContentHeader from '../cmmn/ContentHeader';
import ContentName from '../cmmn/ContentName';
import ContentAside from '../cmmn/ContentAside';
import ContentFooder from '../cmmn/ContentFooder';
import { pagingCount } from '../../../utils/pagination';

interface RecentContentProps {
	file: ActionCreatorsMapObject;
	time: number;
	branch: boolean;
	csrfData: CSRFData;
	fetchData: () => Promise<void>;
}

interface RecentContentDataProps {
	datas: Array<FileInfo>;
	csrfData: CSRFData;
	fetchData: () => Promise<void>;
}

const RecentContentGrid: FC<RecentContentDataProps> = ({
	datas,
	csrfData,
	fetchData,
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
								csrfData={csrfData}
								fetchData={fetchData}
							/>
							<DescriptionIcon fontSize="large" />
							<Typography
								variant="subtitle2"
								sx={{ fontSize: '0.8rem', wordBreak: 'break-all' }}
							>
								{data.filename}
							</Typography>
							<ContentFooder
								fileId={data.fileId}
								fileSize={data.fileSize}
								path={data.path}
							/>
						</Paper>
					</Grid>
				))}
		</Grid>
	);
};

const RecentContentRow: FC<RecentContentDataProps> = ({
	datas,
	csrfData,
	fetchData,
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
							path={data.path}
							isLike={data.isLike || false}
							csrfData={csrfData}
							fetchData={fetchData}
						/>
					</Paper>
				))}
		</Box>
	);
};

const RecentContent: FC<RecentContentProps> = ({
	file,
	time,
	branch,
	csrfData,
	fetchData,
}): JSX.Element => {
	const [page, data, take, total, setPage] = useFilePathPageList({
		file,
		path: '/',
		type: 'recent',
		time,
	});

	const pageChange = (event: ChangeEvent<unknown>, page: number) => {
		const value = (event.target as HTMLButtonElement).textContent as any;
		if (value && value === String(page)) setPage(page);
	};

	return (
		<Box sx={{ mt: 2 }}>
			{branch ? (
				<RecentContentGrid
					datas={data}
					csrfData={csrfData}
					fetchData={fetchData}
				/>
			) : (
				<RecentContentRow
					datas={data}
					csrfData={csrfData}
					fetchData={fetchData}
				/>
			)}
			<Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
				<Pagination
					count={pagingCount(page, take, total)}
					variant="outlined"
					color="primary"
					siblingCount={0}
					boundaryCount={1}
					hidePrevButton
					hideNextButton
					onChange={pageChange}
					size="small"
				/>
			</Box>
		</Box>
	);
};

export default RecentContent;
