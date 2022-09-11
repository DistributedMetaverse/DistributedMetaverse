import React, { FC, useState, Dispatch, SetStateAction } from 'react';
import { Dispatch as DispatchAction } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SettingState } from '../../store/types';
import { menuSwitch, settingSwitch } from '../../store/index';
import Api from '../../services/api';
import {
	Box,
	Grid,
	Slide, // Transitions
	Drawer as MuiDrawer,
	DrawerProps as MuiDrawerProps,
	Toolbar,
	Divider,
	IconButton,
	List,
	ListSubheader,
} from '@mui/material';
import { styled, SxProps, Theme } from '@mui/material/styles';
import ListIcon from '@mui/icons-material/List'; // Sub Icon
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import SettingsIcon from '@mui/icons-material/SettingsOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuBar from '../menu/MenuBar';
import DownloadBar from '../menu/DownloadBar';

interface DrawerProps extends MuiDrawerProps {
	open?: boolean;
	width: number;
}

interface AppMenuProps {
	auth: ActionCreatorsMapObject;
	setting: boolean;
	open?: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	width: number;
}

interface AppMenuFooterProps {
	auth: ActionCreatorsMapObject;
	setting: boolean;
}

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== 'open',
})<DrawerProps>(({ theme, open, width }) => ({
	'& .MuiDrawer-paper': {
		paddingLeft: 5,
		paddingRight: 5,
		position: 'relative',
		whiteSpace: 'nowrap',
		width: width,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
		boxSizing: 'border-box',
		...(!open && {
			paddingLeft: 0,
			paddingRight: 0,
			overflowX: 'hidden',
			transition: theme.transitions.create('width', {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
			width: theme.spacing(9),
			[theme.breakpoints.up('sm')]: {
				width: theme.spacing(9),
			},
		}),
	},
}));

interface SlideListSubheaderProps {
	branch: boolean;
	title: string;
}

const SlideListSubheader: FC<SlideListSubheaderProps> = ({
	branch,
	title,
}): JSX.Element => {
	return (
		<Slide
			direction="right"
			in={branch}
			appear={branch}
			timeout={branch ? 300 : 0}
			mountOnEnter
			unmountOnExit
		>
			<ListSubheader component="div" sx={{ pl: 1 }}>
				{title}
			</ListSubheader>
		</Slide>
	);
};

const AppMenuFooter: FC<AppMenuFooterProps> = ({ auth, setting }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const settingClick = () => {
		dispatch(menuSwitch(false));
		dispatch(settingSwitch(true));
		navigate('/setting');
	};
	const logoutClick = () => {
		auth.logout();
	};

	const font: SxProps<Theme> = {
		fontSize: '1.7rem',
	};
	const settingButton: SxProps<Theme> = {
		p: 1,
		'&:hover': { color: 'secondary.main' },
		'&:disabled': { color: 'active.disabled' },
	};
	const logoutButton: SxProps<Theme> = {
		p: 1,
		'&:hover': { color: 'secondary.main' },
	};
	return (
		<Box>
			<Divider
				variant="middle"
				sx={{ height: '2px', borderColor: 'primary.main' }}
			/>
			<Box sx={{ mt: 2, px: 1, display: 'flex' }}>
				<Grid container sx={{ justifyContent: 'space-between' }}>
					<Grid item>
						<IconButton
							sx={settingButton}
							onClick={settingClick}
							disabled={setting}
						>
							<SettingsIcon fontSize="large" sx={font} />
						</IconButton>
					</Grid>
					<Grid item>
						<IconButton sx={logoutButton} onClick={logoutClick}>
							<LogoutIcon fontSize="large" sx={font} />
						</IconButton>
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
};

const AppMenu: FC<AppMenuProps> = ({
	auth,
	setting,
	open,
	setOpen,
	width,
}): JSX.Element => {
	const [branch, setBranch] = useState(true);

	const toggleDrawer = () => {
		setOpen(!open);
		setBranch(true); // Init 설정
	};
	const toggleSwitch = () => {
		setBranch(!branch);
	};

	const iconButton: SxProps<Theme> = {
		'&:hover': { color: 'secondary.main' },
		'&:disabled': { color: 'active.disabled' },
	};
	return (
		<Drawer variant="permanent" open={open} width={width}>
			<Toolbar
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					p: [1.2], // Toolbar Icon 간격 조정
				}}
			>
				<Box>
					<IconButton sx={iconButton} onClick={toggleSwitch} disabled={branch}>
						<ListIcon />
					</IconButton>
					<IconButton sx={iconButton} onClick={toggleSwitch} disabled={!branch}>
						<CloudDownloadIcon />
					</IconButton>
				</Box>
				<IconButton onClick={toggleDrawer}>
					<ChevronLeftIcon color="disabled" />
				</IconButton>
			</Toolbar>
			<Divider
				variant="middle"
				sx={{ height: '2px', borderColor: 'primary.main' }}
			/>
			<List
				component="nav"
				sx={{ pt: 0, pb: 0 }}
				subheader={
					<Box sx={{ display: open ? 'block' : 'none' }}>
						<SlideListSubheader branch={branch} title={'Menu Bar'} />
						<SlideListSubheader branch={!branch} title={'Download'} />
					</Box>
				}
			>
				{branch ? (
					<>
						<Divider
							variant="middle"
							sx={{
								height: '2px',
								borderColor: 'primary.main',
								display: open ? 'block' : 'none',
							}}
						/>
						<MenuBar branch={branch} />
					</>
				) : (
					<DownloadBar branch={!branch} />
				)}
			</List>
			{branch && <AppMenuFooter auth={auth} setting={setting} />}
		</Drawer>
	);
};

const mapStateToProps = (state: any) => ({
	setting: (state.setting as SettingState).isActive,
});

const mapDispatchToProps = (dispatch: DispatchAction) => ({
	auth: bindActionCreators(Api.auth, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppMenu);
