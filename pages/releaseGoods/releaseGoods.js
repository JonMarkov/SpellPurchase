// pages/releaseOrders/releaseOrders.js
// 声明接口名称
var WxLicUrl = getApp().globalData.wx_url_1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0, //预定的位置
    currentTabType: 1
  },

  //点击滑动
  bindchange: function(e) {
    console.log(e.detail.current)
    if (e.detail.current == 0) {
      var currentTabType = 1
    } else if (e.detail.current == 1) {
      var currentTabType = 2
    } else {
      var currentTabType = 3
    }
    let that = this;
    that.setData({
      currentTab: e.detail.current,
      currentTabType: currentTabType
    })
  },
  //点击切换，滑块index赋值
  clickTab: function(e) {
    let that = this;
    if (that.data.currentTab === e.currentTarget.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.currentTarget.dataset.current
      })
      setTimeout(function() {
        that.commoditiesList()
      }, 100)
    }

  },
  // 跳转发布
  ReleaseInfo: function() {
    wx.navigateTo({
      url: '/pages/releaseGoodsInfo/releaseGoodsInfo',
    })
  },
  // businessGoodsList
  // DY函数定义 请求商品参数函数
  commoditiesList: function() {
    var _this = this
    // 声明user_id
    var user_id = this.data.user_id
    var activityType = this.data.currentTabType
    // 拼装请求所需参数
    var params = {
      // 请求方法名
      action: 'businessGoodsList',
      // 请求参数
      requestParam: {
        userId: user_id,
        activityType: activityType
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
        let resData = res.data
        _this.setData({
          releaseInfo: resData
        })
      }
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
  },
  ToeditGoodsStateById: function(e) {
    var _this = this
    let goods_id = e.currentTarget.dataset.goods_id
    let goods_state = e.currentTarget.dataset.goods_state
    // 拼装请求所需参数
    var params = {
      // 请求方法名
      action: 'editGoodsStateById',
      // 请求参数
      requestParam: {
        goodsId: goods_id,
        goodsState: goods_state
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
        let resData = res.data
        _this.commoditiesList()
      }
    })

  },
  TodelGoodsStateById:function(e){

    var _this = this
    let goods_id = e.currentTarget.dataset.goods_id
    let goods_state = e.currentTarget.dataset.goods_state
    // 拼装请求所需参数
    var params = {
      // 请求方法名
      action: 'delGoodsStateById',
      // 请求参数
      requestParam: {
        goodsId: goods_id,
        goodsState: goods_state
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
        let resData = res.data
        _this.commoditiesList()
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.commoditiesList()
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