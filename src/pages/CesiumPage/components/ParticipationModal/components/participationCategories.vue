<template lang="pug">
// header
div(class='flex justify-between p-4 border-b border-gray-100')
    span(class="w-11/12 text-lg font-bold text-gray-700") {{$t("participation.directives.choose-category-title")}}
    button(@click="emitStopParticipation")
        img(class='w-5 text-red-500 transition duration-150 hover:text-red-600' 
        src="../../../../../assets/icons/close.png")
p(class="px-5 pt-5 font-semibold text-gray-600") {{$t("participation.directives.choose-category-description")}}

// Body
div(class="p-5 text-gray-600 border-b border-gray-100")
    // Category line 1
    div(class="flex")
        span(class="flex flex-col w-1/2")
            button(@click="emitNextParticipationStep('Building')")
                img(src="../../../../../assets/images/building.png")
            p(class="flex justify-center") {{$t("participation.elements-categories.building")}}
        span(class="flex flex-col w-1/2")
            button(@click="emitNextParticipationStep('Vegetation')")
                img(src="../../../../../assets/images/vegetation.png")
            p(class="flex justify-center") {{$t("participation.elements-categories.vegetation")}}

    // Category line 2
    div(class="flex")
        span(class="flex flex-col w-1/2")
            button(@click="emitNextParticipationStep('Pathway')")
                img(src="../../../../../assets/images/path.png")
            p(class="flex justify-center") {{$t("participation.elements-categories.path")}}
        span(class="flex flex-col w-1/2")
            button(class="justify-center h-full" @click="emitNextParticipationStep('View')")
                span(class="flex justify-center")
                    img(src="../../../../../assets/images/view.png")
            p(class="flex justify-center") {{$t("participation.elements-categories.view")}}

    // Category line 3
    div(class="flex")
        span(class="flex flex-col w-1/2")
            button(@click="emitNextParticipationStep('Object')")
                img(src="../../../../../assets/images/parc.png")
            p(class="flex justify-center") {{$t("participation.elements-categories.object")}}
        span(class="flex flex-col w-1/2")
            button(class="justify-center h-full" @click="emitNextParticipationStep('Other')")
                span(class="flex justify-center")
                    img(src="../../../../../assets/images/other.png")
            p(class="flex justify-center") {{$t("participation.elements-categories.other")}}

// footer
div(class="flex justify-end p-3")
    button(class='text-sm text-gray-300 transition duration-150 hover:text-gray-600' @click="emitNextParticipationStep(null)") {{$t("button.skip")}}  ❯
</template>

<script>
export default {
  
    name: "CesiumPage-ParticipationModal-Categories",
        props:{
        "isParticipationPanelOpen":Boolean
    },
    emits: ['stopParticipation','nextParticipationStep'],
    setup(props, { emit }){

        const emitStopParticipation = () => {
            emit('stopParticipation')
        }
        const emitNextParticipationStep = (cat) => {
            let userCategoryInput = { "category": cat }
            emit('nextParticipationStep', userCategoryInput)
        }

        return { emitStopParticipation, emitNextParticipationStep }
    },
};
</script>

<style scoped>
</style>