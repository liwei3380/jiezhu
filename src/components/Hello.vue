<template>
  <div class="hello">
    <div class="logo">
      <img src="../assets/logo.png">
    </div>
    <div class="right-btn-group">
      <div class="rule btn" @click="isshowrule = !isshowrule">游戏规则</div>
      <!-- <div class="rank btn">排行榜</div> -->
    </div>
    <div class="start btn" @click="start">开始游戏</div>
    <div class="rule-wrap" v-show="isshowrule">
      <div class="rule-content">
        <div class="close" @click="isshowrule = !isshowrule"> X </div>
        <div class="rule-content-text">
          开始，通过。。可以。。最后。。等分。。计算排名
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      isshowrule: false,
    }
  },
  methods: {
    start(){
      this.$router.push('/game')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello{

  height: 100%;
}
.logo,.btn{
  text-align: center;
}
.btn{
  padding: 5px;
  box-sizing: border-box;
  background: #6E3923;
  color: white;
  box-shadow:0 0 2px 1px #502A1A;
}
.right-btn-group{
  width:0.5rem;
  position: absolute;
  right: 0;
}
.start{
  width:25%;
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
}
.rule{
  margin-bottom: 5px;
}
.rule-wrap{
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0,0,0,0.7);
}
.rule-content{
  background: white;
  width: 90%;
  height: 50%;
  padding: .25rem;
  box-sizing: border-box;
  position: absolute;
  top:1rem;
  left: 50%;
  transform: translateX(-50%);
}
.close{
  position: absolute;
  right: 0;
  top: 0;
  width: .5rem;
  height: .5rem;
  line-height: .5rem;
  text-align: center;
}
</style>
