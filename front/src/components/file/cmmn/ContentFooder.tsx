import React, { FC, useState } from 'react';
import { Box, Grid, IconButton, Divider, Typography } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import AlertModal from '../../modal/AlertModal';
import { linkFormat, fileSizeFormat } from '../../../utils/format';

interface ContentFooterProps {
	fileId: string;
	fileSize: number;
	path: string;
}

const ContentFooter: FC<ContentFooterProps> = ({
	fileId,
	fileSize,
	path,
}): JSX.Element => {
	const [link, setLink] = useState('');
	const [openAlert, setOpenAlert] = useState(false);

	const alertOpen = (fileId: string, path: string) => {
		setLink(linkFormat(fileId, path));
		setOpenAlert(true);
	};
	return (
		<Box>
			<Divider
				variant="middle"
				sx={{
					pt: 2,
					height: '3px',
					borderColor: 'primary.main',
				}}
			/>
			<Box
				sx={{
					mt: 2,
					display: 'flex',
				}}
			>
				<Grid container sx={{ justifyContent: 'space-between' }}>
					<Grid item>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center', // 가로 중앙
							}}
						>
							<Typography
								variant="subtitle2"
								sx={{ fontSize: '0.1rem', color: '#626274' }}
							>
								Filesize
							</Typography>
							<Typography
								variant="subtitle2"
								sx={{ fontSize: '0.1rem', color: '#626274' }}
							>
								{fileSizeFormat(fileSize)}
							</Typography>
						</Box>
					</Grid>
					<Grid item>
						<IconButton
							sx={{ p: 0, mr: 0.7 }}
							onClick={() => alertOpen(fileId, path)}
						>
							<ShareIcon fontSize="small" sx={{ color: 'secondary.main' }} />
						</IconButton>
					</Grid>
				</Grid>
			</Box>
			<AlertModal
				title={'IPFS에 저장된 링크 주소입니다.'}
				content={link}
				openAlert={openAlert}
				setOpenAlert={setOpenAlert}
			/>
		</Box>
	);
};

export default ContentFooter;
