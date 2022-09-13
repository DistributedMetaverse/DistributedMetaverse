import {
	FileInfo,
	FolderPathInfo,
	FilePathInfo,
	PageState,
} from '../store/types';
import {
	CategoryData,
	DailyData,
	IndicatorData,
	TransactionResponseData,
	BlockData,
	BlockResponseData,
	IPFSUploadData,
	ChainData,
} from '../services/types';

const fileinfo: FileInfo = {
	id: 1,
	fileId: 'test1',
	filename: 'test1.png',
	fileSize: 1000000,
	mimeType: 'image/png',
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
			mimeType: 'image/png',
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
			mimeType: 'image/png',
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
			mimeType: 'image/png',
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
			mimeType: 'image/png',
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
			folderPath: '/',
			count: 2,
		},
		{
			folderPath: '/data/data1',
			count: 10,
		},
		{
			folderPath: '/test1/folder',
			count: 23,
		},
		{
			folderPath: '/test2',
			count: 4,
		},
	],
	take: 10,
	total: 4,
};

const folderPathTablist: Array<FolderPathInfo> = [
	{
		folderPath: '/',
		count: 2,
	},
	{
		folderPath: '/data/data1',
		count: 10,
	},
	{
		folderPath: '/test1/folder',
		count: 23,
	},
	{
		folderPath: '/test2',
		count: 4,
	},
];

const filePathTablist: Array<FilePathInfo> = [
	{
		filePath: '/',
		count: 2,
	},
	{
		filePath: '/data/data1',
		count: 10,
	},
	{
		filePath: '/test1/folder',
		count: 23,
	},
	{
		filePath: '/test2',
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

const categorylist: Array<CategoryData> = [
	{
		fileType: 'image',
		count: 2,
	},
	{
		fileType: 'video',
		count: 10,
	},
	{
		fileType: 'file',
		count: 13,
	},
];

const daliylist: Array<DailyData> = [
	{
		date: '2022-09-10',
		count: 1,
	},
	{
		date: '2022-09-11',
		count: 8,
	},
	{
		date: '2022-09-12',
		count: 2,
	},
];

const indicatorData: IndicatorData = {
	all: [120, 118, 130, 100, 99],
	user: [100, 93, 50, 90, 70],
};

const ipfsData: IPFSUploadData = {
	Name: 'test',
	Hash: 'QmVnqyXNURMWdk4pnMfW5CM1htKVfJVgKFHY2oKSa1ntN2',
	Size: 96244,
};

const transactionData: TransactionResponseData = {
	success: true,
	data: {
		data: '{"qmhash":"QmVEL2JqkH1Gd58EuhfkdYJMLEdHLzqK6EJbFDz8RyNLvA","mimetype":"video/x-msvideo","filename":"big_buck_bunny_1080p_stereo.avi"}',
		id: 115,
		datetime: '2022-09-12 00:54:37.9252438 +0900 KST m=+99.276254501',
	},
	status: 'ok',
	url: 'http://127.0.0.1:1323/downloads/QmVEL2JqkH1Gd58EuhfkdYJMLEdHLzqK6EJbFDz8RyNLvA',
};

const blockinfo: BlockData = {
	previousHash:
		'000000b7b5e037df613bf1173f420b5a9228cbaab3581f25005afe791aa1dfe7',
	transactions: [
		{
			data: '{"qmhash":"QmVEL2JqkH1Gd58EuhfkdYJMLEdHLzqK6EJbFDz8RyNLvA","mimetype":"video/x-msvideo","filename":"big_buck_bunny_1080p_stereo.avi"}',
			id: 111,
			datetime: '2022-09-12 00:54:32.5607562 +0900 KST m=+93.911766901',
		},
		{
			data: '{"qmhash":"QmVEL2JqkH1Gd58EuhfkdYJMLEdHLzqK6EJbFDz8RyNLvA","mimetype":"video/x-msvideo","filename":"big_buck_bunny_1080p_stereo.avi"}',
			id: 112,
			datetime: '2022-09-12 00:54:34.0608671 +0900 KST m=+95.411877801',
		},
		{
			data: '{"qmhash":"QmVEL2JqkH1Gd58EuhfkdYJMLEdHLzqK6EJbFDz8RyNLvA","mimetype":"video/x-msvideo","filename":"big_buck_bunny_1080p_stereo.avi"}',
			id: 113,
			datetime: '2022-09-12 00:54:35.4791572 +0900 KST m=+96.830167901',
		},
		{
			data: '{"qmhash":"QmVEL2JqkH1Gd58EuhfkdYJMLEdHLzqK6EJbFDz8RyNLvA","mimetype":"video/x-msvideo","filename":"big_buck_bunny_1080p_stereo.avi"}',
			id: 114,
			datetime: '2022-09-12 00:54:36.7781704 +0900 KST m=+98.129181101',
		},
		{
			data: '{"qmhash":"QmVEL2JqkH1Gd58EuhfkdYJMLEdHLzqK6EJbFDz8RyNLvA","mimetype":"video/x-msvideo","filename":"big_buck_bunny_1080p_stereo.avi"}',
			id: 115,
			datetime: '2022-09-12 00:54:37.9252438 +0900 KST m=+99.276254501',
		},
	],
	hash: '000000ae3e856ab81898f840f036b1a9c5d76e08bf3c482c57ff9f6deb303379',
	datetime: '2022-09-12 00:54:58.6619114 +0900 KST m=+120.012922101',
	proof: 5546121,
	lastTransactionId: 115,
};

const blockData: BlockResponseData = {
	data: blockinfo,
	success: true,
};

const chainData: ChainData = {
	data: [blockinfo, blockinfo],
};

export {
	fileinfo,
	filelist,
	folderlist,
	folderPathTablist,
	filePathTablist,
	sharedlist,
	categorylist,
	daliylist,
	indicatorData,
	ipfsData,
	transactionData,
	blockData,
	chainData,
};
