<template lang="pug">
div(class='absolute flex flex-col transition duration-500 ease-in-out transform right-10 sm:duration-700 top-2/3' 
 :class="[ is2DMapClose ? 'translate-y-0' : '-translate-y-full']")

  // add positive
  button(class="relative w-12 h-12 m-3" 
   @click="emitStartParticipation('positive')")
    img(src='./../assets/icons/positive.png' class="shadow-lg")
  
  // add negative
  button(class="relative w-12 h-12 m-3" 
   @click="emitStartParticipation('negative')")
    img(src='./../assets/icons/negative.png' class="shadow-lg")
</template>

<script>

export default {
  
  name: "CesiumPage-ParticipationBtn",
  emits: ['startParticipation'],
  props:{
    "is2DMapClose":Boolean
  },
  setup(props, {emit}){
    const emitStartParticipation = (opinion) => {
      emit('startParticipation', {"opinion":opinion})
    }
    
    return { emitStartParticipation }
  },
};
</script>