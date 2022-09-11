import React, { FC, ChangeEvent } from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { FileInfo } from '../../../store/types';
import { CSRFData } from '../../../services/types';
import useFilePathPageList from '../../../hooks/useFilePathPageList';
import { Box, Grid, Paper, Typography } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import DescriptionIcon from '@mui/icons-material/Description';
import ContentHeader from '../cmmn/ContentHeader';
import ContentFooder from '../cmmn/ContentFooder';
import { pagingCount } from '../../../utils/pagination';

interface FileContentProps {
	file: ActionCreatorsMapObject;
	time: number;
	path: string;
	type: string;
	csrfData: CSRFData;
	fetchData: () => Promise<void>;
}

interface FileContentDataProps {
	datas: Array<FileInfo>;
	csrfData: CSRFData;
	fetchData: () => Promise<void>;
}

const FileContentGrid: FC<FileContentDataProps> = ({
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

const FileContent: FC<FileContentProps> = ({
	file,
	time,
	path,
	type,
	csrfData,
	fetchData,
}): JSX.Element => {
	const [page, data, take, total, setPage] = useFilePathPageList({
		file,
		path: path,
		type: type,
		time: time,
	});

	const pageChange = (event: ChangeEvent<unknown>, page: number) => {
		const value = (event.target as HTMLButtonElement).textContent as any;
		if (value && value === String(page)) setPage(page);
	};

	return (
		<Box sx={{ mt: 2 }}>
			<FileContentGrid datas={data} csrfData={csrfData} fetchData={fetchData} />
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

export default FileContent;
