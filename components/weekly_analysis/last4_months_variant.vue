<template>
	<v-chart
		class="chart"
		:loading="chart_loader"
		:loading-options="loader_option"
		:key="random"
		:option="option"
	/>
</template>

<script>
import { map } from 'lodash'
import { use } from 'echarts/core'
import { BarChart } from 'echarts/charts'
import { mapFields } from 'vuex-map-fields'
import { CanvasRenderer } from 'echarts/renderers'
import { TitleComponent, TooltipComponent, LegendComponent, GridComponent } from 'echarts/components'
import VChart, { THEME_KEY } from 'vue-echarts'

use([CanvasRenderer, BarChart, TitleComponent, TooltipComponent, LegendComponent, GridComponent])

export default {
	data: () => ({
		random: Math.random(),
		chart_loader: true,
		loader_option: {
			lineWidth: 3,
			fontSize: 14,
			text: 'Loading',
			fontWeight: 500,
			color: '#c23531',
			maskColor: '#f6f8f9',
			fontFamily: 'Averta',
		},
		labelOption: {
			show: true,
			formatter: '{c}%',
		},
		option: {
			// title: {
			// 	text: 'Month-wise (Last 4 months) variant status',
			// 	// fontSize: '5px'
			// 	fontFamily: 'serif',
			// 	fontWeight: 'bold',
			// },
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'shadow',
				},
			},
			emphasis: {
				disabled: true,
			},
			legend: {
				top: 16
			},
			grid: {
				left: '0%',
				right: '10%',
				bottom: '1%',
				containLabel: true,
			},
			xAxis: [
				{
					data: [],
					type: 'category',
				},
			],
			yAxis: [
				{
					type: 'value',
					max: 100,
					axisLine: { onZero: false },
					// label: {
					// 	formatter: function () {
					// 		return (100 * value) / $(this.axis.tickPositions).last()[0] + '%'
					// 	},
					// },
					// name: '%',
					// axisLabel: {
					// 	formatter: '{value} %',
					// },
				},
			],
			series: [],
			color: [
				'#fcd5cf', 
				'#f5e8c8', 
				'#37A2DA', 
				'#c1d7a8', 
				'#f3d999', 
				'#b8d2c7',	
				'#d3758f',	
				'#a4d8c2',	
				'#fb7293',	
				'#C4D9E0',
				'#ac7293',
				'#2e4783',		
			],
		},
	}),
	components: {
		VChart,
	},
	provide: {
		[THEME_KEY]: 'light',
	},
	async created() {
		const response = await this.$axios.$get(`http://localhost:8088/api/last_four_month1/`)
		this.option.xAxis[0].data = response.collection_month.collection_month
		map(response.who_label, (d) => console.log('stateter', d.value1))
		let s = map(response.who_label, (d) => ({
			name: d.who_label,
			type: 'bar',
			stack: 'Ad',
			emphasis: {
				focus: 'series',
			},
			label: {
				show: true,
				padding: [3, 4, 5, 6],
				align: 'center',
				borderRadius: 10 ,
				fontFamily: 'sans-serif',
				borderDashOffset: 16 ,
				overflow: 'none',
				axisLabel: {
					hideOverlap: false,
				},
				formatter: (params) => {
					return params.data ? `${params.data}%` : ''
				},
			},
			data: d.value1,
		}))
		this.option.series = s
		this.random = Math.random()
		this.chart_loader = false
	},
}
</script>

<style scoped>
.chart {
	height: 420px;
	/*width: 400px;*/
}
</style>
