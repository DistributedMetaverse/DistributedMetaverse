import { useEffect, useState, useCallback } from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { FolderInfoList } from '../store/types';

interface FolderInfoProps {
	status: ActionCreatorsMapObject;
	type: 'all' | 'video' | 'photo';
}

const useFolderTabList = ({
	status,
	type,
}: FolderInfoProps): [FolderInfoList, (type: string) => Promise<void>] => {
	const [data, setData] = useState<FolderInfoList>({ datas: [] });

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
