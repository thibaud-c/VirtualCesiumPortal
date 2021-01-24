<template>
  <figure class="image">
    <img :src="imgurl404">
  </figure>
  <router-link to="/">
    <button class="button is-primary is-rounded">Home</button>
  </router-link>
</template>

<script>

export default {
  data(){
    return{
      imgurl404:"https://hsbitla1.hotelsimply.com/assets/error-image-4302442d3e6a2a0f656d80567dadbcb783ae657388858994a8683467516d636e.png"
    }
  }
}
</script>