import React, { FC } from 'react';
import ReactEcharts from 'echarts-for-react';
import { CategoryData } from '../../services/types';

interface PieMultiLineChartProps {
	datas: Array<CategoryData>;
}

const PieMultiLineChart: FC<PieMultiLineChartProps> = ({
	datas,
}): JSX.Element => {
	const data: Array<{ name: string; value: number }> = [];

	//Array of names for legend in {options}
	datas.map((category: CategoryData) => {
		data.push({ name: category.fileType, value: category.count });
	});

	//Array of names for legend in {options}
	const dataNames = data.map((i) => i.name);

	//Chart style
	const style = {
		height: '80vh',
		width: '100%',
	};

	//Chart options
	const option = {
		backgroundColor: 'rgb(38, 38, 46)', // background.paper : #26262E
		// Hover Tooltip
		// {a} = series:[{name:}]
		// {b} = series:[{data: [{name:}]}]
		// {c} = series:[{data: [{value:}]
		tooltip: {
			trigger: 'item',
			formatter: '{a}<br/><strong>{b}</strong>: {c} 건',
		},
		title: {
			text: 'File Category',
			left: 'center',
			top: 20,
			textStyle: {
				color: '#ccc',
			},
		},
		calculable: true,
		legend: {
			icon: 'circle',
			x: 'center',
			y: '50px',
			data: dataNames,
			textStyle: {
				color: '#fff',
			},
		},
		series: [
			{
				name: 'File Type',
				type: 'pie',
				animationDuration: 2000,
				animationEasing: 'quarticInOut',
				radius: [10, 150],
				avoidLabelOverlap: false,
				startAngle: 90,
				hoverOffset: 5,
				center: ['50%', '50%'],
				roseType: 'area',
				selectedMode: 'multiple',
				label: {
					normal: {
						show: true,
						formatter: '{c} 건', // {c} data: [{value:},]
					},
					emphasis: {
						show: true,
					},
				},
				labelLine: {
					normal: {
						show: true,
						smooth: false,
						length: 20,
						length2: 10,
					},
					emphasis: {
						show: true,
					},
				},
				data: data,
			},
		],
	};

	return <ReactEcharts option={option} style={style} />;
};

export default PieMultiLineChart;
