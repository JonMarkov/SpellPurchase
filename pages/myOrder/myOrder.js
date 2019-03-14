// pages/myOrder/myOrder.js
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
  // DY函数定义 进入页面遍历
  orderFn: function() {
    var _this = this
    // 声明user_id
    var user_id = this.data.user_id
    // 拼装请求所需参数
    var params = {
      // 请求方法名
      action: 'ordinaryUserOrdersNo',
      // 请求参数
      requestParam: {
        userId: user_id
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
        _this.setData({
          bargains: res.data.bargains,
          groupOrdersList: res.data.groupOrdersList,
          zeroPurchases: res.data.zeroPurchases
        })
      }
    })
  },
  //DY函数定义 点击跳转订单
  ToOrderFn: function(e) {
    let order = e.currentTarget.dataset.order
    wx.navigateTo({
      url: '/pages/orderList/orderList?order=' + order,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.orderFn()
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