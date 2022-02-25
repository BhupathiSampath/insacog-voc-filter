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
			// title: {
			// 	text: 'Lineage classification weekly basis',
			// 	top: 'top',
			// },
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'shadow',
				},
			},
			legend: {},
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
				},
			],
			yAxis: [
				{
					type: 'value',
				},
			],
			series: [],
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
			this.option.xAxis[0].data = value.month.month_number
			let s = map(value.lineage, (d) => ({
				name: d.lineage,
				type: 'bar',
				stack: 'Ad',
				emphasis: {
					focus: 'series',
				},
				data: d.value,
			}))
			this.option.series = s
			this.random = Math.random()
			this.chart_loader = false
		},
	},
	computed: {
		...mapFields('base', [
			'monthly_lineage.chartdata',
			'monthly_lineage.loaded',
		]),
	},
	mounted() {
		this.$nextTick(() => {
			if (Object.keys(this.chartdata).length > 0) {
				this.option.xAxis[0].data = this.chartdata.month.month_number
				let s = map(this.chartdata.lineage, (d) => ({
					name: d.lineage,
					type: 'bar',
					stack: 'Ad',
					emphasis: {
						focus: 'series',
					},
					data: d.value,
				}))
				this.option.series = s
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
