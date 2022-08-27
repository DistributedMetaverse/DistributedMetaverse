import React, { FC, ReactElement } from 'react';
import { Dispatch as DispatchAction } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import { previewSwitch } from '../../store/index';
import { PreviewState, UserInfo } from '../../store/types';
import Api from '../../services/api';
import useFileInfoDetails from '../../hooks/useFileInfoDetails';
import {
	Box,
	Grid,
	Paper,
	Drawer,
	IconButton,
	Divider,
	Typography,
} from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
import DescriptionIcon from '@mui/icons-material/Description';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import IosShareOutlinedIcon from '@mui/icons-material/IosShareOutlined';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import LoupeOutlinedIcon from '@mui/icons-material/LoupeOutlined';
import { fileSizeFormat } from '../../utils/format';

interface UseFileProps {
	file: ActionCreatorsMapObject;
	fileId: string;
}

interface AppPreviewProps {
	preview: PreviewState;
	file: ActionCreatorsMapObject;
	width: number;
}

interface PreviewHeaderProps {
	exist: boolean;
}

const PreviewHeader: FC<PreviewHeaderProps> = ({ exist }): JSX.Element => {
	const dispatch = useDispatch();
	const closeClick = () => {
		dispatch(previewSwitch(false));
	};
	return (
		<Box
			sx={{
				ml: exist ? -2.5 : 3,
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

interface UseButtonProps {
	children?: ReactElement;
}

const UseButton: FC<UseButtonProps> = ({ children }): JSX.Element => {
	return (
		<Paper
			sx={{
				borderRadius: '50%',
				backgroundColor: 'background.paper',
			}}
		>
			<IconButton sx={{ p: 1, '&:hover': { color: 'secondary.main' } }}>
				{children}
			</IconButton>
		</Paper>
	);
};

const PreviewFooter: FC = (): JSX.Element => {
	const grid: SxProps<Theme> = {
		pl: 0,
		pr: 0,
	};
	const font: SxProps<Theme> = {
		fontSize: '1.6rem',
	};
	return (
		<Box
			sx={{
				ml: -5,
				bottom: 40,
				position: 'fixed',
				borderColor: 'primary.main',
			}}
		>
			<Divider
				sx={{
					mb: 1,
					ml: 2,
					width: 170,
					borderColor: 'primary.main',
				}}
			/>
			<Box sx={{ ml: 2.5, pb: 0, display: 'flex' }}>
				<Grid container spacing={3} sx={{ justifyContent: 'center' }}>
					<Grid item sx={grid}>
						<UseButton>
							<IosShareOutlinedIcon fontSize="large" sx={font} />
						</UseButton>
					</Grid>
					<Grid item sx={grid}>
						<Divider
							sx={{ mt: 1, width: 2, height: 30, borderColor: 'primary.main' }}
							orientation="vertical"
						/>
					</Grid>
					<Grid item sx={grid}>
						<UseButton>
							<DriveFileRenameOutlineOutlinedIcon fontSize="large" sx={font} />
						</UseButton>
					</Grid>
					<Grid item sx={grid}>
						<Divider
							sx={{ mt: 1, width: 2, height: 30, borderColor: 'primary.main' }}
							orientation="vertical"
						/>
					</Grid>
					<Grid item sx={grid}>
						<UseButton>
							<LoupeOutlinedIcon fontSize="large" sx={font} />
						</UseButton>
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
};

const UseDivider: FC = (): JSX.Element => {
	return (
		<Divider
			variant="fullWidth"
			sx={{ pt: 3, height: '1px', width: '130px', borderColor: 'primary.main' }}
		/>
	);
};

const UseFile: FC<UseFileProps> = ({ file, fileId }): JSX.Element => {
	const data = useFileInfoDetails({ file, fileId });
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
			<PreviewFooter />
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

const AppPreview: FC<AppPreviewProps> = ({
	preview,
	file,
	width,
}): JSX.Element => {
	const { fileId, isActive } = preview;
	return (
		<Drawer
			sx={{
				width: width,
				flexShrink: 0,
				'& .MuiDrawer-paper': {
					width: width,
				},
				zIndex: isActive ? 1201 : 0,
			}}
			variant="persistent"
			anchor="right"
			open={isActive}
		>
			{isActive ? <UseFile file={file} fileId={fileId} /> : <NoFile />}
		</Drawer>
	);
};

const mapStateToProps = (state: any) => ({
	preview: state.preview as PreviewState,
});

const mapDispatchToProps = (dispatch: DispatchAction) => ({
	file: bindActionCreators(Api.file, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppPreview);
