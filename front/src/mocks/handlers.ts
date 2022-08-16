import { rest } from 'msw';
import {
	getTokenKeyHeader,
	getTokenKeyData,
	getTokenKeySignature,
} from './crypto';

const todos = ['먹기', '자기', '놀기'];
const secret = 'S-dV7@1SS#AGd#%^';

export const handlers = [
	// 할일 목록
	rest.get('/todos', (req, res, ctx) => {
		return res(ctx.status(200), ctx.json(todos));
	}),

	// 로그인
	rest.post('/api/auth/login', (req, res, ctx) => {
		const username = 'test';
		const accessToken = getTokenKeyHeader() + '.' + getTokenKeyData(60 * 30); // 30분
		const refreshToken = getTokenKeyHeader() + '.' + getTokenKeyData(60 * 60); // 60분

		const tokenData = {
			username: username,
			accesstoken:
				accessToken + '.' + getTokenKeySignature(accessToken, secret),
			refreshtoken:
				refreshToken + '.' + getTokenKeySignature(refreshToken, secret),
		};
		return res(ctx.status(201), ctx.json(tokenData));
	}),

	// 회원가입
	rest.post('/api/auth/signup', (req, res, ctx) => {
		return res(ctx.status(201));
	}),

	// 토큰 재생성
	rest.post('/api/auth/refresh', (req, res, ctx) => {
		return res(ctx.status(201));
	}),
];
