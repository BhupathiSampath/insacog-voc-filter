<template>
	<div>
		<v-chart
			class="chart"
			:loading="chart_loader"
			:loading-options="loader_option"
			:key="random5"
			:option="option5"
			:height="400"
		/>
		<v-chart
			class="chart"
			:loading="chart_loader"
			:loading-options="loader_option"
			:key="random4"
			:option="option4"
			:height="400"
		/>
		<div class="chart2">
			<v-chart
				class="chart"
				:loading="chart_loader"
				:loading-options="loader_option"
				:key="random3"
				:option="option3"
				:height="400"
			/>
			<v-chart
				class="chart"
				:loading="chart_loader"
				:loading-options="loader_option"
				:key="random2"
				:option="option2"
				:height="400"
			/>
		</div>
		<div class="chart1">
			<v-chart
				class="chart"
				:loading="chart_loader"
				:loading-options="loader_option"
				:key="random1"
				:option="option1"
				:height="400"
			/>
			<v-chart
				class="chart"
				:loading="chart_loader"
				:loading-options="loader_option"
				:key="random"
				:option="option"
				:height="400"
			/>
		</div>
	</div>
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
			// title: {
			// 	text: 'Variant status of INSACOG samples',
			// 	fontFamily: 'serif',
			// 	fontWeight: 'bold',
			// },
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
				show: false
			},
			grid: {
				top: 5,
				left: '1%',
				right: '0%',
				bottom: '10%',

				containLabel: true,
			},
			xAxis: [
				{
					data: [],
					type: 'category',
					// axisLabel: { interval: 0, rotate: 90 },
				},
			],
			yAxis: [
				{
					type: 'value',
					max: 100,
					axisLine: {onZero: false},
					name: "Central India",
					nameLocation: 'center',
					nameGap: 22,
					nameTextStyle: {
						verticalAlign: 'bottom'
					}
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
				show: false
			},
			grid: {
				top: '46%',
				left: '1%',
				right: '0%',
				bottom: '-30%',
				containLabel: true,
			},
			xAxis: [
				{
					data: [],
					type: 'category',
					// axisLabel: { interval: 0, rotate: 90 },
					show: false
				},
			],
			yAxis: [
				{
					type: 'value',
					max: 100,
					axisLine: {onZero: false},
					name: "East India",
					nameLocation: 'center',
					nameGap: 22,
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
		option2: {
			// title: {
			// 	text: 'Variant status of INSACOG samples',
			// 	fontFamily: 'serif',
			// 	fontWeight: 'bold',
			// },
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
				show: false
			},
			grid: {
				top: '5%',
				left: '1%',
				right: '0%',
				bottom: '10%',
				containLabel: true,
			},
			xAxis: [
				{
					data: [],
					type: 'category',
					// axisLabel: { interval: 0, rotate: 90 },
					show: false
				},
			],
			yAxis: [
				{
					type: 'value',
					max: 100,
					axisLine: {onZero: false},
					name: "North East India",
					nameLocation: 'center',
					nameGap: 22,
					nameTextStyle: {
						verticalAlign: 'bottom'
					}
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
		option3: {
			// title: {
			// 	text: 'Variant status of INSACOG samples',
			// 	fontFamily: 'serif',
			// 	fontWeight: 'bold',
			// },
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
				show: false
			},
			grid: {
				top: '40%',
				left: '1%',
				right: '0%',
				bottom: '-30%',
				containLabel: true,
			},
			xAxis: [
				{
					data: [],
					type: 'category',
					// axisLabel: { interval: 0, rotate: 90 },
					show: false
				},
			],
			yAxis: [
				{
					type: 'value',
					max: 100,
					axisLine: {onZero: false},
					name: "North India",
					nameLocation: 'center',
					nameGap: 22,
					nameTextStyle: {
						verticalAlign: 'bottom'
					}
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

		option4: {
			// title: {
			// 	text: 'Variant status of INSACOG samples',
			// 	fontFamily: 'serif',
			// 	fontWeight: 'bold',
			// },
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
				show: false
			},
			grid: {
				top: '5%',
				left: '1%',
				right: '0%',
				bottom: '10%',
				containLabel: true,
			},
			xAxis: [
				{
					data: [],
					type: 'category',
					// axisLabel: { interval: 0, rotate: 90 },
					show: false
				},
			],
			yAxis: [
				{
					type: 'value',
					max: 100,
					axisLine: {onZero: false},
					name: "South India",
					nameLocation: 'center',
					nameGap: 22,
					nameTextStyle: {
						verticalAlign: 'bottom'
					}
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
		option5: {
			title: {
				text: 'Region-wise variant status of INSACOG samples 2022',
				fontFamily: 'serif',
				fontWeight: 'bold',
				top: '15%',
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
				top: '15%',
				right: true
			},
			grid: {
				top: '40%',
				left: '1%',
				right: '0%',
				bottom: '-30%',
				containLabel: true,
			},
			xAxis: [
				{
					data: [],
					type: 'category',
					// axisLabel: { interval: 0, rotate: 90 },
					show: false
				},
			],
			yAxis: [
				{
					type: 'value',
					max: 100,
					axisLine: {onZero: false},
					name: "West India",
					nameLocation: 'center',
					nameGap: 22,
					nameTextStyle: {
						verticalAlign: 'bottom',
					}
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
		const response = await this.$axios.$get(`http://localhost:8088/api/regionwisedata2022/`)
		this.option.xAxis[0].data = response["North India"].collection_week.collection_week
		this.option1.xAxis[0].data = response["North India"].collection_week.collection_week
		let s = map(response["Central India"].who_label, (d) => ({
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
				// rotate: 90,
				formatter: (params) => {
					return params.data ? `${params.data}%` : ''
				},
			},
			data: d.value1,
		}))
		this.option.series = s
		this.random = Math.random()
		this.chart_loader = false


		let s1 = map(response["Central India"].who_label, (d) => ({
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
				// rotate: 90,
				formatter: (params) => {
					return params.data ? `${params.data}%` : ''
				},
			},
			data: d.value1,
		}))
		this.option1.series = s1
		this.random1 = Math.random()
		this.chart_loader = false


		this.option2.xAxis[0].data = response["North India"].collection_week.collection_week
		let s2 = map(response["North East India"].who_label, (d) => ({
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
				// rotate: 90,
				formatter: (params) => {
					return params.data ? `${params.data}%` : ''
				},
			},
			data: d.value1,
		}))
		this.option2.series = s2
		this.random2 = Math.random()
		this.chart_loader = false


		this.option3.xAxis[0].data = response["North India"].collection_week.collection_week
		let s3 = map(response["North India"].who_label, (d) => ({
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
				// rotate: 90,
				formatter: (params) => {
					return params.data ? `${params.data}%` : ''
				},
			},
			data: d.value1,
		}))
		this.option3.series = s3
		this.random3 = Math.random()
		this.chart_loader = false


		this.option4.xAxis[0].data = response["North India"].collection_week.collection_week
		let s4 = map(response["South India"].who_label, (d) => ({
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
				// rotate: 90,
				formatter: (params) => {
					return params.data ? `${params.data}%` : ''
				},
			},
			data: d.value1,
		}))
		this.option4.series = s4
		this.random4 = Math.random()
		this.chart_loader = false


		this.option5.xAxis[0].data = response["North India"].collection_week.collection_week
		let s5 = map(response["West India"].who_label, (d) => ({
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
				// rotate: 90,
				formatter: (params) => {
					return params.data ? `${params.data}%` : ''
				},
			},
			data: d.value1,
		}))
		this.option5.series = s5
		this.random5 = Math.random()
		this.chart_loader = false
	},
}
</script>

<style scoped>
.chart {
	height: 200px;
}
.chart1 {
        /*width: 200px;*/
        /*height: 200px;*/
        position: relative;
        margin-top: -162px;
    }
.chart2 {
        /*width: 200px;*/
        /*height: 200px;*/
        position: relative;
        margin-top: -155px;
    }
</style>
