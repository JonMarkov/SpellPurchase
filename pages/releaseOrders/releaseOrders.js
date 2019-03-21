// pages/releaseOrders/releaseOrders.js
// 声明接口名称
var WxLicUrl = getApp().globalData.wx_url_1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //预定的位置
    currentTab: 0,
    curIndex: 1,
    goods_name: '',
    fahuoState: 0,
    hiddenmodalput: true,
    logisticsCompany:'',
    AddNum:''


  },

  //点击滑动
  bindchange: function(e) {
    let that = this;
    let current = e.detail.current
    let curIndex = parseInt(current) + 1
    that.setData({
      currentTab: current,
      curIndex: curIndex,
    })


  },
  //点击切换，滑块index赋值
  clickTab: function(e) {
    let that = this;
    if (that.data.currentTab === e.currentTarget.dataset.current) {
      return false;
    } else {
      that.setData({
        fahuoState: e.currentTarget.dataset.current,
        currentTab: e.currentTarget.dataset.current
      })
      // 一秒之后执行
      setTimeout(function() {
        // 请求数据列表 
        that.rqOrderFn()
      }, 100)
    }
  },
  // 请求数据
  rqOrderFn: function() {
    var _this = this
    // 用户Id
    var user_id = _this.data.user_id
    // 商品名称
    var goods_name = _this.data.goods_name
    // 发货状态
    var fahuoState = _this.data.currentTab
    // 拼装请求所需参数
    var params = {
      // 请求方法名
      action: 'businessOrdersByGoodsName',
      // 请求参数
      requestParam: {
        busId: user_id,
        goodsName: goods_name,
        fahuoState: fahuoState
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
        let resData = res.data
        _this.setData({
          businessInfo: resData
        })
      }
    })
  },
  // 跳转详情
  TerOrder: function (e) {
    console.log(e)
    let my_order = e.currentTarget.dataset.my_order
    let activi_Type = e.currentTarget.dataset.activit_type
    console.log(activi_Type)
    wx.navigateTo({
      url: '/pages/terminalOrder/terminalOrder?my_order=' + my_order + '&my_state=' + activi_Type,
    })
  },
  // DY函数定义 输入框搜索执行函数
  SearchInput: function(e) {
    var _this = this
    // 用户Id
    var user_id = _this.data.user_id
    // 发货状态
    var fahuoState = this.data.fahuoState
    // 商品搜索参数
    var searchContent = e.detail.value
    var params = {
      // 请求方法名
      action: 'businessOrdersByGoodsName',
      // 请求参数
      requestParam: {
        busId: user_id,
        goodsName: searchContent,
        fahuoState: fahuoState
      }
    }
    // 请求参数合并
    const newparams = Object.assign(params);
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
        let resData = res.data
        _this.setData({
          businessInfo: resData
        })
      }
    })
  },
  //点击按钮痰喘指定的hiddenmodalput弹出框  
  modalinput: function () {
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })
  },
  //取消按钮  
  cancel: function () {
    this.setData({
      hiddenmodalput: true
    });
  },
  //确认  
  confirm: function (e) {
    console.log(e)
    var _this = this
    // 用户Id
    var activitType = e.currentTarget.dataset.activittype
    // 发货状态
    var orderNo = e.currentTarget.dataset.orderno
    // 商品搜索参数
    var logisticsCompany = _this.data.logisticsCompany
    var AddNum = _this.data.AddNum
    var params = {
      // 请求方法名
      action: 'addDeliveryInfo',
      // 请求参数
      requestParam: {
        activtiyType:activitType,
        orderNo: orderNo,   
        logisticsCompany: logisticsCompany,    
        oddNumbers: AddNum
      }
    }
    console.log(params)
    // 请求参数合并
    const newparams = Object.assign(params);
    wx.request({
      url: WxLicUrl,
      data: newparams,
      method: "POST",
      // dataType: JSON,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: res => {
        console.log(res)
        if(res.data.code == 0){
          _this.rqOrderFn()
        }
      }
    })
    this.setData({
      hiddenmodalput: true
    })
  }, 
  TologisticsCompany:function(e){
    var _this = this
    console.log(e.detail.value)
    _this.setData({
      logisticsCompany: e.detail.value
    })
  },
  ToAddNum:function(e){
    var _this = this
    console.log(e.detail.value)
    _this.setData({
      AddNum: e.detail.value
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.rqOrderFn()
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