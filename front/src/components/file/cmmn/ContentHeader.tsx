import React, { FC, useState, MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import { previewInfo } from '../../../store/index';
import {
	Box,
	Grid,
	Paper,
	IconButton,
	Popper,
	MenuList,
	MenuItem,
	ListItemText,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import MenuIcon from '@mui/icons-material/Menu';

interface ContentHeaderProps {
	dataId: string;
	isLike: boolean;
}

interface TabButtonProps {
	dataId: string;
}

const TabButton: FC<TabButtonProps> = ({ dataId }): JSX.Element => {
	const dispatch = useDispatch();
	const [open, setOpen] = useState(false);
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

	const showClick = (event: MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(open ? null : event.currentTarget);
		setOpen(!open);
	};
	const previewClick = (dataId: string) => {
		dispatch(previewInfo(dataId));
		setAnchorEl(null);
		setOpen(false);
	};
	const removeClick = () => {
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
						<MenuItem onClick={() => previewClick(dataId)} dense sx={{ px: 1 }}>
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

const ContentHeader: FC<ContentHeaderProps> = ({
	dataId,
	isLike,
}): JSX.Element => {
	return (
		<Box sx={{ pb: 1, display: 'flex' }}>
			<Grid container sx={{ justifyContent: 'space-between' }}>
				<Grid item>
					{isLike ? (
						<StarIcon fontSize="small" sx={{ color: 'secondary.main' }} />
					) : (
						<StarOutlineIcon
							fontSize="small"
							sx={{ color: 'secondary.main' }}
						/>
					)}
				</Grid>
				<Grid item>
					<TabButton dataId={dataId} />
				</Grid>
			</Grid>
		</Box>
	);
};

export default ContentHeader;
