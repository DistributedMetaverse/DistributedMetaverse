import React, { FC, ChangeEvent } from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { FolderInfo } from '../../../store/types';
import useFolderPathPageList from '../../../hooks/useFolderPathPageList';
import { Box, Grid, Paper, Typography } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import FolderIcon from '@mui/icons-material/Folder';

interface FolderContentProps {
	file: ActionCreatorsMapObject;
}

const FolderContent: FC<FolderContentProps> = ({ file }): JSX.Element => {
	const [data, setPage] = useFolderPathPageList({
		file,
		path: '/',
		type: 'download',
	});

	const pageChange = (event: ChangeEvent<unknown>, page: number) => {
		const value = (event.target as HTMLButtonElement).textContent as any;
		if (value && value === String(page)) setPage(page);
	};

	const endOfSplit = (path: string) => {
		const name = path.split('/').pop();
		if (name === '') return '.';
		else return name;
	};

	return (
		<Box sx={{ mt: 2, mb: 2 }}>
			<Grid container spacing={3}>
				{data &&
					data.map((data: FolderInfo) => (
						<Grid item key={data.path} xs={4} md={2} lg={2}>
							<Paper
								sx={{
									p: 2,
									display: 'flex',
									flexDirection: 'column',
								}}
							>
								<FolderIcon />
								<Typography variant="subtitle2">
									{endOfSplit(data.path)}
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

export default FolderContent;
