<template lang='pug'>
// Background
img(src='./LandingPage/assets/images/background.jpg' 
 class="object-none object-right h-full lg:w-full")

btnLanguageChoice
textGlassExplanation
btnStartExperience
btnRibbonMoreInfo
</template>

<script>
import btnLanguageChoice from './LandingPage/components/LanguageChoiceBtn.vue'
import btnRibbonMoreInfo from './LandingPage/components/RibbonMoreInfoBtn.vue'
import textGlassExplanation from './LandingPage/components/GlassExplanationText.vue'
import btnStartExperience from './LandingPage/components/StartBtn.vue'

export default {
  name: 'landingPage',
  components: {
    btnLanguageChoice,
    btnRibbonMoreInfo,
    textGlassExplanation,
    btnStartExperience
  },
}
</script>