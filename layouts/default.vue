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
	},
	mounted() {
		this.$nextTick(() => {})
	},
}
</script>

<style scoped></style>
