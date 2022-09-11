import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { previewSwitch } from '../../../store/index';
import { Box, Grid, IconButton, Divider, Typography } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';

const PreviewHeader: FC = (): JSX.Element => {
	const dispatch = useDispatch();
	const closeClick = () => {
		dispatch(previewSwitch(false));
	};
	return (
		<Box
			sx={{
				right: 17,
				top: 50,
				position: 'fixed',
				width: 160,
			}}
		>
			<Box
				sx={{
					ml: -0.5,
					pb: 0,
					display: 'flex',
					justifyContent: 'space-between',
				}}
			>
				<Grid container sx={{ ml: -1 }}>
					<Grid item>
						<DescriptionIcon fontSize="small" />
					</Grid>
					<Grid item sx={{ ml: -0.5 }}>
						<Typography
							variant="subtitle2"
							color="inherit"
							sx={{ fontSize: '1rem', fontWeight: 'bold' }}
						>
							File Preview
						</Typography>
					</Grid>
				</Grid>
				<IconButton
					color="inherit"
					sx={{
						mr: -1,
						mt: -0.5,
						pt: 0,
						pb: 0,
						'&:hover': { color: 'secondary.main' },
					}}
					onClick={closeClick}
				>
					<CancelPresentationIcon sx={{ fontSize: '1.3rem' }} />
				</IconButton>
			</Box>
			<Divider sx={{ mt: 1, borderColor: 'primary.main' }} />
		</Box>
	);
};

export default PreviewHeader;
