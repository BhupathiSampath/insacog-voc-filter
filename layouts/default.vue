<template>
  <div>
  <nav class="md:flex space-x-10">
  <div class="max-w-full mx-auto">
    <div class="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
        <a class="text-base font-medium text-gray-500 hover:text-gray-900">
          <NuxtLink to="/">Sequences</NuxtLink>
        </a>
        <a class="text-base font-medium text-gray-500 hover:text-gray-900">
          <NuxtLink to="/upload">Upload</NuxtLink>
        </a>
    </div>
  </div>
      </nav>
    <Nuxt />
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
