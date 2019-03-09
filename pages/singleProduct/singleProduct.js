// 声明接口名称
var WxLicUrl = getApp().globalData.wx_url_1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 保存this值
    var _this = this
    // 获取上个页面带来的参数，存在本地data
    _this.setData({
      actType: options.type
    })
  },
  //DY函数定义 请求商品列表接口
  singleFn: function() {
    var _this = this
    // 商品活动类型
    var activtiyType = _this.data.actType
    // 商品搜索参数
    var searchContent = "all"
    var params = {
      // 请求方法名
      action: 'getGoodsByNameAndType',
      // 请求参数
      requestParam: {
        activtiyType: activtiyType,
        searchContent: searchContent
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
        let detInfo = res.data
        // 如果请求成功则跳转
        _this.setData({
          detList: detInfo
        })
      }
    })
  },
  // DY函数定义 输入框搜索执行函数
  SearchInput: function(e) {
    var _this = this
    // 商品活动类型
    var activtiyType = _this.data.actType
    // 商品搜索参数
    var searchContent = e.detail.value
    var params = {
      // 请求方法名
      action: 'getGoodsByNameAndType',
      // 请求参数
      requestParam: {
        activtiyType: activtiyType,
        searchContent: searchContent
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
        let detInfo = res.data
        // 如果请求成功则跳转
        _this.setData({
          detList: detInfo
        })
      }
    })
  },
  // DY函数定义 点击进入商品详情页面
  ToDetails: function (e) {
    let goods_id = e.currentTarget.dataset.goods_id
    wx.navigateTo({
      url: '/pages/comDetails/comDetails?goods_id=' + goods_id,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    // ZX函数执行 进入页面请求商品
    this.singleFn()
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