// pages/personal/personal.js
var WxLicUrl = getApp().globalData.wx_url_1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneState: false,
    btntext: '获取验证码',
    regexpStatus: true,
    codeStatus: true,
    to_agr: '',
    code_item: '',
    ReportErrors_text:''
  },
  // DY函数定义 获取输入的手机号
  phoneItem: function(e) {
    var _this = this
    _this.setData({
      phone_item: e.detail.value
    })
  },
  // DY函数定义 获取输入的验证码
  codeItem: function(e) {
    var _this = this;
    _this.setData({
      code_item: e.detail.value
    })
  },
  // DY函数定义 发送验证码
  verification: function() {
    var _this = this
    // 正则表达式
    var TEL_REGEXP = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
    // 输入的手机号
    var phoneItem = this.data.phone_item
    if (TEL_REGEXP.test(phoneItem)) {
      // 请求接口
      var params = {
        // 请求方法名
        action: 'sendVerifyCode',
        // 请求参数
        requestParam: {
          phone: phoneItem
        }
      }
      // 请求参数合并
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
          console.log(res.data.code)
          // 如果请求成功则跳转
          if (res.data.code == 0) {
            // 验证码倒计时时长
            var coden = 60
            var codeV = setInterval(function() {
              _this.setData({
                btntext: (--coden) + 's后 ' + '重新获取',
                codeStatus: false
              })
              if (coden == -1) {
                clearInterval(codeV)
                _this.setData({
                  btntext: '获取验证码',
                  codeStatus: true
                })
              }
            }, 1000)
          }
        }
      })
    } else {
      _this.setData({
        regexpStatus: false
      })
    }


  },
  // DY函数定义 判断是否存在登录状态
  LoginState: function() {
    var _this = this
    // 获取本地data内phone的值
    let phone = _this.data.phone
    // 如果phone为空，则显示登录页面，改变phoneState状态位ture，打开登录界面
    if (phone == '') {
      _this.setData({
        phoneState: false
      })
    }
    // 如果phone不为空，则显示个人中心页面，改变phoneState状态位false，关闭登录界面
    else {
      _this.setData({
        phoneState: true
      })
    }
  },
  // DY函数定义 点击登录请求注册
  ToAgr: function() {
    var _this = this
    // 点击状态 √
    var ToArt = _this.data.to_agr
    if (ToArt == "√") {
      // 如果是选中状态，点击则取消
      _this.setData({
        to_agr: '',
        btnStatus: false
      })
      // 如果是未选中状态，点击则增加√
    } else {
      _this.setData({
        to_agr: "√",
        btnStatus: true
      })
    }
  },
  // DY函数定义 点击提交信息
  regLogin: function() {
    var _this = this
    // 是否可以点击状态
    let btnStatus = _this.data.btnStatus
    // 用户id
    let userId = _this.data.user_id
    // 微信昵称
    let nickName = _this.data.weChat.nickName
    // 微信性别
    let gender = _this.data.weChat.gender
    // 微信头像
    let avatarUrl = _this.data.weChat.avatarUrl
    // 手机号
    let phoneItem = this.data.phone_item
    // 验证码
    let codeItem = _this.data.code_item
    // 正则表达式
    var TEL_REGEXP = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
    // 手机号是否正确
    if (TEL_REGEXP.test(phoneItem)) {
      // 是否可以点击状态
      if (btnStatus == true) {
        // 拼装请求所需参数
        var params = {
          // 请求方法名
          action: 'registerLogin',
          // 请求参数
          requestParam: {
            phone: phoneItem,
            verifyCode: codeItem,
            nickName: nickName,
            gender: gender,
            avatarUrl: avatarUrl,
            userId: userId
          }
        }
        // 请求参数合并
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
            // 返回信息
            let resData = res.data
            // 如果请求失败则显示相应的错误
            if(resData.code != 0){
              _this.setData({
                ReportErrors_text:resData.msg
              })
            }else{
              // 把返回成功的信息存入data且把状态转为已登录模式
              _this.setData({
                phoneState:true,
                userIfo: resData
              })
              // 把信息存入缓存
              wx.setStorage({
                key: "phone",
                data: resData.phone
              })
            }

          }
        })
      }
    } else {
      _this.setData({
        regexpStatus: false
      })
    }

  },
  // DY函数定义 点击进入我的账户余额
  ToMyBalance:function(){
    wx.navigateTo({
      url: '/pages/myBalance/myBalance',
    })
  },
  // DY函数定义 点击进入我的商户认证
  ToMyApproval: function () {
    wx.navigateTo({
      url: '/pages/myApproval/myApproval',
    })
  },
  // DY函数定义 点击进入我的订单页面
  ToMyOrder: function () {
    wx.navigateTo({
      url: '/pages/myOrder/myOrder',
    })
  },
  // DY函数定义 点击进入我的商品
  ToMyGoods: function () {
    wx.navigateTo({
      url: '/pages/myGoods/myGoods',
    })
  },
  // DY函数定义 点击进入我的收货地址
  ToMyAddress: function () {
    wx.navigateTo({
      url: '/pages/myAddress/myAddress',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 重定向this指向，预防回调函数改变this问题
    var _this = this;
    // 获取本地缓存内的user_id信息
    wx.getStorage({
      key: 'loginInfo',
      success: function(res) {
        // 把user_id存入本地data数据
        _this.setData({
          user_id: res.data.userId,
        })
      },
    })
    // 获取本地缓存内的登录状态
    wx.getStorage({
      key: 'phone',
      success: function(res) {
        // 把user_id存入本地data数据
        _this.setData({
          phone: res.data,
        })
      },
    })
    //获取微信的信息
    wx.getStorage({
      key: 'weChat',
      success: function (res) {
        var resData = res.data
        // 把user_id存入本地data数据
        _this.setData({
          weChat: resData,
        })
      },
    })
    //获取个人中心信息
    wx.getStorage({
      key: 'LoginSq',
      success: function (res) {
        var resData = res.data
        // 把user_id存入本地data数据
        _this.setData({
          LoginSq: resData,
        })
      },
    })
  },
  // 判断是否登录

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    // 判断用户登录状态
    this.LoginState()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})