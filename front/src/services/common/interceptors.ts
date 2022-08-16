import axios, {
	AxiosInstance,
	AxiosRequestConfig,
	AxiosError,
	AxiosResponse,
} from 'axios';
import {
	JWT_USERNAME,
	JWT_ACCESS_TOKEN,
	JWT_REFRESH_TOKEN,
	getAccessToken,
} from '../../utils/jwttoken';
import {
	setSessionStorage,
	getSessionStorage,
	clearSessionStorage,
} from '../../utils/storage';

const setInterceptors = (instance: AxiosInstance) => {
	instance.interceptors.request.use(
		(config: AxiosRequestConfig) => {
			const { url, headers } = config as any;
			if (url.indexOf('auth/') === -1) {
				headers.Authorization = ['Bearer', getAccessToken()].join(' ');
			}
			return config;
		},
		(error: AxiosError) => Promise.reject(error)
	);

	instance.interceptors.response.use(
		(response: AxiosResponse) => response,
		async (error: AxiosError) => {
			const { status, config } = error.response as any;
			// -> Access Token 인증 실패 (UNAUTHORIZED : status === 401)
			if (status === 401 && config.url.indexOf('auth/') === -1) {
				const tokenData = {
					username: getSessionStorage(JWT_USERNAME),
					accesstoken: getSessionStorage(JWT_ACCESS_TOKEN),
					refreshtoken: getSessionStorage(JWT_REFRESH_TOKEN),
				};
				clearSessionStorage(JWT_ACCESS_TOKEN);
				const { status, data } = await axios.post(
					[config.baseURL, 'auth/refresh'].join('/'),
					tokenData
				); // O
				if (status === 200) {
					setSessionStorage(JWT_ACCESS_TOKEN, data.accesstoken);
					config.headers.Authorization = ['Bearer', getAccessToken()].join(' ');
				} else {
					clearSessionStorage(JWT_USERNAME);
					clearSessionStorage(JWT_REFRESH_TOKEN);
				}
				return axios(config);
			}

			// -> Refresh Token 인증 실패 (FORBIDDEN : status === 403)
			if (status === 403 && config.url === 'auth/refresh') {
				clearSessionStorage(JWT_USERNAME);
				clearSessionStorage(JWT_ACCESS_TOKEN);
				clearSessionStorage(JWT_REFRESH_TOKEN);
				return axios(config);
			}

			return Promise.reject(error); // [Case - 2.2] : 요청 에러 처리를 작성함
		}
	);
	return instance;
};

export { setInterceptors };
