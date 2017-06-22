<template>
  <div id="app">
    <music :audioSrc=audioSrc></music>
    <router-view></router-view>
  </div>
</template>

<script>
import Music from './components/music'
export default {
  name: 'app',
  data  () {
    return {
      audioSrc: 'http://47.93.47.246:8081/assets/1.mp3'
    }
  },
  components: {
    Music
  }
}
</script>

<style>
body,html{
  padding: 0;
  margin: 0;
}
#app {
  font-size: 14px;
  font-family: Helvetica;
  width: 100%;
  height: 100%;
}
</style>
