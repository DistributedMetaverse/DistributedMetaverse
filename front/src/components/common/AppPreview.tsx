import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';

const AppPreview: FC = (): JSX.Element => {
	return (
		<Box
			sx={{
				width: 300,
				display: 'flex',
				alignItems: 'center',
				bgcolor: 'background.paper',
				zIndex: 1201,
			}}
		>
			<Typography
				component="span"
				variant="h6"
				sx={{
					ml: 1,
					mr: 1,
					width: '100%',
					alignItems: 'center',
					fontSize: '0.7rem',
				}}
			>
				파일을 선택해 주세요
			</Typography>
		</Box>
	);
};

export default AppPreview;
