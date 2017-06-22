<template>
  <div class="music">
    <div id="mus" v-bind:class=musClass @click="tiggermusic"></div>
    <audio id="audio" loop>   
      <source :src=audioSrc type="audio/mpeg">
    </audio>
  </div>
</template>

<script>

export default {
  name: 'music',
  props:['audioSrc'],
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      musClass: {
        music_icon: true,
        open: true,
        close: false,
      }
    }
  },
  methods:{
    audioAutoPlay () {
        var audio = document.getElementById('audio'),
        play = function(){
            audio.play();
            document.removeEventListener("touchstart",play, false);
        };
        audio.play();
        /*document.addEventListener("WeixinJSBridgeReady", function () {//微信
           play();
        }, false);
        document.addEventListener("touchstart",play, false);*/
    },
    tiggermusic () {
      var audio = document.getElementById('audio')
      if (this.musClass.open) {
        this.musClass.open = false
        this.musClass.close = true
        audio.pause()
      } else {
        this.musClass.open = true
        this.musClass.close = false
        audio.play()
      }
    }
  },
  mounted(){
    this.audioAutoPlay()
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.music_icon{
    width:0.67rem;
    height:0.67rem;
    position: fixed;
    top:10px;
    right: 10px;
    z-index: 10;
}
.open{
  background: url("../assets/openm.png");
  background-size: cover;
}
.close{
  background: url("../assets/closem.png");
  background-size: cover;
}
</style>
