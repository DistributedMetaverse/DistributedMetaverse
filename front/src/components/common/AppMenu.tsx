import React, { FC, useState, Dispatch, SetStateAction } from 'react';
import {
	Box,
	Slide, // Transitions
	Drawer as MuiDrawer,
	DrawerProps as MuiDrawerProps,
	Toolbar,
	Divider,
	IconButton,
	List,
	ListSubheader,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ListIcon from '@mui/icons-material/List'; // Sub Icon
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuBar from '../menu/MenuBar';
import DownloadBar from '../menu/DownloadBar';

interface DrawerProps extends MuiDrawerProps {
	open?: boolean;
	width: number;
}

interface AppMenuProps {
	open?: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	width: number;
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

const AppMenu: FC<AppMenuProps> = ({ open, setOpen, width }): JSX.Element => {
	const [branch, setBranch] = useState(true);

	const toggleDrawer = () => {
		setOpen(!open);
		setBranch(true); // Init 설정
	};
	const toggleSwitch = () => {
		setBranch(!branch);
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
					<IconButton onClick={toggleSwitch} disabled={branch}>
						<ListIcon
							sx={{ color: branch ? 'active.disabled' : 'secondary.main' }}
						/>
					</IconButton>
					<IconButton onClick={toggleSwitch} disabled={!branch}>
						<CloudDownloadIcon
							sx={{ color: branch ? 'secondary.main' : 'active.disabled' }}
						/>
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
		</Drawer>
	);
};

export default AppMenu;
