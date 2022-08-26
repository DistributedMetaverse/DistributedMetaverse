import {
	useEffect,
	useState,
	useCallback,
	Dispatch,
	SetStateAction,
} from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { FileInfoList } from '../store/types';
import { PageData } from '../services/types';

interface FilePathPageListProps {
	actions: ActionCreatorsMapObject;
	path: string;
	type: string;
}

const useFilePathPageList = ({
	actions,
	path,
	type,
}: FilePathPageListProps): [FileInfoList, Dispatch<SetStateAction<number>>] => {
	const [page, setPage] = useState(0);
	const [data, setData] = useState<FileInfoList>({ datas: [] });

	const fetchAndSetData = useCallback(
		async (page: number) => {
			const pageData: PageData = {
				page: page,
				path: path,
				type: type,
				identifier: 'file',
			};
			const data = await actions.list(pageData);
			setData(data);
		},
		[page]
	);

	useEffect(() => {
		fetchAndSetData(page);
	}, [fetchAndSetData]);

	return [data, setPage];
};

export default useFilePathPageList;
