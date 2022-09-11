import { rest } from 'msw';
import {
	getTokenKeyHeader,
	getTokenKeyData,
	getTokenKeySignature,
} from './crypto';
import { TokenData } from '../services/types';
import {
	FileInfo,
	FolderInfo,
	PageState,
	SearchInfo,
	SettingInfo,
} from '../store/types';

const fileinfo: FileInfo = {
	id: 1,
	fileId: 'test1',
	filename: 'test1.png',
	fileSize: 1000000,
	description: 'the file is sample',
	path: '/',
	isLike: false,
	downIPFS: true,
	createdAt: '2022-01-23',
	shared: [
		{
			userId: 1,
			username: 'bbj',
			email: 'bbj@naver.com',
		},
		{
			userId: 2,
			username: 'test',
			email: 'test@naver.com',
		},
	],
};

const filelist: PageState = {
	results: [
		{
			id: 1,
			fileId: 'test1',
			filename: 'test1.png',
			fileSize: 100000,
			path: '/',
			isLike: true,
			downIPFS: false,
			createdAt: '2022-01-23',
		},
		{
			id: 2,
			fileId: 'test2',
			filename: 'test2.png',
			fileSize: 2000000,
			path: '/',
			isLike: false,
			downIPFS: false,
			createdAt: '2022-01-23',
		},
		{
			id: 3,
			fileId: 'test3',
			filename: 'test3.png',
			fileSize: 3000000,
			path: '/test/test',
			isLike: false,
			downIPFS: false,
			createdAt: '2022-01-23',
		},
		{
			id: 4,
			fileId: 'test4',
			filename: 'test4.png',
			fileSize: 4000000,
			path: '/aaaa',
			isLike: false,
			downIPFS: false,
			createdAt: '2022-01-23',
		},
	],
	take: 10,
	total: 4,
};

const folderlist: PageState = {
	results: [
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
	take: 10,
	total: 4,
};

const folderTablist: Array<FolderInfo> = [
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
];

const sharedlist: PageState = {
	results: [
		{
			userId: 1,
			username: 'bbj',
			email: 'bbj@naver.com',
		},
		{
			userId: 2,
			username: 'test',
			email: 'codequwdn@naver.com',
		},
	],
	take: 10,
	total: 4,
};

const settinginfo: SettingInfo = {
	id: 1,
	host: 'https://docs.ipfs.tech/',
	port: 4001,
	size: 10000000,
	limit: 100000000,
};

const settinglist: Array<SettingInfo> = [
	{
		id: 1,
		host: '127.0.0.1',
		port: 4001,
		size: 10000000,
	},
	{
		id: 2,
		host: 'https://docs.ipfs.tech/',
		port: 4002,
		size: 10000000,
	},
	{
		id: 3,
		host: '192.168.0.11',
		port: 4003,
		size: 10000000,
	},
];

const secret = 'S-dV7@1SS#AGd#%^';
const csrfToken = {
	csrfToken: 'Z2xKbR8k-wUeOvO_K0GiJqG7q3O1jjjCJ2Vs',
};

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
	rest.patch('/api/auth/refresh', (req, res, ctx) => {
		return res(ctx.status(201));
	}),

	// 토큰 재생성
	rest.get('/api/auth/csrf-token', (req, res, ctx) => {
		return res(ctx.status(200), ctx.json(csrfToken));
	}),

	// 파일 세부정보
	rest.get('/api/file/info/:fileId', (req, res, ctx) => {
		const { fileId } = req.params;
		const searchData: SearchInfo = {
			fileId: String(fileId),
		};
		return res(ctx.status(200), ctx.json({ searchData, ...fileinfo }));
	}),

	// 파일 공유된 사용자 리스트
	rest.get('/api/file/shared/:fileId', (req, res, ctx) => {
		return res(ctx.status(200), ctx.json(sharedlist));
	}),

	// 특정경로 파일 ↔ 폴더 리스트 검색
	rest.get('/api/file/list', (req, res, ctx) => {
		const file = req.url.searchParams.get('file');
		const identifier = file ? 'file' : 'folder';
		if (identifier === 'file') return res(ctx.status(200), ctx.json(filelist));
		else return res(ctx.status(200), ctx.json(folderlist));
	}),

	// 파일 세부정보
	rest.get('/api/file/search', (req, res, ctx) => {
		return res(ctx.status(200), ctx.json(filelist));
	}),

	// 현재 확인된 다운로드 갯수 확인
	rest.get('/api/status/download', (req, res, ctx) => {
		return res(ctx.status(200), ctx.json({ count: 4 }));
	}),

	// 현재 확인된 폴더 리스트 확인
	rest.get('/api/status/folder', (req, res, ctx) => {
		return res(ctx.status(200), ctx.json(folderTablist));
	}),

	// Setting 세부정보
	rest.get('/api/setting/info', (req, res, ctx) => {
		return res(ctx.status(200), ctx.json(settinginfo));
	}),

	// Setting 리스트
	rest.get('/api/setting/list/:page', (req, res, ctx) => {
		return res(ctx.status(200), ctx.json(settinglist));
	}),
];
