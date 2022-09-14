interface LoginData {
	username: string;
	password: string;
}

interface SignUpData {
	email: string;
	username: string;
	password: string;
}

interface TokenData {
	username: string;
	accesstoken: string;
	refreshtoken: string;
}

interface CSRFData {
	csrfToken: string;
}

interface SubmitData {
	fileId: string;
	filename: string;
	fileSize: number;
	mimeType: string;
	path: string;
	trainsactionId: number;
}

interface PageData {
	page: number;
	path: string;
	type: string; // enum → (all / video / photo / pdf / doc & current / download)
	identifier: 'file' | 'folder'; // ← enum
}

interface KeywordData {
	page: number;
	keyword: string;
}

interface SharedData {
	fileId: number;
	page: number;
}

interface CategoryData {
	fileType: string;
	count: number;
}

interface DailyData {
	date: string;
	count: number;
}

interface IndicatorData {
	all: Array<number>;
	user: Array<number>;
}

interface IPFSUploadData {
	Name: string;
	Hash: string;
	Size: number;
}

interface IPFSDownloadData {
	arg: string;
}

interface PublishData {
	qmhash: string;
	mimetype: string;
	filename: string;
}

interface TransactionData {
	id: number;
	data: string;
	datetime: string;
}

interface TransactionResponseData {
	data: TransactionData;
	success: boolean;
	status: string;
	url?: string;
}

interface BlockData {
	previousHash: string;
	transactions: Array<TransactionData>;
	hash: string;
	datetime: string;
	proof: number;
	lastTransactionId: number;
}

interface BlockResponseData {
	data: BlockData;
	success: boolean;
}

interface ChainData {
	data: Array<BlockData>;
}

interface StatData {
	lastBlockHash: string;
	lastBlocksCount: number;
	lastTransactionId: number;
}

export type {
	LoginData,
	SignUpData,
	TokenData,
	CSRFData,
	SubmitData,
	PageData,
	KeywordData,
	SharedData,
	CategoryData,
	DailyData,
	IndicatorData,
	IPFSUploadData,
	IPFSDownloadData,
	PublishData,
	TransactionData,
	TransactionResponseData,
	BlockData,
	BlockResponseData,
	ChainData,
	StatData,
};
