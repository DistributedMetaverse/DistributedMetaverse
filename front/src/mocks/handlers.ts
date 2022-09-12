import { rest } from 'msw';
import {
	getTokenKeyHeader,
	getTokenKeyData,
	getTokenKeySignature,
} from './crypto';
import { TokenData } from '../services/types';
import { SearchInfo } from '../store/types';
import {
	fileinfo,
	filelist,
	folderlist,
	folderPathTablist,
	filePathTablist,
	sharedlist,
	ipfsData,
	chainData,
	blockData,
	transactionData,
} from './data';

const secret = 'S-dV7@1SS#AGd#%^';
const csrfToken = {
	csrfToken: 'Z2xKbR8k-wUeOvO_K0GiJqG7q3O1jjjCJ2Vs',
};

const prifix = '/api';

export const handlers = [
	// 로그인
	rest.post(prifix + '/auth/login', (req, res, ctx) => {
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
	rest.post(prifix + '/auth/signup', (req, res, ctx) => {
		return res(ctx.status(201));
	}),

	// 토큰 재생성
	rest.patch(prifix + '/auth/refresh', (req, res, ctx) => {
		return res(ctx.status(201));
	}),

	// 토큰 재생성
	rest.get(prifix + '/auth/csrf-token', (req, res, ctx) => {
		return res(ctx.status(200), ctx.json(csrfToken));
	}),

	// 파일 세부정보
	rest.get(prifix + '/file/info/:fileId', (req, res, ctx) => {
		const { fileId } = req.params;
		const searchData: SearchInfo = {
			fileId: String(fileId),
		};
		return res(ctx.status(200), ctx.json({ searchData, ...fileinfo }));
	}),

	// 파일 공유된 사용자 리스트
	rest.get(prifix + '/file/shared/:fileId', (req, res, ctx) => {
		return res(ctx.status(200), ctx.json(sharedlist));
	}),

	// 특정경로 파일 ↔ 폴더 리스트 검색
	rest.get(prifix + '/file/list', (req, res, ctx) => {
		const file = req.url.searchParams.get('file');
		const identifier = file ? 'file' : 'folder';
		if (identifier === 'file') return res(ctx.status(200), ctx.json(filelist));
		else return res(ctx.status(200), ctx.json(folderlist));
	}),

	// 파일 세부정보
	rest.get(prifix + '/file/search', (req, res, ctx) => {
		return res(ctx.status(200), ctx.json(filelist));
	}),

	// 현재 확인된 다운로드 갯수 확인
	rest.get(prifix + '/status/download', (req, res, ctx) => {
		return res(ctx.status(200), ctx.json({ count: 4 }));
	}),

	// 현재 확인된 폴더 경로 리스트 확인
	rest.get(prifix + '/status/folder', (req, res, ctx) => {
		return res(ctx.status(200), ctx.json(folderPathTablist));
	}),

	// 현재 확인된 파일 경로 리스트 확인
	rest.get(prifix + '/status/file', (req, res, ctx) => {
		return res(ctx.status(200), ctx.json(filePathTablist));
	}),

	// IPFS 파일 업로드
	rest.post('/ipfs/add', (req, res, ctx) => {
		return res(ctx.status(201), ctx.json(ipfsData));
	}),

	// IPFS 파일 다운로드
	rest.post('/ipfs/cat', (req, res, ctx) => {
		return res(ctx.status(201));
	}),

	// OffChain 트랜젝션 추가
	rest.post('/offchain/transaction/publish', (req, res, ctx) => {
		return res(ctx.status(201));
	}),

	// OffChain 최근 블록 조회
	rest.get('/offchain/chain/:depth', (req, res, ctx) => {
		return res(ctx.status(200), ctx.json(chainData));
	}),

	// OffChain 블록 정보 조회
	rest.get('/offchain/block/:hash', (req, res, ctx) => {
		return res(ctx.status(200), ctx.json(blockData));
	}),

	// OffChain 트랜젝션 정보 조회
	rest.get('/offchain/transaction/:id', (req, res, ctx) => {
		return res(ctx.status(200), ctx.json(transactionData));
	}),
];
