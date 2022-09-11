import React, {
	FC,
	useState,
	ChangeEvent,
	Dispatch,
	SetStateAction,
} from 'react';
import {
	Box,
	Paper,
	Alert,
	Collapse,
	InputBase,
	IconButton,
} from '@mui/material';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import { folderFormat } from '../../../utils/format';

interface CreateFolderProps {
	path: string;
	setPath: Dispatch<SetStateAction<string>>;
	setFolder: Dispatch<SetStateAction<string>>;
}

const CreateFolder: FC<CreateFolderProps> = ({
	path,
	setPath,
	setFolder,
}): JSX.Element => {
	const [text, setText] = useState('');
	const [trueCheck, setTrueCheck] = useState(false);
	const [falseCheck, setFalseCheck] = useState(false);
	const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
		const folderName = event.currentTarget.value;
		setText(folderName);
	};
	const handleClick = () => {
		if (text.length > 0) {
			setTrueCheck(true);
			setTimeout(() => {
				setTrueCheck(false);
			}, 2000);
			setFolder(text);
			setPath(folderFormat(path, text));
		} else {
			setFalseCheck(true);
			setTimeout(() => {
				setFalseCheck(false);
			}, 2000);
		}
	};
	return (
		<Box>
			<Paper
				component="form"
				sx={{
					pt: 1,
					display: 'flex',
					alignItems: 'center',
				}}
			>
				<InputBase
					placeholder="You can create and upload folders yourself...!"
					onChange={handleOnChange}
					sx={{
						ml: 1,
						flex: 1,
						'& input::placeholder': {
							fontSize: '0.8rem',
						},
					}}
				/>
				<IconButton
					onClick={handleClick}
					sx={{ p: 0, '&:hover': { color: 'secondary.main' } }}
				>
					<CreateNewFolderIcon />
				</IconButton>
			</Paper>
			<Collapse in={trueCheck}>
				<Alert severity="success">Upload path added successfully.</Alert>
			</Collapse>
			<Collapse in={falseCheck}>
				<Alert severity="error">Please fill out the folder name !</Alert>
			</Collapse>
		</Box>
	);
};

export default CreateFolder;
