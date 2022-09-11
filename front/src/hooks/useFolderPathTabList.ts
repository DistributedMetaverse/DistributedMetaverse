import { useEffect, useState, useCallback } from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { FolderPathInfo } from '../store/types';

interface FolderInfoProps {
	status: ActionCreatorsMapObject;
	type: 'all' | 'video' | 'photo';
}

const useFolderPathTabList = ({
	status,
	type,
}: FolderInfoProps): [
	Array<FolderPathInfo>,
	(type: string) => Promise<void>
] => {
	const [data, setData] = useState<Array<FolderPathInfo>>([]);

	const fetchAndSetData = useCallback(async (type: string) => {
		const data = await status.folder(type);
		setData(data);
	}, []);

	useEffect(() => {
		fetchAndSetData(type);
	}, [fetchAndSetData]);

	return [data, fetchAndSetData];
};

export default useFolderPathTabList;
