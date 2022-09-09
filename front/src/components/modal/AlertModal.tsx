import React, { FC, Dispatch, SetStateAction } from 'react';
import { Box, Modal, Divider, Typography } from '@mui/material';

interface AlertModalProps {
	title: string;
	content: string;
	openAlert: boolean;
	setOpenAlert: Dispatch<SetStateAction<boolean>>;
}

const AlertModal: FC<AlertModalProps> = ({
	title,
	content,
	openAlert,
	setOpenAlert,
}): JSX.Element => {
	const alertClose = () => setOpenAlert(false);
	return (
		<Modal open={openAlert} onClose={alertClose}>
			<Box
				sx={{
					position: 'absolute' as const,
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					width: 400,
					bgcolor: 'background.paper',
					border: '2px solid #000',
					boxShadow: 24,
					p: 4,
				}}
			>
				<Typography variant="h6" component="h2" sx={{ fontSize: '1rem' }}>
					{title}
				</Typography>
				<Divider sx={{ mt: 1, borderColor: 'primary.main' }} />
				<Typography sx={{ mt: 2, fontSize: '0.7rem', fontWeight: 'bold' }}>
					{content}
				</Typography>
			</Box>
		</Modal>
	);
};

export default AlertModal;
