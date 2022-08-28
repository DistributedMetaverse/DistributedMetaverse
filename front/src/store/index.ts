import { createSlice, combineReducers, PayloadAction } from '@reduxjs/toolkit';
import { reducer as formReducer } from 'redux-form';
import {
	AuthState,
	TitleState,
	MenuState,
	PreviewState,
	PathState,
	FileState,
	SettingState,
} from './types';

// 1.1. 인증 관련 State
const authinitialState: AuthState = {
	token: '',
	isAuthenticated: false,
	isLoading: false,
	errorMessage: '',
};

// 1.2. authSlice : action + reducer → slice
const authSlice = createSlice({
	name: 'auth',
	initialState: authinitialState,
	reducers: {
		loginSuccess: (state: AuthState, action: PayloadAction<string>) => {
			state.isAuthenticated = true;
			state.isLoading = false;
			state.token = action.payload;
		},
		loginFailure: (state: AuthState, action: PayloadAction<string>) => {
			state.isAuthenticated = false;
			state.isLoading = false;
			state.token = '';
			state.errorMessage = action.payload || 'Something went wrong.';
		},
		logoutSuccess: (state: AuthState) => {
			state.isAuthenticated = false;
			state.isLoading = true;
			state.token = '';
		},
	},
});

// 2.1. 메뉴 관련 State
const titleinitialState: TitleState = {
	title: 'Home',
};

// 2.2. titleSlice : action + reducer → slice
const titleSlice = createSlice({
	name: 'title',
	initialState: titleinitialState,
	reducers: {
		changeTitle: (state: TitleState, action: PayloadAction<string>) => {
			state.title = action.payload;
		},
	},
});

const menuinitialState: MenuState = {
	menus: [
		{
			index: 1,
			name: 'HOME',
			path: '/',
			title: 'Home',
			description: '홈',
			position: -0.8,
			isActive: true,
			isShow: true,
		},
		{
			index: 2,
			name: 'RECENT',
			path: '/recent',
			title: 'Recent File',
			description: '최신 파일',
			position: -1.5,
			isActive: false,
			isShow: true,
		},
		{
			index: 3,
			name: 'ALL FILES',
			path: '/file',
			title: 'All Files',
			description: '모든 파일',
			position: -2.1,
			isActive: false,
			isShow: true,
		},
		{
			index: 4,
			name: 'VIDEOS',
			path: '/video',
			title: 'Video Play',
			description: '비디오 재생',
			position: -1.2,
			isActive: false,
			isShow: true,
		},
		{
			index: 5,
			name: 'PHOTOS',
			path: '/photo',
			title: 'Photo View',
			description: '이미지 보기',
			position: -1.6,
			isActive: false,
			isShow: true,
		},
		{
			index: 6,
			name: 'SETTINGS',
			path: '/setting',
			title: 'Setting',
			description: '설정 화면',
			position: -2.3,
			isActive: false,
			isShow: false,
		},
	],
};

// 2.3. menuSlice : action + reducer → slice
const menuSlice = createSlice({
	name: 'menu',
	initialState: menuinitialState,
	reducers: {
		menuActive: (state: MenuState, action: PayloadAction<string>) => {
			state.menus.forEach((menu) => {
				if (action.payload === menu.path) {
					menu.isActive = true;
				} else {
					menu.isActive = false;
				}
			});
		},
		menuSwitch: (state: MenuState, action: PayloadAction<boolean>) => {
			state.menus.forEach((menu) => {
				menu.isActive = action.payload;
			});
		},
	},
});

// 3.1. Preview 관련 State
const previewinitialState: PreviewState = {
	fileId: '',
	isActive: false,
};

// 3.2. previewSlice : action + reducer → slice
const previewSlice = createSlice({
	name: 'preview',
	initialState: previewinitialState,
	reducers: {
		previewInfo: (state: PreviewState, action: PayloadAction<string>) => {
			state.fileId = action.payload;
			state.isActive = true;
		},
		previewSwitch: (state: PreviewState, action: PayloadAction<boolean>) => {
			state.isActive = action.payload;
		},
	},
});

// 4.1. Path 관련 State
const pathinitialState: PathState = {
	folderPath: '/',
	filePath: '/',
	folderType: 'all',
	fileType: 'all',
};

// 4.2. pathSlice : action + reducer → slice
const pathSlice = createSlice({
	name: 'path',
	initialState: pathinitialState,
	reducers: {
		setFolderPath: (state: PathState, action: PayloadAction<string>) => {
			state.folderPath = action.payload;
		},
		setFilePath: (state: PathState, action: PayloadAction<string>) => {
			state.filePath = action.payload;
		},
		setFolderType: (state: PathState, action: PayloadAction<string>) => {
			state.folderType = action.payload;
		},
		setFileType: (state: PathState, action: PayloadAction<string>) => {
			state.fileType = action.payload;
		},
	},
});

// 5.1. 파일 검색 및 업로드 관련 State
const fileinitialState: FileState = {
	data: [],
	size: 0,
};

// 5.2. fileSlice : action + reducer → slice
const fileSlice = createSlice({
	name: 'file',
	initialState: fileinitialState,
	reducers: {
		fileSuccess: (state: FileState, action: PayloadAction<Array<object>>) => {
			state.data = action.payload;
		},
		fileProgress: (state: FileState, action: PayloadAction<number>) => {
			state.size = action.payload;
		},
	},
});

// 6.1. Setting 관련 State
const settinginitialState: SettingState = {
	isActive: false,
};

// 6.2. settingSlice : action + reducer → slice
const settingSlice = createSlice({
	name: 'setting',
	initialState: settinginitialState,
	reducers: {
		settingSwitch: (state: SettingState, action: PayloadAction<boolean>) => {
			state.isActive = action.payload;
		},
	},
});

const rootReducer = combineReducers({
	form: formReducer, // <- redux-form
	auth: authSlice.reducer,
	title: titleSlice.reducer,
	menu: menuSlice.reducer,
	preview: previewSlice.reducer,
	path: pathSlice.reducer,
	file: fileSlice.reducer,
	setting: settingSlice.reducer,
});

const { loginSuccess, loginFailure, logoutSuccess } = authSlice.actions;
const { changeTitle } = titleSlice.actions;
const { menuActive, menuSwitch } = menuSlice.actions;
const { previewInfo, previewSwitch } = previewSlice.actions;
const { setFolderPath, setFilePath, setFolderType, setFileType } =
	pathSlice.actions;
const { fileSuccess, fileProgress } = fileSlice.actions;
const { settingSwitch } = settingSlice.actions;

export {
	loginSuccess,
	loginFailure,
	logoutSuccess,
	changeTitle,
	menuActive,
	menuSwitch,
	previewInfo,
	previewSwitch,
	setFolderPath,
	setFilePath,
	setFolderType,
	setFileType,
	fileSuccess,
	fileProgress,
	settingSwitch,
};

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
