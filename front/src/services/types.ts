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

interface IPFSData {
	arg: string;
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
	IPFSData,
};
