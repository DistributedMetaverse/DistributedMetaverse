import React, { FC } from 'react';
import { UploadInfo } from './types';
import { Box, Grid, Paper, Button, Divider, Typography } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { timeFormat, fileSizeFormat } from '../../../utils/format';

interface UploadDetailProps {
	data: UploadInfo;
	uploadSubmit: () => void;
}

interface DetailItemsProps {
	title: string;
	content: string;
}

interface UploadDetailFooterProps {
	size: number;
	lastModified: number;
}

const DetailDivider: FC = (): JSX.Element => {
	return (
		<Divider
			variant="middle"
			sx={{
				pb: 2,
				height: '3px',
				width: 230,
				borderColor: 'primary.main',
			}}
		/>
	);
};

const DetailItems: FC<DetailItemsProps> = ({ title, content }): JSX.Element => {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center', // 가로 중앙
				width: 120,
			}}
		>
			<Typography
				variant="subtitle2"
				sx={{ fontSize: '0.1rem', color: '#626274' }}
			>
				{title}
			</Typography>
			<Typography
				variant="subtitle2"
				sx={{ fontSize: '0.1rem', color: '#626274' }}
			>
				{content}
			</Typography>
		</Box>
	);
};

const UploadDetailFooter: FC<UploadDetailFooterProps> = ({
	size,
	lastModified,
}): JSX.Element => {
	const grid: SxProps<Theme> = {
		ml: -1,
	};
	return (
		<Box sx={{ width: 250 }}>
			<Box
				sx={{
					mt: 2,
					display: 'flex',
				}}
			>
				<Grid container spacing={1} sx={{ justifyContent: 'space-between' }}>
					<Grid item sx={grid}>
						<DetailItems title={'Filesize'} content={fileSizeFormat(size)} />
					</Grid>
					<Grid item sx={grid}>
						<DetailItems
							title={'Modified'}
							content={timeFormat(lastModified)}
						/>
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
};

const UploadDetail: FC<UploadDetailProps> = ({
	data,
	uploadSubmit,
}): JSX.Element => {
	return (
		<Box
			sx={{
				pt: 2,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center', // 가로 중앙
			}}
		>
			<Paper elevation={20} sx={{ width: 300 }}>
				<Box
					sx={{
						pt: 3,
						pb: 3,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center', // 가로 중앙
						justifyContent: 'center',
					}}
				>
					<Typography
						variant="subtitle2"
						sx={{ pb: 1, width: 300, textAlign: 'center', fontSize: '0.8rem' }}
					>
						{data.name}
					</Typography>
					<DescriptionOutlinedIcon fontSize="large" sx={{ fontSize: '6rem' }} />
					<Typography
						variant="subtitle2"
						sx={{
							pt: 1,
							width: 200,
							textAlign: 'center',
							fontSize: '0.8rem',
							color: 'secondary.main',
						}}
					>
						{data.type}
					</Typography>
					<Box sx={{ pt: 2, width: 230 }}>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ px: 0, height: 30 }}
							onClick={uploadSubmit}
						>
							Upload
						</Button>
					</Box>
					<DetailDivider />
					<UploadDetailFooter
						size={data.size}
						lastModified={data.lastModified}
					/>
					<DetailDivider />
				</Box>
			</Paper>
		</Box>
	);
};

export default UploadDetail;
