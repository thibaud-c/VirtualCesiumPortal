<template lang="pug">
div(class='absolute transition duration-500 ease-in-out transform sm:duration-700 top-2/3' 
 :class="[ is2DMapClose ? 'translate-y-0' : '-translate-y-full' ]" 
 @click="emitOpenClose2DMap")
  button(class="w-24 h-24 m-4 bg-black rounded-full shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-5")
    #ol-radar(class="w-full h-full")
</template>

<script>
import { initOpenlayerCS, initMarkerOpenlayerCS, updateOLPosition, rotateOLMap } from '../composables/openlayerHandler'
import { onMounted, ref, watch } from 'vue'

export default {
  name: "CesiumPage-Radar2D",
  emits: ['update2DMapState'],
  props:{
    "position":Object,
    "orientation":Object,
    "is2DMapClose":Boolean
  },
  setup(props, { emit }){
    let olmap = ref(null)
    let lmarker = ref(null)

    const emitOpenClose2DMap = () => {
      emit('update2DMapState', !props.is2DMapClose)
    }

    onMounted(() => {
      olmap.value = initOpenlayerCS('ol-radar', false)
      lmarker.value = initMarkerOpenlayerCS(olmap.value, false)
    })

    watch(() => props.position, (position) => {
      updateOLPosition(olmap.value, lmarker.value, position.userLatitude, position.userLongitude)
    })

    watch(() => props.orientation, (orientation) => {
      rotateOLMap(olmap.value, orientation.userPan)
    })
    
    return { emitOpenClose2DMap }
  },
};

</script>

<style scoped>
</style>