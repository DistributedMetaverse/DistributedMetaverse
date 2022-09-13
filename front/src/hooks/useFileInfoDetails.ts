import { useEffect, useState, useCallback } from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { FileInfo } from '../store/types';

interface FileInfoDetailsProps {
	file: ActionCreatorsMapObject;
	fileId: string;
	time: number;
}

const useFileInfoDetails = ({
	file,
	fileId,
	time,
}: FileInfoDetailsProps): FileInfo => {
	const [data, setData] = useState<FileInfo>({
		id: 0,
		fileId: '',
		filename: '',
		fileSize: 0,
		mimeType: '',
		path: '/',
		isLike: false,
		downIPFS: false,
		createdAt: '2022-01-23',
	});

	const fetchAndSetData = useCallback(
		async (fileId: string) => {
			const data = await file.info(fileId);
			setData(data);
		},
		[fileId, time]
	);

	useEffect(() => {
		fetchAndSetData(fileId);
	}, [fetchAndSetData]);

	return data;
};

export default useFileInfoDetails;
