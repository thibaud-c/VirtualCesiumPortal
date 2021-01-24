<template lang="pug">
#bottom-panel.box
    .is-size-5.is-uppercase.has-text-weight-bold {{$t("participate")}}
    #panel-loc(v-if="isaddlocation")
      .has-text-weight-medium.is-size-5.has-text-left-mobile.pt-1 {{$t("localization")}}
        .level.is-mobile.pt-2
          a.loc4-size(@click="isaddlocation=false;isaddopinion=true;billboard='building'")
            img(src="icons/building.png")
          a.loc4-size(@click="isaddlocation=false;isaddopinion=true;billboard='street'")
            img(src="icons/street.png")
          a.loc4-size(@click="isaddlocation=false;isaddopinion=true;billboard='parc'")
            img(src="icons/parc.png")
          a.loc4-size(@click="isaddlocation=false;isaddopinion=true;billboard='viewpoint'")
            img(src="icons/viewpoint.png")
    //Opinion
    #panel-opinion(v-if="isaddopinion")
      .has-text-weight-medium.is-size-5.has-text-left-mobile.pt-1 {{$t("opinion")}}
        .level.is-mobile.pt-2
          a.loc4-size(@click="isneedcomment=true;isaddopinion=false;opinion='good'")
            img(src="icons/good.png")
          a.loc4-size(@click="isneedcomment=true;isaddopinion=false;opinion='neutral'")
            img(src="icons/neutral.png")
          a.loc4-size(@click="isneedcomment=true;isaddopinion=false;opinion='bad'")
            img(src="icons/bad.png")
      a.previous-size-position(@click="isaddlocation=true;isaddopinion=false")
        img(src="icons/previous.png")
    //addComment
    #panel-needcomment(v-if="isneedcomment")
      .has-text-weight-medium.is-size-5.has-text-left-mobile.pt-1 {{$t("addcomment")}}
        .level.is-mobile.pt-3
          .level-item.has-text-centered
            a.button.is-danger.is-large(@click="isaddlocation=true;isneedcomment=false;isparticipate=false;readytoAddBillboard()") {{$t("no")}}
          .level-item.has-text-centered
            a.button.is-success.is-large(@click="isaddcomment=true;isneedcomment=false") {{$t("yes")}}
      a.previous-size-position(@click="isneedcomment=false;isaddopinion=true")
        img(src="icons/previous.png")
    //Comment
    #panel-addcomment.pt-1(v-if="isaddcomment")
      textarea.textarea(v-model="comment" :placeholder="$t('holder-comment')" rows="3" contenteditable autofocus)
      button.button.is-primary.is-rounded.ok-btn(@click="isaddcomment=false;isaddlocation=true;isparticipate=false;readytoAddBillboard()") OK
      a.previous-size-position(@click="isaddlocation=true;isaddopinion=false")
        img(src="icons/previous.png")
</template>

<script>


export default {
  name: "participation-module",
  emits: ['add-billboard'],
  data() {
    return {
        isaddcomment:false,
        isneedcomment:false,
        isaddlocation:true,
        isaddopinion:false,
        islocation:false,
        isview:false,
        billboard:'',
        opinion:'',
        comment:''
    }
  },

  methods: {
    readytoAddBillboard(){
      this.$emit('add-billboard', {"billboard":this.billboard,"opinion":this.opinion, "comment":this.comment})
      this.opinion='';
      this.billboard='';
      this.comment='';
    }
  },
};
</script>

<style scoped>
#bottom-panel{
  position:absolute;
  top: 70%;
  z-index: 1;
  height: 30%;
  left:5%;
  width:90%;
  vertical-align:middle;
}
#bottom-panel:focus-visible{
  width:100%;
  height: 100%;
}
#bottom-panel:focus-within{
  top: 0%;
  height:auto;
}
.box{
  background-color:rgba(250, 250, 250, 0.9);
}
.loc4-size{
  margin:auto;
  width:20%
}
.ok-btn{
  margin-top:4%;
  width:20%;
}
.previous-size-position{
  width:3%;
  position:absolute;
  left:7%;
  top:88%;
}

</style>