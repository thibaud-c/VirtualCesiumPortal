<template lang='pug'>
main(class='absolute m-5 bg-white shadow-lg top-1/4 backdrop-filter backdrop-blur-lg bg-opacity-5 rounded-xl')
  div(class='items-center flex-1 p-4 text-lg text-white lg:p-6')
    div(class='flex flex-col mx-3 text-sm text-justify')
      span(class='my-2 font-bold') {{$t("welcome.catchphrase")}}
      span(class='my-2') {{$t("welcome.directive")}}
      span(class='my-2') {{$t("welcome.thanks")}}
</template>

<script>

export default {
  name: 'LandingPage-BodyContent',
}
</script>

<style scoped>
</style>