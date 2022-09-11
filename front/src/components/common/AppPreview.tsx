import React, { FC, useState, ChangeEvent } from 'react';
import { Dispatch as DispatchAction } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect, useDispatch } from 'react-redux';
import { PreviewState, DataState, FileInfo, UserInfo } from '../../store/types';
import { CSRFData } from '../../services/types';
import { dataSuccess } from '../../store/index';
import Api from '../../services/api';
import useCSRFToken from '../../hooks/useCSRFToken';
import useFileInfoDetails from '../../hooks/useFileInfoDetails';
import useSharedPageList from '../../hooks/useSharedPageList';
import {
	Box,
	Grid,
	Paper,
	Button,
	Drawer,
	InputBase,
	Divider,
	Typography,
	Pagination,
} from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
import SwapCallsIcon from '@mui/icons-material/SwapCalls';
import DescriptionIcon from '@mui/icons-material/Description';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PreviewHeader from './preview/PreviewHeader';
import PreviewFooter from './preview/PreviewFooter';
import { fileSizeFormat } from '../../utils/format';
import { pagingCount } from '../../utils/pagination';

interface UseFileProps {
	auth: ActionCreatorsMapObject;
	file: ActionCreatorsMapObject;
	time: number;
	fileId: string;
}

interface AppPreviewProps {
	auth: ActionCreatorsMapObject;
	file: ActionCreatorsMapObject;
	preview: PreviewState;
	data: DataState;
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
	const modifyButton: SxProps<Theme> = {
		px: 10,
		color: 'primary.main',
		borderColor: 'primary.main',
		'&:hover': {
			color: 'text.secondary',
			backgroundColor: '#626274',
		},
		fontSize: '0.7rem',
		fontWeight: 'bold',
	};
	return (
		<Box sx={{ pt: 2 }}>
			<Paper sx={{ width: 160 }}>
				<Typography
					component="span"
					variant="h6"
					sx={{ fontSize: '0.7rem', color: '#626274' }}
				>
					※ 파일명과 세부설명을 수정할 수 있습니다.
				</Typography>
			</Paper>
			<Paper sx={{ pt: 3 }}>
				<Button
					variant="outlined"
					onClick={modifyClick}
					sx={modifyButton}
					size="small"
				>
					Modify
				</Button>
			</Paper>
		</Box>
	);
};

interface UseFileInfoProps {
	file: ActionCreatorsMapObject;
	fileId: number;
	data: FileInfo;
	modify: boolean;
	csrfData: CSRFData;
	fetchData: () => Promise<void>;
}

const UseFileInfo: FC<UseFileInfoProps> = ({
	file,
	fileId,
	data,
	modify,
	csrfData,
	fetchData,
}): JSX.Element => {
	const dispatch = useDispatch();
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

	const modifyClick = async (prevFilename: string, prevDescription: string) => {
		fetchData();
		if (filename === '' && description !== '') {
			await file.modify(fileId, prevFilename, description, csrfData);
			setFilename(prevFilename);
		} else if (filename !== '' && description === '') {
			await file.modify(fileId, filename, prevDescription, csrfData);
			setDescription(prevDescription);
		} else if (filename === '' && description === '') {
			await file.modify(fileId, prevFilename, prevDescription, csrfData);
			setFilename(prevFilename);
			setDescription(prevDescription);
		} else {
			await file.modify(fileId, filename, description, csrfData);
		}
		dispatch(dataSuccess(Date.now())); // → fileinfo, filelist 새로고침
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
						width: 150,
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
						width: 150,
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
				<UseModifyButton
					modifyClick={() => modifyClick(data.filename, data.description ?? '')}
				/>
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
	const [page, data, take, total, setPage] = useSharedPageList({
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
			{data && data.length > 0 ? (
				data.map((user: UserInfo) => (
					<Paper key={user.userId} sx={{ display: 'flex' }}>
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
						<Grid item sx={{ mt: -0.4 }}>
							<Typography
								component="span"
								variant="h6"
								sx={{ fontSize: '0.9rem', color: '#626274' }}
							>
								{user.email}
							</Typography>
						</Grid>
					</Paper>
				))
			) : (
				<>
					<SwapCallsIcon fontSize="large" sx={{ fontSize: '5rem' }} />
					<Typography
						component="span"
						variant="h6"
						sx={{ pt: 2, fontSize: '1rem', width: 160 }}
					>
						해당 파일이 공유되지 않았습니다.
					</Typography>
					<Typography
						component="span"
						variant="h6"
						sx={{ pt: 2, fontSize: '0.7rem', color: '#626274' }}
					>
						해당 파일을 공유받은 사용자가 존재하면, 공유받은 사용자들의 리스트를
						조회할 수 있습니다.
					</Typography>
				</>
			)}
			<Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
				<Pagination
					count={pagingCount(page, take, total)}
					variant="outlined"
					color="primary"
					siblingCount={0}
					boundaryCount={1}
					hidePrevButton
					hideNextButton
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

const UseFile: FC<UseFileProps> = ({
	auth,
	file,
	time,
	fileId,
}): JSX.Element => {
	const dispatch = useDispatch();
	const data = useFileInfoDetails({ file, fileId, time });
	const [csrfData, fetchCSRFTokenData] = useCSRFToken({ auth });

	const [share, setShare] = useState(false);
	const [modify, setModify] = useState(false);

	const applyClick = async () => {
		fetchCSRFTokenData();
		await file.apply(fileId, csrfData);
		dispatch(dataSuccess(Date.now())); // → fileinfo 새로고침
	};
	return (
		<Box>
			<PreviewHeader />
			{share ? (
				<UseSharedList file={file} fileId={data.id} />
			) : (
				<UseFileInfo
					file={file}
					fileId={data.id}
					data={data}
					modify={modify}
					csrfData={csrfData}
					fetchData={fetchCSRFTokenData}
				/>
			)}
			<PreviewFooter
				fileId={data.fileId}
				path={data.path}
				download={data.downIPFS}
				modify={modify}
				setModify={setModify}
				share={share}
				setShare={setShare}
				applyClick={applyClick}
			/>
		</Box>
	);
};

const NoFile: FC = (): JSX.Element => {
	return (
		<Box>
			<PreviewHeader />
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
	auth,
	file,
	preview,
	data,
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
			{isActive ? (
				<UseFile auth={auth} file={file} time={data.time} fileId={fileId} />
			) : (
				<NoFile />
			)}
		</Drawer>
	);
};

const mapStateToProps = (state: any) => ({
	preview: state.preview as PreviewState,
	data: state.data as DataState,
});

const mapDispatchToProps = (dispatch: DispatchAction) => ({
	auth: bindActionCreators(Api.auth, dispatch),
	file: bindActionCreators(Api.file, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppPreview);
