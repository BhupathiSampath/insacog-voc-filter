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
		random: Math.random(),
		active: false,
		active1: false,
		variable1: 'line',
		limitationList: 10,

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
				borderColor: '#fff',
				transitionDuration: 0.1,
				axisPointer: {
					type: 'line',
					label: {
						show: false,
					},
				},
				textStyle: {
					fontFamily: 'Averta',
					fontWeight: 500,
				},
			},
			toolbox: {
				feature: {
					dataZoom: {
						yAxisIndex: 'none',
					},
					restore: {},
					saveAsImage: {},
				},
			},
			legend: {
				// top: 'top',
				// itemGap: 15,
				// itemWidth: 20,
				// left: 'left',
				// icon: 'roundRect',
				// itemHeight: 20,
				// textStyle: {
				// 	fontSize: 15,
				// 	fontWeight: 500,
				// 	fontFamily: 'Averta',
				// },
				data: [],
			},
			grid: {
				left: '0%',
				right: '0%',
				bottom: '0%',
				containLabel: true,
			},
			xAxis: {
				type: 'category',
				// boundaryGap: false,
				axisLabel: {
					fontSize: 12,
					fontWeight: 500,
					fontFamily: 'Averta',
				},
				data: [],
			},
			yAxis: {
				// max: 100,
				type: 'value',
				axisLabel: {
					fontSize: 12,
					fontWeight: 500,
					fontFamily: 'Averta',
				},
			},
			series: [],
		},
	}),
	methods: {
		toggleCheckbox() {
			this.active = !this.active
			this.variable1 = this.active ? 'bar' : 'line'
			// if (this.active1 = false) {
				if (Object.keys(this.chartdata1).length > 0) {
					this.option.xAxis.data = this.chartdata1.week_number.week_number
					let only_name = map(this.chartdata1.lineage, (d) => d.lineage)
					let s = map(this.chartdata1.lineage, (d) => ({
						stack: true,
						name: d.lineage,
						type: this.variable1,
						smooth: true,
						silent: true,
						data: d.value,
						showSymbol: false,
						label: { show: false },
						lineStyle: { width: 0 },
						areaStyle: { opacity: 1 },
					}))
					this.option.series = s
					console.log(this.option.series)
					this.option.legend.data = only_name
					this.random = Math.random()
					this.chart_loader = false
				}
			// }
			// else {
			// 	if (Object.keys(this.chartdata).length > 0) {
			// 		this.option.xAxis.data = this.chartdata.month_number.month_number
			// 		let only_name = map(this.chartdata.lineage, (d) => d.lineage)
			// 		let s = map(this.chartdata.lineage, (d) => ({
			// 			stack: true,
			// 			name: d.lineage,
			// 			type: this.variable1,
			// 			smooth: true,
			// 			silent: true,
			// 			data: d.value,
			// 			showSymbol: false,
			// 			label: { show: false },
			// 			lineStyle: { width: 0 },
			// 			areaStyle: { opacity: 1 },
			// 		}))
			// 		this.option.series = s
			// 		console.log(this.option.series)
			// 		this.option.legend.data = only_name
			// 		this.random = Math.random()
			// 		this.chart_loader = false
			// 	}
			// }
		},
		chartsdata() {
			this.active1 = !this.active1
			if (this.active1 == false) {
				if (Object.keys(this.chartdata1).length > 0) {
					this.option.xAxis.data = this.chartdata1.week_number.week_number
					let only_name = map(this.chartdata1.lineage, (d) => d.lineage)
					let s = map(this.chartdata1.lineage, (d) => ({
						stack: true,
						name: d.lineage,
						type: this.variable1,
						smooth: true,
						silent: true,
						data: d.value,
						showSymbol: false,
						label: { show: false },
						lineStyle: { width: 0 },
						areaStyle: { opacity: 1 },
					}))
					this.option.series = s
					console.log(this.option.series)
					this.option.legend.data = only_name
					this.random = Math.random()
					this.chart_loader = false
				}
			}
			else {
				if (Object.keys(this.chartdata).length > 0) {
					this.option.xAxis.data = this.chartdata.month_number.month_number
					let only_name = map(this.chartdata.lineage, (d) => d.lineage)
					let s = map(this.chartdata.lineage, (d) => ({
						stack: true,
						name: d.lineage,
						type: this.variable1,
						smooth: true,
						silent: true,
						data: d.value,
						showSymbol: false,
						label: { show: false },
						lineStyle: { width: 0 },
						areaStyle: { opacity: 1 },
					}))
					this.option.series = s
					console.log(this.option.series)
					this.option.legend.data = only_name
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
		chartdata1(value) {
			this.option.xAxis.data = value.week_number.week_number
			let only_name = map(value.lineage, (d) => d.lineage)
			let s = map(value.lineage, (d) => ({
				stack: true,
				name: d.lineage,
				type: this.variable1,
				smooth: true,
				silent: true,
				data: d.value,
				showSymbol: false,
				label: { show: false },
				lineStyle: { width: 0 },
				areaStyle: { opacity: 1 },
			}))
			this.option.series = s
			console.log(this.option.series)
			this.option.legend.data = only_name
			this.random = Math.random()
			this.chart_loader = false
		},
	},
	computed: {
		...mapFields('base', ['monthly_lineage.chartdata', 'monthly_lineage.loaded',
			'weekly_lineage.chartdata1', 'weekly_lineage.loaded1']),
	},
	mounted() {
		this.$nextTick(() => {
			if (this.active1 == false) {
				if (Object.keys(this.chartdata1).length > 0) {
					this.option.xAxis.data = this.chartdata1.week_number.week
					let only_name = map(this.chartdata1.lineage, (d) => d.lineage)
					let s = map(this.chartdata1.lineage, (d) => ({
						stack: true,
						name: d.lineage,
						type: this.variable1,
						smooth: true,
						silent: true,
						data: d.value,
						showSymbol: false,
						label: { show: false },
						lineStyle: { width: 0 },
						areaStyle: { opacity: 1 },
					}))
					this.option.series = s
					console.log(this.option.series)
					this.option.legend.data = only_name
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
.switch {
	position: relative;
	display: inline-block;
	width: 50px;
	height: 24px;
}

.switch input {
	display: none;
}

.slider {
	position: absolute;
	cursor: pointer;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: #66cdaa;
	-webkit-transition: 0.4s;
	transition: 0.4s;
}

.slider:before {
	position: absolute;
	content: '';
	height: 16px;
	width: 16px;
	left: 4px;
	bottom: 4px;
	background-color: Beige;
	-webkit-transition: 0.4s;
	transition: 0.4s;
}

input:checked + .slider {
	background-color: #008b8b;
}

input:focus + .slider {
	box-shadow: 0 0 1px #101010;
}

input:checked + .slider:before {
	-webkit-transform: translateX(26px);
	-ms-transform: translateX(26px);
	transform: translateX(26px);
}

.slider.round {
	border-radius: 34px;
}

.slider.round:before {
	border-radius: 50%;
}
.toggle-checkbox:checked {
	@apply: right-0 border-green-400;
	right: 0;
	border-color: #68d391;
}
.toggle-checkbox:checked + .toggle-label {
	@apply: bg-green-400;
	background-color: #68d391;
}
</style>
