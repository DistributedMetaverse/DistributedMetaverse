import {
	useEffect,
	useState,
	useCallback,
	Dispatch,
	SetStateAction,
} from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { FileInfo } from '../store/types';
import { PageData } from '../services/types';

interface FilePathPageListProps {
	file: ActionCreatorsMapObject;
	path: string;
	type: string;
	time: number;
}

const useFilePathPageList = ({
	file,
	path,
	type,
	time,
}: FilePathPageListProps): [
	number,
	Array<FileInfo>,
	number,
	number,
	Dispatch<SetStateAction<number>>
] => {
	const [page, setPage] = useState(1);
	const [take, setTake] = useState(10);
	const [total, setTotal] = useState(0);
	const [data, setData] = useState<Array<FileInfo>>([]);

	const fetchAndSetData = useCallback(
		async (page: number, path: string, type: string) => {
			const pageData: PageData = {
				page: page,
				path: path,
				type: type,
				identifier: 'file',
			};
			const data = await file.list(pageData);
			const { results, take, total } = data;
			setTake(take);
			setTotal(total);
			setData(results);
		},
		[page, path, type, time]
	);

	useEffect(() => {
		fetchAndSetData(page, path, type);
	}, [fetchAndSetData]);

	return [page, data, take, total, setPage];
};

export default useFilePathPageList;
