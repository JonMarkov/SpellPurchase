// pages/myApproval/myApproval.js
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
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  // 企业名称
  ToTraOne: function(e) {
    let _this = this
    let traOne = e.detail.value
    _this.setData({
      traOne: traOne
    })
  },
  // 企业法人
  ToTraTwo: function(e) {
    let _this = this
    let traTwo = e.detail.value
    _this.setData({
      traTwo: traTwo
    })
  },
  // 组织机构代码
  ToTraThree: function(e) {
    let _this = this
    let traThree = e.detail.value
    _this.setData({
      traThree: traThree
    })
  },
  // 联系人姓名
  ToTraFour: function(e) {
    let _this = this
    let traFour = e.detail.value
    _this.setData({
      traFour: traFour
    })
  },
  // 联系人电话
  ToTraFive: function(e) {
    let _this = this
    let traFive = e.detail.value
    _this.setData({
      traFive: traFive
    })
  },

  TobraFn() {
    var _this = this
    // 声明user_id
    var user_id = this.data.user_id
    // 拼装请求所需参数
    var params = {
      // 请求方法名
      action: 'certificationLaunched',
      // 请求参数
      requestParam: {
        user_id: user_id
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

      }
    })
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