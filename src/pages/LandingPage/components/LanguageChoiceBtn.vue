<template lang='pug'>
div(class="container absolute z-10 top-[20%] flex justify-center")
    div(class="text-sm leading-none text-gray-500 bg-gray-200 border-2 border-gray-200 rounded-full ")
        
        // French
        button(class="inline-flex px-4 py-2 transition-colors duration-300 ease-in rounded-l-full focus:outline-none hover:text-blue-400 focus:text-blue-400" 
         :class="{ active: isFrench }" 
         @click="activateFrench")
            span 🇨🇵 Français
        
        // English
        button(class="inline-flex px-4 py-2 transition-colors duration-300 ease-in rounded-r-full focus:outline-none hover:text-blue-400 focus:text-blue-400" 
         :class="{ active: !isFrench }" 
         @click="activateEnglish")
            span 🇬🇧 English
</template>

<script>
import { ref } from 'vue'
import i18n from '../../../i18n'

export default {
    name: 'LandingPage-LanguageChoiceBtn',
    setup() {
        let isFrench = ref(true)

        const activateFrench = () => {
            i18n.global.locale = 'fr'
            isFrench.value = true
        }

        const activateEnglish = () => {
            i18n.global.locale = 'en'
            isFrench.value = false
        }

        return {
            isFrench,
            activateFrench,
            activateEnglish
        }
    }
}
</script>

<style scoped>
.active {background: white; border-radius: 9999px; color: #63b3ed;}
</style>