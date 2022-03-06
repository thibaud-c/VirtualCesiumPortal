<template lang="pug">
div(class='w-full overflow-y-hidden bottom-0 pb-0 absolute transform transition ease-in-out duration-500 rounded-t-[15px] h-1/3 sm:duration-700 shadow-[0_-6px_6px_-6px_rgba(0,0,0,0.3)]' 
 :class="[ is2DMapClose? 'translate-y-full' : 'translate-y-0' ]")
  #ol-container(class="w-full h-full")
</template>

<script>
import { initOpenlayerCS, initMarkerOpenlayerCS, updateOLPosition, rotateOLMarker } from '../composables/openlayerHandler'
import { onMounted, ref, watch } from 'vue'

export default {
  name: "CesiumPage-Openlayers2D",
  props:{
    "position":Object,
    "orientation":Object,
    "is2DMapClose":Boolean
  },
  setup(props){
    let olmap = ref(null)
    let lmarker = ref(null)

    onMounted(() => {
      olmap.value = initOpenlayerCS('ol-container')
      lmarker.value = initMarkerOpenlayerCS(olmap.value)
    })
    
    watch(() => props.position, (position) => {
      updateOLPosition(olmap.value, lmarker.value, position.userLatitude, position.userLongitude)
    })

    watch(() => props.orientation, (orientation) => {
      rotateOLMarker(lmarker.value, orientation.userPan)
    })
        
    return { }
  },
}
</script>

<style scoped>
</style>