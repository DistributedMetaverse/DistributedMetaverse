import React, { FC } from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { FolderInfo } from '../../store/types';
import useFolderPathPageList from '../../hooks/useFolderPathPageList';
import { Box, Grid, Paper, Typography } from '@mui/material';
import Pagination from '@mui/material/Pagination';

interface FolderContentProps {
	actions: ActionCreatorsMapObject;
}

const FolderContent: FC<FolderContentProps> = ({ actions }): JSX.Element => {
	const [data, setPage] = useFolderPathPageList({
		actions,
		path: '/',
		type: 'download',
	});
	const datas = data.datas as Array<FolderInfo>;
	return (
		<Box sx={{ mt: 2, mb: 2 }}>
			<Grid container spacing={3}>
				{datas &&
					datas.map((data: FolderInfo) => (
						<Grid item key={data.path} xs={4} md={3} lg={2}>
							<Paper
								sx={{
									p: 2,
									display: 'flex',
									flexDirection: 'column',
								}}
							>
								<Typography component="span" variant="h6">
									{data.path}
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
					size="small"
				/>
			</Box>
		</Box>
	);
};

export default FolderContent;
