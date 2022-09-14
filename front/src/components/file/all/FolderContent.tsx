import React, { FC, ChangeEvent } from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { FolderPathInfo } from '../../../store/types';
import useFolderPathPageList from '../../../hooks/useFolderPathPageList';
import { Box, Grid, Paper, Typography } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import FolderIcon from '@mui/icons-material/Folder';
import { pagingCount } from '../../../utils/pagination';

interface FolderContentProps {
	file: ActionCreatorsMapObject;
	path: string;
	type: string;
}

const FolderContent: FC<FolderContentProps> = ({
	file,
	path,
	type,
}): JSX.Element => {
	const [page, data, take, total, setPage] = useFolderPathPageList({
		file,
		path: path,
		type: type,
	});

	const pageChange = (event: ChangeEvent<unknown>, page: number) => {
		const value = (event.target as HTMLButtonElement).textContent as any;
		if (value && value === String(page)) setPage(page);
	};

	const endOfSplit = (folderPath: string) => {
		const name = folderPath.replace(path, '');
		if (name === '') return '.';
		else if (name[0] === '/') return name.slice(1);
		else return name;
	};

	return (
		<Box sx={{ mt: 2, mb: 2 }}>
			<Grid container spacing={3}>
				{data &&
					data.map((data: FolderPathInfo) => (
						<Grid item key={data.folderPath} xs={4} md={2} lg={2}>
							<Paper
								sx={{
									p: 2,
									display: 'flex',
									flexDirection: 'column',
								}}
							>
								<FolderIcon />
								<Typography variant="subtitle2" sx={{ wordBreak: 'break-all' }}>
									{endOfSplit(data.folderPath)}
								</Typography>
								<Typography variant="subtitle2" sx={{ color: '#626274' }}>
									{data.count} files
								</Typography>
							</Paper>
						</Grid>
					))}
			</Grid>
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

export default FolderContent;
