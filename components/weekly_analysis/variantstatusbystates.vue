<template>
	<div class="grid-cols-3 flex justify-right grid grid-flow-col">
		<div class="flex justify-right col-span-1">
			<v-chart class="chart" :key="random" :option="option" />
		</div>
		<div class="col-span-1">
			<v-chart class="chart1" :key="random" :option="option1" />
		</div>
	</div>
</template>

<script>
import { map } from 'lodash'
import { color, use } from 'echarts/core'
import { BarChart } from 'echarts/charts'
import { mapFields } from 'vuex-map-fields'
import { CanvasRenderer } from 'echarts/renderers'
import { TitleComponent, TooltipComponent, LegendComponent, GridComponent } from 'echarts/components'
import VChart, { THEME_KEY } from 'vue-echarts'

use([CanvasRenderer, BarChart, TitleComponent, TooltipComponent, LegendComponent, GridComponent])

export default {
	data: () => ({
		random: Math.random(),
		random1: Math.random(),
		random2: Math.random(),
		random3: Math.random(),
		random4: Math.random(),
		random5: Math.random(),
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
				text: 'Mar-2022',
				fontFamily: 'serif',
				fontWeight: 'bold',
				right: true,
				top: '5%'
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
			legend: {
			},
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
					axisLine: {onZero: false},
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
		option1: {
			title: {
				text: 'Apr-2022',
				fontFamily: 'serif',
				fontWeight: 'bold',
				left: true,
				top: '5%'
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
			legend: {
				data: ['Delta','Omicron','Others','Unassigned']
			},
			grid: {
				left: '0%',
				right: '0%',
				bottom: '0.8%',
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
					axisLine: {onZero: false},
					show: false
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
		const response = await this.$axios.$get(`http://localhost:8088/api/variantstatusbystates/`)
		this.option.xAxis[0].data = response["Mar-2022"].division.division
		this.option1.xAxis[0].data = response["Apr-2022"].division.division
		let s = map(response["Mar-2022"].who_label, (d) => ({
			name: d.who_label,
			type: 'bar',
			stack: true,
			align: 'top',
			overflow: 'break',
			emphasis: {
				focus: 'series',
			},
			label: {
				show: true,
				rotate: 60,
				formatter: (params) => {
					return params.data ? `${params.data}%` : ''
				},
			},
			data: d.value1,
			// colorBy: "series"
		}))
		this.option.series = s
		this.random = Math.random()
		this.chart_loader = false


		let s1 = map(response["Apr-2022"].who_label, (d) => ({
			name: d.who_label,
			type: 'bar',
			stack: true,
			align: 'top',
			overflow: 'break',
			emphasis: {
				focus: 'series',
			},
			label: {
				show: true,
				rotate: 60,
				formatter: (params) => {
					return params.data ? `${params.data}%` : ''
				},
			},
			data: d.value1,
			colorBy: "series"
		}))
		this.option1.series = s1
		this.random1 = Math.random()
		this.chart_loader = false
	},
}
</script>

<style scoped>
.chart {
	height: 500px;
	width: 780px;
}
.chart1 {
	height: 480px;
	width: 500px;
}
</style>
