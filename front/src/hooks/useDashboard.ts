import { useEffect, useState, useCallback } from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { CategoryData, DailyData, IndicatorData } from '../services/types';

interface DashboardProps {
	status: ActionCreatorsMapObject;
}

const useDashboard = ({
	status,
}: DashboardProps): [Array<CategoryData>, Array<DailyData>, IndicatorData] => {
	const [category, setCategory] = useState<Array<CategoryData>>([]);
	const [daliy, setDaliy] = useState<Array<DailyData>>([]);
	const [indicator, setIndicator] = useState<IndicatorData>({
		all: [],
		user: [],
	});

	const fetchAndSetData = useCallback(async () => {
		const categorylist = await status.category();
		const daliylist = await status.daliy();
		const indicatorinfo = await status.indicator();
		setCategory(categorylist);
		setDaliy(daliylist);
		setIndicator(indicatorinfo);
	}, []);

	useEffect(() => {
		fetchAndSetData();
	}, [fetchAndSetData]);

	return [category, daliy, indicator];
};

export default useDashboard;
