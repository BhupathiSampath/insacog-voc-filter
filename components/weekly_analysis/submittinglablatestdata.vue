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
const countryColors = {
	NII: '#00008b',
	NIV: '#f00',
	RMRCDBRG: '#ffde00',
	Cuba: '#002a8f',
	DRDE: '#003580',
	ILS: '#ed2939',
	NEERI: '#000',
	IMTECH: '#003897',
	SPHLMAS: '#f93',
	IGIMS: '#bc002d',
	SMSMC: '#024fa2',
	ILBS: '#000',
	NCDC: '#00247d',
	NCL: '#ef2b2d',
	IBSD: '#dc143c',
	NIBMG: '#d52b1e',
	KIMS: '#e30a17',
	NCCS: '#00247d',
	NBRI: '#b22234',

	CDRI: '#00008b',
	InSTEM: '#f00',
	MDU: '#ffde00',
	MRUIMS: '#002a8f',
	KGMU: '#003580',
	CDFD: '#ed2939',
	CCMB: '#000',
	GMCPTA: '#003897',
	RGCB: '#f93',
	IICB: '#bc002d',
	PI: '#024fa2',
	SAIMSPGI: '#000',
	KHID: '#00247d',
	THSTI: '#ef2b2d',
	GBRC: '#dc143c',
	AIIMS: '#d52b1e',
	GDMC: '#e30a17',
	NIMHANS: '#00247d',
	IGIB: '#b22234',

	NEIST: '#00247d',
	CBRIISc: '#b22234',
}
export default {
	countryColors: {
		NII: '#00008b',
		NIV: '#f00',
		RMRCDBRG: '#ffde00',
		Cuba: '#002a8f',
		DRDE: '#003580',
		ILS: '#ed2939',
		NEERI: '#000',
		IMTECH: '#003897',
		SPHLMAS: '#f93',
		IGIMS: '#bc002d',
		SMSMC: '#024fa2',
		ILBS: '#000',
		NCDC: '#00247d',
		NCL: '#ef2b2d',
		IBSD: '#dc143c',
		NIBMG: '#d52b1e',
		KIMS: '#e30a17',
		NCCS: '#00247d',
		NBRI: '#b22234',

		CDRI: '#00008b',
		InSTEM: '#f00',
		MDU: '#ffde00',
		MRUIMS: '#002a8f',
		KGMU: '#003580',
		CDFD: '#ed2939',
		CCMB: '#000',
		GMCPTA: '#003897',
		RGCB: '#f93',
		IICB: '#bc002d',
		PI: '#024fa2',
		SAIMSPGI: '#000',
		KHID: '#00247d',
		THSTI: '#ef2b2d',
		GBRC: '#dc143c',
		AIIMS: '#d52b1e',
		GDMC: '#e30a17',
		NIMHANS: '#00247d',
		IGIB: '#b22234',

		NEIST: '#00247d',
		CBRIISc: '#b22234',
	},
	data: () => ({
		random: Math.random(),
		d: [],
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
			// 	text: 'Total analysed sequences (NIBMG datahub + NIV-GISAID)',
			// 	fontFamily: 'serif',
			// 	fontWeight: 'bold',
			// 	// top: '5%',
			// 	right: true
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
			},
			grid: {
				left: '0%',
				right: '11%',
				bottom: '15.5%',
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
					maxInterval: 4000,
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
			legend: {
			},
			grid: {
				left: '5%',
				right: '0%',
				bottom: '17%',
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
					max: 4000,
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
			legend: {
			},
			grid: {
				left: '15%',
				right: '0%',
				bottom: '19%',
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
					// data: [],
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
						// align: 'top',
						position: 'top',
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
		const response = await this.$axios.$get(`http://localhost:8088/api/submittinglab/`)
		// console.log('Check response',response)
		// map(response, (val, key) => {
		// 	console.log('Values', val)
		// 	console.log('Index', key)
		// 	this.option.xAxis[0].data = map(val, (d) => d.submitting_lab)
		// 	this.option.series[0].data = map(val, (d) => d.strain__count)

		// this.option1.xAxis[0].data = map(val, (d) => d.submitting_lab)
		// this.option1.series[0].data = map(val, (d) => d.strain__count)
		// 	console.log('Some name', map(val, (d) => d.submitting_lab), map(val, (d) => d.strain__count))
		// })
		// console.log('colors',this.option.countryColors[param.value[3]])
		this.option.series[0].name = Object.keys(response)[0]
		let temp = map(Object.values(response)[0], (d) => ({
			name: d.submitting_lab,
			value: d.strain__count,
			// value: {"value": d.strain__count, itemStyle: { color: 'green' }},
		}))
		this.option.xAxis[0].data = temp.map((d) => d.name)
		this.option.series[0].data = temp.map((d) => d.value)
		// this.d.push(temp.map((d) => d.value))
		// this.option.series[0].data = this.d
		// console.log(this.option.series[0].data)
		this.random = Math.random()
		this.chart_loader = false

		this.option1.series[0].name = Object.keys(response)[1]
		let temp1 = map(Object.values(response)[1], (d) => ({
			name: d.submitting_lab,
			value: d.strain__count,
		}))
		this.option1.xAxis[0].data = temp1.map((d) => d.name)
		this.option1.series[0].data = temp1.map((d) => d.value)
		console.log(this.option1.series[0].data)
		this.random = Math.random()

		this.option2.series[0].name = Object.keys(response)[2]
		let temp2 = map(Object.values(response)[2], (d) => ({
			name: d.submitting_lab,
			value: d.strain__count,
		}))
		this.option2.xAxis[0].data = temp2.map((d) => d.name)
		this.option2.series[0].data = temp2.map((d) => d.value)
		this.random = Math.random()
	},
}
</script>

<style scoped>
.chart {
	height: 450px;
	width: 580px;
	margin-right: '150px';
}
.chart1 {
	height: 444px;
	width: 400px;
}
</style>
