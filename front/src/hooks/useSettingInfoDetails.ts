import { useEffect, useState, useCallback } from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { SettingInfo } from '../store/types';

interface FileInfoDetailsProps {
	setting: ActionCreatorsMapObject;
	serverId: number;
}

const useSettingInfoDetails = ({
	setting,
	serverId,
}: FileInfoDetailsProps): SettingInfo => {
	const [data, setData] = useState<SettingInfo>({
		id: 0,
		host: '',
		port: 0,
		size: 10000000,
		limit: 0,
	});

	const fetchAndSetData = useCallback(
		async (serverId: number) => {
			const data = await setting.info(serverId);
			setData(data);
		},
		[serverId]
	);

	useEffect(() => {
		fetchAndSetData(serverId);
	}, [fetchAndSetData]);

	return data;
};

export default useSettingInfoDetails;