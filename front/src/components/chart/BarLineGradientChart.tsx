import React, { FC } from 'react';
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts';
import { BlockData } from '../../services/types';

interface BarLineGradientChartProps {
	datas: Array<BlockData>;
}

const BarLineGradientChart: FC<BarLineGradientChartProps> = ({
	datas,
}): JSX.Element => {
	const category: Array<string> = [];
	const barData: Array<number> = [];
	const lineData: Array<number> = [];

	//Array of names for legend in {options}
	datas.map((data: BlockData) => {
		category.push(data.datetime.split(' ')[0]);
		barData.push(data.lastTransactionId);
		lineData.push(data.proof);
	});

	//Chart style
	const style = {
		height: '70vh',
		width: '100%',
	};

	//Chart options
	const option = {
		backgroundColor: 'rgb(38, 38, 46)', // background.paper : #26262E
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow',
			},
		},
		legend: {
			data: ['proof', 'lastTransactionId'],
			textStyle: {
				color: '#ccc',
			},
		},
		xAxis: {
			data: category,
			axisLine: {
				lineStyle: {
					color: '#ccc',
				},
			},
		},
		yAxis: {
			splitLine: { show: false },
			axisLine: {
				lineStyle: {
					color: '#ccc',
				},
			},
		},
		series: [
			{
				name: 'proof',
				type: 'line',
				smooth: true,
				showAllSymbol: true,
				symbol: 'emptyCircle',
				symbolSize: 15,
				data: lineData,
			},
			{
				name: 'lastTransactionId',
				type: 'bar',
				barWidth: 10,
				itemStyle: {
					borderRadius: 5,
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{ offset: 0, color: '#14c8d4' },
						{ offset: 1, color: '#43eec6' },
					]),
				},
				data: barData,
			},
			{
				name: 'line',
				type: 'bar',
				tooltip: {
					show: false,
				},
				barGap: '-100%',
				barWidth: 10,
				itemStyle: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{ offset: 0, color: 'rgba(20,200,212,0.5)' },
						{ offset: 0.2, color: 'rgba(20,200,212,0.2)' },
						{ offset: 1, color: 'rgba(20,200,212,0)' },
					]),
				},
				z: -12,
				data: lineData,
			},
			{
				name: 'dotted',
				type: 'pictorialBar',
				symbol: 'rect',
				tooltip: {
					show: false,
				},
				itemStyle: {
					color: '#0f375f',
				},
				symbolRepeat: true,
				symbolSize: [12, 4],
				symbolMargin: 1,
				z: -10,
				data: lineData,
			},
		],
	};

	return <ReactEcharts option={option} style={style} />;
};

export default BarLineGradientChart;
