// pages/userMyOrderDetails/userMyOrderDetails.js
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
    // 重定向this指向，预防回调函数改变this问题
    var _this = this;
    // 判断上级页面携带参数类型
    var my_order = options.my_order
    var my_state = options.my_state
    // 获取本地缓存内的user_id信息
    wx.getStorage({
      key: 'loginInfo',
      success: function(res) {
        // 把user_id存入本地data数据
        _this.setData({
          user_id: res.data.userId,
          my_order: my_order,
          my_state: my_state
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.reMyOrderDetails()
  },
  // 请求详情
  reMyOrderDetails: function() {
    var _this = this
    // 声明user_id
    var user_id = _this.data.user_id
    var my_order = _this.data.my_order
    var my_state = _this.data.my_state
    // 拼装请求所需参数
    var params = {
      // 请求方法名
      action: 'orderDetailById',
      // 请求参数
      requestParam: {
        userId: user_id,
        activtiyType: my_state,
        orderNo: my_order
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
        var resData = res.data
        var resDataImg = resData.participants
        _this.setData({
          addList: resData,
          resDataImg: resDataImg
        })

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