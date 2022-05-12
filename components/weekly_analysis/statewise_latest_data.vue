<template>
	<div class="grid grid-cols-3 flex justify-left">
		<div>
			<v-chart class="chart" :key="random" :option="option" />
		</div>
		<div>
			<v-chart class="chart" :key="random" :option="option1" />
		</div>
		<div class="pl-6 mx-2">
			<v-chart class="chart1" :key="random" :option="option2" />
		</div>
	</div>
</template>

<script>
import { map } from 'lodash'
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
		scale: [],
		scale1: [],
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
				right: '10.2%',
				bottom: '18%',
				containLabel: true,
			},
			emphasis: {
				disabled: true,
			},
			xAxis: [
				{
					type: 'category',
					axisLabel: { interval: 0, rotate: 60 },
					// data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
					data: [],
					axisLine: {onZero: false}
				},
			],
			yAxis: [
				{
					type: 'value',
					max: 4000,
					splitLine:{ show: false }
				},
			],
			series: [
				{
					name: '',
					type: 'bar',
					label: {
						show: true,
						rotate: 90,
						position: 'top-center',
					},
					// data: [320, 332, 301, 334, 390, 330, 320],
					data: [],
					color: "#48D1CC"
				},
			],
		},
		option1: {
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'shadow',
				},
			},
			legend: {},
			grid: {
				left: '10%',
				right: '10%',
				bottom: '20.2%',
				containLabel: true,
			},
			emphasis: {
				disabled: true,
			},
			xAxis: [
				{
					type: 'category',
					axisLabel: { interval: 0, rotate: 60 },
					// data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
					data: [],
				},
			],
			yAxis: [
				{
					type: 'value',
					show: false,
				},
			],
			series: [
				{
					name: '',
					type: 'bar',
					label: {
						show: true,
						rotate: 90,
						position: 'top-center',
					},
					// data: [320, 332, 301, 334, 390, 330, 320],
					data: [],
					color: "rgb(255,215,0)"
				},
			],
		},
		option2: {
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'shadow',
				},
			},
			emphasis: {
				disabled: true,
			},
			legend: {},
			grid: {
				left: '7.2%',
				right: '5%',
				bottom: '23.1%',
				containLabel: true,
			},
			xAxis: [
				{
					type: 'category',
					axisLabel: { interval: 0, rotate: 60 },
					// data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
					data: [],
				},
			],
			yAxis: [
				{
					type: 'value',
					show: false,
					max: 4000,
				},
			],
			series: [
				{
					name: '',
					type: 'bar',
					label: {
						show: true,
						// rotate: 90,
						position: 'top',
					},
					itemStyle: {
						// borderColor: 'transparent',
						// color: 'green',
					},
					// data: [320, 332, 301, 334, 390, 330, 320],
					data: [],
					color: "#FFA500"
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
		const response = await this.$axios.$get(`http://localhost:8088/api/stateslastthreemonths/`)
		this.option.series[0].name = Object.keys(response)[0]
		let temp = map(Object.values(response)[0], (d) => ({
			name: d.division.slice(0, 17),
			value: d.strain__count,
		}))
		this.option.xAxis[0].data = temp.map((d) => d.name)
		this.option.series[0].data = temp.map((d) => d.value)
		this.scale.push(this.option.series[0].data[0])
		this.random = Math.random()
		this.chart_loader = false

		this.option1.series[0].name = Object.keys(response)[1]
		let temp1 = map(Object.values(response)[1], (d) => ({
			name: d.division.slice(0, 17),
			value: d.strain__count,
		}))
		this.option1.xAxis[0].data = temp1.map((d) => d.name)
		this.option1.series[0].data = temp1.map((d) => d.value)
		this.scale.push(this.option1.series[0].data[0])
		this.random = Math.random()

		this.option2.series[0].name = Object.keys(response)[2]
		let temp2 = map(Object.values(response)[2], (d) => ({
			name: d.division.slice(0, 17),
			value: d.strain__count,
		}))
		this.option2.xAxis[0].data = temp2.map((d) => d.name)
		this.option2.series[0].data = temp2.map((d) => d.value)
		this.scale.push(this.option2.series[0].data[0])
		console.log(typeof this.scale.slice(0, 3))
		this.scale1 = this.scale.slice(0, 3)
		console.log('max', this.option2.series[0].data)
		this.random = Math.random()
	},
}
</script>

<style scoped>
.chart {
	height: 500px;
	width: 780px;
}
.chart1 {
	height: 492px;
	width: 550px;
}
</style>
