import React, { FC, useState, MouseEvent } from 'react';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import {
	Box,
	Grid,
	Paper,
	Button,
	Popper,
	MenuList,
	MenuItem,
	ListItemIcon,
	ListItemText,
} from '@mui/material';
import Check from '@mui/icons-material/Check';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface FileSearchTypeProps {
	name: string;
	type: string;
}

const searchType: Array<FileSearchTypeProps> = [
	{
		name: 'Show All',
		type: 'all',
	},
	{
		name: 'Show Video',
		type: 'video',
	},
	{
		name: 'Show Photo',
		type: 'photo',
	},
	{
		name: 'Show Pdf',
		type: 'pdf',
	},
	{
		name: 'Show Doc',
		type: 'doc',
	},
];

interface FileTypeTabButtonProps {
	type: string;
	setType: ActionCreatorWithPayload<string, string>;
}

const FileTypeTabButton: FC<FileTypeTabButtonProps> = ({
	type,
	setType,
}): JSX.Element => {
	const dispatch = useDispatch();
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

	const showClick = (event: MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const closeClick = (type: string) => {
		dispatch(setType(type));
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);

	return (
		<Box>
			<Button
				variant="contained"
				onClick={showClick}
				endIcon={<KeyboardArrowDownIcon />}
				sx={{ mt: -1, px: 2, pt: 0.5, pb: 0.5, fontSize: '0.7rem' }}
				size="small"
			>
				Show {type}
			</Button>
			<Popper
				open={open}
				anchorEl={anchorEl}
				placement="bottom-end"
				sx={{ zIndex: 1201 }}
			>
				<Paper elevation={3}>
					<MenuList sx={{ px: 0, pt: 0.2, pb: 0.2 }}>
						{searchType.map((data: FileSearchTypeProps) => (
							<MenuItem
								key={data.type}
								onClick={() => closeClick(data.type)}
								dense
								sx={{ pl: 1, pr: 2 }}
							>
								<Grid container spacing={2}>
									<Grid item xs={3}>
										{data.type === type && (
											<ListItemIcon>
												<Check />
											</ListItemIcon>
										)}
									</Grid>
									<Grid item xs={9} sx={{ mt: data.type === type ? 0.5 : 0 }}>
										<ListItemText>{data.name}</ListItemText>
									</Grid>
								</Grid>
							</MenuItem>
						))}
					</MenuList>
				</Paper>
			</Popper>
		</Box>
	);
};

export default FileTypeTabButton;
