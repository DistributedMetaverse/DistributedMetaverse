import React, { FC, useState, ChangeEvent } from 'react';
import { Dispatch as DispatchAction } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import { PreviewState, FileInfo, UserInfo } from '../../store/types';
import Api from '../../services/api';
import useFileInfoDetails from '../../hooks/useFileInfoDetails';
import useSharedPageList from '../../hooks/useSharedPageList';
import {
	Box,
	Grid,
	Button,
	Drawer,
	InputBase,
	Divider,
	Typography,
	Pagination,
} from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
import DescriptionIcon from '@mui/icons-material/Description';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PreviewHeader from './preview/PreviewHeader';
import PreviewFooter from './preview/PreviewFooter';
import { fileSizeFormat } from '../../utils/format';
import { pagingCount } from '../../utils/pagination';

interface UseFileProps {
	file: ActionCreatorsMapObject;
	fileId: string;
}

interface AppPreviewProps {
	preview: PreviewState;
	file: ActionCreatorsMapObject;
	width: number;
}

interface UseSharedContentProps {
	data?: Array<UserInfo>;
}

const UseSharedContent: FC<UseSharedContentProps> = ({ data }): JSX.Element => {
	return (
		<>
			<Typography
				component="span"
				variant="h6"
				sx={{ pt: 2, pb: 2, fontSize: '0.8rem' }}
			>
				File Shared With:
			</Typography>
			{data &&
				data.map((user: UserInfo) => (
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
		</>
	);
};

interface UseModifyButtonProps {
	modifyClick: () => void;
}

const UseModifyButton: FC<UseModifyButtonProps> = ({
	modifyClick,
}): JSX.Element => {
	const uploadButton: SxProps<Theme> = {
		color: 'primary.main',
		borderColor: 'primary.main',
		'&:hover': {
			color: 'text.secondary',
			backgroundColor: 'background.paper',
		},
		fontSize: '0.7rem',
		fontWeight: 'bold',
	};
	return (
		<Box sx={{ pt: 3 }}>
			<Button
				variant="outlined"
				onClick={modifyClick}
				sx={uploadButton}
				size="small"
			>
				Modify
			</Button>
		</Box>
	);
};

interface UseFileInfoProps {
	file: ActionCreatorsMapObject;
	fileId: number;
	data: FileInfo;
	modify: boolean;
}

const UseFileInfo: FC<UseFileInfoProps> = ({
	file,
	fileId,
	data,
	modify,
}): JSX.Element => {
	const [filename, setFilename] = useState('');
	const [description, setDescription] = useState('');

	const filenameOnChange = (event: ChangeEvent<HTMLInputElement>) => {
		const text = event.currentTarget.value;
		setFilename(text);
	};
	const descriptionOnChange = (event: ChangeEvent<HTMLInputElement>) => {
		const text = event.currentTarget.value;
		setDescription(text);
	};

	const modifyClick = () => {
		file.modify(fileId, filename, description);
	};
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
			}}
		>
			<DescriptionIcon fontSize="large" sx={{ fontSize: '5rem' }} />
			<UseDivider />
			{modify ? (
				<InputBase
					placeholder={data.filename}
					value={filename}
					onChange={filenameOnChange}
					sx={{
						width: '120px',
						fontSize: '1rem',
						'.MuiInputBase-input': {
							pt: 2,
							pb: 0,
							textAlign: 'center',
						},
					}}
				/>
			) : (
				<Typography
					component="span"
					variant="h6"
					sx={{ pt: 2, fontSize: '1rem' }}
				>
					{data.filename}
				</Typography>
			)}
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
			{modify ? (
				<InputBase
					placeholder={data.description}
					value={description}
					onChange={descriptionOnChange}
					sx={{
						width: '120px',
						fontSize: '0.8rem',
						'.MuiInputBase-input': {
							pt: 1,
							pb: 0,
							textAlign: 'center',
						},
					}}
				/>
			) : (
				<Typography
					component="span"
					variant="h6"
					sx={{ pt: 1, fontSize: '0.8rem', color: '#626274' }}
				>
					{data.description}
				</Typography>
			)}
			<UseDivider />
			{modify ? (
				<UseModifyButton modifyClick={modifyClick} />
			) : (
				<UseSharedContent data={data.shared} />
			)}
		</Box>
	);
};

interface UseSharedListProps {
	file: ActionCreatorsMapObject;
	fileId: number;
}

const UseSharedList: FC<UseSharedListProps> = ({
	file,
	fileId,
}): JSX.Element => {
	const [data, take, total, setPage] = useSharedPageList({
		file,
		fileId,
	});

	const pageChange = (event: ChangeEvent<unknown>, page: number) => {
		const value = (event.target as HTMLButtonElement).textContent as any;
		if (value && value === String(page)) setPage(page);
	};
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
			}}
		>
			{data &&
				data.map((user: UserInfo) => (
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
			<Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
				<Pagination
					count={pagingCount(take, total)}
					variant="outlined"
					color="primary"
					siblingCount={0}
					boundaryCount={1}
					showFirstButton
					showLastButton
					onChange={pageChange}
					size="small"
				/>
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

	const [share, setShare] = useState(false);
	const [modify, setModify] = useState(false);
	return (
		<Box>
			<PreviewHeader exist={true} />
			{share ? (
				<UseSharedList file={file} fileId={data.id} />
			) : (
				<UseFileInfo file={file} fileId={data.id} data={data} modify={modify} />
			)}
			<PreviewFooter
				fileId={data.fileId}
				path={data.path}
				modify={modify}
				setModify={setModify}
				share={share}
				setShare={setShare}
			/>
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
