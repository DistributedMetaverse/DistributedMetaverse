import axios, { AxiosResponse, AxiosError } from 'axios';
import { Dispatch } from '@reduxjs/toolkit';
import {
	loginSuccess,
	loginFailure,
	logoutSuccess,
	dataSuccess,
	dataProgress,
} from '../store/index';
import {
	JWT_USERNAME,
	JWT_ACCESS_TOKEN,
	JWT_REFRESH_TOKEN,
} from '../utils/jwttoken';
import toastMessage from '../utils/toast';
import { setSessionStorage, clearSessionStorage } from '../utils/storage';
import { setInterceptors } from './common/interceptors';
import { LoginData, SignUpData, TokenData, PageData } from './types';

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
	login: (userData: LoginData) => (dispatch: Dispatch) =>
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
				const { status, data } = error.response as AxiosResponse;
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
	register: (userData: SignUpData) => () =>
		instance
			.post('auth/signup', userData)
			.then((response: AxiosResponse) => {
				toastMessage(response.data, 'success');
				window.location.replace('/');
			})
			.catch((error: AxiosError) => {
				const { status, data } = error.response as AxiosResponse;
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
	refresh: (userData: TokenData) => (dispatch: Dispatch) =>
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

const data = {
	// 데이터 다운로드 API : <baseURL>/data/download/{dataId}
	download: (dataId: number) => (dispatch: Dispatch) =>
		instance
			.get(`data/download/${dataId}`)
			.then((response: AxiosResponse) => {
				dispatch(dataSuccess(response.data));
			})
			.catch((error: AxiosError) => {
				const { data } = error.response as AxiosResponse;
				toastMessage(data.message, 'warn');
			}),
	// 데이터 업로드 API : <baseURL>/data/upload
	upload: (formData: HTMLFormElement) => (dispatch: Dispatch) =>
		instance
			.post('data/upload', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
				onUploadProgress: (progressEvent: ProgressEvent) => {
					const { loaded, total } = progressEvent;
					dispatch(dataProgress(Math.round((loaded / total) * 100)));
				},
			})
			.then((response: AxiosResponse) => {
				dispatch(dataSuccess(response.data));
			})
			.catch((error: AxiosError) => {
				const { data } = error.response as AxiosResponse;
				toastMessage(data.message, 'warn');
			}),
	// 데이터 리스트 API : <baseURL>/data/list/{page}?type={type}
	list: (pageData: PageData) => (dispatch: Dispatch) =>
		instance
			.get(`data/list/${pageData.page}?type=${pageData.type}`)
			.then((response: AxiosResponse) => {
				dispatch(dataSuccess(response.data));
				return response.data;
			}),
	// 데이터 세부정보 API : <baseURL>/data/info/{dataId}
	info: (dataId: number) => (dispatch: Dispatch) =>
		instance.get(`data/info/${dataId}`).then((response: AxiosResponse) => {
			dispatch(dataSuccess(response.data));
			return response.data;
		}),
	// 데이터 특정경로 파일 리스트 호출 API : <baseURL>/data/file?path={path}
	path: (path: string) => (dispatch: Dispatch) =>
		instance.get(`data/file?path=${path}`).then((response: AxiosResponse) => {
			dispatch(dataSuccess(response.data));
			return response.data;
		}),
	// 데이터 파일 검색 API : <baseURL>/data/file?search={keyword}
	search: (keyword: string) => (dispatch: Dispatch) =>
		instance
			.get(`data/file?search=${keyword}`)
			.then((response: AxiosResponse) => {
				dispatch(dataSuccess(response.data));
				return response.data;
			}),
};

const api = {
	auth,
	data,
};

export default { ...api };
