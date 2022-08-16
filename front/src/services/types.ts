interface LoginVO {
	username: string;
	password: string;
}

interface SignUpVO {
	email: string;
	username: string;
	password: string;
}

interface TokenVO {
	username: string;
	accesstoken: string;
	refreshtoken: string;
}

export type { LoginVO, SignUpVO, TokenVO };
