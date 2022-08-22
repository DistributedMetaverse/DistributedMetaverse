import { createSlice, combineReducers, PayloadAction } from '@reduxjs/toolkit';
import { reducer as formReducer } from 'redux-form';
import { AuthState, DataState, MenuState } from './types';

const authinitialState: AuthState = {
	token: '',
	isAuthenticated: false,
	isLoading: false,
	errorMessage: '',
};

// authSlice : action + reducer → slice
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

const menuinitialState: MenuState = {
	menus: [
		{
			index: 1,
			name: 'HOME',
			path: '/',
			title: '대시보드',
			position: -0.8,
			isActive: false,
		},
		{
			index: 2,
			name: 'ALL FILES',
			path: '/file',
			title: '모든 파일',
			position: -2.1,
			isActive: false,
		},
		{
			index: 3,
			name: 'VIDEOS',
			path: '/vedio',
			title: '비디오 재생',
			position: -1.2,
			isActive: false,
		},
		{
			index: 4,
			name: 'PHOTOS',
			path: '/photo',
			title: '이미지 보기',
			position: -1.6,
			isActive: false,
		},
		{
			index: 5,
			name: 'RECENT',
			path: '/recent',
			title: '최신 파일',
			position: -1.5,
			isActive: false,
		},
		{
			index: 6,
			name: 'SETTINGS',
			path: '/setting',
			title: '설정 화면',
			position: -2.3,
			isActive: false,
		},
	],
};

// menuSlice : action + reducer → slice
const menuSlice = createSlice({
	name: 'menu',
	initialState: menuinitialState,
	reducers: {
		changeActiveMenu: (state: MenuState, action: PayloadAction<string>) => {
			state.menus.forEach((menu) => {
				if (action.payload === menu.path) {
					menu.isActive = true;
				} else {
					menu.isActive = false;
				}
			});
		},
	},
});

const datainitialState: DataState = {
	data: [],
	size: 0,
};

// dataSlice : action + reducer → slice
const dataSlice = createSlice({
	name: 'data',
	initialState: datainitialState,
	reducers: {
		dataSuccess: (state: DataState, action: PayloadAction<Array<object>>) => {
			state.data = action.payload;
		},
		dataProgress: (state: DataState, action: PayloadAction<number>) => {
			state.size = action.payload;
		},
	},
});

const rootReducer = combineReducers({
	form: formReducer, // <- redux-form
	auth: authSlice.reducer,
	menu: menuSlice.reducer,
	data: dataSlice.reducer,
});

const { loginSuccess, loginFailure, logoutSuccess } = authSlice.actions;
const { changeActiveMenu } = menuSlice.actions;
const { dataSuccess, dataProgress } = dataSlice.actions;

export {
	loginSuccess,
	loginFailure,
	logoutSuccess,
	changeActiveMenu,
	dataSuccess,
	dataProgress,
};

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
