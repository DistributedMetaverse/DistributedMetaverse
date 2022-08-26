import { useEffect, useState, useCallback } from 'react';
import { ActionCreatorsMapObject } from 'redux';

interface DownloadCountProps {
	status: ActionCreatorsMapObject;
}

const useDownloadCount = ({
	status,
}: DownloadCountProps): [number, () => Promise<void>] => {
	const [data, setData] = useState<number>(0);

	const fetchAndSetData = useCallback(async () => {
		const data = await status.download();
		setData(data.count);
	}, []);

	useEffect(() => {
		fetchAndSetData();
	}, [fetchAndSetData]);

	return [data, fetchAndSetData];
};

export default useDownloadCount;
