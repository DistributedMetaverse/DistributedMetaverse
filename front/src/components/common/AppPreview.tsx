import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { Dispatch as DispatchAction } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import { previewSwitch } from '../../store/index';
import { PreviewState, UserInfo } from '../../store/types';
import Api from '../../services/api';
import useDataInfoDetails from '../../hooks/useDataInfoDetails';
import {
	Box,
	Grid,
	Slide,
	IconButton,
	Divider,
	Typography,
} from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import {
	previewWidthSetting,
	previewMarginLeftSetting,
	previewDividerWidthSetting,
} from '../../utils/control';
import { fileSizeFormat } from '../../utils/format';

interface UseFileProps {
	actions: ActionCreatorsMapObject;
	dataId: string;
}

interface AppPreviewProps {
	preview: PreviewState;
	actions: ActionCreatorsMapObject;
}

interface PreviewHeaderProps {
	exist: boolean;
}

const PreviewHeader: FC<PreviewHeaderProps> = ({ exist }): JSX.Element => {
	const dispatch = useDispatch();
	const location = useLocation();
	const closeClick = () => {
		dispatch(previewSwitch(false));
	};
	const width = previewWidthSetting(location.pathname, exist);
	const marginleft = previewMarginLeftSetting(location.pathname, exist);
	return (
		<Box
			sx={{
				mb: 1,
				ml: marginleft.header,
				top: 40,
				width: width.header,
				position: 'fixed',
				'@media (min-width:520px) and (max-width:600px)': {
					ml: marginleft.headerMin520,
					width: width.headerMin520,
				},
				'@media (min-width:600px) and (max-width:710px)': {
					ml: marginleft.headerMin600,
					width: width.headerMin600,
				},
				'@media (min-width:710px) and (max-width:900px)': {
					ml: marginleft.headerMin710,
					width: width.headerMin710,
				},
				'@media (min-width:900px)': {
					ml: marginleft.headerMin900,
					width: width.headerMin900,
				},
				'@media (min-width:1200px)': {
					ml: marginleft.headerMin1200,
					width: width.headerMin1200,
				},
			}}
		>
			<Box sx={{ pb: 0, display: 'flex', justifyContent: 'space-between' }}>
				<Grid container sx={{ ml: 0.5, width: width.headerGrid }}>
					<Grid item>
						<DescriptionIcon fontSize="small" />
					</Grid>
					<Grid item sx={{ ml: 1 }}>
						<Typography
							variant="subtitle2"
							color="inherit"
							sx={{
								'@media (max-width:600px)': {
									display: 'none',
								},
								'@media (min-width:710px)': {
									display: 'none',
								},
							}}
						>
							Prew
						</Typography>
						<Typography
							variant="subtitle2"
							color="inherit"
							sx={{
								'@media (max-width:710px)': {
									display: 'none',
								},
								'@media (min-width:900px)': {
									display: 'none',
								},
							}}
						>
							Preview
						</Typography>
						<Typography
							variant="subtitle2"
							color="inherit"
							sx={{
								'@media (max-width:900px)': {
									display: 'none',
								},
							}}
						>
							File Preview
						</Typography>
					</Grid>
				</Grid>
				<IconButton
					color="inherit"
					sx={{ mt: -1, pt: 0, pb: 0, '&:hover': { color: 'secondary.main' } }}
					onClick={closeClick}
				>
					<CancelPresentationIcon fontSize="small" />
				</IconButton>
			</Box>
			<Divider sx={{ borderColor: 'primary.main' }} />
		</Box>
	);
};

const UseDivider: FC = (): JSX.Element => {
	const location = useLocation();
	const dividerWidth = previewDividerWidthSetting(location.pathname);
	return (
		<Divider
			variant="fullWidth"
			sx={{
				pt: 3,
				height: '1px',
				width: dividerWidth.header,
				borderColor: 'primary.main',
				'@media (min-width:520px) and (max-width:600px)': {
					width: dividerWidth.headerMin520,
				},
				'@media (min-width:600px) and (max-width:710px)': {
					width: dividerWidth.headerMin600,
				},
				'@media (min-width:710px) and (max-width:900px)': {
					width: dividerWidth.headerMin710,
				},
				'@media (min-width:900px)': {
					width: dividerWidth.headerMin900,
				},
				'@media (min-width:1200px)': {
					width: dividerWidth.headerMin1200,
				},
			}}
		/>
	);
};

