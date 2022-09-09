import React, { FC, useState, MouseEvent } from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { useDispatch } from 'react-redux';
import { previewInfo } from '../../../store/index';
import {
	Box,
	Paper,
	IconButton,
	Popper,
	MenuList,
	MenuItem,
	ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

interface ContentTabButtonProps {
	file: ActionCreatorsMapObject;
	fileId: string;
}

const ContentTabButton: FC<ContentTabButtonProps> = ({
	file,
	fileId,
}): JSX.Element => {
	const dispatch = useDispatch();
	const [open, setOpen] = useState(false);
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

	const showClick = (event: MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(open ? null : event.currentTarget);
		setOpen(!open);
	};
	const previewClick = (fileId: string) => {
		dispatch(previewInfo(fileId));
		setAnchorEl(null);
		setOpen(false);
	};
	const removeClick = () => {
		file.delete(fileId);
		setAnchorEl(null);
		setOpen(false);
	};

	return (
		<Box>
			<IconButton
				onClick={showClick}
				sx={{ p: 0, mt: -1, color: 'secondary.main' }}
			>
				<MenuIcon />
			</IconButton>
			<Popper
				open={open}
				anchorEl={anchorEl}
				placement="bottom-end"
				sx={{ zIndex: 1201 }}
			>
				<Paper elevation={24}>
					<MenuList sx={{ px: 0, pt: 0.2, pb: 0.2 }}>
						<MenuItem onClick={() => previewClick(fileId)} dense sx={{ px: 1 }}>
							<ListItemText
								primaryTypographyProps={{ style: { fontSize: 11 } }}
								primary="세부정보"
							/>
						</MenuItem>
						<MenuItem onClick={removeClick} dense sx={{ px: 1 }}>
							<ListItemText
								primaryTypographyProps={{ style: { fontSize: 11 } }}
								primary="삭제"
							/>
						</MenuItem>
					</MenuList>
				</Paper>
			</Popper>
		</Box>
	);
};

export default ContentTabButton;
