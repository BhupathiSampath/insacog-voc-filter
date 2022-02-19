<template>
	<div class="p-6">
		<Nuxt />
	</div>
</template>

<script>
export default {
	name: 'default',
	data: () => ({}),
	created() {
		this.$store.dispatch('base/CallINSACOGDataHubStats')
		this.$store.dispatch('base/CallLineageClassification')
	},
	mounted() {
		this.$nextTick(() => {})
	},
}
</script>

<style scoped></style>
