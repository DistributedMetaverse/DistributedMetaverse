import React, { FC } from 'react';
import { setFolderPath, setFolderType } from '../../store/index';
import { Box, Grid, Typography } from '@mui/material';
import FolderTabButton from './cmmn/FolderTabButton';
import FileTypeTabButton from './cmmn/FileTypeTabButton';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface FolderHeaderProps {
	path: string;
	type: string;
}

const FolderHeader: FC<FolderHeaderProps> = ({ path, type }): JSX.Element => {
	return (
		<Box sx={{ mb: 2 }}>
			<Box sx={{ mb: 1, display: 'flex', justifyContent: 'space-between' }}>
				<Grid container spacing={1} sx={{ width: 350 }}>
					<Grid item>
						<FolderTabButton path={path} setPath={setFolderPath} />
					</Grid>
					<Grid item sx={{ ml: 1 }}>
						<Typography variant="subtitle2" color="inherit">
							All Files
						</Typography>
					</Grid>
					<Grid item>
						<ArrowForwardIosIcon sx={{ mb: 0.3, fontSize: '0.7rem' }} />
					</Grid>
					<Grid item>
						<Typography variant="subtitle2" color="inherit">
							{path}
						</Typography>
					</Grid>
				</Grid>
				<FileTypeTabButton type={type} setType={setFolderType} />
			</Box>
		</Box>
	);
};

export default FolderHeader;
