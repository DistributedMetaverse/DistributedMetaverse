import React, { FC } from 'react';
import { ActionCreatorsMapObject } from 'redux';
import useFileInfoDetails from '../../../hooks/useFileInfoDetails';
import useTransactionID from '../../../hooks/useTransactionID';
import { Box, Paper, CardMedia, Typography } from '@mui/material';
import DownloadingOutlinedIcon from '@mui/icons-material/DownloadingOutlined';
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';
import { downloadCheck } from '../../../utils/check';

interface PhotoViewProps {
	file: ActionCreatorsMapObject;
	block: ActionCreatorsMapObject;
	fileId: string;
	time: number;
}

interface UsePhotoProps {
	url: string;
}

const DownloadPhoto: FC = (): JSX.Element => {
	return (
		<Box sx={{ pt: 8, pb: 8 }}>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<DownloadingOutlinedIcon fontSize="large" sx={{ fontSize: '5rem' }} />
				<Typography
					component="span"
					variant="h6"
					sx={{ pt: 2, fontSize: '1rem' }}
				>
					이미지 파일을 다운로드 중입니다.
				</Typography>
				<Typography
					component="span"
					variant="h6"
					sx={{ pt: 2, fontSize: '0.7rem', color: '#626274' }}
				>
					잠시만 기다려 주세요
				</Typography>
			</Box>
		</Box>
	);
};

const UsePhoto: FC<UsePhotoProps> = ({ url }): JSX.Element => {
	return (
		<Box>
			<Typography
				component="span"
				variant="h6"
				sx={{ pt: 2, fontSize: '0.7rem', color: '#626274' }}
			>
				{downloadCheck(url) ? (
					<DownloadPhoto />
				) : (
					<CardMedia component="img" image={url} alt="Image" />
				)}
			</Typography>
		</Box>
	);
};

const NoPhoto: FC = (): JSX.Element => {
	return (
		<Box sx={{ pt: 8, pb: 8 }}>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<PhotoSizeSelectActualIcon fontSize="large" sx={{ fontSize: '5rem' }} />
				<Typography
					component="span"
					variant="h6"
					sx={{ pt: 2, fontSize: '1rem' }}
				>
					선택된 파일이 없습니다.
				</Typography>
				<Typography
					component="span"
					variant="h6"
					sx={{ pt: 2, fontSize: '0.7rem', color: '#626274' }}
				>
					이미지 파일 중 하나를 선택하면, 해당 이미지 화면을 확인할 수 있습니다.
				</Typography>
			</Box>
		</Box>
	);
};

const PhotoView: FC<PhotoViewProps> = ({
	file,
	block,
	fileId,
	time,
}): JSX.Element => {
	const data = useFileInfoDetails({ file, fileId, time });
	const transaction = useTransactionID({
		block,
		transactionId: data.transactionId,
	});
	return (
		<Paper sx={{ pt: 2, pb: 2 }}>
			{fileId === '' ? <NoPhoto /> : <UsePhoto url={transaction.url ?? ''} />}
		</Paper>
	);
};

export default PhotoView;
