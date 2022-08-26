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
import { FolderInfo } from '../../../store/types';
import Api from '../../../services/api';
import useFolderTabList from '../../../hooks/useFolderTabList';
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
	actions: ActionCreatorsMapObject;
}

const FolderTabButton: FC<FolderButtonProps> = ({
	path,
	setPath,
	actions,
}): JSX.Element => {
	const [open, setOpen] = useState(false);
	const [data, fetchData] = useFolderTabList({ actions, type: 'all' });
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
	const datas = data.datas as Array<FolderInfo>;

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
					<MenuList dense sx={{ pt: 0.5, pb: 0.5 }}>
						{datas &&
							datas.map((data: FolderInfo) => (
								<MenuItem
									key={data.path}
									onClick={() => closeClick(data.path)}
									dense
									sx={{ px: 2, pt: 0.5, pb: 0.5, minHeight: 22 }}
								>
									<Grid container spacing={2}>
										<Grid item xs={8}>
											<ListItemText
												primaryTypographyProps={{
													style: { fontSize: 13, fontWeight: 'bold' },
												}}
												primary={data.path}
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
											sx={{ mb: data.path === path ? -0.5 : 0 }}
										>
											{data.path === path && (
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
				</Paper>
			</Popper>
		</Box>
	);
};

const mapDispatchToProps = (dispatch: DispatchAction) => ({
	actions: bindActionCreators(Api.status, dispatch),
});

export default connect(null, mapDispatchToProps)(FolderTabButton);
