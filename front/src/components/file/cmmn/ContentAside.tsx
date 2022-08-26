import React, { FC } from 'react';
import { Box, Grid, Divider, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import ShareIcon from '@mui/icons-material/Share';
import ContentTabButton from './ContentTabButton';
import { fileSizeFormat } from '../../../utils/format';

interface ContentAsideProps {
	fileId: string;
	fileSize: number;
	isLike: boolean;
}

const ContentAside: FC<ContentAsideProps> = ({
	fileId,
	fileSize,
	isLike,
}): JSX.Element => {
	return (
		<Box sx={{ pt: 0.5, pr: 3, display: 'flex' }}>
			<Divider
				orientation="vertical"
				variant="fullWidth"
				sx={{ mr: 3, mt: -0.6, width: 3, borderColor: 'primary.main' }}
			/>
			<Grid container spacing={2}>
				<Grid item sx={{ mt: -0.1, pr: 3 }}>
					<Typography
						variant="subtitle2"
						sx={{ fontSize: '0.8rem', color: '#626274' }}
					>
						{fileSizeFormat(fileSize)}
					</Typography>
				</Grid>
				<Grid item>
					<ShareIcon fontSize="small" sx={{ color: 'secondary.main' }} />
				</Grid>
				<Grid item>
					{isLike ? (
						<StarIcon fontSize="small" sx={{ color: 'secondary.main' }} />
					) : (
						<StarOutlineIcon
							fontSize="small"
							sx={{ color: 'secondary.main' }}
						/>
					)}
				</Grid>
				<Grid item>
					<ContentTabButton fileId={fileId} />
				</Grid>
			</Grid>
		</Box>
	);
};

export default ContentAside;
