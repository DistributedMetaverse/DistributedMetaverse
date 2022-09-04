interface LoginFormValues {
	email: string;
	password: string;
}

interface SignupFormValues {
	email: string;
	username: string;
	password: string;
	repeat_password: string;
}

export type { LoginFormValues, SignupFormValues };
