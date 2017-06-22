import axios from 'axios'
var wxshare = {
    signatureurl:null,
    appId:null,
    jsApiList:null,
    title:null,
    link:null,
    imgurl:null,
    fn:null,
    init:function(param){
        this.signatureurl = param.signatureurl;
        this.appId = param.appId;
        this.jsApiList = param.jsApiList;
        this.title = param.title;
        this.desc = param.desc;
        this.link = param.link;
        this.imgurl = param.imgurl;
        this.cb = param.callback;
        this.share();
    },
    share : function (){
      var url = location.href.split('#')[0];
      url = encodeURIComponent(url);
      axios.get(this.signatureurl + '?url=' + url).then(function(response){
        var data = response.data
        wx.config({
                  debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                  //appId: 'wx3d5547d122fc289c', // 必填，公众号的唯一标识
                  appId:wxshare.appId,
                  timestamp: data.data.timestamp, // 必填，生成签名的时间戳
                  nonceStr: data.data.noncestr, // 必填，生成签名的随机串
                  signature: data.data.signature,// 必填，签名，见附录1
                  //jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                  jsApiList:wxshare.jsApiList,
                });
       wx.ready(function(){
          wx.onMenuShareAppMessage({
              title: wxshare.title, // 分享标题
              desc: wxshare.desc, // 分享描述
              link: wxshare.link, // 分享链接
              //link:url,
              imgUrl: wxshare.imgurl, // 分享图标
              type: 'link', // 分享类型,music、video或link，不填默认为link
              dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
              success: function () { 
                  // 用户确认分享后执行的回调函数
                  wxshare.cb('ShareAppMessage Success');
              },
              cancel: function () { 
                  // 用户取消分享后执行的回调函数
                  wxshare.cb('ShareAppMessage cancel');
              }
          });
          wx.onMenuShareTimeline({
              title: wxshare.title, // 分享标题
              link: wxshare.link, // 分享链接
              //link:url,
              imgUrl: wxshare.imgurl, // 分享图标
              success: function () { 
                  // 用户确认分享后执行的回调函数
                  wxshare.cb('ShareTimeline Success');
              },
              cancel: function () { 
                  // 用户取消分享后执行的回调函数
                  wxshare.cb('ShareTimeline Success');
              }
          });
        });
      }).catch(function(error){
        console.log(error);
      })
     /* $.ajax({
              // url:runconfig.hosturl+'/getsignature?url='+url,
              url:this.signatureurl + '?url=' + url,
              type:'get',
              contentType:'application/json',
              dataType:'json',
              success:function(data){
               wx.config({
                  debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                  //appId: 'wx3d5547d122fc289c', // 必填，公众号的唯一标识
                  appId:wxshare.appId,
                  timestamp: data.data.timestamp, // 必填，生成签名的时间戳
                  nonceStr: data.data.noncestr, // 必填，生成签名的随机串
                  signature: data.data.signature,// 必填，签名，见附录1
                  //jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                  jsApiList:wxshare.jsApiList,
                });
                 wx.ready(function(){
                    wx.onMenuShareAppMessage({
                        title: wxshare.title, // 分享标题
                        desc: wxshare.desc, // 分享描述
                        link: wxshare.link, // 分享链接
                        //link:url,
                        imgUrl: wxshare.imgurl, // 分享图标
                        type: 'link', // 分享类型,music、video或link，不填默认为link
                        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                        success: function () { 
                            // 用户确认分享后执行的回调函数
                        },
                        cancel: function () { 
                            // 用户取消分享后执行的回调函数
                        }
                    });
                    wx.onMenuShareTimeline({
                        title: wxshare.title, // 分享标题
                        link: wxshare.link, // 分享链接
                        //link:url,
                        imgUrl: wxshare.imgurl, // 分享图标
                        success: function () { 
                            // 用户确认分享后执行的回调函数
                        },
                        cancel: function () { 
                            // 用户取消分享后执行的回调函数
                        }
                    });
                    wxshare.cb(data.data.timestamp);
                 });
                 wx.error(function(){
                    wxshare.cb();
                 });
              },
          });*/
    }
}
export default wxshare