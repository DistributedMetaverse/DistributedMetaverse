import React, { FC } from 'react';
import ReactEcharts from 'echarts-for-react';
import { DailyData } from '../../services/types';

interface LineGradientChartProps {
	datas: Array<DailyData>;
}

const LineGradientChart: FC<LineGradientChartProps> = ({
	datas,
}): JSX.Element => {
	const category: Array<string> = [];
	const lineData: Array<number> = [];

	//Array of names for legend in {options}
	datas.map((data: DailyData) => {
		category.push(data.date);
		lineData.push(data.count);
	});

	//Chart style
	const style = {
		height: '70vh',
		width: '100%',
	};

	//Chart options
	const option = {
		title: {
			text: 'File Share Distribution',
			left: 'center',
			top: 0,
			textStyle: {
				color: '#ccc',
			},
		},
		backgroundColor: 'rgb(38, 38, 46)', // background.paper : #26262E
		xAxis: [
			{
				show: true,
				data: category,
				axisLabel: {
					textStyle: {
						color: '#ccc',
					},
				},
			},
			{
				show: false,
				data: category,
			},
		],
		tooltip: {},
		visualMap: {
			show: false,
			min: 0,
			max: 50,
			dimension: 0,
			inRange: {
				color: [
					'#4a657a',
					'#308e92',
					'#b1cfa5',
					'#f5d69f',
					'#f5898b',
					'#ef5055',
				],
			},
		},
		yAxis: {
			axisLine: {
				show: false,
			},
			axisLabel: {
				textStyle: {
					color: '#ccc',
				},
			},
			splitLine: {
				show: true,
				lineStyle: {
					color: '#08263f',
				},
			},
			axisTick: {
				show: false,
			},
		},
		series: [
			{
				name: 'Simulate Shadow',
				type: 'line',
				data: lineData,
				z: 2,
				showSymbol: false,
				animationDelay: 0,
				animationEasing: 'linear',
				animationDuration: 1200,
				lineStyle: {
					normal: {
						color: 'transparent',
					},
				},
				areaStyle: {
					normal: {
						color: '#08263a',
						shadowBlur: 50,
						shadowColor: '#000',
					},
				},
			},
			{
				name: 'File Count',
				type: 'bar',
				data: lineData,
				xAxisIndex: 1,
				z: 3,
				itemStyle: {
					normal: {
						barBorderRadius: 5,
					},
				},
			},
		],
		animationEasing: 'elasticOut',
		animationEasingUpdate: 'elasticOut',
	};

	return <ReactEcharts option={option} style={style} />;
};

export default LineGradientChart;
