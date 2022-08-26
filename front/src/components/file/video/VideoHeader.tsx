import React, { FC } from 'react';
import { setFilePath } from '../../../store/index';
import { Box, Grid } from '@mui/material';
import FolderTabButton from '../cmmn/FolderTabButton';
import NavigationPath from '../NavigationPath';

interface VideoHeaderProps {
	path: string;
}

const VideoHeader: FC<VideoHeaderProps> = ({ path }): JSX.Element => {
	return (
		<Box sx={{ mb: 2 }}>
			<Box sx={{ mb: 1, display: 'flex', justifyContent: 'space-between' }}>
				<Grid container spacing={1} sx={{ width: 350 }}>
					<Grid item>
						<FolderTabButton path={path} setPath={setFilePath} type={'video'} />
					</Grid>
					<Grid item sx={{ ml: 1 }}>
						<NavigationPath path={path} />
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
};

export default VideoHeader;
