import React, { FC } from 'react';
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts';
import { IndicatorData } from '../../services/types';

interface RadarCustomChartProps {
	data: IndicatorData;
}

const RadarCustomChart: FC<RadarCustomChartProps> = ({ data }): JSX.Element => {
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
				{ text: 'text', max: 50 },
				{ text: 'image', max: 50 },
				{ text: 'audio', max: 50 },
				{ text: 'video', max: 50 },
				{ text: 'application', max: 50 },
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
						value: data.all,
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
						value: data.user,
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
