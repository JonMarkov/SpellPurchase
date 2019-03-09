// 声明接口名称
var WxLicUrl = getApp().globalData.wx_url_1;
Page({
  // SJ页面初始数据 页面所需数据定义
  data: {
    // 初始化UserId数据
    user_id: '',
    // 初始化轮播banner数据
    homeImg: [],
    // 初始化砍价拿商品数据
    bargainCom: [

    ],
    // 初始化拼团购商品数据
    assembleCom: [],
    // 初始化0元购商品数据
    freeCom: [],
    //初始化砍价拿文字滚动
    bargainList: [],
    //初始化拼团购文字滚动
    assembleList: [],
    //初始化0元购文字滚动
    freeList: [],
    //初始化轮播图的索引
    currentSwiper: 0
  },
  // DY函数定义 实时监控当前显示的banner图索引函数
  swiperChange: function(e) {
    this.setData({
      currentSwiper: e.detail.current
    })
  },
  // DY函数定义 点击banner图函数
  ruleshow: function(e) {
    var _this = this
    // 获取data数据中banner全部数据
    var homeImg = this.data.homeImg
    // 获取当前点击的索引
    var currentSwiperNum = this.data.currentSwiper
    // 获取当前点击的ID
    var currentSwiperId = homeImg[currentSwiperNum].id
    // 获取当前点击的Url
    var outer_url = homeImg[currentSwiperNum].jumpLink
    // 拼装请求所需参数
    var params = {
      // 请求方法名
      action: 'addClickNumber',
      // 请求参数
      requestParam: {
        advertId: currentSwiperId
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
        console.log(res.data.code)
        // 如果请求成功则跳转
        if (res.data.code == 0) {
          // 跳转到中转页面，广告位对应页面
          wx.navigateTo({
            url: '/pages/outerChain/outerChain?outer_url=' + outer_url,
          })
        }
      }
    })
  },
  // DY函数定义 请求banner轮播图函数
  reqBanner: function() {
    var _this = this
    // 声明user_id
    var user_id = this.data.user_id
    // 拼装请求所需参数
    var params = {
      // 请求方法名
      action: 'getAdvertByState',
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
        // 声明返回的数值
        var resData = res.data
        // 初始化数据集合
        var homeImg = []
        // 遍历返回数组里面的数据
        for (let i in resData) {
          // 暂存每个数据为对象  
          let temp = {
            id: resData[i].advertId,
            imgUrl: resData[i].advertUrl,
            jumpLink: resData[i].jumpLink
          }
          // 把每个暂存的对象放进初始化的数据里面
          homeImg.push(temp)
        }
        // 把数据设置进data数据
        _this.setData({
          homeImg: homeImg
        })
      }
    })
  },
  // DY函数定义 请求商品参数函数
  commoditiesList: function() {
    var _this = this
    // 声明user_id
    var user_id = this.data.user_id
    // 拼装请求所需参数
    var params = {
      // 请求方法名
      action: 'getIndexGoodsByVolume',
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
      dataType: JSON,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: res => {
        // 声明返回的数值转JSON格式
        var resData = JSON.parse(res.data)
        // 砍价拿数据
        var bargainCom = [];
        // 拼团购数据
        var assembleCom = [];
        // 0元购数据
        var freeCom = []
        for (let i in resData) {
          var resDataCom = resData[i]
          // 如果是i等于1 则是砍价拿数据
          if (i == 1) {
            for (let j in resDataCom) {
              bargainCom.push(resDataCom[j])
            }

          }
          // 如果是i等于2 则是拼团购数据
          else if (i == 2) {
            for (let j in resDataCom) {
              assembleCom.push(resDataCom[j])
            }

          }
          // 如果是i等于3 则是0元购数据
          else {
            for (let j in resDataCom) {
              freeCom.push(resDataCom[j])
            }

          }
        }
        // 把得到数据设置进全局Data中
        _this.setData({
          bargainCom: bargainCom,
          assembleCom: assembleCom,
          freeCom: freeCom
        })
      }
    })
  },
  // DY函数定义 点击进入产品详情函数
  ToDetails: function(e) {
    let goods_id = e.currentTarget.dataset.goods_id
    wx.navigateTo({
      url: '/pages/comDetails/comDetails?goods_id=' + goods_id,
    })
  },
  // DY函数定义 点击进入砍价函数
  ToBargain: function() {
    console.log('23')
  },
  //DY函数定义 请求消息列表函数
  messageList: function() {
    var _this = this
    // 声明user_id
    var user_id = this.data.user_id
    // 拼装请求所需参数
    var params = {
      // 请求方法名
      action: 'getIndexMessage',
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
      dataType: JSON,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: res => {
        // 声明返回的数值转JSON格式
        var resData = JSON.parse(res.data)
        // 初始化定义砍价消息列表数据
        var bargainList = []
        // 初始化定义拼团购消息列表
        var assembleList = []
        // 初始化定义0元购消息列表
        var freeList = []
        // 遍历全部消息列表数据
        for (let i in resData) {
          let resDataDet = resData[i]
          // 得到砍价成功消息放入消息列表数据
          if (i == 1) {
            for (let j in resDataDet) {
              let resDataDetList = resDataDet[j].content
              bargainList.push(resDataDetList)
            }
          }
          // 得到拼团成功消息放入消息列表数据
          if (i == 2) {
            for (let j in resDataDet) {
              let resDataDetList = resDataDet[j].content
              assembleList.push(resDataDetList)
            }
          }
          // 得到0元购成功消息放入消息列表数据
          if (i == 3) {
            for (let j in resDataDet) {
              let resDataDetList = resDataDet[j].content
              freeList.push(resDataDetList)
            }
          }
        }
        // 把数据设置进data数据
        _this.setData({
          bargainList: bargainList,
          assembleList: assembleList,
          freeList: freeList
        })
      }
    })
  },
  // DY函数定义 点击进入对应商品列表页面
  bindToMall: function(e) {
    let actType = e.currentTarget.dataset.type
    wx.navigateTo({
      url: '/pages/singleProduct/singleProduct?type=' + actType,
    })
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
          user_id: res.data.userId,
        })
      },
    })
  },
  // SMZQ生命周期钩子函数 监听页面初次渲染完成
  onReady: function() {
    //ZX函数执行 请求banner轮播图函数
    this.reqBanner()
    // 函数执行 请求首页热销商品
    this.commoditiesList()
    // 函数执行 请求消息列表页面
    this.messageList()
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