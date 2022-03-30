<template>
	<v-chart
		class="chart"
		:loading="chart_loader"
		:loading-options="loader_option"
		:key="random"
		:option="option"
		:height="400"
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
		option: {
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
					data: [],
					type: 'category',
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
		chartdata1(value) {
			this.option.xAxis[0].data = value.month_number.month_number
			let s = map(value.Class, (d) => ({
				name: d.Class,
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
		...mapFields('base', ['monthly_lineage_class.chartdata1', 'monthly_lineage_class.loaded1']),
	},
	mounted() {
		this.$nextTick(() => {
			if (Object.keys(this.chartdata1).length > 0) {
				this.option.xAxis[0].data = this.chartdata.month_number.month_number
				let s = map(this.chartdata1.Class, (d) => ({
					name: d.Class,
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
