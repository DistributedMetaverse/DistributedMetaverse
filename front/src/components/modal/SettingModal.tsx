import React, { FC, Dispatch, SetStateAction } from 'react';
import { ActionCreatorsMapObject } from 'redux';
import useSettingInfoDetails from '../../hooks/useSettingInfoDetails';
import {
	Box,
	Paper,
	Modal,
	Divider,
	Typography,
	List,
	ListItem,
	ListItemText,
	ListItemAvatar,
	Avatar,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/SettingsOutlined';
import { fileSizeFormat } from '../../utils/format';

interface SettingModalProps {
	actions: ActionCreatorsMapObject;
	open: boolean;
	serverId: number;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

interface SettingListItemProps {
	primary: string;
	secondary: string;
}

const SettingListItem: FC<SettingListItemProps> = ({
	primary,
	secondary,
}): JSX.Element => {
	return (
		<ListItem sx={{ pt: 1, pb: 0, textAlign: 'center' }}>
			<ListItemAvatar sx={{ ml: -3 }}>
				<Avatar>
					<SettingsIcon />
				</Avatar>
			</ListItemAvatar>
			<ListItemText
				primaryTypographyProps={{
					style: { fontSize: '0.9rem' },
				}}
				primary={primary}
				secondaryTypographyProps={{
					style: { fontSize: '0.8rem', fontWeight: 'bold' },
				}}
				secondary={secondary}
				sx={{ pl: 6 }}
			/>
		</ListItem>
	);
};

const SettingModal: FC<SettingModalProps> = ({
	actions,
	open,
	serverId,
	setOpen,
}): JSX.Element => {
	const { id, host, port, size, limit } = useSettingInfoDetails({
		actions,
		serverId,
	});
	const settingClose = () => setOpen(false);
	return (
		<Modal open={open} onClose={settingClose}>
			<Box
				sx={{
					position: 'absolute' as const,
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					width: 340,
					bgcolor: 'background.paper',
					border: '2px solid #000',
					boxShadow: 24,
					p: 4,
				}}
			>
				<Typography
					variant="h6"
					component="h2"
					sx={{ fontSize: '1rem', fontWeight: 'bold', textAlign: 'center' }}
				>
					설정 화면
				</Typography>
				<Divider sx={{ mt: 1, borderColor: 'primary.main' }} />
				<Paper elevation={20} sx={{ mt: 1 }}>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center', // 가로 중앙
						}}
					>
						<List>
							<SettingListItem primary="서버 ID" secondary={String(id)} />
							<Divider variant="inset" sx={{ borderColor: 'secondary.main' }} />
							<SettingListItem primary="HOST 정보" secondary={host} />
							<Divider variant="inset" sx={{ borderColor: 'secondary.main' }} />
							<SettingListItem primary="PORT 정보" secondary={String(port)} />
							<Divider variant="inset" sx={{ borderColor: 'secondary.main' }} />
							<SettingListItem
								primary="현재 용량"
								secondary={fileSizeFormat(size)}
							/>
							<Divider variant="inset" sx={{ borderColor: 'secondary.main' }} />
							<SettingListItem
								primary="최대 용량"
								secondary={fileSizeFormat(limit ?? 0)}
							/>
						</List>
					</Box>
				</Paper>
			</Box>
		</Modal>
	);
};

export default SettingModal;
