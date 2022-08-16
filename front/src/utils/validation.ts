const validateEmail = (email: string) => {
	const re =
		/^(([^<>()\\.,;:\s@"]+(\.[^<>()\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
};

const validateUpperCase = (password: string) => {
	const re = /[A-Z]/;
	return re.test(password);
};

const validateLowerCase = (password: string) => {
	const re = /[a-z]/;
	return re.test(password);
};

const validateDigit = (password: string) => {
	const re = /[\d]/;
	return re.test(password);
};

const validateSpecialChar = (password: string) => {
	const re = /[\W]/;
	return re.test(password);
};

export {
	validateEmail,
	validateUpperCase,
	validateLowerCase,
	validateDigit,
	validateSpecialChar,
};
