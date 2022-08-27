import React, { FC, ChangeEvent, Dispatch, SetStateAction } from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { SettingInfo } from '../store/types';
import useSettingPageList from '../hooks/useSettingPageList';
import { Box, Grid, Paper, Divider, Typography } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import StorageIcon from '@mui/icons-material/Storage';
import { fileSizeFormat } from '../utils/format';

interface SettingProps {
	setting: ActionCreatorsMapObject;
	setOpen: Dispatch<SetStateAction<boolean>>;
	setServerId: Dispatch<SetStateAction<number>>;
}

interface SettingItemsProps {
	title: string;
	content: string;
}

interface SettingHeaderProps {
	id: number;
	port: number;
}

interface SettingFooterProps {
	size: number;
	limit: number;
}

const SettingItems: FC<SettingItemsProps> = ({
	title,
	content,
}): JSX.Element => {
	return (
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

const SettingHeader: FC<SettingHeaderProps> = ({ id, port }): JSX.Element => {
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
							fontSize: '0.8rem',
							fontWeight: 'bold',
							color: 'secondary.main',
						}}
					>
						{id}
					</Typography>
				</Grid>
				<Grid item>
					<Typography
						variant="subtitle2"
						sx={{
							pr: 1,
							fontSize: '0.8rem',
							fontWeight: 'bold',
							color: 'secondary.main',
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
	size,
	limit,
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
						<SettingItems title={'Volume'} content={fileSizeFormat(size)} />
					</Grid>
					<Grid item>
						<SettingItems title={'Max'} content={fileSizeFormat(limit ?? 0)} />
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
};

const Setting: FC<SettingProps> = ({
	setting,
	setOpen,
	setServerId,
}): JSX.Element => {
	const [data, setPage] = useSettingPageList({ setting });
	console.log(data);
	const serverClick = (id: number) => {
		setServerId(id);
		setOpen(true);
	};

	const pageChange = (event: ChangeEvent<unknown>, page: number) => {
		const value = (event.target as HTMLButtonElement).textContent as any;
		if (value && value === String(page)) setPage(page);
	};

	return (
		<Box sx={{ mt: 2 }}>
			<Grid container spacing={3}>
				{data &&
					data.map((data: SettingInfo) => (
						<Grid item key={data.id} xs={6} md={3} lg={2}>
							<Paper
								sx={{
									p: 2,
									'&:hover': {
										cursor: 'pointer',
										backgroundColor: 'action.hover',
									},
								}}
								onClick={() => serverClick(data.id)}
							>
								<SettingHeader id={data.id} port={data.port} />
								<StorageIcon fontSize="large" />
								<Typography
									variant="subtitle2"
									sx={{
										fontSize: '0.8rem',
									}}
								>
									{data.host}
								</Typography>
								<SettingFooter size={data.size} limit={data.limit ?? 0} />
							</Paper>
						</Grid>
					))}
			</Grid>
			<Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
				<Pagination
					count={10}
					variant="outlined"
					color="primary"
					siblingCount={0}
					boundaryCount={1}
					showFirstButton
					showLastButton
					onChange={pageChange}
					size="small"
				/>
			</Box>
		</Box>
	);
};

export default Setting;
