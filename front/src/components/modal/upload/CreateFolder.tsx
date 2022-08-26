import React, { FC, useState, ChangeEvent } from 'react';
import {
	Box,
	Paper,
	Alert,
	Collapse,
	InputBase,
	IconButton,
} from '@mui/material';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';

const CreateFolder: FC = (): JSX.Element => {
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
					placeholder="Please name the New Folder"
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
				<Alert severity="success">
					This folder is create success — check it out!
				</Alert>
			</Collapse>
			<Collapse in={falseCheck}>
				<Alert severity="error">
					This folder is create fail — check it out!
				</Alert>
			</Collapse>
		</Box>
	);
};

export default CreateFolder;
