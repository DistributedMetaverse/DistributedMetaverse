import { useEffect, useState, useCallback } from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { DataInfo } from '../store/types';

interface DataInfoDetailsProps {
	actions: ActionCreatorsMapObject;
	dataId: string;
}

const useDataInfoDetails = ({
	actions,
	dataId,
}: DataInfoDetailsProps): DataInfo => {
	const [data, setData] = useState<DataInfo>({
		id: 0,
		dataId: '',
		filename: '',
		fileSize: 0,
		createdAt: new Date(),
		isLike: false,
	});

	const fetchAndSetData = useCallback(
		async (dataId: string) => {
			const data = await actions.info(dataId);
			setData(data);
		},
		[dataId]
	);

	useEffect(() => {
		fetchAndSetData(dataId);
	}, [fetchAndSetData]);

	return data;
};

export default useDataInfoDetails;
