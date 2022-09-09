import React, {
	FC,
	useState,
	ReactElement,
	Dispatch,
	SetStateAction,
} from 'react';
import { Box, Grid, Paper, IconButton, Divider } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
import IosShareOutlinedIcon from '@mui/icons-material/IosShareOutlined';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import LoupeOutlinedIcon from '@mui/icons-material/LoupeOutlined';
import AlertModal from '../../modal/AlertModal';
import { linkFormat } from '../../../utils/format';

interface PreviewFooterProps {
	fileId: string;
	path: string;
	modify: boolean;
	setModify: Dispatch<SetStateAction<boolean>>;
	share: boolean;
	setShare: Dispatch<SetStateAction<boolean>>;
}

interface UseLinkButtonProps {
	fileId: string;
	path: string;
	children?: ReactElement;
}

const UseLinkButton: FC<UseLinkButtonProps> = ({
	fileId,
	path,
	children,
}): JSX.Element => {
	const [link, setLink] = useState('');
	const [openAlert, setOpenAlert] = useState(false);

	const alertOpen = (fileId: string, path: string) => {
		setLink(linkFormat(fileId, path));
		setOpenAlert(true);
	};
	return (
		<Paper
			sx={{
				borderRadius: '50%',
				backgroundColor: 'background.paper',
			}}
		>
			<IconButton
				onClick={() => alertOpen(fileId, path)}
				sx={{ p: 1, '&:hover': { color: 'secondary.main' } }}
			>
				{children}
			</IconButton>
			<AlertModal
				title={'IPFS에 저장된 링크 주소입니다.'}
				content={link}
				openAlert={openAlert}
				setOpenAlert={setOpenAlert}
			/>
		</Paper>
	);
};

interface UseButtonProps {
	state: boolean;
	setState: Dispatch<SetStateAction<boolean>>;
	children?: ReactElement;
}

const UseButton: FC<UseButtonProps> = ({
	state,
	setState,
	children,
}): JSX.Element => {
	const handleClick = () => {
		setState(!state);
	};
	return (
		<Paper
			sx={{
				borderRadius: '50%',
				backgroundColor: 'background.paper',
			}}
		>
			<IconButton
				onClick={handleClick}
				sx={{ p: 1, '&:hover': { color: 'secondary.main' } }}
			>
				{children}
			</IconButton>
		</Paper>
	);
};

const PreviewFooter: FC<PreviewFooterProps> = ({
	fileId,
	path,
	modify,
	setModify,
	share,
	setShare,
}): JSX.Element => {
	const grid: SxProps<Theme> = {
		pl: 0,
		pr: 0,
	};
	const font: SxProps<Theme> = {
		fontSize: '1.6rem',
	};
	return (
		<Box
			sx={{
				ml: -5,
				bottom: 40,
				position: 'fixed',
				borderColor: 'primary.main',
			}}
		>
			<Divider
				sx={{
					mb: 1,
					ml: 2,
					width: 170,
					borderColor: 'primary.main',
				}}
			/>
			<Box sx={{ ml: 2.5, pb: 0, display: 'flex' }}>
				<Grid container spacing={3} sx={{ justifyContent: 'center' }}>
					<Grid item sx={grid}>
						<UseLinkButton fileId={fileId} path={path}>
							<IosShareOutlinedIcon fontSize="large" sx={font} />
						</UseLinkButton>
					</Grid>
					<Grid item sx={grid}>
						<Divider
							sx={{ mt: 1, width: 2, height: 30, borderColor: 'primary.main' }}
							orientation="vertical"
						/>
					</Grid>
					{!share && (
						<Grid item sx={grid}>
							<UseButton state={modify} setState={setModify}>
								<DriveFileRenameOutlineOutlinedIcon
									fontSize="large"
									sx={font}
								/>
							</UseButton>
						</Grid>
					)}
					{!share && (
						<Grid item sx={grid}>
							<Divider
								sx={{
									mt: 1,
									width: 2,
									height: 30,
									borderColor: 'primary.main',
								}}
								orientation="vertical"
							/>
						</Grid>
					)}
					<Grid item sx={grid}>
						<UseButton state={share} setState={setShare}>
							<LoupeOutlinedIcon fontSize="large" sx={font} />
						</UseButton>
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
};

export default PreviewFooter;
