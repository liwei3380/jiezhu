// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import init from './js/init'
import axios from 'axios'
import runconfig from './js/config'
import {Indicator,Toast} from 'mint-ui'

Vue.config.productionTip = false

init.setcb(function(data){
	if (data == 'ShareAppMessage Success') {
		Toast({
			message:'分享成功',
			duration: 5000
		});
	} else if (data == 'ShareAppMessage cancel') {
		Toast('分享取消');
	}
});
init.init();

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

var code = getUrlParam('code');
//取地址参数
function getUrlParam(name){
  var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r!=null) return unescape(r[2]); 
  return null;
}
Indicator.open({
  text:'加载中...',
  spinnerType: 'snake'
});
axios({
    url:runconfig.hosturl+'/getweboauthuserinfo?code='+code,
    type:'get',
    contentType:'application/json',
    dataType:'json'
}).then(function(response){

	var data = response.data;
      if(data.data==null) {
        console.log('data is null');
        Indicator.close();
      }else{
      	Indicator.close();
        sessionStorage.setItem('wechatid',data.data.wechatid);
        sessionStorage.setItem('createdtime',data.data.createdtime);
      }
}).catch(function(err){
	console.log(err)
})