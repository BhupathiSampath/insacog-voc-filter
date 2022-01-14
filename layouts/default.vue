<template>
  <div class="bg-gray-100">
  <NavBar />
  <div class="container mx-auto">
    <Nuxt/>
  </div>

  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'

export default {
  data: () =>({
    input: ''
  }),
  components: {
    NavBar
  },
}
</script>
