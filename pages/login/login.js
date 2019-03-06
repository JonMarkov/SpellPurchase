Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function(options) {
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function(res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function(res) {
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
// 点击按钮开始授权
  bindGetUserInfo: function(e) {
    if (e.detail.userInfo) {
      wx.setStorage({
        key: "weChat",
        data: e.detail.userInfo
      })
      wx.login({
        success: res => {
          var params = {
            service: 'userVerify',
            code: res.code,
            nickName: e.detail.userInfo.nickName,
          }
          params.service = 'userVerify'
          params.code = res.code
          const newparams = Object.assign(params, getApp().globalData.params);
          // const newparams = util.sign(params1)
          wx.request({
            url: getApp().globalData.wx_url_1,
            data: newparams,
            method: "POST",
            // dataType: JSON,
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: res => {
              // 把用户id设置到本地缓存
              wx.setStorage({
                key: "uerid",
                data: res.data.user_id
              })
              //从数据库获取用户信息
              var macid = res.data.user_id
              this.phoneHttp(macid, this.phoneHttpCallback)
            }
          })
        }
      });
      // 点击之后跳转
      wx.switchTab({
        url: '/pages/home/home'
      })
    } else {
      //用户按了拒绝按钮
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