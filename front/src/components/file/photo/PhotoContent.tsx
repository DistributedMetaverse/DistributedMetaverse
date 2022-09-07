import React, { FC, ChangeEvent, Dispatch, SetStateAction } from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { FileInfo } from '../../../store/types';
import useFilePathPageList from '../../../hooks/useFilePathPageList';
import { Box, Grid, Paper, Typography } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import PhotoIcon from '@mui/icons-material/Photo';
import ContentHeader from '../cmmn/ContentHeader';
import ContentName from '../cmmn/ContentName';
import ContentAside from '../cmmn/ContentAside';
import ContentFooder from '../cmmn/ContentFooder';

interface PhotoContentProps {
	file: ActionCreatorsMapObject;
	branch: boolean;
	setFileId: Dispatch<SetStateAction<string>>;
}

interface PhotoContentDataProps {
	datas: Array<FileInfo>;
	photoClick: (fileId: string) => void;
}

const PhotoContentGrid: FC<PhotoContentDataProps> = ({
	datas,
	photoClick,
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
							onClick={() => photoClick(data.fileId)}
						>
							<ContentHeader
								fileId={data.fileId}
								isLike={data.isLike || false}
							/>
							<PhotoIcon fontSize="large" />
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

const PhotoContentRow: FC<PhotoContentDataProps> = ({
	datas,
	photoClick,
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
						onClick={() => photoClick(data.fileId)}
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

const PhotoContent: FC<PhotoContentProps> = ({
	file,
	branch,
	setFileId,
}): JSX.Element => {
	const [data, setPage] = useFilePathPageList({
		file,
		path: '/',
		type: 'photo',
	});

	const photoClick = (fileId: string) => {
		setFileId(fileId);
	};

	const pageChange = (event: ChangeEvent<unknown>, page: number) => {
		const value = (event.target as HTMLButtonElement).textContent as any;
		if (value && value === String(page)) setPage(page);
	};

	return (
		<Box sx={{ mt: 2 }}>
			{branch ? (
				<PhotoContentGrid datas={data} photoClick={photoClick} />
			) : (
				<PhotoContentRow datas={data} photoClick={photoClick} />
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

export default PhotoContent;
