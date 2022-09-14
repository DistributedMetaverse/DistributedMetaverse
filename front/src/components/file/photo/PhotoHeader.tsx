import React, { FC, Dispatch, SetStateAction } from 'react';
import { setFilePath } from '../../../store/index';
import { Box, Grid } from '@mui/material';
import FilePathTabButton from '../cmmn/FilePathTabButton';
import SwitchGridTabButton from '../cmmn/SwitchGridTabButton';
import NavigationPath from '../NavigationPath';

interface PhotoHeaderProps {
	path: string;
	branch: boolean;
	setSwitch: Dispatch<SetStateAction<boolean>>;
}

const PhotoHeader: FC<PhotoHeaderProps> = ({
	path,
	branch,
	setSwitch,
}): JSX.Element => {
	return (
		<Box sx={{ mb: 2 }}>
			<Box sx={{ mb: 1, display: 'flex', justifyContent: 'space-between' }}>
				<Grid container spacing={1} sx={{ width: 350 }}>
					<Grid item>
						<FilePathTabButton
							path={path}
							setPath={setFilePath}
							type={'photo'}
						/>
					</Grid>
					<Grid item sx={{ ml: 1 }}>
						<NavigationPath path={path} />
					</Grid>
				</Grid>
				<SwitchGridTabButton branch={branch} setSwitch={setSwitch} />
			</Box>
		</Box>
	);
};

export default PhotoHeader;
