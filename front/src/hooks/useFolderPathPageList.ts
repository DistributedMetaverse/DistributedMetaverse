import {
	useEffect,
	useState,
	useCallback,
	Dispatch,
	SetStateAction,
} from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { FolderInfo } from '../store/types';
import { PageData } from '../services/types';

interface FolderPathPageList {
	file: ActionCreatorsMapObject;
	path: string;
	type: string;
}

const useFolderPathPageList = ({
	file,
	path,
	type,
}: FolderPathPageList): [
	number,
	Array<FolderInfo>,
	number,
	number,
	Dispatch<SetStateAction<number>>
] => {
	const [page, setPage] = useState(1);
	const [take, setTake] = useState(10);
	const [total, setTotal] = useState(0);
	const [data, setData] = useState<Array<FolderInfo>>([]);

	const fetchAndSetData = useCallback(
		async (page: number, path: string, type: string) => {
			const pageData: PageData = {
				page: page,
				path: path,
				type: type,
				identifier: 'folder',
			};
			const data = await file.list(pageData);
			const { results, take, total } = data;
			setTake(take);
			setTotal(total);
			setData(results);
		},
		[page, path, type]
	);

	useEffect(() => {
		fetchAndSetData(page, path, type);
	}, [fetchAndSetData]);

	return [page, data, take, total, setPage];
};

export default useFolderPathPageList;
