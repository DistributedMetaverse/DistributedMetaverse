import { useEffect, useState, useCallback } from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { IPFSDownloadData } from '../services/types';

interface IPFSCatProps {
	infra: ActionCreatorsMapObject;
	fileId: string;
}

const useIPFSCat = ({ infra, fileId }: IPFSCatProps): any => {
	const [binary, setBinary] = useState<Blob>();

	const fetchAndSetData = useCallback(
		async (fileId: string) => {
			const downloadData: IPFSDownloadData = {
				arg: fileId,
			};
			const data = await infra.download(downloadData);
			setBinary(data);
		},
		[fileId]
	);

	useEffect(() => {
		fetchAndSetData(fileId);
	}, [fetchAndSetData]);

	return binary;
};

export default useIPFSCat;
