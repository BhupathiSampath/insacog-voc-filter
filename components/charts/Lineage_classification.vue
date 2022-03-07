<template>
	<v-chart
		class="chart"
		:loading="chart_loader"
		:loading-options="loader_option"
		:option="option"
	/>
</template>

<script>
import { use } from 'echarts/core'
import { mapFields } from 'vuex-map-fields'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart } from 'echarts/charts'
import {
	TitleComponent,
	TooltipComponent,
	LegendComponent,
} from 'echarts/components'
import VChart, { THEME_KEY } from 'vue-echarts'

use([
	CanvasRenderer,
	PieChart,
	TitleComponent,
	TooltipComponent,
	LegendComponent,
])

export default {
	data: () => ({
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
				trigger: 'item',
				formatter: '{a} <br/>{b} : {c} ({d}%)',
			},
			legend: {
				top: '5%',
				left: 'center',
			},
			series: [
				{
					name: 'Access From',
					type: 'pie',
					radius: ['40%', '70%'],
					avoidLabelOverlap: false,
					itemStyle: {
						borderRadius: 10,
						borderColor: 'rgb(245, 245, 245)',
						borderWidth: 2,
					},
					label: {
						show: false,
						position: 'center',
					},
					emphasis: {
						label: {
							show: true,
							fontSize: '40',
							fontWeight: 'bold',
						},
					},
					labelLine: {
						show: false,
					},
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
				name: d.Class,
				value: d.strain__count,
			}))
			// this.option.legend.data = temp.map((d) => d.name)
			this.option.series[0].data = temp
			this.chart_loader = false
		},
	},
	computed: {
		...mapFields('base', [
			'lineage_class.chartdata',
			'lineage_class.loaded',
		]),
	},
	mounted() {
		this.$nextTick(() => {
			if (Object.keys(this.chartdata).length > 0) {
				let temp = this.chartdata.map((d) => ({
					name: d.Class,
					value: d.strain__count,
				}))
				this.option.series[0].data = temp
				this.chart_loader = false
			}
		})
	},
}
</script>

<style scoped>
.chart {
	height: 400px;
}
</style>
