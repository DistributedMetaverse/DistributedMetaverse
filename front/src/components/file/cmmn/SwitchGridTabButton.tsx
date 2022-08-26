import React, { FC, Dispatch, SetStateAction } from 'react';
import { Box, Divider, IconButton } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
import GridViewIcon from '@mui/icons-material/GridView';
import SplitscreenOutlinedIcon from '@mui/icons-material/SplitscreenOutlined';

interface SwitchGridTabButton {
	branch: boolean;
	setSwitch: Dispatch<SetStateAction<boolean>>;
}

const SwitchGridTabButton: FC<SwitchGridTabButton> = ({
	branch,
	setSwitch,
}): JSX.Element => {
	const gridClick = () => setSwitch(true);
	const rowClick = () => setSwitch(false);

	const iconButton: SxProps<Theme> = {
		p: 0,
		'&:hover': { color: 'secondary.main' },
		'&:disabled': { color: 'active.disabled' },
	};
	return (
		<Box
			sx={{
				mt: -0.5,
				height: 30,
				width: 75,
				display: 'flex',
				alignItems: 'center',
				border: (theme) => `1px solid ${theme.palette.divider}`,
				borderRadius: 1,
				bgcolor: 'background.paper',
				color: 'text.secondary',
				'& svg': {
					m: 1.5, // svg ↔ button 간격 조정
				},
				'& hr': {
					mx: 0, // svg ↔ hr 간격 조정
				},
			}}
		>
			<IconButton sx={iconButton} onClick={gridClick} disabled={branch}>
				<GridViewIcon sx={{ fontSize: '1rem' }} />
			</IconButton>
			<Divider
				orientation="vertical"
				variant="middle"
				flexItem
				sx={{ width: 3, borderColor: 'primary.main' }}
			/>
			<IconButton sx={iconButton} onClick={rowClick} disabled={!branch}>
				<SplitscreenOutlinedIcon sx={{ fontSize: '1rem' }} />
			</IconButton>
		</Box>
	);
};

export default SwitchGridTabButton;
