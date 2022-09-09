import {
	useEffect,
	useState,
	useCallback,
	Dispatch,
	SetStateAction,
} from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { UserInfo } from '../store/types';
import { SharedData } from '../services/types';

interface SharedPageListProps {
	file: ActionCreatorsMapObject;
	fileId: number;
}

const useSharedPageList = ({
	file,
	fileId,
}: SharedPageListProps): [
	Array<UserInfo>,
	number,
	number,
	Dispatch<SetStateAction<number>>
] => {
	const [page, setPage] = useState(0);
	const [take, setTake] = useState(10);
	const [total, setTotal] = useState(0);
	const [data, setData] = useState<Array<UserInfo>>([]);

	const fetchAndSetData = useCallback(
		async (page: number) => {
			const sharedData: SharedData = {
				fileId: fileId,
				page: page,
			};
			const data = await file.shared(sharedData);
			const { results, take, total } = data;
			setTake(take);
			setTotal(total);
			setData(results);
		},
		[page]
	);

	useEffect(() => {
		fetchAndSetData(page);
	}, [fetchAndSetData]);

	return [data, take, total, setPage];
};

export default useSharedPageList;
