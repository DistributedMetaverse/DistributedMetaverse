import React, { FC, ChangeEvent } from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { FileInfo } from '../../../store/types';
import useFilePathPageList from '../../../hooks/useFilePathPageList';
import { Box, Grid, Paper, Typography } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import DescriptionIcon from '@mui/icons-material/Description';
import ContentHeader from '../cmmn/ContentHeader';
import ContentFooder from '../cmmn/ContentFooder';
import { pagingCount } from '../../../utils/pagination';

interface FileContentProps {
	file: ActionCreatorsMapObject;
	path: string;
	type: string;
}

interface FileContentDataProps {
	datas: Array<FileInfo>;
}

const FileContentGrid: FC<FileContentDataProps> = ({ datas }): JSX.Element => {
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

const FileContent: FC<FileContentProps> = ({
	file,
	path,
	type,
}): JSX.Element => {
	const [data, take, total, setPage] = useFilePathPageList({
		file,
		path: path,
		type: type,
	});

	const pageChange = (event: ChangeEvent<unknown>, page: number) => {
		const value = (event.target as HTMLButtonElement).textContent as any;
		if (value && value === String(page)) setPage(page);
	};

	return (
		<Box sx={{ mt: 2 }}>
			<FileContentGrid datas={data} />
			<Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
				<Pagination
					count={pagingCount(take, total)}
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
