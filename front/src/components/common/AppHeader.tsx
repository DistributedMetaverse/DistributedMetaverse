import React, { FC, Dispatch, SetStateAction } from 'react';
import { Toolbar, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import ArchiveIcon from '@mui/icons-material/Archive';

interface AppBarProps extends MuiAppBarProps {
	open?: boolean;
	width: number;
}

interface AppHeaderProps {
	open?: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	width: number;
}

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open, width }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(['width', 'margin'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		width: `calc(100% - ${width}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const AppHeader: FC<AppHeaderProps> = ({
	open,
	setOpen,
	width,
}): JSX.Element => {
	const toggleDrawer = () => {
		setOpen(!open);
	};
	return (
		<AppBar open={open} width={width}>
			<Toolbar variant="dense" sx={{ bgcolor: 'background.paper' }}>
				<IconButton
					edge="start"
					color="inherit"
					aria-label="open drawer"
					onClick={toggleDrawer}
					sx={{
						ml: -2,
						...(open && { display: 'none' }),
					}}
				>
					<ArchiveIcon />
				</IconButton>
			</Toolbar>
		</AppBar>
	);
};

export default AppHeader;
