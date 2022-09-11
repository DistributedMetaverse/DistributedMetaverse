import React, { FC, useState } from 'react';
import { Dispatch } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect, useDispatch } from 'react-redux';
import { CSRFData } from '../../../services/types';
import { dataSuccess } from '../../../store/index';
import Api from '../../../services/api';
import { Box, Grid, IconButton, Divider, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import ShareIcon from '@mui/icons-material/Share';
import ContentTabButton from './ContentTabButton';
import AlertModal from '../../modal/AlertModal';
import { linkFormat, fileSizeFormat } from '../../../utils/format';

interface ContentAsideProps {
	file: ActionCreatorsMapObject;
	fileId: string;
	fileSize: number;
	path: string;
	isLike: boolean;
	csrfData: CSRFData;
	fetchData: () => Promise<void>;
}

const ContentAside: FC<ContentAsideProps> = ({
	file,
	fileId,
	fileSize,
	path,
	isLike,
	csrfData,
	fetchData,
}): JSX.Element => {
	const dispatch = useDispatch();
	const [link, setLink] = useState('');
	const [openAlert, setOpenAlert] = useState(false);

	const likeClick = async () => {
		fetchData();
		await file.like(fileId, csrfData);
		dispatch(dataSuccess(Date.now())); // → filelist 새로고침
	};

	const alertOpen = (fileId: string, path: string) => {
		setLink(linkFormat(fileId, path));
		setOpenAlert(true);
	};
	return (
		<Box sx={{ pt: 0.5, pr: 3, display: 'flex' }}>
			<Divider
				orientation="vertical"
				variant="fullWidth"
				sx={{ mr: 3, mt: -0.6, width: 3, borderColor: 'primary.main' }}
			/>
			<Grid container spacing={2}>
				<Grid item sx={{ mt: -0.1, pr: 3 }}>
					<Typography
						variant="subtitle2"
						sx={{ fontSize: '0.8rem', color: '#626274' }}
					>
						{fileSizeFormat(fileSize)}
					</Typography>
				</Grid>
				<Grid item>
					<IconButton
						sx={{ p: 0, mt: -1.2 }}
						onClick={() => alertOpen(fileId, path)}
					>
						<ShareIcon fontSize="small" sx={{ color: 'secondary.main' }} />
					</IconButton>
				</Grid>
				<Grid item>
					<IconButton sx={{ p: 0, mt: -1 }} onClick={likeClick}>
						{isLike ? (
							<StarIcon fontSize="small" sx={{ color: 'secondary.main' }} />
						) : (
							<StarOutlineIcon
								fontSize="small"
								sx={{ color: 'secondary.main' }}
							/>
						)}
					</IconButton>
				</Grid>
				<Grid item>
					<ContentTabButton
						file={file}
						fileId={fileId}
						csrfData={csrfData}
						fetchData={fetchData}
					/>
				</Grid>
			</Grid>
			<AlertModal
				title={'IPFS에 저장된 링크 주소입니다.'}
				content={link}
				openAlert={openAlert}
				setOpenAlert={setOpenAlert}
			/>
		</Box>
	);
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
	file: bindActionCreators(Api.file, dispatch),
});

export default connect(null, mapDispatchToProps)(ContentAside);
