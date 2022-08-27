import { useEffect, useState, useCallback } from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { FolderInfo } from '../store/types';

interface FolderInfoProps {
	status: ActionCreatorsMapObject;
	type: 'all' | 'video' | 'photo';
}

const useFolderTabList = ({
	status,
	type,
}: FolderInfoProps): [Array<FolderInfo>, (type: string) => Promise<void>] => {
	const [data, setData] = useState<Array<FolderInfo>>([]);

	const fetchAndSetData = useCallback(async (type: string) => {
		const data = await status.folder(type);
		setData(data);
	}, []);

	useEffect(() => {
		fetchAndSetData(type);
	}, [fetchAndSetData]);

	return [data, fetchAndSetData];
};

export default useFolderTabList;
