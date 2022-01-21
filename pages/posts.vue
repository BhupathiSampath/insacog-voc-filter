<template>
  <div class="hello">
  <div class="max-w-full mx-2 px-8 sm:mx-auto sm:px-6 lg:px-10">
    <FilterForm />
  <div class="box-border h-100 w-100 p-4 border-4 mt-2">
  <section>
    <div class="container mx-auto">
      <weekdata />
    </div>
  </section>
  </div>
    <!-- <div v-for='post in posts' :key='post.id' :post="post">
    
  <h3>Post Title: </h3>  {{post.week_number}}
      <h3>Post Body: </h3>  {{post.strain__count}}
    </div> -->
    <h2>Essential Links</h2>
  </div>
  <InsacogDataHub />
  </div>
</template>

<script>
import FilterForm from "/home/nsm-07/Desktop/Bhupati/dev/insacog-voc-filter/components/Sequences.vue"
import weekdata from "/home/nsm-07/Desktop/Bhupati/dev/insacog-voc-filter/components/week_data.vue"
import InsacogDataHub from "/home/nsm-07/Desktop/Bhupati/dev/insacog-voc-filter/components/InsacogDataHub.vue"

export default {
    components: { weekdata, FilterForm, InsacogDataHub },
  name: 'myStore',
  data () {
    return {
      msg: 'Welcome to my Vuex Store'
    }
  },
  computed: {
    posts() {
        // console.log(this.$store.state.posts)
    return this.$store.state.posts

    }
  },
  
  mounted() {
    this.$store.dispatch("getPosts");
  },
}
</script>