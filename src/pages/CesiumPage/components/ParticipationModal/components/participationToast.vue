<template lang="pug">
div(class="absolute right-0 flex justify-end max-w-sm pt-5 pr-5")
  div(class="flex items-center overflow-hidden text-white bg-green-400 rounded-lg shadow-md ") 
    span(class="w-10 px-2 border-r")
      svg.w-6.h-6(fill='none', stroke='currentColor', viewbox='0 0 24 24', xmlns='http://www.w3.org/2000/svg')
        path(stroke-linecap='round', stroke-linejoin='round', stroke-width='2', d='M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z')
    span(class="flex items-center px-2 py-3")
      div(class="mx-3")
        p {{$t("participation.directives.saved")}}
</template>

<script>

export default {
  name: "CesiumPage-ParticipationModal-Toast",
};
</script>

<style scoped>
</style>