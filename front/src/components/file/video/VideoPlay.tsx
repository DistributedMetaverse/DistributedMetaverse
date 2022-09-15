import React, { FC } from 'react';
import { ActionCreatorsMapObject } from 'redux';
import useFileInfoDetails from '../../../hooks/useFileInfoDetails';
import useTransactionID from '../../../hooks/useTransactionID';
import { Box, Paper, Typography } from '@mui/material';
import DownloadingOutlinedIcon from '@mui/icons-material/DownloadingOutlined';
import NotStartedIcon from '@mui/icons-material/NotStarted';
import ReactPlayer from 'react-player';
import { downloadCheck } from '../../../utils/check';

interface VideoPlayProps {
	file: ActionCreatorsMapObject;
	block: ActionCreatorsMapObject;
	fileId: string;
	time: number;
}

interface UseVideoProps {
	url: string;
}

const DownloadVideo: FC = (): JSX.Element => {
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
					동영상 파일을 다운로드 중입니다.
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

const UseVideo: FC<UseVideoProps> = ({ url }): JSX.Element => {
	return (
		<Box>
			<Typography
				component="span"
				variant="h6"
				sx={{ pt: 2, fontSize: '0.7rem', color: '#626274' }}
			>
				{downloadCheck(url) ? (
					<DownloadVideo />
				) : (
					<ReactPlayer url={url} width="100%" height="100%" controls={true} />
				)}
			</Typography>
		</Box>
	);
};

const NoVideo: FC = (): JSX.Element => {
	return (
		<Box sx={{ pt: 8, pb: 8 }}>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<NotStartedIcon fontSize="large" sx={{ fontSize: '5rem' }} />
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
					동영상 파일 중 하나를 선택하면, 해당 동영상을 실행 할 수 있습니다.
				</Typography>
			</Box>
		</Box>
	);
};

const VideoPlay: FC<VideoPlayProps> = ({
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
			{fileId === '' ? <NoVideo /> : <UseVideo url={transaction.url ?? ''} />}
		</Paper>
	);
};

export default VideoPlay;
