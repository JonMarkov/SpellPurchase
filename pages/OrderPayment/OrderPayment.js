// pages/OrderPayment/OrderPayment.js
// 声明接口名称
var WxLicUrl = getApp().globalData.wx_url_1;
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    var _this = this
    // 拼团购
    if (options.assembleId) {
      _this.setData({
        assembleId: options.assembleId
      })
    }
    // 0元购
    if (options.zeroId) {
      _this.setData({
        zeroId: options.zeroId
      })
    }
    var _this = this
    // 获取本地缓存内的user_id信息
    wx.getStorage({
      key: 'addRess',
      success: function(res) {
        // 把user_id存入本地data数据
        _this.setData({
          addRess: res.data,
        })
      },
    })
  },
  // 切换地址
  ToqhAdd: function() {
    var _this = this
    var ddState = 1
    if (_this.data.assembleId) {
      wx.navigateTo({
        url: '/pages/myAddress/myAddress?ddState=' + ddState + '&assembleId=' + _this.data.assembleId,
      })
    }
    if (_this.data.zeroId) {
      wx.navigateTo({
        url: '/pages/myAddress/myAddress?ddState=' + ddState + '&zeroId=' + _this.data.zeroId,
      })
    }

  },
  // 请求商品参数
  detInfo: function() {
    var _this = this
    // 拼装请求所需参数
    if (_this.data.assembleId) {
      var params = {
        // 请求方法名
        action: 'payBeforeGainInfo',
        // 请求参数
        requestParam: {
          assembleId: _this.data.assembleId,
        }
      }
    }
    if (_this.data.zeroId) {
      var params = {
        // 请求方法名
        action: 'payBeforeGainInfo',
        // 请求参数
        requestParam: {
          zeroId: _this.data.zeroId,
        }
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
        _this.setData({
          infoDet: res.data
        })
      }
    })
  },
  subBTo: function() {

    var _this = this
    // 拼装请求所需参数
    if (_this.data.assembleId) {
      var params = {
        // 请求方法名
        action: 'orderBindingAdderss',
        // 请求参数
        requestParam: {
          assembleId: _this.data.assembleId,
          addrId: _this.data.addRess.addrId
        }
      }
    }
    if (_this.data.zeroId) {
      var params = {
        // 请求方法名
        action: 'orderBindingAdderss',
        // 请求参数
        requestParam: {
          zeroId: _this.data.zeroId,
          addrId: _this.data.addRess.addrId
        }
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
        // 支付支付支付支付
        // 支付支付支付支付
        // 支付支付支付支付
        // 支付支付支付支付
        if (res.data.code == 0) {
          if (res.data.zeroId) {
            wx.navigateTo({
              url: '/pages/shareSuccess/shareSuccess?zeroId=' + res.data.zeroId,
            })
          }
          if (res.data.assembleId) {
            wx.navigateTo({
              url: '/pages/shareSuccess/shareSuccess?assembleId=' + res.data.assembleId,
            })
          }

        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.detInfo()
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