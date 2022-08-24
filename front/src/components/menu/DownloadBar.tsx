import React, { FC } from 'react';
import { Dispatch } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import { DataInfo, PreviewState } from '../../store/types';
import { useDispatch } from 'react-redux';
import { previewInfo } from '../../store/index';
import Api from '../../services/api';
import useFilePathPageList from '../../hooks/useFilePathPageList';
import { Box, Grow, Grid, Button, Typography } from '@mui/material';
import FileOpenIcon from '@mui/icons-material/FileOpen';

interface DownloadProps {
	branch: boolean;
	actions: ActionCreatorsMapObject;
}

const DownloadBar: FC<DownloadProps> = ({ branch, actions }): JSX.Element => {
	const dispatch = useDispatch();
	const [data, setPage] = useFilePathPageList({
		actions,
		path: '/',
		type: 'download',
	});
	const datas = data.datas as Array<DataInfo>;
	const previewClick = (dataId: string) => {
		dispatch(previewInfo(dataId));
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
				{datas &&
					datas.map((data: DataInfo) => (
						<Grow key={data.id} in={branch} timeout={data.id * 300}>
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
									onClick={() => previewClick(data.dataId)}
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
												width: '100%',
												alignItems: 'center',
												fontSize: '0.5rem',
											}}
										>
											{data.dataId}
										</Typography>
									</Box>
								</Button>
							</Grid>
						</Grow>
					))}
			</Grid>
		</Box>
	);
};

const mapStateToProps = (state: any) => ({
	preview: state.preview as PreviewState,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	actions: bindActionCreators(Api.data, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(DownloadBar);
