const renderNumber = (value: number, size: number): string => {
	const text = String(value);
	return text.padStart(size, '0');
};

const timeFormat = (createtime: number): string => {
	const date = new Date(createtime);
	const year = renderNumber(date.getFullYear(), 4);
	const month = renderNumber(date.getMonth() + 1, 2);
	const day = renderNumber(date.getDate(), 2);
	const hours = renderNumber(date.getHours(), 2);
	const minutes = renderNumber(date.getMinutes(), 2);
	const seconds = renderNumber(date.getSeconds(), 2);
	return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

const fileSizeFormat = (bytes: number): string => {
	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
	if (bytes == 0) return '0 Byte';
	const i = Math.floor(Math.log(bytes) / Math.log(1024));
	return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i];
};

export { timeFormat, fileSizeFormat };
