// 声明接口名称
var WxLicUrl = getApp().globalData.wx_url_1;
Page({
  // SJ页面初始数据 页面所需数据定义
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  // SMZQ生命周期钩子函数 首先触发onLoad方法，一个页面只会调用一次。
  onLoad: function(options) {
    // 重定向this指向，预防回调函数改变this问题
    var _this = this;
    // ZX函数执行 执行判断是否已经授权
    _this.gaveNotExpired()
  },
  // DY函数定义 判断用户是否已经授权，如果已授权则直接跳转
  gaveNotExpired:function(){
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 获取用户信息
          wx.getUserInfo({
            success: function (res) {
              //如果用户已经授权过则直接跳转首页
              wx.switchTab({
                url: '/pages/home/home'
              })
            }
          });
        }
      }
    })
  },
  // DY函数定义 授权点击按钮开始授权
  bindGetUserInfo: function(e) {
    // 获取用户的信息
    if (e.detail.userInfo) {
      // 把用户的信息存入本地缓存
      wx.setStorage({
        key: "weChat",
        data: e.detail.userInfo
      })
      // 开始请求登录授权接口
      wx.login({
        success: res => {
          // 获取返回的code之后请求Java后台
          // 拼装请求所需参数
          var params = {
            // 请求方法名
            action: 'login',
            // 请求参数
            requestParam: {
              code: res.code
            }
          }
          // 请求参数组合
          const newparams = Object.assign(params);
          // 请求登录的Java后台接口
          wx.request({
            url: WxLicUrl,
            data: newparams,
            method: "POST",
            // dataType: JSON,
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: res => {
              console.log(res)
              // 把返回的数据存进本地缓存
              wx.setStorage({
                key: "loginInfo",
                data: res.data
              })
              //把用户登录状态存进本地缓存
              wx.setStorage({
                key: 'phone',
                data: res.data.phone,
              })
              // 点击允许按钮之后如果code等于0则代表请求成功->跳转Home页面
              if (res.data.code == 0){
                wx.switchTab({
                  url: '/pages/home/home'
                })
              }
            }
          })
        }
      });
    } else {
      //如果用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
    }
  },
})