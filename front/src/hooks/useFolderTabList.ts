import { useEffect, useState, useCallback } from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { FolderInfoList } from '../store/types';

interface FolderInfoProps {
	actions: ActionCreatorsMapObject;
	type: 'all' | 'video' | 'photo';
}

const useFolderTabList = ({
	actions,
	type,
}: FolderInfoProps): [FolderInfoList, (type: string) => Promise<void>] => {
	const [data, setData] = useState<FolderInfoList>({ datas: [] });

	const fetchAndSetData = useCallback(async (type: string) => {
		const data = await actions.folder(type);
		setData(data);
	}, []);

	useEffect(() => {
		fetchAndSetData(type);
	}, [fetchAndSetData]);

	return [data, fetchAndSetData];
};

export default useFolderTabList;
