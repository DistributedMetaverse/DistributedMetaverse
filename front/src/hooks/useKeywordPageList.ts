import { useEffect, useState, useCallback } from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { FileInfo } from '../store/types';
import { KeywordData } from '../services/types';

interface FilePathPageListProps {
	file: ActionCreatorsMapObject;
	keyword: string;
}

const useKeywordPageList = ({
	file,
	keyword,
}: FilePathPageListProps): [
	Array<FileInfo>,
	number,
	(page: number, keyword: string) => Promise<void>
] => {
	const [total, setTotal] = useState(0);
	const [data, setData] = useState<Array<FileInfo>>([]);

	const fetchAndSetData = useCallback(
		async (page: number, keyword: string) => {
			const keywordData: KeywordData = {
				page: page,
				keyword: keyword,
			};
			const data = await file.search(keywordData);
			const { results, total } = data;
			setTotal(total);
			setData(results);
		},
		[keyword]
	);

	useEffect(() => {
		fetchAndSetData(0, keyword);
	}, [fetchAndSetData]);

	return [data, total, fetchAndSetData];
};

export default useKeywordPageList;
