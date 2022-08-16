import jwtDecode, { JwtPayload } from 'jwt-decode';
import { getSessionStorage, clearSessionStorage } from './storage';

// [Case - 2] : access token + refresh token way
const JWT_USERNAME = 'username';
const JWT_ACCESS_TOKEN = 'access_token';
const JWT_REFRESH_TOKEN = 'refresh_token';

const isTokenExpired = (token: string) => {
	try {
		const decoded: JwtPayload = jwtDecode(token);
		if ((decoded?.exp as JwtPayload) < Date.now() / 1000) {
			return true;
		}
		return false;
	} catch (e) {
		return false;
	}
};

const getAccessToken = () => getSessionStorage(JWT_ACCESS_TOKEN);
const getRefreshToken = () => getSessionStorage(JWT_REFRESH_TOKEN);

const isAuthenticated = () => {
	if (!!getAccessToken() && !isTokenExpired(getAccessToken() as string)) {
		return true;
	}
	if (
		isTokenExpired(getAccessToken() as string) &&
		!isTokenExpired(getRefreshToken() as string)
	) {
		return true;
	}
	clearSessionStorage(JWT_USERNAME);
	clearSessionStorage(JWT_ACCESS_TOKEN);
	clearSessionStorage(JWT_REFRESH_TOKEN);
	return false;
};

export {
	JWT_USERNAME,
	JWT_ACCESS_TOKEN,
	JWT_REFRESH_TOKEN,
	getAccessToken,
	isAuthenticated,
};
