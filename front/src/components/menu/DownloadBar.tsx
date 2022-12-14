import React, { FC } from 'react';
import { Dispatch } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect, useDispatch } from 'react-redux';
import { FileInfo, PreviewState, DataState } from '../../store/types';
import { previewInfo, previewSwitch, dataSuccess } from '../../store/index';
import Api from '../../services/api';
import useFilePathPageList from '../../hooks/useFilePathPageList';
import {
	Box,
	Grow,
	Grid,
	Button,
	IconButton,
	Divider,
	Typography,
} from '@mui/material';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

interface DownloadProps {
	file: ActionCreatorsMapObject;
	preview: PreviewState;
	time: number;
	branch: boolean;
}

const DownloadBar: FC<DownloadProps> = ({
	file,
	preview,
	time,
	branch,
}): JSX.Element => {
	const dispatch = useDispatch();
	const { fileId, isActive } = preview;
	const [page, data, take, total, setPage] = useFilePathPageList({
		file,
		path: '/',
		type: 'download',
		time,
	});

	const previewClick = (id: string) => {
		dispatch(previewInfo(id));
		if (fileId === id) dispatch(previewSwitch(!isActive));
		dispatch(dataSuccess(Date.now())); // → fileinfo 새로고침
	};
	const prevClick = () => {
		if (page > 1) setPage(page - 1);
	};
	const nextClick = () => {
		setPage(page + 1);
	};

	return (
		<Box
			sx={{
				width: '80%',
				display: 'inline-block',
				flexDirection: 'column',
				alignItems: 'center', // 가로 중앙
			}}
		>
			<Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
				{data &&
					data.map((data: FileInfo, index: number) => (
						<Grow key={data.id} in={branch} timeout={(index + 1) * 300}>
							<Grid item xs={6}>
								<Button
									variant="outlined"
									sx={{
										pl: 0,
										pr: 0,
										minWidth: 1,
										bgcolor: 'primary.main',
										color: 'secondary.main',
									}}
									onClick={() => previewClick(data.fileId)}
								>
									<Box
										sx={{
											display: 'flex',
											flexDirection: 'column',
											alignItems: 'center',
										}}
									>
										<FileOpenIcon />
										<Typography
											component="span"
											variant="h6"
											sx={{
												pt: 0.5,
												width: '100%',
												alignItems: 'center',
												fontSize: '0.2rem',
												color: 'secondary.main',
											}}
										>
											{data.createdAt.split('T')[0]}
										</Typography>
									</Box>
								</Button>
							</Grid>
						</Grow>
					))}
			</Grid>
			<Divider
				variant="fullWidth"
				sx={{ pt: 3, height: '2px', borderColor: 'primary.main' }}
			/>
			{take < total && (
				<Box sx={{ pt: 2, display: 'flex' }}>
					<Grid container sx={{ justifyContent: 'space-between' }}>
						<Grid item>
							<IconButton
								onClick={prevClick}
								sx={{ p: 0, '&:hover': { color: 'text.primary' } }}
							>
								<ArrowCircleLeftIcon />
							</IconButton>
						</Grid>
						<Grid item>
							<IconButton
								onClick={nextClick}
								sx={{ p: 0, '&:hover': { color: 'text.primary' } }}
							>
								<ArrowCircleRightIcon />
							</IconButton>
						</Grid>
					</Grid>
				</Box>
			)}
		</Box>
	);
};

const mapStateToProps = (state: any) => ({
	preview: state.preview as PreviewState,
	time: (state.data as DataState).time,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	file: bindActionCreators(Api.file, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(DownloadBar);
