<template lang="pug">
// header
div(class="flex justify-between p-4 border-b border-gray-100")
    span(class="w-11/12 text-lg font-bold text-gray-700") {{$t("participation.directives.choose-tags-title")}}
    button(@click="emitStopParticipation")
        img(class='w-5 text-red-500 transition duration-150 hover:text-red-600' 
         src="./../assets/icons/close.png")
p(class="px-5 pt-5 font-semibold text-gray-600") {{$t("participation.directives.choose-tags-description")}}

// Body
// tags
div(class="p-4 m-auto place-content-evenly")
    button(class="p-2 m-1 text-xs font-light transition duration-300 ease-in-out border border-blue-300 rounded-full" 
     :class="[tag.selected ? 'bg-blue-400 text-white' : 'bg-white text-blue-500']" 
     @click="tag.selected = !tag.selected" 
     v-for="(tag, index) in tagsList") {{tag.label}}

// User comment
div
    p(class="px-4 font-semibold text-gray-600 ") {{$t("participation.directives.add-vocal")}}
    button(class="justify-end px-5 text-xs text-blue-400 transition rounded-md decoration-solid"
     @click="isWritingComment = true") 
        p(v-if="!userComment") {{$t("participation.directives.add-writing")}}
        p(v-if="userComment") {{$t("participation.directives.edit-writing")}}

// Text area
div(class="fixed top-0 bottom-0 left-0 right-0 z-10 p-3 transition-all duration-500 ease-in-out transform bg-white rounded-lg shadow-lg"
 :class="[!isWritingComment ? 'translate-y-full opacity-0' : 'translate-y-0']")
    div(class="relative items-center top-1/4"
     v-if="isWritingComment")
        textarea(autofocus type="text" class='w-full rounded py-3 text-body-color text-base border outline-none px-[14px] border-[f0f0f0]'
        rows="10" :placeholder="$t('participation.directives.add-writing-placeholder')", 
        v-model="userComment")
        div(class="absolute flex justify-center w-full top-5/6")
            button(class="p-2 px-4 py-2 text-sm text-white bg-blue-300 rounded-full hover:bg-blue-500"
            @click="isWritingComment = false") {{$t("button.validate")}}
            button(class="relative pl-5 text-sm text-red-500 r-2"
            @click="isWritingComment = false") {{$t("button.cancel")}}

// user Vocal 
div(class="flex items-center justify-center")
    button(class="p-5 m-5 transition transform border-2 rounded-full duration-250" 
     @click="StartStopRecording()" 
     :class="[isRecording ? 'border-red-200 animate-pulse' : 'border-grey-400']")
        div(class="transition duration-150 ease-in-out transform" 
         :class="[!isRecording ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0']")
            svg(v-if="!isRecording" xmlns='http://www.w3.org/2000/svg', viewbox='0 0 24 24', width='24', height='24')
                path(fill='#263238', fill-opacity='.45', d='M11.999 14.942c2.001 0 3.531-1.53 3.531-3.531V4.35c0-2.001-1.53-3.531-3.531-3.531S8.469 2.35 8.469 4.35v7.061c0 2.001 1.53 3.531 3.53 3.531zm6.238-3.53c0 3.531-2.942 6.002-6.237 6.002s-6.237-2.471-6.237-6.002H3.761c0 4.001 3.178 7.297 7.061 7.885v3.884h2.354v-3.884c3.884-.588 7.061-3.884 7.061-7.885h-2z')
        div(class="transition ease-in-out transform duration-250" 
         :class="[isRecording ? 'translate-y-0 opacity-100' : '-translate-y-5 opacity-0']")
            svg(v-if="isRecording" xmlns='http://www.w3.org/2000/svg', viewbox='0 0 24 24', width='24', height='24')
                rect(x='0', y='0', width='24', height='24', fill='#F07470')
    button(class="p-2 bg-white border shadow-md rounded-3xl" 
     type="button" aria-haspopup="true" aria-expanded="true" aria-controls="headlessui-menu-items-117"
     v-if="isAudio" 
     @click="playAudio")
        div(class="flex flex-row items-center space-x-px ")
            span(class="w-1 bg-gray-500 rounded-lg"
             v-for="heightValue in [.25,.25,.5,1,1.25,.75,1.25,1.50,1.,.750,.5,1,0.25]"
             :style="`height: ${heightValue}rem`")
    button(class="p-3" 
     v-if="isAudio" 
     @click="deleteAudio()")
        img(class="h-5" src="./../assets/icons/bin.png")

// button submit 
div(class="flex justify-center pb-5 border-b border-gray-100")
    button(class="w-4/5 py-3 font-semibold text-white transition duration-200 bg-blue-500 rounded hover:bg-blue-600 each-in-out" type='button' 
     @click="emitSaveParticipationInput") {{$t("button.submit")}}

// footer
div(class="flex justify-start p-3")
    button(class='text-xs text-gray-300 transition duration-150 hover:text-gray-600' 
     @click="emitPreviousParticipationStep") ❮  {{$t("button.previous")}}
    
</template>

<script>
import { ref } from 'vue'
import i18n from '../../../../../i18n'
import {playAudio, StartStopRecording, getAudio, deleteAudio, isAudio, isRecording} from '../composables/deviceMicrophone';


export default {
  
  name: "CesiumPage-ParticipationModal-Tags",
    props:{
    "isParticipationPanelOpen":Boolean
  },
  emits: ['stopParticipation','previousParticipationStep', 'saveParticipationInput'],
  setup(props, { emit }){
    let isWritingComment = ref(false)
    let userComment = ref(null)
    let tagsList = ref([])

    // tags creation
    const tagNames = ["architecture","beauty", "height", "density","noise","atmosphere","price","location","security","sustainability","utility", "lack","comformity","other"] 
    const createTagsFromList = (list) => {
        let tags = []
        list.forEach(element => {
            tags.push({
                "label":i18n.global.t(`participation.tagsList.${element}`),
                "selected":false
            })
        });
        return tags
    }
    tagsList.value = createTagsFromList(tagNames)

    // Event Handlers
    const emitStopParticipation = () => {
        emit('stopParticipation')
    }

    const emitPreviousParticipationStep = () => {
        emit('previousParticipationStep')
    }

    const getSelectedLabel = () => {
        let selectedLabel = []
        tagsList.value.forEach(element => {
            if (element.selected) {
                selectedLabel.push(element.label)
            }
        });
        return selectedLabel
    }

    const emitSaveParticipationInput = async () => {
        let userTagsInputs = {
            "tags":getSelectedLabel(),
            "comment":userComment.value,
            "audio": await getAudio()
        }
        emit('saveParticipationInput', userTagsInputs)
        deleteAudio()
    }
    
    return {  
        tagsList, userComment, isWritingComment,
        StartStopRecording, isRecording, isAudio, deleteAudio, getAudio, playAudio, 
        emitStopParticipation, emitPreviousParticipationStep, emitSaveParticipationInput }
    },
};
</script>

<style scoped>
</style>