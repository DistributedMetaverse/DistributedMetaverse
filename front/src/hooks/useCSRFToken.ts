import { useEffect, useState, useCallback } from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { CSRFData } from '../services/types';

interface CSRFTokenProps {
	auth: ActionCreatorsMapObject;
}

const useCSRFToken = ({
	auth,
}: CSRFTokenProps): [CSRFData, () => Promise<void>] => {
	const [data, setData] = useState<CSRFData>({ csrfToken: '' });

	const fetchAndSetData = useCallback(async () => {
		const data = await auth.csrf();
		setData(data);
	}, []);

	useEffect(() => {
		fetchAndSetData();
	}, [fetchAndSetData]);

	return [data, fetchAndSetData];
};

export default useCSRFToken;
