// pages/helpClick0/helpClick0.js
// 声明接口名称
var WxLicUrl = getApp().globalData.wx_url_1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bargainId: '0580cec4a1754906930d48c3272e6037'
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
    // 砍价
    if (options.bargainId) {
      _this.setData({
        bargainId: options.bargainId || ''
      })
    }
  },
  // DY函数定义  进入页面之后遍历数据
  PointsFn: function() {
    var _this = this
    if (_this.data.bargainId) {
      var helpData = {
        bargainId: _this.data.bargainId
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
  // DY帮别人砍价
  OthersFnClick: function() {
    var _this = this
    // 标记
    var bargainNumMa = _this.data.bargainId
    // 如果存在userID则证明授权过
    if (!_this.data.user_id) {
      wx.navigateTo({
        url: '/pages/login/login?bargainNumMa=' + bargainNumMa,
      })
    } else {

    }
  },
  // 自己砍价
  OwnFnClick: function() {
    var _this = this
    // 标记
    var bargainNumMa = _this.data.bargainId
    // 如果存在userID则证明授权过
    if (!_this.data.user_id) {
      wx.navigateTo({
        url: '/pages/login/login?bargainNumMa=' + bargainNumMa,
      })
    } else {

    }
  },
  // DY函数定义 请求活动剩余时间
  activity: function () {
    var _this = this
    // 活动结束时间
    let endTime = _this.data.endTime
    // 获取当前时间
    let surplusTime = this.data.surplusTime
    // 剩余秒数
    var actTimer = setInterval(function () {
      // 获取最新的结束时间
      let endTime = _this.data.endTime
      // 获取最新的当前时间
      let surplusTime = ++(_this.data.surplusTime)
      // 剩余时间时间戳                                               
      let SurTime = endTime - surplusTime
      // 天数
      // 毫秒和天数的换算规则
      let daysGz = 60 * 60 * 24 //秒->分->时
      let dayTime = parseInt(SurTime / daysGz)
      // 小时
      // 毫秒和小时的换算规则
      let hourGz = 60 * 60 //秒->分
      let hourTime = parseInt((SurTime - (daysGz * dayTime)) / hourGz)
      // 分钟
      // 毫秒和分钟的换算规则
      let branchGz = 60 //分
      let branchTime = parseInt((SurTime - ((daysGz * dayTime) + hourGz * hourTime)) / branchGz)
      // 秒 
      // 毫秒和秒的换算规则
      let secondGz = 1 //无
      let secondGzTime = parseInt((SurTime - ((daysGz * dayTime) + (hourGz * hourTime) + (branchGz * branchTime))) / secondGz)
      _this.setData({
        surplusTime: surplusTime,
        dayTime: dayTime,
        hourTime: hourTime,
        branchTime: branchTime,
        secondGzTime: secondGzTime
      })
      if (SurTime <= 0) {
        clearInterval(actTimer)
      }
    }, 1000)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.PointsFn()
    // ZX函数执行 每秒执行一次倒计时函数
    this.activity()
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