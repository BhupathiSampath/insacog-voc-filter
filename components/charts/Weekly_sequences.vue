<template>
	<div>
		<div class="grid grid-cols-2 md:w-2/1 md:grid-cols-2 xl:grid-cols-2 gap-4 mt-4 flex justify-right">
			<div class="flex items-center m-2 cursor-pointer cm-toggle-wrapper">
				<span class="font-semibold text-xs mr-1"> Area chart </span>
				<div
					@click="toggleCheckbox"
					class="rounded-full w-8 h-4 p-0.5 bg-gray-300"
					:class="{ 'bg-gray-600': active == false, 'bg-green-500': active == true }"
				>
					<div
						class="rounded-full w-3 h-3 bg-white transform mx-auto duration-300 ease-in-out"
						:class="{ '-translate-x-2': active == false, 'translate-x-2': active == true }"
					></div>
				</div>
				<span class="font-semibold text-xs ml-1"> Bar chart </span>
			</div>
			<div class="flex justify-end m-2 cursor-pointer cm-toggle-wrapper">
				<span class="font-semibold text-xs mr-1"> Weekly </span>
				<div
					@click="chartsdata"
					class="rounded-full w-8 h-4 p-0.5 bg-gray-300"
					:class="{ 'bg-gray-600': active1 == false, 'bg-green-500': active1 == true }"
				>
					<div
						class="rounded-full w-3 h-3 bg-white transform mx-auto duration-300 ease-in-out"
						:class="{ '-translate-x-2': active1 == false, 'translate-x-2': active1 == true }"
					></div>
				</div>
				<span class="font-semibold text-xs ml-1"> Monthly </span>
			</div>
		</div>
		<v-chart
			class="chart"
			:loading="chart_loader"
			:loading-options="loader_option"
			:key="random"
			:option="option"
		/>
	</div>
</template>

<script>
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
		active: false,
		active1: false,
		variable: 'bar',
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
			},
			grid: {
				left: '0%',
				right: '0%',
				bottom: '0%',
				containLabel: true,
			},
			// title: {
			// 	left: 'center',
			// 	text: 'Sequence distribution based on timline',
			// },
			toolbox: {
				feature: {
					dataZoom: {
						yAxisIndex: 'none',
					},
					restore: {},
					saveAsImage: {},
				},
			},
			xAxis: {
				type: 'category',
				// boundaryGap: false,
				data: [],
				axisTick: {
					alignWithLabel: true,
				},
			},
			yAxis: {
				type: 'value',
			},
			// dataZoom: [
			// 	{
			// 		type: 'inside',
			// 		start: 0,
			// 		end: 20
			// 	},
			// 	{
			// 		start: 0,
			// 		end: 20
			// 	}
			// ],
			series: [
				{
					name: 'Sequences',
					type: 'line',
					smooth: true,
					symbol: 'none',
					areaStyle: {},
					data: [],
				},
			],
		},
	}),
	methods: {
		toggleCheckbox() {
			this.active = !this.active
			this.option.series[0].type = this.active ? 'bar' : 'line'
		},
		chartsdata() {
			this.active1 = !this.active1
			if (this.active1 == false) {
				if (Object.keys(this.chartdata).length > 0) {
					let temp = this.chartdata.map((d) => ({
						name: d.week_number,
						value: d.strain__count,
					}))
					this.option.xAxis.data = temp.map((d) => d.name)
					this.option.series[0].data = temp.map((d) => d.value)
					this.random = Math.random()
					this.chart_loader = false
				}
			} else {
				if (Object.keys(this.chartdata1).length > 0) {
					let temp = this.chartdata1.map((d) => ({
						name: d.month_number,
						value: d.strain__count,
					}))
					this.option.xAxis.data = temp.map((d) => d.name)
					this.option.series[0].data = temp.map((d) => d.value)
					this.random = Math.random()
					this.chart_loader = false
				}
			}
			console.log(this.active1)
		},
	},
	components: {
		VChart,
	},
	provide: {
		[THEME_KEY]: 'light',
	},
	watch: {
		chartdata(value) {
			let temp = value.map((d) => ({
				name: d.week_number,
				value: d.strain__count,
			}))
			this.option.xAxis.data = temp.map((d) => d.name)
			this.option.series[0].data = temp.map((d) => d.value)
			this.random = Math.random()
			this.chart_loader = false
		},
	},
	computed: {
		...mapFields('base', [
			'weekly_sequence.chartdata',
			'weekly_sequence.loaded',
			'monthly_sequence.chartdata1',
			'monthly_sequence.loaded1',
		]),
	},
	mounted() {
		this.$nextTick(() => {
			if (this.active1 == false) {
				if (Object.keys(this.chartdata).length > 0) {
					// FuncationCall(this.chartdata)
					let temp = this.chartdata.map((d) => ({
						name: d.week_number,
						value: d.strain__count,
					}))
					this.option.xAxis.data = temp.map((d) => d.name)
					this.option.series[0].data = temp.map((d) => d.value)
					this.random = Math.random()
					this.chart_loader = false
				}
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
