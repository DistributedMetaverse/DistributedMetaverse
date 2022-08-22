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

interface PageData {
	page: number;
	type: string; // enum -> (all files / video / photo / current / download list)
}

export type { LoginData, SignUpData, TokenData, PageData };
