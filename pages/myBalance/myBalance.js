// pages/myBalance/myBalance.js
var WxLicUrl = getApp().globalData.wx_url_1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    yearAndMonth: '',
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
    // 请求当前时间
    this.rqTime()
    // 请求详细记录
    this.reBalance()
  },
  // 请求当前年月日
  rqTime: function() {
    var _this = this
    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    //获取年份  
    var Y = date.getFullYear();
    //获取月份  
    var M = (date.getMonth() + 1 < 10 ? +(date.getMonth() + 1) : date.getMonth() + 1);
    //获取当日日期 
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    console.log(Y + '-' + M);
    var yearAndMonth = Y + '-' + M
    _this.setData({
      yearAndMonth: Y + '-' + M
    })
  },
  // 当前详细记录
  reBalance: function() {
    var _this = this
    // 声明user_id
    var user_id = _this.data.user_id
    var yearAndMonth = _this.data.yearAndMonth
    // 拼装请求所需参数
    var params = {
      // 请求方法名
      action: 'getDetailsByUserId',
      // 请求参数
      requestParam: {
        userId: user_id,
        yearAndMonth: yearAndMonth
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
        var resData = res.data
        // 支出
        let expenditure = resData.expenditure
        // 收入
        let income = resData.income
        // 详细列表
        let bill = resData.details
        var bills = []
        for (let i in bill) {
          let goodsName = bill[i].goodsName;
          let showAmount = bill[i].showAmount;
          let payDate = bill[i].payDate
          let activityType = bill[i].activityType
          if (activityType == 1) {
            var activityType_text = '砍价商品'
          } else if (activityType == 2) {
            var activityType_text = '拼团商品'
          } else if (activityType == 3) {
            var activityType_text = '0元购商品'
          }
          var temp = {
            goodsName: goodsName,
            showAmount: showAmount,
            payDate: payDate,
            activityType_text: activityType_text
          }
          bills.push(temp)
        }
        _this.setData({
          expenditure: expenditure,
          income: income,
          bills: bills
        })
      }
    })
  },
  // 请求选择时间
  bindDateChange: function(e) {
    var _this = this
    var dateres = e.detail.value
    var yearAndMonth = dateres.substring(0, 7)
    this.setData({
      yearAndMonth: yearAndMonth
    })
    console.log(yearAndMonth)
    setTimeout(function() {
      // 再次执行请求执行
      _this.reBalance()
    }, 1000)
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