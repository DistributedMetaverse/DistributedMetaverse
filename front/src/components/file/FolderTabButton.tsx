import React, { FC, useState, MouseEvent } from 'react';
import { Dispatch, ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import { FolderInfo } from '../../store/types';
import { useDispatch } from 'react-redux';
import Api from '../../services/api';
import useFolderTabList from '../../hooks/useFolderTabList';
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
	actions: ActionCreatorsMapObject;
	setPath: ActionCreatorWithPayload<string, string>;
}

const FolderButton: FC<FolderButtonProps> = ({
	path,
	actions,
	setPath,
}): JSX.Element => {
	const dispatch = useDispatch();
	const [data, fetchData] = useFolderTabList({ actions });
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
	const datas = data.datas as Array<FolderInfo>;

	const showClick = (event: MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const closeClick = (path: string) => {
		dispatch(setPath(path));
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
				<FolderIcon sx={{ fontSize: '1rem' }} />
			</Button>
			<Popper
				open={open}
				anchorEl={anchorEl}
				placement="bottom-start"
				sx={{ zIndex: 1201 }}
			>
				<Paper elevation={3}>
					<MenuList dense sx={{ pt: 0.5, pb: 0.5 }}>
						{datas &&
							datas.map((data: FolderInfo) => (
								<MenuItem
									key={data.path}
									onClick={() => closeClick(data.path)}
									dense
									disableRipple
								>
									<Grid container spacing={2}>
										<Grid item xs={8}>
											<ListItemText>{data.path}</ListItemText>
										</Grid>
										<Grid item xs={2}>
											<ListItemText>{data.count}</ListItemText>
										</Grid>
										<Grid item xs={2}>
											{data.path === path && (
												<ListItemIcon>
													<Check />
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

const mapDispatchToProps = (dispatch: Dispatch) => ({
	actions: bindActionCreators(Api.status, dispatch),
});

export default connect(null, mapDispatchToProps)(FolderButton);
