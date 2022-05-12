<template>
	<div>
		<div class="grid grid-flow-col gap-3">
			<div class="flex justify-right col-span-1">
				<WeeklyAnalysisLastfourmonths />
			</div>
			<div class="col-span-3 pt-4">
				<h1 class="flex justify-center text-2xl font-bold font-serif">Total analysed sequences (NIBMG datahub + NIV-GISAID)</h1>
				<WeeklyAnalysisSubmittinglablatestdata />
			</div>
		</div>
		<h1 class="flex justify-center text-2xl font-bold font-serif">State-wise Sequences in Previous Months</h1>
		<WeeklyAnalysisStatewiseLatestData />
		<WeeklyAnalysisVariantStatus /><br><br>
		<div class="grid grid-cols-2">
			<div class="flex justify-right">
				<WeeklyAnalysisLast4MonthsVariant />
			</div>
			<div class="pt-4">
				<WeeklyAnalysisWeekwiselastthreemonths />
			</div>
		</div>
		<WeeklyAnalysisRegionwiseVariantStatus />
		<WeeklyAnalysisRegionWiseVariant2022 />
		<WeeklyAnalysisVariantstatusbystates />
	</div>
	<!-- <div>
	</div> -->
</template>
<script>
export default {
	components: {},
}
</script>

<style scoped>
.div {
	width: 180px;
}
</style>
