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
			name: 'Profile',
			path: '/profile',
			items: [],
			title: '프로파일',
			icon: 'icon-layers',
			isActive: false,
		},
		{
			index: 2,
			name: 'Select',
			path: '/select',
			items: [],
			title: '선택한 파일',
			icon: 'icon-refresh',
			isActive: false,
		},
		{
			index: 3,
			name: 'Upload',
			path: '/upload',
			items: [],
			title: '업로드한 파일',
			icon: 'icon-anchor',
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
			return {
				...state,
			};
		},
		changeDropdownMenu: (state: MenuState, action: PayloadAction<string>) => {
			state.menus.forEach((menu) => {
				if (action.payload === menu.path) {
					menu.isActive = !menu.isActive;
				}
			});
			return {
				...state,
			};
		},
	},
});

const datainitialState: DataState = {
	data: [],
};

// dataSlice : action + reducer → slice
const dataSlice = createSlice({
	name: 'data',
	initialState: datainitialState,
	reducers: {
		dataSuccess: (state: DataState, action: PayloadAction<Array<object>>) => {
			state.data = action.payload;
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
const { changeActiveMenu, changeDropdownMenu } = menuSlice.actions;
const { dataSuccess } = dataSlice.actions;

export {
	loginSuccess,
	loginFailure,
	logoutSuccess,
	changeActiveMenu,
	changeDropdownMenu,
	dataSuccess,
};

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
