<template>
    <div>
        <NavBar />
        <div class="p-6 bg-gray-100">
            <Nuxt />
        </div>
        <Footer />
    </div>
</template>

<script>
export default {
    name: 'default',
    data: () => ({}),
    created() {
        this.$store.dispatch('base/CallINSACOGDataHubStats')
        this.$store.dispatch('base/getALLDATA')
        this.$store.dispatch('base/DataTable')
    },
    mounted() {
        this.$nextTick(() => {})
    },
}
</script>

<style scoped></style>
