import React, { FC } from 'react';
import { Dispatch } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import Api from '../../../services/api';
import { Box, Grid, IconButton } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import ContentTabButton from './ContentTabButton';

interface ContentHeaderProps {
	file: ActionCreatorsMapObject;
	fileId: string;
	isLike: boolean;
}

const ContentHeader: FC<ContentHeaderProps> = ({
	file,
	fileId,
	isLike,
}): JSX.Element => {
	const likeClick = () => {
		file.like(fileId);
	};
	return (
		<Box sx={{ pb: 1, display: 'flex' }}>
			<Grid container sx={{ justifyContent: 'space-between' }}>
				<Grid item>
					<IconButton sx={{ p: 0, mt: -1 }} onClick={likeClick}>
						{isLike ? (
							<StarIcon fontSize="small" sx={{ color: 'secondary.main' }} />
						) : (
							<StarOutlineIcon
								fontSize="small"
								sx={{ color: 'secondary.main' }}
							/>
						)}
					</IconButton>
				</Grid>
				<Grid item>
					<ContentTabButton file={file} fileId={fileId} />
				</Grid>
			</Grid>
		</Box>
	);
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
	file: bindActionCreators(Api.file, dispatch),
});

export default connect(null, mapDispatchToProps)(ContentHeader);
