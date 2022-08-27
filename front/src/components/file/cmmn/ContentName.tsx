import React, { FC } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';

interface ContentNameProps {
	filename: string;
}

const ContentName: FC<ContentNameProps> = ({ filename }) => {
	return (
		<Box sx={{ pl: 3, display: 'flex' }}>
			<Grid container spacing={2}>
				<Grid item>
					<DescriptionIcon fontSize="small" />
				</Grid>
				<Grid item>
					<Typography variant="subtitle2" sx={{ pl: 2, fontSize: '0.9rem' }}>
						{filename}
					</Typography>
				</Grid>
			</Grid>
		</Box>
	);
};

export default ContentName;
