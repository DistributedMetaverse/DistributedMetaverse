const downloadCheck = (url: string): boolean => {
	if (url === '') return true;
	if (url.length > 0 && url[url.length - 1] === '/') return true;
	return false;
};

export { downloadCheck };
