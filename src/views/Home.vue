<template lang='pug'>
//Langage modal
.modal(:class="{ 'is-active': is_active }")
  .modal-background
  #modal-lang.modal-content.box
      a(@click="$i18n.locale='en';is_active=false")
        figure.image.img-lang
          img(:src="`${src_icons}en.png`")
      a(@click="$i18n.locale='fr';is_active=false")
        figure.image.img-lang
          img(:src="`${src_icons}fr.png`")

//Page presentation
#presentation.box
  .media-content
    #info-paragraphe.title {{$t("catch")}}
    .subtitle {{$t("explaination")}}
router-link(to="/cesium")
  #start.button.button.is-light {{$t("IgetInvolve")}}

//Credential
#credential.button.is-white(@click="openGit")
  font-awesome-icon.icon.alt(:icon="['fab','github-alt']") 
  p {{$t("GitHub")}}
</template>

<script>
export default {
  data(){
    return{
      is_active: true,
      src_icons:"icons/",
      url_git:"https://github.com/thibaud-c"
    }
  },
  methods:{
    openGit(){
      window.open(this.url_git)
    }
  }
}
</script>

<style scoped>
#start{
  position:absolute;
  top: 70%;
  width: 40%;
  height:12%;
  left:30%;
  z-index: 2;
  background-color: #FCC9A5;
  font-weight: bold;
}
#modal-lang{
  width:40%;
  padding: 5%;
}
#presentation{
  position:absolute;
  width:100%;
  height:60%;
  top:-2%;
  background-color:#ACCFBF;
}
#credential{
  position:absolute;
  bottom:2%;
  left:2%;
}
#info-paragraphe{
  margin-top: 10%;
  margin-bottom: 10%;
}
.img-lang{
  width:100%;
  padding: 5%;
}
</style>