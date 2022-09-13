import React, { FC } from 'react';
import { ActionCreatorsMapObject } from 'redux';
import useIPFSCat from '../../../hooks/useIPFSCat';
import { Box, Paper, Typography } from '@mui/material';
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';

interface PhotoViewProps {
	infra: ActionCreatorsMapObject;
	fileId: string;
	type: string;
}

interface UsePhotoProps {
	data: Blob;
	type: string;
}

const UsePhoto: FC<UsePhotoProps> = ({ data, type }): JSX.Element => {
	const getBase64 = (file: Blob) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = function () {
			console.log(reader.result);
		};
		reader.onerror = function (error) {
			console.log('Error: ', error);
		};
	};
	return (
		<Box>
			<Typography
				component="span"
				variant="h6"
				sx={{ pt: 2, fontSize: '0.7rem', color: '#626274' }}
			>
				<img src={'data:' + type + ';base64,' + getBase64(data)} />
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
	infra,
	fileId,
	type,
}): JSX.Element => {
	const data = useIPFSCat({ infra, fileId });
	return (
		<Paper sx={{ pt: 2, pb: 2 }}>
			{fileId === '' ? <NoPhoto /> : <UsePhoto data={data} type={type} />}
		</Paper>
	);
};

export default PhotoView;
