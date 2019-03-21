// pages/shareSuccess/shareSuccess.js
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
    // 重定向this指向，预防回调函数改变this问题
    var _this = this;
    if (options.bargainId) {
      var bargainId = options.bargainId
      _this.setData({
        bargainId: bargainId
      })
    }
    if (options.assembleId) {
      var assembleId = options.assembleId
      _this.setData({
        assembleId: assembleId
      })
    }
    if (options.zeroId) {
      var zeroId = options.zeroId
      _this.setData({
        zeroId: zeroId
      })
    }

    // 获取本地缓存内的user_id信息
    wx.getStorage({
      key: 'loginInfo',
      success: function(res) {
        // 把user_id存入本地data数据
        _this.setData({
          user_id: res.data.userId
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

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
    var _this = this
    if (_this.data.zeroId) {
      var pathTxt = '/pages/helpClick/helpClick?zeroId=' + _this.data.zeroId
    }
    if (_this.data.assembleId) {
      var pathTxt = '/pages/helpClick/helpClick?assembleId=' + _this.data.assembleId
    }
    if (_this.data.bargainId) {
      var pathTxt = '/pages/helpClick0/helpClick0?bargainId=' + _this.data.bargainId
    }
    console.log(pathTxt)
    return {
      title: '这是转发的标题啊',
      path: pathTxt,
      success: function(res) {

      }
    }

  }
})