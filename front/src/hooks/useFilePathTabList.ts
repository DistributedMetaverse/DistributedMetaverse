import { useEffect, useState, useCallback } from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { FilePathInfo } from '../store/types';

interface FolderInfoProps {
	status: ActionCreatorsMapObject;
	type: 'all' | 'video' | 'photo';
}

const useFilePathTabList = ({
	status,
	type,
}: FolderInfoProps): [Array<FilePathInfo>, (type: string) => Promise<void>] => {
	const [data, setData] = useState<Array<FilePathInfo>>([]);

	const fetchAndSetData = useCallback(async (type: string) => {
		const data = await status.file(type);
		setData(data);
	}, []);

	useEffect(() => {
		fetchAndSetData(type);
	}, [fetchAndSetData]);

	return [data, fetchAndSetData];
};

export default useFilePathTabList;
