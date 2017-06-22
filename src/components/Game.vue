<template>
  <div class="game">
    
    <div class="score-board">得分{{score}}</div>
    <div class="hello" id="hello"></div>
    <div class="ready" v-show="showready">
      <div class="readytext">
        {{ready}}
      </div>
    </div>
  </div>
</template>

<script>

import '../js/hilo-standalone.min.js'

import game from '../js/game.js'
import '../js/Asset.js'
import '../js/BottomObj.js'
import '../js/DropObj.js'

export default {
  name: 'game',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      score: 0,
      showready: true,
      ready: 'ready'
    }
  },
  methods: {
    
    RandomNumBoth(Min,Max) {
      var Range = Max - Min;
      var Rand = Math.random();
      var num = Min + Math.round(Rand * Range); //四舍五入
      return num;
    },
    render () {
     
        requestAnimationFrame(this.render)

    }
  },
  mounted () {
      if (!Array.prototype.shuffle) {
        Array.prototype.shuffle = function() {
            for(var j, x, i = this.length; i; j = parseInt(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x);
            return this;
        }
      }
      var vm = this
      document.getElementById('hello').innerHTML = ''
      game.init(document.getElementById('hello'),function(data){
        if (data.type == 'score') {
          vm.score = data.score
        } else {
          sessionStorage.setItem('score',vm.score)
          vm.$router.push('/over')
        }
        
      });
      setTimeout(function(){
        vm.ready = 'go'
      },1000)
      setTimeout(function(){
        vm.showready = false
      },2000)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.game{
  height: 100%;
  box-sizing: border-box;
  padding-top: 1rem;
}
.hello{
  height: 100%;
}
.score-board{
  position: absolute;
  left: 50%;
  transform: translate(-50%,-100%);
}
.ready{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.readytext{
  font-size: 20px;
  margin-top: 5rem;
  text-align: center;
  animation: warn-ani 1s linear infinite;
}
@keyframes warn-ani{
  0%{
    transform: scale(1);
  }
  100%{
    transform: scale(1.4);
  }
}
</style>
