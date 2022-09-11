import React, {
	FC,
	useState,
	ChangeEvent,
	Dispatch,
	SetStateAction,
} from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { useDispatch } from 'react-redux';
import { UploadInfo } from './upload/types';
import { CSRFData } from '../../services/types';
import { dataSuccess } from '../../store/index';
import {
	Box,
	Grid,
	Modal,
	Alert,
	Paper,
	Collapse,
	IconButton,
	Divider,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import CreateFolder from './upload/CreateFolder';
import UploadDetail from './upload/UploadDetail';
import FilePathTabButton from './upload/FilePathTabButton';
import NavigationPath from '../file/NavigationPath';

interface UseFolderProps {
	path: string;
	setPath: Dispatch<SetStateAction<string>>;
	setData: Dispatch<SetStateAction<UploadInfo>>;
	setFile: Dispatch<SetStateAction<File | null>>;
	newFolder: string;
	setFolder: Dispatch<SetStateAction<string>>;
}

interface UploadModalProps {
	file: ActionCreatorsMapObject;
	infra: ActionCreatorsMapObject;
	openUpload: boolean;
	setOpenUpload: Dispatch<SetStateAction<boolean>>;
	csrfData: CSRFData;
	fetchData: () => Promise<void>;
}

interface UseExistProps {
	path: string;
	setPath: Dispatch<SetStateAction<string>>;
}

const UseExist: FC<UseExistProps> = ({ path, setPath }): JSX.Element => {
	return (
		<Grid container spacing={1} sx={{ width: 350 }}>
			<Grid item>
				<FilePathTabButton path={path} setPath={setPath} />
			</Grid>
			<Grid item sx={{ ml: 1 }}>
				<NavigationPath path={path} />
			</Grid>
		</Grid>
	);
};

interface UseCreateProps {
	path: string;
	setPath: Dispatch<SetStateAction<string>>;
	setFolder: Dispatch<SetStateAction<string>>;
}

const UseCreate: FC<UseCreateProps> = ({
	path,
	setPath,
	setFolder,
}): JSX.Element => {
	const cancelClick = () => {
		setPath('/');
		setFolder('');
	};
	return (
		<Alert
			variant="outlined"
			severity="info"
			sx={{
				width: 310,
				'.MuiAlert-message': {
					width: '100%',
				},
			}}
		>
			<Paper sx={{ display: 'flex', justifyContent: 'space-between' }}>
				<NavigationPath path={path} />
				<IconButton onClick={cancelClick} sx={{ p: 0, pl: 1, mr: 0 }}>
					<ClearIcon />
				</IconButton>
			</Paper>
		</Alert>
	);
};

const UseFolder: FC<UseFolderProps> = ({
	path,
	setPath,
	setData,
	setFile,
	newFolder,
	setFolder,
}): JSX.Element => {
	const [check, setCheck] = useState(false);
	const handleCapture = (event: ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files;
		if (files && files.length > 0) {
			const file = (files as FileList)[0];
			if (file) {
				const { name, size, type, lastModified } = file;
				setData({
					name: name,
					size: size,
					type: type,
					lastModified: lastModified,
				});
				setFile(file);
				setCheck(true);
				setTimeout(() => {
					setCheck(false);
				}, 2000);
			}
		}
	};
	return (
		<Box>
			<Box sx={{ mb: 1, display: 'flex', justifyContent: 'space-between' }}>
				{newFolder === '' ? (
					<UseExist path={path} setPath={setPath} />
				) : (
					<UseCreate path={path} setPath={setPath} setFolder={setFolder} />
				)}
				<IconButton
					component="label"
					sx={{ p: 0, '&:hover': { color: 'secondary.main' } }}
				>
					<input hidden onChange={handleCapture} type="file" />
					<CloudUploadIcon />
				</IconButton>
			</Box>
			<Collapse in={check}>
				<Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
					File upload is ready. Click the button.
				</Alert>
			</Collapse>
		</Box>
	);
};

const UploadModal: FC<UploadModalProps> = ({
	file,
	infra,
	openUpload,
	setOpenUpload,
	csrfData,
	fetchData,
}): JSX.Element => {
	const dispatch = useDispatch();
	const [path, setPath] = useState('/');
	const [newFolder, setFolder] = useState('');
	const [fileinfo, setFile] = useState<File | null>(null);
	const [data, setData] = useState<UploadInfo>({
		name: '',
		size: 0,
		type: '',
		lastModified: 0,
	});
	const uploadSubmit = async () => {
		if (fileinfo) {
			fetchData();
			const formData = new FormData();
			//formData.append('path', path);	// → Disabled
			formData.append('file', fileinfo);
			//await file.upload(formData, csrfData);	// → Disabled
			const data = await infra.upload(formData, csrfData);
			const submitData = {
				fileId: data.Hash,
				filename: fileinfo.name,
				fileSize: fileinfo.size,
				mimeType: fileinfo.type,
				path: path,
			};
			await file.submit(submitData, csrfData);
			dispatch(dataSuccess(Date.now())); // → filelist 새로고침
		}
	};
	const uploadClose = () => setOpenUpload(false);
	return (
		<Modal open={openUpload} onClose={uploadClose}>
			<Box
				sx={{
					position: 'absolute' as const,
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					width: 400,
					bgcolor: 'background.paper',
					border: '2px solid #000',
					boxShadow: 24,
					p: 4,
				}}
			>
				<UseFolder
					path={path}
					setPath={setPath}
					setData={setData}
					setFile={setFile}
					newFolder={newFolder}
					setFolder={setFolder}
				/>
				<Divider sx={{ mt: 1, borderColor: 'primary.main' }} />
				{path.split('/').length >= 3 && (
					<Alert
						variant="outlined"
						severity="warning"
						sx={{
							'.MuiAlert-message': {
								color: '#626274',
							},
						}}
					>
						해당 Path는 더 이상 수정할 수 없습니다.
					</Alert>
				)}
				{newFolder === '' && path.split('/').length < 3 && (
					<CreateFolder path={path} setPath={setPath} setFolder={setFolder} />
				)}
				{data.size > 0 && (
					<UploadDetail data={data} uploadSubmit={uploadSubmit} />
				)}
			</Box>
		</Modal>
	);
};

export default UploadModal;
