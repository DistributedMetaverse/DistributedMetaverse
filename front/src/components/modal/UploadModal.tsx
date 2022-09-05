import React, {
	FC,
	useState,
	ChangeEvent,
	Dispatch,
	SetStateAction,
} from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { UploadInfo } from './upload/types';
import useCSRFToken from '../../hooks/useCSRFToken';
import {
	Box,
	Grid,
	Modal,
	Alert,
	Collapse,
	IconButton,
	Divider,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CheckIcon from '@mui/icons-material/Check';
import CreateFolder from './upload/CreateFolder';
import UploadDetail from './upload/UploadDetail';
import FolderTabButton from './upload/FolderTabButton';
import NavigationPath from '../file/NavigationPath';

interface UseFolderProps {
	setData: Dispatch<SetStateAction<UploadInfo>>;
	setFile: Dispatch<SetStateAction<File | null>>;
}

interface UploadModalProps {
	auth: ActionCreatorsMapObject;
	file: ActionCreatorsMapObject;
	openUpload: boolean;
	setOpenUpload: Dispatch<SetStateAction<boolean>>;
}

const UseFolder: FC<UseFolderProps> = ({ setData, setFile }): JSX.Element => {
	const [path, setPath] = useState('/');
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
				<Grid container spacing={1} sx={{ width: 350 }}>
					<Grid item>
						<FolderTabButton path={path} setPath={setPath} />
					</Grid>
					<Grid item sx={{ ml: 1 }}>
						<NavigationPath path={path} />
					</Grid>
				</Grid>
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
					This file is update ready — button click!
				</Alert>
			</Collapse>
		</Box>
	);
};

const UploadModal: FC<UploadModalProps> = ({
	auth,
	file,
	openUpload,
	setOpenUpload,
}): JSX.Element => {
	const [fileinfo, setFile] = useState<File | null>(null);
	const [data, setData] = useState<UploadInfo>({
		name: '',
		size: 0,
		type: '',
		lastModified: 0,
	});
	const [csrfData, fetchCSRFTokenData] = useCSRFToken({ auth });
	const uploadSubmit = () => {
		if (fileinfo) {
			fetchCSRFTokenData();
			const formData = new FormData();
			formData.append('file', fileinfo);
			file.upload(formData, csrfData);
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
				<UseFolder setData={setData} setFile={setFile} />
				<Divider sx={{ mt: 1, borderColor: 'primary.main' }} />
				<CreateFolder />
				{data.size > 0 && (
					<UploadDetail data={data} uploadSubmit={uploadSubmit} />
				)}
			</Box>
		</Modal>
	);
};

export default UploadModal;
