<template>
	<div>
		<v-chart class="chart" :loading-options="loader_option" :key="random" :option="option" />
	</div>
</template>

<script>
import { use } from 'echarts/core'
import { mapFields } from 'vuex-map-fields'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart, LineChart } from 'echarts/charts'
import {
	ToolboxComponent,
	TitleComponent,
	TooltipComponent,
	LegendComponent,
	GridComponent,
} from 'echarts/components'
import VChart, { THEME_KEY } from 'vue-echarts'

use([
	ToolboxComponent,
	CanvasRenderer,
	BarChart,
	LineChart,
	TitleComponent,
	TooltipComponent,
	LegendComponent,
	GridComponent,
])

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
		option: {
			title: {
				text: 'Sequences in previous months',
				// fontSize: '5px'
				fontFamily: 'serif',
				fontWeight: 'bold',
				top: '10%'
			},
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'shadow',
				},
			},
			legend: {},
			grid: {
				top: '20%',
				bottom: '15%',
				containLabel: true,
			},
			xAxis: [
				{
					type: 'category',
					// axisLabel: { interval: 0, rotate: 60 },
					// data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
					data: [],
				},
			],
			yAxis: [
				{
					type: 'value',
				},
			],
			series: [
				{
					name: '',
					type: 'bar',
					label: {
						show: true,
					},
					data: [],
					colorBy: "data"
					
				},
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
		const response = await this.$axios.$get(`http://localhost:8088/api/last_four_month/`)
		console.log("colors",this.option.series[0])
		// console.log(response)
		let temp = response.map((d) => ({
			name: d.collection_month,
			value: d.strain__count,
		}))
		this.option.xAxis[0].data = temp.map((d) => d.name)
		this.option.series[0].data = temp.map((d) => d.value)
		this.random = Math.random()
		this.chart_loader = false
	},
}
</script>

<style scoped>
.chart {
	height: 450px;
	width: 400px;
}
</style>

<!-- series: [
				{
					type: 'bar',
					label: {
						show: true,
						position: 'top',
					},
					data: [
						{
							value: 120,
							itemStyle: { color: 'blue' },
						},
						{
							value: 200,
							itemStyle: { color: 'red' },
						},
						{
							value: 150,
							itemStyle: { color: 'green' },
						},
					],
				},
			], -->
