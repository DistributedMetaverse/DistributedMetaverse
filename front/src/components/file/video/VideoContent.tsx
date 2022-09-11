import React, { FC, ChangeEvent, Dispatch, SetStateAction } from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { FileInfo } from '../../../store/types';
import { CSRFData } from '../../../services/types';
import useFilePathPageList from '../../../hooks/useFilePathPageList';
import { Box, Grid, Paper, Typography } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import ContentHeader from '../cmmn/ContentHeader';
import ContentName from '../cmmn/ContentName';
import ContentAside from '../cmmn/ContentAside';
import ContentFooder from '../cmmn/ContentFooder';
import { pagingCount } from '../../../utils/pagination';

interface VideoContentProps {
	file: ActionCreatorsMapObject;
	path: string;
	time: number;
	branch: boolean;
	setFileId: Dispatch<SetStateAction<string>>;
	csrfData: CSRFData;
	fetchData: () => Promise<void>;
}

interface VideoContentDataProps {
	datas: Array<FileInfo>;
	videoClick: (fileId: string) => void;
	csrfData: CSRFData;
	fetchData: () => Promise<void>;
}

const VideoContentGrid: FC<VideoContentDataProps> = ({
	datas,
	videoClick,
	csrfData,
	fetchData,
}): JSX.Element => {
	return (
		<Grid container spacing={3}>
			{datas &&
				datas.map((data: FileInfo) => (
					<Grid item key={data.fileId} xs={4} md={3} lg={2}>
						<Paper
							sx={{
								p: 2,
								'&:hover': {
									cursor: 'pointer',
									backgroundColor: 'action.hover',
								},
							}}
							onClick={() => videoClick(data.fileId)}
						>
							<ContentHeader
								fileId={data.fileId}
								isLike={data.isLike || false}
								csrfData={csrfData}
								fetchData={fetchData}
							/>
							<PlayCircleIcon fontSize="large" />
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

const VideoContentRow: FC<VideoContentDataProps> = ({
	datas,
	videoClick,
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
							'&:hover': {
								cursor: 'pointer',
								backgroundColor: 'action.hover',
							},
							display: 'flex',
							justifyContent: 'space-between',
						}}
						onClick={() => videoClick(data.fileId)}
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

const VideoContent: FC<VideoContentProps> = ({
	file,
	path,
	time,
	branch,
	setFileId,
	csrfData,
	fetchData,
}): JSX.Element => {
	const [page, data, take, total, setPage] = useFilePathPageList({
		file,
		path: path,
		type: 'video',
		time,
	});

	const videoClick = (fileId: string) => {
		setFileId(fileId);
	};

	const pageChange = (event: ChangeEvent<unknown>, page: number) => {
		const value = (event.target as HTMLButtonElement).textContent as any;
		if (value && value === String(page)) setPage(page);
	};

	return (
		<Box sx={{ mt: 2 }}>
			{branch ? (
				<VideoContentGrid
					datas={data}
					videoClick={videoClick}
					csrfData={csrfData}
					fetchData={fetchData}
				/>
			) : (
				<VideoContentRow
					datas={data}
					videoClick={videoClick}
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

export default VideoContent;
