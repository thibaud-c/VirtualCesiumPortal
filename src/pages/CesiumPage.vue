<template lang="pug">
GlobeBasemap(:position="{userLatitude, userLongitude}" 
 :orientation="{userPan, userTilt}")

ParticipationBtn(:is2DMapClose="is2DMapClose" 
 @startParticipation="startParticipation")

LocationRibbon(:position="{userLatitude, userLongitude}" 
 :orientation="{userPan, userTilt}")

Openlayers2D(:position="{userLatitude, userLongitude}" 
 :orientation="{userPan, userTilt}" 
 :is2DMapClose="is2DMapClose")

Radar2D(:position="{userLatitude, userLongitude}" 
 :orientation="{userPan, userTilt}" 
 @update2DMapState="update2DMapState" 
 :is2DMapClose="is2DMapClose")

ParticipationModal(:isParticipationModalOpen="isParticipationModalOpen" 
 :isDataSavedToastOpen="isDataSavedToastOpen"
 @stopParticipation="isParticipationModalOpen = false" 
 @saveParticipationInput="saveParticipationInput" 
 @previousParticipationStep="previousParticipationStep" 
 @nextParticipationStep="nextParticipationStep")

</template>

<script>
import GlobeBasemap from './CesiumPage/components/GlobeBasemap.vue'
import ParticipationBtn from './CesiumPage/components/ParticipationBtn.vue'
import LocationRibbon from './CesiumPage/components/LocationRibbon.vue'
import Openlayers2D from './CesiumPage/components/Openlayers2D.vue'
import Radar2D from './CesiumPage/components/Radar2D.vue'
import ParticipationModal from './CesiumPage/components/ParticipationModal.vue'

import {postFirebase} from './CesiumPage/composables/firebase';
import {useDeviceGeolocalization, useDeviceOrientation} from './CesiumPage/composables/deviceSensorHandlers';

import { ref } from 'vue'

export default {
    components:{
        GlobeBasemap,
        ParticipationBtn,
        LocationRibbon,
        Openlayers2D,
        Radar2D,
        ParticipationModal
    },
    name: "CesiumPage-CesiumGlobeView",
    setup(){
        // Refs
        let is2DMapClose = ref(true)
        let isParticipationModalOpen = ref(false)
        let isDataSavedToastOpen = ref(false)

        const { userLatitude, userLongitude } = useDeviceGeolocalization()
        const { userPan, userTilt, userGamma } = useDeviceOrientation()

        // User Position & View Handler
        let userCurrentPosition = {}

        const lockView = () => {
            userCurrentPosition =  {
                "Pan": userPan.value,
                "Tilt": userTilt.value,
                "Latitude": userLatitude.value,
                "Longitude": userLongitude.value,
                "timestamp": (new Date()).getTime()
            }
        }

        // User Opinion Handler
        let userOpinion = {}

        const startParticipation = (userOpinionData) => {
            isParticipationModalOpen.value = true 
            // Lock the view to gather the position & view at the time of the participation
            lockView()
            userOpinion = userOpinionData
        }
        
        // -- Emits Handlers -- //
        const update2DMapState = (data) => {
            is2DMapClose.value = data
        }

        // -- SUBMIT to Database -- //
        const saveParticipationInput = async (userParticipationData) => {
            isDataSavedToastOpen.value = true 
            isParticipationModalOpen.value = false
            let userInput = {...userParticipationData, ...userCurrentPosition, ...userOpinion};
            // Send to database
            await postFirebase(userInput)
            isDataSavedToastOpen.value = false
        }

        return { userLatitude, userLongitude, userPan, userTilt, userGamma,
        isDataSavedToastOpen, is2DMapClose, isParticipationModalOpen, 
        startParticipation, update2DMapState, saveParticipationInput }
    }
};
</script>

<style scoped>
</style>