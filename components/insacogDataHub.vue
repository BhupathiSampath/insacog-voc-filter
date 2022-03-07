<template>
	<div>
		<div
			class="relative flex justify-center items-center w-full border-b-2 border-gray-300 my-20 mt-6 mb-6"
		>
			<h1 class="absolute bg-gray-100 px-2 text-xl font-semibold">INSACOG DataHub Stats</h1>
		</div>

		<div
			v-if="datahub_loaded"
			class="grid grid-cols-7 divide-x-2 divide-slate-400 p-2 mb-2 text-center divide-dashed text-sm"
		>
			<div class="p-4 text-gray-400 bg-white rounded-l-md drop-shadow-md">
				<h2 class="text-base font-medium">Last updated</h2>
				<p>
					{{
						$dayjs(datahub_stats.last_updated).format(
							'DD-MM-YYYY hh:mm A',
						)
					}}
				</p>
			</div>
			<div class="p-4 text-gray-400 bg-white drop-shadow-lg">
				<h2 class="text-base font-medium">{{ datahub_stats.nextclade_version.split(':')[0] }}</h2>
				<p>{{ datahub_stats.nextclade_version.split(':')[1] }}</p>
			</div>
			<div class="p-4 text-gray-400 bg-white drop-shadow-lg">
				<h2
					class="text-base font-medium"
				>{{ datahub_stats.pango_designation_version.split(':')[0] }}</h2>
				<p>{{ datahub_stats.pango_designation_version.split(':')[1] }}</p>
			</div>
			<div class="p-4 text-gray-400 bg-white drop-shadow-lg">
				<h2 class="text-base font-medium">{{ datahub_stats.pangolearn_version.split(':')[0] }}</h2>
				<p>{{ datahub_stats.pangolearn_version.split(':')[1] }}</p>
			</div>
			<div class="p-4 text-gray-400 bg-white drop-shadow-lg">
				<h2
					class="text-base font-medium"
				>{{ datahub_stats.constellation_version.split(':')[0] }}</h2>
				<p>{{ datahub_stats.constellation_version.split(':')[1] }}</p>
			</div>
			<div class="p-4 text-gray-400 bg-white drop-shadow-lg">
				<h2 class="text-base font-medium">{{ datahub_stats.pangolin_version.split(':')[0] }}</h2>
				<p>{{ datahub_stats.pangolin_version.split(':')[1] }}</p>
			</div>
			<div class="p-4 text-gray-400 bg-white rounded-r-md drop-shadow-md">
				<h2 class="text-base font-medium">Genomes sequenced</h2>
				<animated-number
					:duration="1000"
					:formatValue="formatnumber"
					:value="uniqueSequences.count"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import AnimatedNumber from 'animated-number-vue'

export default {
	data: () => ({
	}),
	components: { AnimatedNumber },
	computed: {
		...mapFields('base', [
			'datahub_stats',
			'datahub_loaded',
			'uniqueSequences',
			'uniqueSequences_loaded',
		]),
	},
	methods: {
		formatnumber(value) {
			return value.toLocaleString('en-IN')
		},
	},
	mounted() {
		this.$nextTick(() => { })
	},
}
</script>

<style scoped></style>
