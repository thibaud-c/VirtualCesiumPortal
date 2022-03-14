<template lang='pug'>
button(class="absolute flex flex-col items-center w-full transform rotate-45 bg-yellow-500 translate-x-1/3 top-10" 
 @click="openGit")
    img(class="w-10 h-10" 
     src='../../../assets/icons/github.png')
    
    p {{$t("button.GitHub")}}
</template>

<script>
export default {
    name: 'LandingPage-GitHubRibbon',
    setup() {
        const gitProfilUrl = "https://github.com/thibaud-c/VirtualCesiumPortal"

        const openGit = () => {
            window.open(gitProfilUrl)
        }
        return {
            openGit
        }
    }
}
</script>

<style scoped>
</style>