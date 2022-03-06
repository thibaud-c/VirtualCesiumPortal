<template lang='pug'>
div(class="container absolute top-[80%] flex justify-center")
    router-link(class='px-4 py-2 m-auto text-lg font-bold text-white bg-red-600 border rounded-full bold hover:bg-red-700'
     tag='button' 
     to='/cesium') {{$t("button.participate")}}
</template>

<script>
export default {
    name: 'LandingPage-StartBtn',
    setup() {
    }
}
</script>

<style scoped>
</style>