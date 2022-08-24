import React, { FC } from 'react';
import { Box, Grid, Divider, Typography } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import { fileSizeFormat } from '../../../utils/format';

interface ContentFooterProps {
	fileSize: number;
}

const ContentFooter: FC<ContentFooterProps> = ({ fileSize }): JSX.Element => {
	return (
		<Box>
			<Divider
				variant="middle"
				sx={{
					pt: 2,
					height: '3px',
					borderColor: 'primary.main',
				}}
			/>
			<Box
				sx={{
					mt: 2,
					display: 'flex',
				}}
			>
				<Grid container sx={{ justifyContent: 'space-between' }}>
					<Grid item>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center', // 가로 중앙
							}}
						>
							<Typography
								variant="subtitle2"
								sx={{ fontSize: '0.1rem', color: '#626274' }}
							>
								Filesize
							</Typography>
							<Typography
								variant="subtitle2"
								sx={{ fontSize: '0.1rem', color: '#626274' }}
							>
								{fileSizeFormat(fileSize)}
							</Typography>
						</Box>
					</Grid>
					<Grid item>
						<ShareIcon
							fontSize="small"
							sx={{ mt: 0.7, color: 'secondary.main' }}
						/>
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
};

export default ContentFooter;
