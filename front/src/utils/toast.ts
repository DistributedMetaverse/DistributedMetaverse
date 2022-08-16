import { toast } from 'react-toastify';

const toastMessage = (message: string, type: string) => {
	if (type === 'info') {
		toast.info(message);
	} else if (type === 'success') {
		toast.success(message, {
			className: 'toast-success',
			progressClassName: 'success-progress-bar',
		});
	} else if (type === 'warn') {
		toast.warn(message);
	} else if (type === 'error') {
		toast.error(message);
	} else {
		toast(message);
	}
};

export default toastMessage;
