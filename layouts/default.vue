<template>
	<div class="p-6 bg-gray-100">
		<NavBar />
		<Nuxt />
	</div>
</template>

<script>
import NavBar from "@/components/NavBar.vue"
export default {
    name: "default",
    data: () => ({}),
    created() {
        this.$store.dispatch("base/CallINSACOGDataHubStats");
        // this.$store.dispatch("base/CallLineageClassification");
        this.$store.dispatch("base/getALLDATA");
        this.$store.dispatch("base/DataTable");
    },
    mounted() {
        this.$nextTick(() => { });
    },
    components: { NavBar }
}
</script>

<style scoped></style>
