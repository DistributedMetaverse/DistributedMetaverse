import React, { FC } from 'react';
import { Box, Grid, Paper, Divider, Typography } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
//import StorageIcon from '@mui/icons-material/Storage';
import CurrencyBitcoinRoundedIcon from '@mui/icons-material/CurrencyBitcoinRounded';
//import PrecisionManufacturingOutlinedIcon from '@mui/icons-material/PrecisionManufacturingOutlined';
import { StatData } from '../../services/types';

interface SettingInfoProps {
	stat: StatData;
}

interface SettingItemsProps {
	title: string;
	content: string;
}

interface SettingHeaderProps {
	ip: string;
	port: number;
}

interface SettingFooterProps {
	block: number;
	transaction: number;
}

const SettingItems: FC<SettingItemsProps> = ({
	title,
	content,
}): JSX.Element => {
	const blockInfo: SxProps<Theme> = {
		fontSize: '0.8rem',
		fontWeight: 'bold',
	};
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center', // 가로 중앙
			}}
		>
			<Typography variant="subtitle2" sx={{ color: '#626274', ...blockInfo }}>
				{title}
			</Typography>
			<Typography variant="subtitle2" sx={{ color: '#626274', ...blockInfo }}>
				{content}
			</Typography>
		</Box>
	);
};

const SettingHeader: FC<SettingHeaderProps> = ({ ip, port }): JSX.Element => {
	const hostingInfo: SxProps<Theme> = {
		fontSize: '0.8rem',
		fontWeight: 'bold',
		color: 'secondary.main',
	};
	return (
		<Box
			sx={{
				mt: 1,
				display: 'flex',
			}}
		>
			<Grid container spacing={1} sx={{ justifyContent: 'space-between' }}>
				<Grid item>
					<Typography
						variant="subtitle2"
						sx={{
							pl: 2,
							...hostingInfo,
						}}
					>
						{ip}
					</Typography>
				</Grid>
				<Grid item>
					<Typography
						variant="subtitle2"
						sx={{
							pr: 1,
							...hostingInfo,
						}}
					>
						{port}
					</Typography>
				</Grid>
			</Grid>
		</Box>
	);
};

const SettingFooter: FC<SettingFooterProps> = ({
	block,
	transaction,
}): JSX.Element => {
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
				<Grid container spacing={1} sx={{ justifyContent: 'space-between' }}>
					<Grid item>
						<SettingItems
							title={'Block Chain'}
							content={String(block) + '건'}
						/>
					</Grid>
					<Grid item>
						<SettingItems
							title={'Transaction'}
							content={String(transaction) + '건'}
						/>
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
};

const SettingInfo: FC<SettingInfoProps> = ({ stat }): JSX.Element => {
	const data = {
		ip: '112.252.112.111',
		port: 3821,
		host: '112.252.112.111:3821', // 헤더에서 가져오기
		block: stat.lastBlocksCount,
		transaction: stat.lastTransactionId,
	};
	return (
		<Paper sx={{ p: 2 }}>
			<SettingHeader ip={data.ip} port={data.port} />
			<CurrencyBitcoinRoundedIcon sx={{ fontSize: '11rem' }} />
			<Typography
				variant="subtitle2"
				sx={{
					fontSize: '0.8rem',
				}}
			>
				{data.host}
			</Typography>
			<SettingFooter block={data.block} transaction={data.transaction} />
		</Paper>
	);
};

export default SettingInfo;
