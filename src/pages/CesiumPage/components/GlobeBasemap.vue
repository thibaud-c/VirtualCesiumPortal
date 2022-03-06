<template lang="pug">
#cesium-container(class="absolute w-full h-full overflow-hidden")
</template>

<script>
import { onMounted, watch, ref } from 'vue'
import { initGlobeCS, isInSwitzerland } from './../composables/initializationCS'
import { updateCesiumPosition, updateCesiumOrientation } from './../composables/cameraHandlerCS'

export default {
  name: "CesiumPage-GlobeBasemap",
  props:{
    "position":Object,
    "orientation":Object
  },
  setup(props){

    let cesiumViewer = ref(null)
    let checkFirstPosition = true

    onMounted(() => { 
      cesiumViewer.value = initGlobeCS()
      
    })

    watch(() => props.position, (position) => {      
      updateCesiumPosition(cesiumViewer.value, position.userLatitude, position.userLongitude)
      // Check first position
      if (checkFirstPosition.value) {
        isInSwitzerland(cesiumViewer.value, position.userLatitude, position.userLongitude)
        checkFirstPosition = false
      }
    })
    watch(() => props.orientation, (orientation) => {      
      updateCesiumOrientation(cesiumViewer.value, orientation.userPan, orientation.userTilt)
    })
  },
};
</script>

<style scoped>
</style>