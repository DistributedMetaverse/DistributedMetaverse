import { rest } from 'msw';
import {
	getTokenKeyHeader,
	getTokenKeyData,
	getTokenKeySignature,
} from './crypto';
import { PageData, TokenData } from '../services/types';
import { DataInfo, DataInfoList, FolderInfoList } from '../store/types';

const datainfo: DataInfo = {
	id: 1,
	dataId: 'test1',
	filename: 'test1.png',
	fileSize: 10,
	createdAt: new Date(),
	isLike: false,
};

const datalist: DataInfoList = {
	datas: [
		{
			id: 1,
			dataId: 'test1',
			filename: 'test1.png',
			fileSize: 10,
			createdAt: new Date(),
			isLike: true,
		},
		{
			id: 2,
			dataId: 'test2',
			filename: 'test2.png',
			fileSize: 20,
			createdAt: new Date(),
			isLike: false,
		},
		{
			id: 3,
			dataId: 'test3',
			filename: 'test3.png',
			fileSize: 30,
			createdAt: new Date(),
			isLike: false,
		},
		{
			id: 4,
			dataId: 'test4',
			filename: 'test4.png',
			fileSize: 40,
			createdAt: new Date(),
			isLike: false,
		},
	],
};

const folderlist: FolderInfoList = {
	datas: [
		{
			path: '/',
			count: 2,
		},
		{
			path: '/data/data1',
			count: 10,
		},
		{
			path: '/test1/folder',
			count: 23,
		},
		{
			path: '/test2',
			count: 4,
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

	// 파일 세부정보
	rest.get('/api/data/info/:dataId', (req, res, ctx) => {
		return res(ctx.status(200), ctx.json(datainfo));
	}),

	// 폴더 Tab 리스트 검색
	rest.get('/api/data/folder', (req, res, ctx) => {
		return res(ctx.status(200), ctx.json(folderlist));
	}),

	// 특정경로 파일 ↔ 폴더 리스트 검색
	rest.get('/api/data/list/:page', (req, res, ctx) => {
		const { page } = req.params;
		const file = req.url.searchParams.get('file');
		const folder = req.url.searchParams.get('folder');
		const path = file ? file : folder;
		const identifier = file ? 'file' : 'folder';
		const type = req.url.searchParams.get('type');
		console.log(type);
		const pageData: PageData = {
			page: Number(page),
			path: String(path),
			type: 'all',
			identifier: identifier,
		};
		if (identifier === 'file')
			return res(ctx.status(200), ctx.json({ pageData, ...datalist }));
		else return res(ctx.status(200), ctx.json({ pageData, ...folderlist }));
	}),
];
