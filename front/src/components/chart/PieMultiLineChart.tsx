import React, { FC } from 'react';
import ReactEcharts from 'echarts-for-react';

const PieMultiLineChart: FC = (): JSX.Element => {
	const data = [
		{
			value: 600.58,
			name: 'Data Point 1',
			itemStyle: {
				normal: {
					color: '#f845f1',
				},
			},
		},
		{
			value: 1100.58,
			name: 'Data Point 2',
			itemStyle: {
				normal: {
					color: '#ad46f3',
				},
			},
		},
		{
			value: 1200.58,
			name: 'Data Point 3',
			itemStyle: {
				normal: {
					color: '#5045f6',
				},
			},
		},
		{
			value: 1300.58,
			name: 'Data Point 4',
			itemStyle: {
				normal: {
					color: '#4777f5',
				},
			},
		},
		{
			value: 1400.58,
			name: 'Data Point 5',
			itemStyle: {
				normal: {
					color: '#44aff0',
				},
			},
		},
		{
			value: 1500.58,
			name: 'Data Point 6',
			itemStyle: {
				normal: {
					color: '#45dbf7',
				},
			},
		},
		{
			value: 1500.58,
			name: 'Data Point 7',
			itemStyle: {
				normal: {
					color: '#f6d54a',
				},
			},
		},
		{
			value: 1600.58,
			name: 'Data Point 8',
			itemStyle: {
				normal: {
					color: '#f69846',
				},
			},
		},
		{
			value: 1800,
			name: 'Data Point 9',
			itemStyle: {
				normal: {
					color: '#ff4343',
				},
			},
		},
	];

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
