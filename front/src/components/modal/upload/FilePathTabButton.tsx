import React, {
	FC,
	useState,
	MouseEvent,
	Dispatch,
	SetStateAction,
} from 'react';
import { Dispatch as DispatchAction } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import { FilePathInfo } from '../../../store/types';
import Api from '../../../services/api';
import useFilePathTabList from '../../../hooks/useFilePathTabList';
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
import FolderIcon from '@mui/icons-material/Folder';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface FolderButtonProps {
	path: string;
	setPath: Dispatch<SetStateAction<string>>;
	status: ActionCreatorsMapObject;
}

interface FolderTabMenuItemProps {
	path: string;
	datas: Array<FilePathInfo>;
	closeClick: (path: string) => void;
}

const FolderTabMenuItem: FC<FolderTabMenuItemProps> = ({
	path,
	datas,
	closeClick,
}): JSX.Element => {
	return (
		<MenuList dense sx={{ pt: 0.5, pb: 0.5 }}>
			{datas &&
				datas.map((data: FilePathInfo) => (
					<MenuItem
						key={data.filePath}
						onClick={() => closeClick(data.filePath)}
						dense
						sx={{ px: 2, pt: 0.5, pb: 0.5, minHeight: 22 }}
					>
						<Grid container spacing={2}>
							<Grid item xs={8}>
								<ListItemText
									primaryTypographyProps={{
										style: { fontSize: 13, fontWeight: 'bold' },
									}}
									primary={data.filePath}
								/>
							</Grid>
							<Grid item xs={2}>
								<ListItemText
									primaryTypographyProps={{ style: { fontSize: 13 } }}
									primary={data.count}
								/>
							</Grid>
							<Grid
								item
								xs={2}
								sx={{
									mb: data.filePath === path ? -0.5 : 0,
								}}
							>
								{data.filePath === path && (
									<ListItemIcon>
										<Check
											sx={{
												color: 'text.primary',
											}}
										/>
									</ListItemIcon>
								)}
							</Grid>
						</Grid>
					</MenuItem>
				))}
		</MenuList>
	);
};

const FilePathTabButton: FC<FolderButtonProps> = ({
	path,
	setPath,
	status,
}): JSX.Element => {
	const [open, setOpen] = useState(false);
	const [data, fetchData] = useFilePathTabList({ status, type: 'all' });
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

	const showClick = (event: MouseEvent<HTMLButtonElement>) => {
		fetchData('all'); // → Refresh
		setAnchorEl(open ? null : event.currentTarget);
		setOpen(!open);
	};
	const closeClick = (path: string) => {
		setPath(path);
		setAnchorEl(null);
		setOpen(false);
	};

	return (
		<Box>
			<Button
				variant="contained"
				onClick={showClick}
				endIcon={<KeyboardArrowDownIcon />}
				sx={{ mt: -1, px: 2, pt: 0.5, pb: 0.5, fontSize: '0.7rem' }}
				size="small"
			>
				<FolderIcon sx={{ fontSize: '1rem' }} />
			</Button>
			<Popper
				open={open}
				anchorEl={anchorEl}
				placement="bottom-start"
				sx={{ zIndex: 1300 }}
			>
				<Paper elevation={3}>
					<FolderTabMenuItem path={path} datas={data} closeClick={closeClick} />
				</Paper>
			</Popper>
		</Box>
	);
};

const mapDispatchToProps = (dispatch: DispatchAction) => ({
	status: bindActionCreators(Api.status, dispatch),
});

export default connect(null, mapDispatchToProps)(FilePathTabButton);
