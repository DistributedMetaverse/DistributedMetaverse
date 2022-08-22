import React, { FC } from 'react';
import { DataProps } from '../menu/types';
import { Box, Grow, Grid, Button } from '@mui/material';

interface DownloadProps {
	branch: boolean;
	datas?: Array<DataProps>;
}

const DownloadBar: FC<DownloadProps> = ({ branch, datas }): JSX.Element => {
	return (
		<Box
			sx={{
				ml: -2.5,
				width: '80%',
				display: 'inline-block',
				flexDirection: 'column',
				alignItems: 'center', // 가로 중앙
			}}
		>
			<Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
				{datas &&
					datas.map((data: DataProps) => (
						<Grow key={data.id} in={branch} timeout={data.id * 300}>
							<Grid item xs={6}>
								<Button
									variant="outlined"
									sx={{ bgcolor: 'primary.main', color: 'secondary.main' }}
								>
									{data.dataId}
								</Button>
							</Grid>
						</Grow>
					))}
			</Grid>
		</Box>
	);
};

export default DownloadBar;
