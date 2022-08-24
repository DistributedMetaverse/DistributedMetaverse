import React, { FC } from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { DataInfo } from '../../store/types';
import useFilePathPageList from '../../hooks/useFilePathPageList';
import { Box, Grid, Paper, Typography } from '@mui/material';
import Pagination from '@mui/material/Pagination';

interface FileContentProps {
	actions: ActionCreatorsMapObject;
}

const FileContent: FC<FileContentProps> = ({ actions }): JSX.Element => {
	const [data, setPage] = useFilePathPageList({
		actions,
		path: '/',
		type: 'download',
	});
	const datas = data.datas as Array<DataInfo>;
	return (
		<Box sx={{ mt: 2 }}>
			<Grid container spacing={3}>
				{datas &&
					datas.map((data: DataInfo) => (
						<Grid item key={data.dataId} xs={4} md={3} lg={2}>
							<Paper
								sx={{
									p: 2,
									display: 'flex',
									flexDirection: 'column',
								}}
							>
								<Typography component="span" variant="h6">
									{data.filename}
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

export default FileContent;
