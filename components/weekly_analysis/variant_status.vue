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
			title: {
				text: 'Variant status of INSACOG samples',
				// fontSize: '5px'
				fontFamily: 'serif',
				fontWeight: 'bold',
			},
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'shadow',
				},
			},
			emphasis: {
				disabled: true
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
					axisLabel: { interval: 0, rotate: 90 },
				},
			],
			yAxis: [
				{
					type: 'value',
					max: 100,
					axisLine: {onZero: false}
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
		const response = await this.$axios.$get(`http://localhost:8088/api/variant_status/`)
		this.option.xAxis[0].data = response.collection_week.collection_week
		let s = map(response.who_label, (d) => ({
			name: d.who_label,
			type: 'bar',
			stack: true,
			align: 'top',
			overflow: 'break',
			emphasis: {
				focus: 'series',
			},
			// if (d.value) {},
			label: {
				show: false,
				// rotate: 60,
				formatter: (params) => {
					return params.data ? `${params.data}` : ''
				},
			},
			data: d.value1,
			colorBy: "series"
		}))
		this.option.series = s
		this.random = Math.random()
		this.chart_loader = false
	},
}
</script>

<style scoped>
.chart {
	height: 400px;
}
</style>
