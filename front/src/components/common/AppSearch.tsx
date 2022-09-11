import React, {
	FC,
	useState,
	ChangeEvent,
	KeyboardEvent,
	Dispatch,
	SetStateAction,
} from 'react';
import { FileInfo } from '../../store/types';
import {
	Paper,
	Popper,
	Collapse,
	InputBase,
	IconButton,
	MenuList,
	MenuItem,
	ListItemText,
} from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';

interface AppSearchProps {
	keyword: string;
	setKeyword: Dispatch<SetStateAction<string>>;
	setOpenSearch: Dispatch<SetStateAction<boolean>>;
	data: Array<FileInfo>;
	fetchData: (page: number, keyword: string) => Promise<void>;
}

interface AppSearchItemsProps {
	datas: Array<FileInfo>;
	searchClick: (text: string) => void;
}

const AppSearchItems: FC<AppSearchItemsProps> = ({
	datas,
	searchClick,
}): JSX.Element => {
	return (
		<MenuList sx={{ px: 0.5, pt: 0.2, pb: 0.2 }}>
			{datas &&
				datas.map((data: FileInfo) => (
					<MenuItem
						key={data.id}
						onClick={() => searchClick(data.filename)}
						dense
						sx={{
							px: 1,
							minHeight: 20,
						}}
					>
						<ListItemText
							primaryTypographyProps={{
								style: { fontSize: 13 },
							}}
							primary={data.filename}
						/>
					</MenuItem>
				))}
		</MenuList>
	);
};

const AppSearch: FC<AppSearchProps> = ({
	keyword,
	setKeyword,
	setOpenSearch,
	data,
	fetchData,
}): JSX.Element => {
	const [open, setOpen] = useState(false);
	const [focus, setFocus] = useState(false);
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

	// (Diff) focus는 focusing하는 boolean값 ↔ open은 list를 출력하는 boolean값
	const showAnchorEl = (event: ChangeEvent<HTMLInputElement>) => {
		setAnchorEl(event.currentTarget);
		setOpen(true);
	};
	const closeAnchorEl = () => {
		setAnchorEl(null);
		setOpen(false);
	};

	const searchOnChange = (event: ChangeEvent<HTMLInputElement>) => {
		const text = event.currentTarget.value;
		if (text === '') {
			setFocus(false);
			closeAnchorEl(); // → Popper Close
		} else {
			fetchData(0, text); // 초기화
			setFocus(true);
			showAnchorEl(event); // Popper Open
		}
		setKeyword(text);
	};
	const searchOnKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.code === 'Enter') {
			setOpenSearch(true);
			closeAnchorEl(); // → Popper Close
			event.preventDefault();
		}
	};
	const searchClick = (text: string) => {
		setOpenSearch(true);
		setKeyword(text);
		closeAnchorEl(); // → Popper Close
	};

	const cancelClick = () => {
		setKeyword('');
		setFocus(false);
		closeAnchorEl(); // → Popper 닫기
	};

	const icon: SxProps<Theme> = {
		ml: 1,
		fontSize: '1.2rem',
	};
	const inputBase: SxProps<Theme> = {
		ml: 1,
		flex: 1,
		fontSize: '0.8rem',
		height: '1.7rem',
		'& input::placeholder': {
			fontSize: '0.8rem',
		},
	};
	return (
		<Collapse orientation="horizontal" in={focus} collapsedSize={120}>
			<Paper
				component="form"
				sx={{
					mr: 2,
					display: 'flex',
					alignItems: 'center',
					borderRadius: 3,
				}}
			>
				{focus ? (
					<SearchIcon sx={icon} />
				) : (
					<ManageSearchIcon sx={{ mt: -0.2, ...icon }} />
				)}
				<InputBase
					sx={inputBase}
					placeholder="Search"
					value={keyword}
					onChange={searchOnChange}
					onKeyPress={searchOnKeyPress}
				/>
				{focus && (
					<IconButton onClick={cancelClick} sx={{ p: 0, mr: 1 }}>
						<ClearIcon />
					</IconButton>
				)}
			</Paper>
			<Popper
				open={open}
				anchorEl={anchorEl}
				placement="bottom-start"
				sx={{ zIndex: 1201 }}
			>
				<Paper elevation={3}>
					<AppSearchItems datas={data} searchClick={searchClick} />
				</Paper>
			</Popper>
		</Collapse>
	);
};

export default AppSearch;
