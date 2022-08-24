import React, { FC } from 'react';
import { setFilePath, setFileType } from '../../store/index';
import { Box, Grid, Divider, Typography } from '@mui/material';
import FolderTabButton from './FolderTabButton';
import FileTypeTabButton from './FileTypeTabButton';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface FileHeaderProps {
	path: string;
	type: string;
}

const FileHeader: FC<FileHeaderProps> = ({ path, type }): JSX.Element => {
	return (
		<Box sx={{ mb: 2 }}>
			<Box sx={{ mb: 1, display: 'flex', justifyContent: 'space-between' }}>
				<Grid container spacing={1} sx={{ width: 350 }}>
					<Grid item>
						<FolderTabButton path={path} setPath={setFilePath} />
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
				<FileTypeTabButton type={type} setType={setFileType} />
			</Box>
		</Box>
	);
};

export default FileHeader;
