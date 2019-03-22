// pages/helpClick/helpClick.js
// 声明接口名称
var WxLicUrl = getApp().globalData.wx_url_1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    assembleId: '022fa51c308d4d288328d2970a8e9c84'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.getStorage({
      key: 'loginInfo',
      success: function(res) {
        // 把user_id存入本地data数据
        _this.setData({
          user_id: res.data.userId,
        })
      },
    })
    var _this = this
    // 0元购
    if (options.zeroId) {
      _this.setData({
        zeroId: options.zeroId || ''
      })
    }
    // 拼团
    if (options.assembleId) {
      assembleId: options.assembleId || ''
    }

  },
  // DY函数定义  进入页面之后遍历数据
  PointsFn: function() {
    var _this = this
    if (_this.data.assembleId) {
      var helpData = {
        assembleId: _this.data.assembleId
      }
    }
    if (_this.data.zeroId) {
      var helpData = {
        zeroId: _this.data.zeroId
      }
    }
    console.log(helpData)
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
          infoDet: resData
        })
      }
    })
  },
  // DY点击帮他免费拿
  zeroIdFnClick: function() {
    var _this = this
    // 标记
    var zeroNumMa = _this.data.zeroId
    // 如果存在userID则证明授权过
    if (!_this.data.user_id) {
      wx.navigateTo({
        url: '/pages/login/login?zeroNumMa=' + zeroNumMa,
      })
    } else {

    }
  },
  assembleIdFnClick:function(){
    var _this = this
    // 标记
    var assembleNumMa = _this.data.assembleId
    // 如果存在userID则证明授权过
    if (!_this.data.user_id) {
      wx.navigateTo({
        url: '/pages/login/login?assembleNumMa=' + assembleNumMa,
      })
    } else {

    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
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