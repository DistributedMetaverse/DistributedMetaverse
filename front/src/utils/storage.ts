// 데이터를 브라우저 상에 저장함

const setSessionStorage = (key: string, value: string) => {
	sessionStorage.setItem(key, value);
};

const getSessionStorage = (key: string) => {
	return sessionStorage.getItem(key);
};

const clearSessionStorage = (key: string) => sessionStorage.removeItem(key);

export { setSessionStorage, getSessionStorage, clearSessionStorage };
