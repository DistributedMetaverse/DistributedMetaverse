import axios, { AxiosResponse, AxiosError } from 'axios';
import { Dispatch } from '@reduxjs/toolkit';
import { loginSuccess, loginFailure, logoutSuccess } from '../store/index';
import {
	JWT_USERNAME,
	JWT_ACCESS_TOKEN,
	JWT_REFRESH_TOKEN,
} from '../utils/jwttoken';
import toastMessage from '../utils/toast';
import { setSessionStorage, clearSessionStorage } from '../utils/storage';
import { setInterceptors } from './common/interceptors';
import { LoginVO, SignUpVO, TokenVO } from './types';

// 인스턴스 API 생성
const createInstance = () => {
	const instance = axios.create({
		baseURL: '/api', // proxy: process.env.REACT_APP_API_URL
	});

	return setInterceptors(instance);
};
const instance = createInstance();

const auth = {
	// 로그인 API : <baseURL>/auth/login
	login: (userData: LoginVO) => (dispatch: Dispatch) =>
		instance
			.post('auth/login', userData)
			.then((response: AxiosResponse) => {
				const tokenData = {
					username: response.data.username,
					accesstoken: response.data.accesstoken,
					refreshtoken: response.data.refreshtoken,
				};
				toastMessage(response.data, 'success');
				dispatch(loginSuccess(tokenData.accesstoken));
				setSessionStorage(JWT_USERNAME, tokenData.username);
				setSessionStorage(JWT_ACCESS_TOKEN, tokenData.accesstoken);
				setSessionStorage(JWT_REFRESH_TOKEN, tokenData.refreshtoken);
				window.location.replace('/');
			})
			.catch((error: AxiosError) => {
				const { status, data } = error.response as any;
				if (status === 400) {
					toastMessage('올바르지 않은 로그인 형식입니다', 'info');
				} else if (status === 401) {
					toastMessage(data.message, 'warn');
				} else if (status === 504) {
					toastMessage('서버가 닫혀있습니다', 'error');
				} else {
					toastMessage(data, 'error');
				}
				dispatch(loginFailure(error.message));
			}),
	logout: () => (dispatch: Dispatch) => {
		clearSessionStorage(JWT_USERNAME);
		clearSessionStorage(JWT_ACCESS_TOKEN);
		clearSessionStorage(JWT_REFRESH_TOKEN);
		dispatch(logoutSuccess());
		window.location.replace('/');
	},
	// 회원가입 API : <baseURL>/auth/signup
	register: (userData: SignUpVO) => () =>
		instance
			.post('auth/signup', userData)
			.then((response: AxiosResponse) => {
				toastMessage(response.data, 'success');
				window.location.replace('/');
			})
			.catch((error: AxiosError) => {
				const { status, data } = error.response as any;
				if (status === 400) {
					toastMessage('올바르지 않은 회원가입 형식입니다', 'info');
				} else if (status === 409) {
					toastMessage(data.message, 'warn');
				} else if (status === 504) {
					toastMessage('서버가 닫혀있습니다', 'error');
				} else {
					toastMessage(data, 'error');
				}
			}),
	// 토큰 재생성 API : <baseURL>/auth/refresh
	refresh: (userData: TokenVO) => (dispatch: Dispatch) =>
		instance
			.post('auth/refresh', userData)
			.then((response: AxiosResponse) => {
				dispatch(response.data);
				return response;
			})
			.catch((error: AxiosError) => {
				dispatch(loginFailure(error.message));
				return error.response;
			}),
};

const api = {
	auth,
};

export default { ...api };
