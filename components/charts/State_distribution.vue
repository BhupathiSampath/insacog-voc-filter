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
import { mapFields } from 'vuex-map-fields'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart } from 'echarts/charts'
import {
	TitleComponent,
	TooltipComponent,
	LegendComponent,
	GridComponent,
} from 'echarts/components'
import VChart, { THEME_KEY } from 'vue-echarts'

use([
	CanvasRenderer,
	BarChart,
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
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'shadow',
				},
			},
			grid: {
				left: '0%',
				right: '0%',
				bottom: '0%',
				containLabel: true,
			},
			xAxis: [
				{
					type: 'category',
					data: [],
					axisTick: {
						alignWithLabel: true,
					},
				},
			],
			yAxis: [
				{
					type: 'value',
				},
			],
			series: [
				{
					name: 'Sequences',
					type: 'bar',
					barWidth: '60%',
					data: [],
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
	watch: {
		chartdata(value) {
			let temp = value.map((d) => ({
				name: d.state,
				value: d.strain__count,
			}))
			this.option.xAxis[0].data = temp.map((d) => d.name)
			this.option.series[0].data = temp.map((d) => d.value)
			this.random = Math.random()
			this.chart_loader = false
		},
	},
	computed: {
		...mapFields('base', [
			'state_distribution.chartdata',
			'state_distribution.loaded',
		]),
	},
	mounted() {
		this.$nextTick(() => {
			if (Object.keys(this.chartdata).length > 0) {
				let temp = this.chartdata.map((d) => ({
					name: d.state,
					value: d.strain__count,
				}))
				this.option.xAxis[0].data = temp.map((d) => d.name)
				this.option.series[0].data = temp.map((d) => d.value)
				this.random = Math.random()
				this.chart_loader = false
			}
		})
	},
}
</script>

<style scoped>
.chart {
	height: 300px;
}
</style>
