import { rest } from 'msw';
import {
	getTokenKeyHeader,
	getTokenKeyData,
	getTokenKeySignature,
} from './crypto';
import { PageData, TokenData } from '../services/types';
import { DataListProps } from '../components/menu/types';

const datalist: DataListProps = {
	datas: [
		{
			id: 1,
			dataId: 1,
			filename: 'test1.png',
			fileSize: 10,
			dataType: 'download',
		},
		{
			id: 2,
			dataId: 2,
			filename: 'test2.png',
			fileSize: 20,
			dataType: 'download',
		},
		{
			id: 3,
			dataId: 3,
			filename: 'test3.png',
			fileSize: 30,
			dataType: 'download',
		},
		{
			id: 4,
			dataId: 4,
			filename: 'test4.png',
			fileSize: 40,
			dataType: 'download',
		},
	],
};
const secret = 'S-dV7@1SS#AGd#%^';

export const handlers = [
	// 로그인
	rest.post('/api/auth/login', (req, res, ctx) => {
		const username = 'test';
		const accessToken = getTokenKeyHeader() + '.' + getTokenKeyData(60 * 30); // 30분
		const refreshToken = getTokenKeyHeader() + '.' + getTokenKeyData(60 * 60); // 60분

		const tokenData: TokenData = {
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

	// 다운로드 목록
	rest.get('/api/data/list/:page', (req, res, ctx) => {
		const { page } = req.params;
		const dataType = req.url.searchParams.get('type');
		const pageData: PageData = {
			page: Number(page),
			type: String(dataType),
		};
		return res(ctx.status(200), ctx.json({ pageData, ...datalist }));
	}),
];
