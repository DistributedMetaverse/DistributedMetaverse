import { useEffect, useState, useCallback } from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { FileInfo } from '../store/types';

interface FileInfoDetailsProps {
	actions: ActionCreatorsMapObject;
	fileId: string;
}

const useFileInfoDetails = ({
	actions,
	fileId,
}: FileInfoDetailsProps): FileInfo => {
	const [data, setData] = useState<FileInfo>({
		id: 0,
		fileId: '',
		filename: '',
		fileSize: 0,
		createdAt: '2022-01-23',
		isLike: false,
	});

	const fetchAndSetData = useCallback(
		async (fileId: string) => {
			const data = await actions.info(fileId);
			setData(data);
		},
		[fileId]
	);

	useEffect(() => {
		fetchAndSetData(fileId);
	}, [fetchAndSetData]);

	return data;
};

export default useFileInfoDetails;
