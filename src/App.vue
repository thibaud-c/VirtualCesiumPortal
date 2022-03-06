<template lang="pug">
div(class="absolute w-full h-full overflow-hidden")
  router-view
</template>

<script>
export default {
  name: 'App',
  computed: {
    currentRoute(){
      return this.$route.path;
    }
  }
}
</script>

<style scoped>

</style>