const UseFile: FC<UseFileProps> = ({ actions, dataId }): JSX.Element => {
	const data = useDataInfoDetails({ actions, dataId });
	const shared = data.shared as Array<UserInfo>;
	return (
		<Box>
			<PreviewHeader exist={true} />
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<DescriptionIcon fontSize="large" sx={{ fontSize: '5rem' }} />
				<UseDivider />
				<Typography
					component="span"
					variant="h6"
					sx={{ pt: 2, fontSize: '1rem' }}
				>
					{data.filename}
				</Typography>
				<Box
					sx={{
						mt: 1,
						display: 'flex',
					}}
				>
					<Grid
						container
						spacing={2}
						sx={{
							alignItems: 'center',
							justifyContent: 'space-between',
							'@media (min-width:500px)': {
								justifyContent: 'center',
							},
						}}
					>
						<Grid item>
							<Typography
								variant="subtitle2"
								sx={{ fontSize: '0.1rem', color: '#626274' }}
							>
								{fileSizeFormat(data.fileSize)}
							</Typography>
						</Grid>
						<Grid item>
							<Typography
								variant="subtitle2"
								sx={{ fontSize: '0.1rem', color: '#626274' }}
							>
								{data.createdAt}
							</Typography>
						</Grid>
					</Grid>
				</Box>
				<Typography
					component="span"
					variant="h6"
					sx={{ pt: 3, fontSize: '0.8rem' }}
				>
					File Description
				</Typography>
				<Typography
					component="span"
					variant="h6"
					sx={{ pt: 1, fontSize: '0.8rem', color: '#626274' }}
				>
					{data.description}
				</Typography>
				<UseDivider />
				<Typography
					component="span"
					variant="h6"
					sx={{ pt: 2, pb: 2, fontSize: '0.8rem' }}
				>
					File Shared With:
				</Typography>
				{shared &&
					shared.map((user: UserInfo) => (
						<Box
							key={user.userId}
							sx={{ pb: 0, display: 'flex', justifyContent: 'space-between' }}
						>
							<Grid container spacing={2}>
								<Grid item>
									<AccountBoxIcon fontSize="small" />
								</Grid>
								<Grid item sx={{ mt: -0.4 }}>
									<Typography
										component="span"
										variant="h6"
										sx={{ fontSize: '0.9rem', color: '#626274' }}
									>
										{user.username}
									</Typography>
								</Grid>
							</Grid>
						</Box>
					))}
			</Box>
		</Box>
	);
};

const NoFile: FC = (): JSX.Element => {
	return (
		<Box>
			<PreviewHeader exist={false} />
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<DescriptionOutlinedIcon fontSize="large" sx={{ fontSize: '5rem' }} />
				<Typography
					component="span"
					variant="h6"
					sx={{ pt: 2, fontSize: '1rem' }}
				>
					선택된 파일이 없습니다.
				</Typography>
				<Typography
					component="span"
					variant="h6"
					sx={{ pt: 2, fontSize: '0.7rem', color: '#626274' }}
				>
					파일 중 하나를 선택하면 세부정보를 확인할 수 있습니다.
				</Typography>
			</Box>
		</Box>
	);
};

const AppPreview: FC<AppPreviewProps> = ({ preview, actions }): JSX.Element => {
	const location = useLocation();
	const { dataId, isActive } = preview;
	const width = previewWidthSetting(location.pathname, true);
	return (
		<Slide
			direction="left"
			in={isActive}
			timeout={isActive ? 300 : 150}
			mountOnEnter
			unmountOnExit
		>
			<Box
				sx={{
					width: width.content,
					display: 'flex',
					alignItems: 'center', // 세로 중앙
					justifyContent: 'center', // 가로 중앙
					bgcolor: 'background.paper',
					zIndex: 1201,
				}}
			>
				{isActive ? <UseFile actions={actions} dataId={dataId} /> : <NoFile />}
			</Box>
		</Slide>
	);
};

const mapStateToProps = (state: any) => ({
	preview: state.preview as PreviewState,
});

const mapDispatchToProps = (dispatch: DispatchAction) => ({
	actions: bindActionCreators(Api.data, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppPreview);
