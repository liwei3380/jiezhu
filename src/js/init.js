// 引入vue
import wxshare from './wxshare.js'
import config from './config.js'
let cb;
let setcb = func => {
  cb = func;
}
var init = function () {
  wxshare.init({
        signatureurl:config.hosturl+'/getsignature',
        appId:'wx3d5547d122fc289c',
        jsApiList:['onMenuShareTimeline','onMenuShareAppMessage'],
        title:'title',
        desc:'description',
        link:'http://www.linki2u.com/wxjstxt/jiezhu/dist/dao.html',
        imgurl:'http://y2.ifengimg.com/a/2016_05/add96b5b01c902d.jpg',
        callback:cb
      });
}

export default {init,setcb}
