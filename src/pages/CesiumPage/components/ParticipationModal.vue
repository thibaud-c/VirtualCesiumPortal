<template lang="pug">
div(class="absolute flex flex-col items-center justify-center w-full h-full overflow-auto transition duration-700 ease-in-out place-content-center" 
 v-if="isParticipationModalOpen")
    div(class="z-10 w-5/6 bg-white rounded-lg drop-shadow-2xl")
      participationCategories(v-if="isParticipationStep == 1" 
       @stopParticipation="emitStopParticipation" 
       @nextParticipationStep="nextStep")

      participationTags(v-if="isParticipationStep == 2" 
       @stopParticipation="emitStopParticipation" 
       @previousParticipationStep="isParticipationStep=1" 
       @saveParticipationInput="emitSaveParticipationInput")
      
participationToat(v-if="isDataSavedToastOpen"
 @closeParticipationToast="isDataSavedToastOpen=false")
</template>

<script>
import { ref } from 'vue'
import participationCategories from './ParticipationModal/components/participationCategories.vue'
import participationTags from './ParticipationModal/components/participationTags.vue'
import participationToat from './ParticipationModal/components/participationToast.vue'

export default {
  components:{
    participationCategories,
    participationTags,
    participationToat
  },
  emits:[
    'stopParticipation'
  ],
  name: "CesiumPage-ParticipationModal",
  props:{
    "isParticipationModalOpen":Boolean
  },
  setup(props, {emit}){
    // components depiction
    let isParticipationStep = ref(1)
    let isDataSavedToastOpen = ref(false)
    let userCategory = null

    // Event listeners
    const emitStopParticipation = () => {
      isParticipationStep.value = 1
      emit('stopParticipation')
    }
    
    const emitSaveParticipationInput = (userTagsInput) => {
      isParticipationStep.value = 1
      isDataSavedToastOpen.value = true
      let userParticipationInput = {...userCategory, ...userTagsInput};
      emit('saveParticipationInput',userParticipationInput)
    }

    // steps handler
    const nextStep = (UserCategoryInput) => {
      isParticipationStep.value = 2
      userCategory = UserCategoryInput
    }
    return { isParticipationStep, isDataSavedToastOpen, nextStep, emitStopParticipation, emitSaveParticipationInput }
  },
};
</script>

<style scoped>
</style>