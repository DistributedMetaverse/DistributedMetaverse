import { useEffect, useState, useCallback } from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { FolderInfoList } from '../store/types';

interface FolderInfoProps {
	actions: ActionCreatorsMapObject;
}

const useFolderTabList = ({
	actions,
}: FolderInfoProps): [FolderInfoList, () => Promise<void>] => {
	const [data, setData] = useState<FolderInfoList>({ datas: [] });

	const fetchAndSetData = useCallback(async () => {
		const data = await actions.folder();
		setData(data);
	}, []);

	useEffect(() => {
		fetchAndSetData();
	}, [fetchAndSetData]);

	return [data, fetchAndSetData];
};

export default useFolderTabList;
