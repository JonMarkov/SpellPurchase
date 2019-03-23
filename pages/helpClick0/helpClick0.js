// pages/helpClick0/helpClick0.js
// 声明接口名称
var WxLicUrl = getApp().globalData.wx_url_1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bargainId: '0580cec4a1754906930d48c3272e6037',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this
    // 从缓存获取User_id
    wx.getStorage({
      key: 'loginInfo',
      success: function(res) {
        // 把user_id存入本地data数据
        _this.setData({
          user_id: res.data.userId,
        })
      },
    })
    // 从缓存缓存是否已经注册
    wx.getStorage({
      key: 'phone',
      success: function(res) {
        // 把user_id存入本地data数据
        _this.setData({
          phone: res.data,
        })
      },
    })
    // 砍价
    if (options.bargainId) {
      _this.setData({
        bargainId: options.bargainId || ''
      })
    }
  },
  // DY函数定义  进入页面之后遍历数据
  PointsFn: function() {
    var _this = this
    if (_this.data.bargainId) {
      var helpData = {
        bargainId: _this.data.bargainId
      }
    }
    // 拼装请求所需参数
    var params = {
      // 请求方法名
      action: 'gainDetailByOrderId',
      // 请求参数
      requestParam: helpData
    }
    console.log(params)
    // 请求参数合并
    const newparams = Object.assign(params);
    // 请求登录的Java后台接口
    wx.request({
      url: WxLicUrl,
      data: newparams,
      method: "POST",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: res => {
        console.log(res)
        var resData = res.data
        _this.setData({
          infoDet: resData,
          activaityEndTime: resData.activaityEndTime,
          currentTime: resData.currentTime

        })
      }
    })
  },
  // DY帮别人砍价
  OthersFnClick: function() {
    var _this = this
    // 标记
    var bargainNumMa = _this.data.bargainId
    // 如果存在userID则证明授权过
    if (!_this.data.user_id) {
      wx.navigateTo({
        url: '/pages/login/login?bargainNumMa=' + bargainNumMa,
      })
    } else {
      // 获取订单Id
      var bargainId = this.data.bargainId
      // 获取用户Id
      var bargainUserId = this.data.user_id
      // 拼装请求所需参数
      var params = {
        // 请求方法名
        action: 'clickToBargain',
        // 请求参数
        requestParam: {
          bargainId: bargainId,
          bargainUserId: bargainUserId
        }
      }
      // 请求参数合并
      const newparams = Object.assign(params);
      // 请求登录的Java后台接口
      wx.request({
        url: WxLicUrl,
        data: newparams,
        method: "POST",
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: res => {
          console.log(res.data)
          // 如果请求成功则跳转
        }
      })
    }
  },
  // 自己砍价
  OwnFnClick: function() {
    var _this = this
    // 标记
    var bargainNumMa = _this.data.bargainId
    // 如果存在userID则证明授权过
    if (!_this.data.user_id) {
      wx.navigateTo({
        url: '/pages/login/login?bargainNumMa=' + bargainNumMa,
      })
    } else {
      var goodsId = this.data.infoDet.goodsId;
      // 如果有phone则跳转详情
      if (!_this.data.phone) {
        wx.switchTab({
          url: '/pages/personal/personal?bargainNumMa=' + bargainNumMa,
        })
      } else {
        wx.navigateTo({
          url: '/pages/comDetails/comDetails?goods_id=' + goodsId,
        })
      }
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    var _this = this
    this.PointsFn()
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