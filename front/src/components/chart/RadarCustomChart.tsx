import React, { FC } from 'react';
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts';

const RadarCustomChart: FC = (): JSX.Element => {
	//Chart style
	const style = {
		height: '70vh',
		width: '100%',
	};

	//Chart options
	const option = {
		color: ['#56A3F1', '#FF917C'],
		title: {
			text: 'User Resource',
			left: 'center',
			top: 0,
			textStyle: {
				color: '#ccc',
			},
		},
		legend: {
			y: '25px',
			textStyle: {
				color: '#fff',
			},
		},
		radar: {
			indicator: [
				{ text: 'Indicator1', max: 150 },
				{ text: 'Indicator2', max: 150 },
				{ text: 'Indicator3', max: 150 },
				{ text: 'Indicator4', max: 120 },
				{ text: 'Indicator5', max: 108 },
				{ text: 'Indicator6', max: 72 },
			],
			radius: 120,
			axisName: {
				color: '#fff',
				backgroundColor: '#666',
				borderRadius: 3,
				padding: [3, 5],
			},
		},
		series: [
			{
				type: 'radar',
				data: [
					{
						value: [120, 118, 130, 100, 99, 70],
						name: 'All User',
						symbol: 'rect',
						symbolSize: 12,
						lineStyle: {
							type: 'dashed',
						},
						label: {
							show: true,
							formatter: function (params: any) {
								return params.value as string;
							},
						},
					},
					{
						value: [100, 93, 50, 90, 70, 60],
						name: 'My',
						areaStyle: {
							color: new echarts.graphic.RadialGradient(0.1, 0.6, 1, [
								{
									color: 'rgba(255, 145, 124, 0.1)',
									offset: 0,
								},
								{
									color: 'rgba(255, 145, 124, 0.9)',
									offset: 1,
								},
							]),
						},
					},
				],
			},
		],
	};

	return <ReactEcharts option={option} style={style} />;
};

export default RadarCustomChart;
