<template>
	<v-chart class="chart" :option="option" />
</template>

<script>
import { use } from 'echarts/core'
import { mapFields } from 'vuex-map-fields'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart } from 'echarts/charts'
import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import VChart, { THEME_KEY } from 'vue-echarts'

use([CanvasRenderer, PieChart, TitleComponent, TooltipComponent, LegendComponent])

export default {
	data: () => ({
		option: {
			title: {
				text: 'Traffic Sources',
				left: 'center',
			},
			tooltip: {
				trigger: 'item',
			},
			legend: {
				orient: 'vertical',
				left: 'left',
				data: [],
			},
			series: [
				{
					name: 'Traffic Sources',
					type: 'pie',
					radius: '55%',
					center: ['50%', '60%'],
					data: [],
					emphasis: {
						itemStyle: {
							shadowBlur: 10,
							shadowOffsetX: 0,
							shadowColor: 'rgba(0, 0, 0, 0.5)',
						},
					},
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
			let temp = value.map((d) => ({ name: d.Class, value: d.strain__count }))
			this.option.legend.data = temp.map((d) => d.name)
			this.option.series[0].data = temp
		},
	},
	computed: { ...mapFields('base', ['lineage_class.chartdata', 'lineage_class.loaded']) },
	mounted() {
		this.$nextTick(() => {})
	},
}
</script>

<style scoped>
.chart {
	height: 400px;
}
</style>
