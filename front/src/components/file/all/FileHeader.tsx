import React, { FC } from 'react';
import { setFilePath, setFileType } from '../../../store/index';
import { Box, Grid } from '@mui/material';
import FolderTabButton from '../cmmn/FolderTabButton';
import FileTypeTabButton from '../cmmn/FileTypeTabButton';
import NavigationPath from '../NavigationPath';

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
						<FolderTabButton path={path} setPath={setFilePath} type={'all'} />
					</Grid>
					<Grid item sx={{ ml: 1 }}>
						<NavigationPath path={path} />
					</Grid>
				</Grid>
				<FileTypeTabButton type={type} setType={setFileType} />
			</Box>
		</Box>
	);
};

export default FileHeader;
