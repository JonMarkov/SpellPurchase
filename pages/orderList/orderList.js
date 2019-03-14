// pages/releaseOrders/releaseOrders.js
// 声明接口名称
var WxLicUrl = getApp().globalData.wx_url_1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: true,
    currentTab: 0,
    order_type: 1,
    order_type_text: "已完成"
  },
  // 点击切换tab标签
  tabNav: function(e) {
    var _this = this
    //  如果点击的条目和内容区域的条目相同，则不执行操作
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      // 获得一个布尔值 判断当前条目是否为0
      var showMode = e.target.dataset.current == 0;

      if (e.target.dataset.current == 0) {
        var order_type = 1
        var order_type_text = "已完成"
      } else if (e.target.dataset.current == 1) {
        var order_type = 2
        var order_type_text = "进行中"
      } else if (e.target.dataset.current == 2) {
        var order_type = 3
        var order_type_text = "已过期"
      }
      // 把数据设置到data中
      this.setData({
        currentTab: e.target.dataset.current,
        isShow: showMode,
        order_type: order_type,
        order_type_text: order_type_text
      })
      // 一秒之后执行
      setTimeout(function() {
        // 请求数据列表 
        _this.reOrderList()
      }, 1000)

    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 重定向this指向，预防回调函数改变this问题
    var _this = this;
    // 判断上级页面携带参数类型
    var order_state = options.order
    // 获取本地缓存内的user_id信息
    wx.getStorage({
      key: 'loginInfo',
      success: function(res) {
        // 把user_id存入本地data数据
        _this.setData({
          user_id: res.data.userId,
          order_state: order_state
        })
      },
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    // ZX函数执行 判断显示的订单状态
    this.orderState()
    // ZX函数执行 请求数据列表
    this.reOrderList()
  },
  //DY函数定义 判断显示的订单状态
  orderState: function() {
    var _this = this
    var order_state = _this.data.order_state;
    if (order_state == 1) {
      _this.setData({
        titleTypeSuc: '砍价完成',
        titleTypePen: '砍价中',
        titleTypeoVerdue: '已过期'
      })
    } else if (order_state == 2) {
      _this.setData({
        titleTypeSuc: '拼团完成',
        titleTypePen: '拼团中',
        titleTypeoVerdue: '已过期'
      })
    } else if (order_state == 3) {
      _this.setData({
        titleTypeSuc: '已完成',
        titleTypePen: '进行中',
        titleTypeoVerdue: '已过期'
      })
    }
  },
  // DY函数定义 请求数据列表
  reOrderList: function() {
    var _this = this
    // 用户ID
    var user_id = _this.data.user_id
    // 订单类型
    var activtiyType = _this.data.order_state
    var orderState = _this.data.order_type
    var params = {
      // 请求方法名
      action: 'ordinaryUserOrders',
      // 请求参数
      requestParam: {
        userId: user_id,
        activtiyType: activtiyType,
        orderState: orderState
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
        console.log(res.data)
        // 请求的数据
        var resData = res.data
        var orderInfo = []
        for (var i in resData) {
          let goodsDescribe = resData[i].goodsDescribe
          let goodsImage = resData[i].goodsImage
          let goodsName = resData[i].goodsName
          let orderNo = resData[i].orderNo
          let price = resData[i].price
          var temp = {
            goodsDescribe: goodsDescribe,
            goodsImage: goodsImage,
            goodsName: goodsName,
            orderNo: orderNo,
            price: price
          }
          orderInfo.push(temp)
        }
        _this.setData({
          orderInfo: orderInfo
        })

      }
    })
  },
  // DY函数定义 跳转详情
  ToMyOrderDet: function(e) {
    console.log(e)
    var my_order = e.currentTarget.dataset.my_order
    var my_state = e.currentTarget.dataset.my_state
    wx.navigateTo({
      url: '/pages/userMyOrderDetails/userMyOrderDetails?my_order=' + my_order + '&' + 'my_state=' + my_state,
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