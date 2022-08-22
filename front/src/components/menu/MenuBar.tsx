import React, { FC } from 'react';
import { MenuInfo } from '../../store/types';
import { useDispatch } from 'react-redux';
import { changeActiveMenu } from '../../store/index';
import {
	Box,
	Grow, // Transitions
	Divider,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Typography,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/HomeOutlined'; // Main Icon
import FolderCopyIcon from '@mui/icons-material/FolderCopyOutlined';
import VideocamIcon from '@mui/icons-material/VideocamOutlined';
import PhotoIcon from '@mui/icons-material/PhotoOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTimeOutlined';
import SettingsIcon from '@mui/icons-material/SettingsOutlined';

const AppIcon = [
	HomeIcon,
	FolderCopyIcon,
	VideocamIcon,
	PhotoIcon,
	AccessTimeIcon,
	SettingsIcon,
];

interface MenuBarProps {
	branch: boolean;
	menus?: Array<MenuInfo>;
}

const MenuBar: FC<MenuBarProps> = ({ branch, menus }): JSX.Element => {
	const dispatch = useDispatch();
	const menuClick = (path: string) => {
		dispatch(changeActiveMenu(path));
		//window.location.replace(path);
	};
	return (
		<>
			{menus &&
				menus.map((menu: MenuInfo) => {
					const IconComponent = AppIcon[menu.index - 1];
					return (
						<Grow key={menu.index} in={branch} timeout={menu.index * 300}>
							<ListItemButton
								selected={menu.isActive}
								onClick={() => menuClick(menu.path)}
								sx={{
									pl: 3, // MenuBar 양쪽 간격 맞춤
									'&.Mui-selected': {
										backgroundColor: '#505056',
										opacity: 0.08,
									},
								}}
							>
								<ListItemIcon>
									<Box
										sx={{
											display: 'flex',
											flexDirection: 'column',
											alignItems: 'center', // 가로 중앙
											ml: menu.position,
										}}
									>
										<IconComponent
											sx={{ color: menu.isActive ? '#fff' : '#626274' }}
										/>
										<Typography
											variant="caption"
											display="block"
											gutterBottom
											sx={{
												fontSize: '0.1rem',
												color: menu.isActive ? '#fff' : '#626274',
											}}
										>
											{menu.name}
										</Typography>
									</Box>
								</ListItemIcon>
								<ListItemText
									secondaryTypographyProps={{ fontSize: '0.8rem' }}
									secondary={menu.title}
								/>
							</ListItemButton>
						</Grow>
					);
				})}
			<Divider sx={{ my: 1 }} />
		</>
	);
};

export default MenuBar;
