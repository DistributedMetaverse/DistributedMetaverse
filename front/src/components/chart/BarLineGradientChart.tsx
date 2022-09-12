import React, { FC } from 'react';
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts';

const BarLineGradientChart: FC = (): JSX.Element => {
	const category = [];
	let dottedBase = +new Date();
	const lineData = [];
	const barData = [];

	//Array of names for legend in {options}
	for (let i = 0; i < 20; i++) {
		const date = new Date((dottedBase += 3600 * 24 * 1000));
		category.push(
			[date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-')
		);
		const b = Math.random() * 200;
		const d = Math.random() * 200;
		barData.push(b); // → Block ID
		lineData.push(b + d); // → Transaction ID
	}

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
			data: ['transaction', 'block'],
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
				name: 'transaction',
				type: 'line',
				smooth: true,
				showAllSymbol: true,
				symbol: 'emptyCircle',
				symbolSize: 15,
				data: lineData,
			},
			{
				name: 'block',
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
