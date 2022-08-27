import React, { FC } from 'react';
import { Box, Grid } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import ContentTabButton from './ContentTabButton';

interface ContentHeaderProps {
	fileId: string;
	isLike: boolean;
}

const ContentHeader: FC<ContentHeaderProps> = ({
	fileId,
	isLike,
}): JSX.Element => {
	return (
		<Box sx={{ pb: 1, display: 'flex' }}>
			<Grid container sx={{ justifyContent: 'space-between' }}>
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

export default ContentHeader;
