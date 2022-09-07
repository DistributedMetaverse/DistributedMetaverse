import React, { FC, ChangeEvent, Dispatch, SetStateAction } from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { FileInfo } from '../../../store/types';
import useFilePathPageList from '../../../hooks/useFilePathPageList';
import { Box, Grid, Paper, Typography } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import ContentHeader from '../cmmn/ContentHeader';
import ContentName from '../cmmn/ContentName';
import ContentAside from '../cmmn/ContentAside';
import ContentFooder from '../cmmn/ContentFooder';

interface VideoContentProps {
	file: ActionCreatorsMapObject;
	branch: boolean;
	setFileId: Dispatch<SetStateAction<string>>;
}

interface VideoContentDataProps {
	datas: Array<FileInfo>;
	videoClick: (fileId: string) => void;
}

const VideoContentGrid: FC<VideoContentDataProps> = ({
	datas,
	videoClick,
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
							/>
							<PlayCircleIcon fontSize="large" />
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

const VideoContentRow: FC<VideoContentDataProps> = ({
	datas,
	videoClick,
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
							isLike={data.isLike || false}
						/>
					</Paper>
				))}
		</Box>
	);
};

const VideoContent: FC<VideoContentProps> = ({
	file,
	branch,
	setFileId,
}): JSX.Element => {
	const [data, setPage] = useFilePathPageList({
		file,
		path: '/',
		type: 'video',
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
				<VideoContentGrid datas={data} videoClick={videoClick} />
			) : (
				<VideoContentRow datas={data} videoClick={videoClick} />
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

export default VideoContent;
