import React, { FC } from 'react';
import { setFolderPath, setFolderType } from '../../../store/index';
import { Box, Grid } from '@mui/material';
import FolderPathTabButton from '../cmmn/FolderPathTabButton';
import FileTypeTabButton from '../cmmn/FileTypeTabButton';
import NavigationPath from '../NavigationPath';

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
						<FolderPathTabButton
							path={path}
							setPath={setFolderPath}
							type={'all'}
						/>
					</Grid>
					<Grid item sx={{ ml: 1 }}>
						<NavigationPath path={path} />
					</Grid>
				</Grid>
				<FileTypeTabButton type={type} setType={setFolderType} />
			</Box>
		</Box>
	);
};

export default FolderHeader;
