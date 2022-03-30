<template>
	<div>
		<label for="toggle" class="text-xs text-gray-700">Area chart</label>
		<div class="relative inline-block w-12 mr-2 align-middle select-none transition duration-1000 ease-in">
			<input
				@click="toggleCheckbox"
				type="checkbox"
				name="toggle"
				id="toggle"
				class="toggle-checkbox absolute block w-8 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
			/>
			<label
				for="toggle"
				class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
			></label>
		</div>
		<label for="toggle" class="text-xs text-gray-700">Bar chart.</label>
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
import { BarChart } from 'echarts/charts'
import { TitleComponent, TooltipComponent, LegendComponent, GridComponent } from 'echarts/components'
import VChart, { THEME_KEY } from 'vue-echarts'

use([CanvasRenderer, BarChart, TitleComponent, TooltipComponent, LegendComponent, GridComponent])

export default {
	data: () => ({
		active: false,
		active1: true,
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
			title: {
				left: 'center',
				text: 'Sequence distribution weekly basis',
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
			let temp = value.map((d) => ({
				name: d.month_number,
				value: d.strain__count,
			}))
			this.option.xAxis.data = temp.map((d) => d.name)
			this.option.series[0].data = temp.map((d) => d.value)
			this.random = Math.random()
			this.chart_loader = false
		},
	},
	computed: {
		...mapFields('base', ['monthly_sequence.chartdata1', 'monthly_sequence.loaded1']),
	},
	mounted() {
		this.$nextTick(() => {
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
		})
	},
}
</script>

<style scoped>
.chart {
	height: 300px;
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
