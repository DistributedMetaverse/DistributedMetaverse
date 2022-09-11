import React, {
	FC,
	useState,
	Dispatch,
	SetStateAction,
	MouseEvent,
	ChangeEvent,
} from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { useDispatch } from 'react-redux';
import { CSRFData } from '../../services/types';
import { FileInfo } from '../../store/types';
import { dataSuccess } from '../../store/index';
import {
	Box,
	Paper,
	Modal,
	Alert,
	Collapse,
	InputBase,
	IconButton,
	Divider,
	Typography,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	TableContainer,
	TablePagination,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

interface SearchModalProps {
	file: ActionCreatorsMapObject;
	keyword: string;
	setKeyword: Dispatch<SetStateAction<string>>;
	openSearch: boolean;
	setOpenSearch: Dispatch<SetStateAction<boolean>>;
	data: Array<FileInfo>;
	total: number;
	fetchKeywordData: (page: number, keyword: string) => Promise<void>;
	csrfData: CSRFData;
	fetchCSRFData: () => Promise<void>;
}

interface UseKeywordProps {
	file: ActionCreatorsMapObject;
	page: number;
	datas: Array<FileInfo>;
	total: number;
	changePage: (newPage: number) => void;
	csrfData: CSRFData;
	fetchData: () => Promise<void>;
}

const UseKeyword: FC<UseKeywordProps> = ({
	file,
	page,
	datas,
	total,
	changePage,
	csrfData,
	fetchData,
}): JSX.Element => {
	const dispatch = useDispatch();
	const [check, setCheck] = useState(false);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	const handleChangePage = (
		event: MouseEvent<HTMLButtonElement> | null,
		newPage: number
	) => {
		if (event) changePage(newPage);
	};
	const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(+event.target.value);
	};

	const downloadClick = async (data: FileInfo) => {
		fetchData();
		await file.download(data, csrfData);
		dispatch(dataSuccess(Date.now())); // → filelist 새로고침
		setCheck(true);
		setTimeout(() => {
			setCheck(false);
		}, 2000);
	};
	return (
		<Box>
			<TableContainer>
				<Table size="small">
					<TableHead>
						<TableRow>
							<TableCell align="center">Filename</TableCell>
							<TableCell>Filesize</TableCell>
							<TableCell align="center">Download</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{datas &&
							datas.map((data: FileInfo) => (
								<TableRow key={data.fileId}>
									<TableCell align="center">{data.filename}</TableCell>
									<TableCell>{data.fileSize}</TableCell>
									<TableCell align="center">
										<IconButton
											sx={{ p: 0, '&:hover': { color: 'secondary.main' } }}
											onClick={() => downloadClick(data)}
										>
											<FileDownloadIcon />
										</IconButton>
									</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[]} // → Disabled
				component="div"
				count={total}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
				sx={{
					'.MuiTablePagination-displayedRows': {
						color: 'primary.main',
					},
					'.Mui-disabled': {
						color: 'primary.main',
					},
				}}
			/>
			<Collapse in={check}>
				<Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
					This file is download success — check it out!
				</Alert>
			</Collapse>
		</Box>
	);
};

const NoKeyword: FC = (): JSX.Element => {
	return (
		<Typography sx={{ mt: 2, fontSize: '0.7rem', fontWeight: 'bold' }}>
			키워드를 입력해 주세요
		</Typography>
	);
};

const SearchModal: FC<SearchModalProps> = ({
	file,
	keyword,
	setKeyword,
	openSearch,
	setOpenSearch,
	data,
	total,
	fetchKeywordData,
	csrfData,
	fetchCSRFData,
}): JSX.Element => {
	const [page, setPage] = useState(0);
	const searchClose = () => setOpenSearch(false);
	const searchOnChange = (event: ChangeEvent<HTMLInputElement>) => {
		const text = event.currentTarget.value;
		fetchKeywordData(0, text); // 초기화
		setKeyword(text);
	};
	const changePage = (newPage: number) => {
		setPage(newPage);
		fetchKeywordData(newPage, keyword);
	};

	const cancelClick = () => {
		setKeyword('');
	};
	return (
		<Modal open={openSearch} onClose={searchClose}>
			<Box
				sx={{
					position: 'absolute' as const,
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					width: 600,
					bgcolor: 'background.paper',
					border: '2px solid #000',
					boxShadow: 24,
					p: 4,
				}}
			>
				<Paper
					component="form"
					sx={{
						p: '2px 4px',
						display: 'flex',
						alignItems: 'center',
					}}
				>
					<SearchIcon />
					<InputBase
						sx={{ ml: 1, flex: 1 }}
						placeholder="Search"
						value={keyword}
						onChange={searchOnChange}
					/>
					{keyword !== '' && (
						<IconButton onClick={cancelClick} sx={{ p: 0 }}>
							<ClearIcon />
						</IconButton>
					)}
				</Paper>
				<Divider sx={{ mt: 1, borderColor: 'primary.main' }} />
				{keyword !== '' ? (
					<UseKeyword
						file={file}
						page={page}
						datas={data}
						total={total}
						changePage={changePage}
						csrfData={csrfData}
						fetchData={fetchCSRFData}
					/>
				) : (
					<NoKeyword />
				)}
			</Box>
		</Modal>
	);
};

export default SearchModal;
