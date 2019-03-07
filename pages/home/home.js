// 声明接口名称
var WxLicUrl = getApp().globalData.wx_url_1;
Page({
  // SJ页面初始数据 页面所需数据定义
  data: {
    // 初始化UserId数据
    user_id: '',
    // 初始化轮播banner数据
    homeImg: [{
        'imgUrl': 'https://pic4.zhimg.com/v2-3da78883263a03fe9b14b6f72e88e0de_1200x500.jpg'
      },
      {
        'imgUrl': 'https://pic1.zhimg.com/80/v2-0cfa27275a933e6ab81ec1097a24d25c_hd.jpg'
      },
      {
        'imgUrl': 'https://pic4.zhimg.com/v2-3da78883263a03fe9b14b6f72e88e0de_1200x500.jpg'
      }
    ],
    homeCom: [{

    }],
    frequency: [],
    nullHouse: true, //先设置隐藏
    swiperCurrent: 0,
    // 当前显示banner的索引
    currentSwiper: 0
  },
  // DY函数定义 实时监控当前显示的banner图索引函数
  swiperChange: function(e) {
    this.setData({
      currentSwiper: e.detail.current
    })
  },
  // DY函数定义 点击banner图函数
  ruleshow: function() {
    var currentSwiper = this.data.currentSwiper
    if (currentSwiper == 0) {
      console.log('等于0')
    }
    if (currentSwiper == 1) {
      console.log('等于1')
    } else {
      console.log('等于2')
    }

  },
  // DY函数定义 请求banner轮播图函数
  reqBanner: function() {
    console.log(this.data.user_id)
  },
  // SMZQ生命周期钩子函数 监听页面加载
  onLoad: function(options) {
    // 重定向this指向，预防回调函数改变this问题
    var _this = this;
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
  // SMZQ生命周期钩子函数 监听页面初次渲染完成
  onReady: function() {
    //ZX函数执行 请求banner轮播图函数
    this.reqBanner()
  },
  // SMZQ生命周期个钩子函数 监听页面显示
  onShow: function() {},
  // SMZQ生命周期钩子函数 监听页面隐藏
  onHide: function() {},
  // SMZQ生命周期钩子函数 监听页面卸载
  onUnload: function() {},
  // SMZQ生命周期钩子函数 监听用户下拉动作
  onPullDownRefresh: function() {},
  // SMZQ生命周期钩子函数 页面上拉触底事件的处理函数
  onReachBottom: function() {},
  // SMZQ生命周期钩子函数 用户点击右上角分享
  onShareAppMessage: function(res) {},
})