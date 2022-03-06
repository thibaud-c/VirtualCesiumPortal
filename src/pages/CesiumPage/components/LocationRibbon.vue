<template lang="pug">
main(class="flex flex-col items-center justify-center w-full")
  div(class="p-4 overflow-hidden bg-black shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-25 absolute bottom-0 rounded-t-[15px] w-full") 
    div(class='absolute z-10 flex items-center justify-center w-12')
        img(class="w-5 h-5 transform rotate-180 -translate-y-3 md:translate-x-6 md:translate-y-2"  
         src='./../assets/icons/triangle.png')
    div(class='grid flex-1 grid-flow-col lg:p-6' )
      img(class="w-12 h-12 transform" 
       :style="`transform: rotate(${rotatioAngle}deg)`" 
       src='./../assets/icons/compass.png')
      span(class="flex items-center pl-4 font-semibold text-white text-md") {{currentUserAddress}}
</template>

<script>
import { ref, watch } from 'vue'

export default {
  name: "CesiumPage-LocationRibbon",
  props:{
    "position":Object,
    "orientation":Object
  },
  setup(props){
    let currentUserAddress = ref('')
    let rotatioAngle = ref('')
    const HERE_API_KEY = import.meta.env.VITE_HERE_API_KEY

    const updateUserAddress = async (lat,lon) => {
      const positionURL = `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${lat},${lon}&apiKey=${HERE_API_KEY}&lang=en-US`
      const response = await fetch(positionURL,{ method: 'GET' })
      const data = await response.json()
        if (response.status == 200 & response.ok) {
          if (data.items[0]) {
            currentUserAddress.value = data.items[0].title
          } else {
            console.error('No results found');
          }
        } else {
          console.error('Geocoder failed due to: ' + response.status);
        }
      };
    
    watch(() => props.position, (position) => {
      updateUserAddress(position.userLatitude, position.userLongitude)
    })
    
    watch(() => props.orientation, (orientation) => {
      rotatioAngle.value = Math.ceil(360 - orientation.userPan)
    })

    return { currentUserAddress, rotatioAngle }
  },
};
</script>

<style scoped>
</style>