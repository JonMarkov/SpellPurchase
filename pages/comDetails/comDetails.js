// pages/comDetails/comDetails.js
var WxLicUrl = getApp().globalData.wx_url_1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 是否显示弹窗
    showModalStatus: false,
    // 颜色的SKU
    colour_txt: '',
    // 材质的SKU
    material_txt: '',
    // 尺码的SKU
    size_txt: '',
    styles:'',
    gg_price: 0,
    guigeList: [],
    styleId: 0,
    attrId: 0
  },
  // 颜色
  filterColour: function(e) {
    var self = this;
    var txt = e.currentTarget.dataset.txt
    self.setData({
      colour_txt: txt,
    });
    setTimeout(function() {
      self.price_zong()
    }, 100)
  },
  // 材质
  filterMaterial: function(e) {
    var self = this;
    var txt = e.currentTarget.dataset.txt
    self.setData({
      material_txt: txt,
    });
    setTimeout(function() {
      self.price_zong()
    }, 100)
  },
  // 尺寸
  filterSize: function(e) {
    var self = this;
    var txt = e.currentTarget.dataset.txt
    self.setData({
      sizes_txt: txt,
    });
    setTimeout(function() {
      self.price_zong()
    }, 100)
  },
  filterStyle:function(e){
    var self = this;
    var txt = e.currentTarget.dataset.txt
    self.setData({
      styles: txt,
    });
    setTimeout(function () {
      self.price_style()
    }, 100)
  },
  // 计算价格1
  price_style:function(){
    var _this = this
    // SKU数组
    var guigeList = _this.data.detList.goodsStyles
    // 当前选择的颜色
    var styles = _this.data.styles
    for (var i in guigeList) {
       console.log(guigeList[i])
      if (styles == guigeList[i].styles) {
        console.log(guigeList[i])
        var sePrice = guigeList[i].price
        _this.setData({
          gg_price: sePrice
        })
      }
    }
  },
  // 计算价格2
  price_zong: function() {
    var _this = this;
    // SKU数组
    var guigeList = _this.data.guigeList
    // 当前选择的颜色
    var colour_txt = _this.data.colour_txt
    // 当前选择的材质
    var material_txt = _this.data.material_txt
    // 当前选择的尺码
    var sizes_txt = _this.data.sizes_txt
    for (var i in guigeList) {
      if (colour_txt == guigeList[i].colour && material_txt == guigeList[i].material && sizes_txt == guigeList[i].size) {
        console.log(guigeList[i])
        _this.setData({
          gg_price: guigeList[i].price,
          attrId: guigeList[i].attrId
        })
      }
    }
  },
  // DY函数定义 请求商品详情函数
  reqBanner: function() {
    var _this = this
    // 声明user_id
    var goods_id = this.data.goodsId
    // 拼装请求所需参数
    var params = {
      // 请求方法名
      action: 'getGoods',
      // 请求参数
      requestParam: {
        goodsId: goods_id
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
        // 活动开始时间
        let starTime = (resData.activityStartTime) / 1000
        // 活动结束时间
        let endTime = (resData.activityEndTime) / 1000
        //获取当前时间
        let surplusTime = (resData.activitySurplusTime) / 1000
        // // SKU属性1
        let goodsAttributes = resData.goodsAttributes
        // SKU属性2
        let goodsStyles = resData.goodsStyles
        // // 默认的数据颜色
        let colors = resData.colors
        let colour_txt = resData.colors[0]
        // // 默认的数据材质
        let material = resData.material
        let material_txt = resData.material[0]
        // // 默认的数据尺码
        let sizes = resData.sizes
        let sizes_txt = resData.sizes[0]
        // 默认的款式数据
        let styles = resData.styles[0]
        let styles_list = resData.styles
        // 获取3初始化价钱
        for (var i in goodsAttributes) {
          if (
            colour_txt == goodsAttributes[i].colour &&
            material_txt == goodsAttributes[i].material &&
            sizes_txt == goodsAttributes[i].size) {
            var price = goodsAttributes[i].price
            var attrId = goodsAttributes[i].attrId
          }
        }

        // 获取1初始化价钱
        for (var i in goodsStyles) {
          if (styles == goodsStyles[i].styles) {
            var price = goodsStyles[i].price
            var styleId = goodsStyles[i].styleId
          }
        }
        if (resData.goodsAttributes == '') {
          _this.setData({
            styleId: styleId,
            styles: styles,
            styles_list: styles_list,
            detList: resData,
            starTime: starTime,
            endTime: endTime,
            surplusTime: surplusTime,
            guigeList: goodsAttributes,
            gg_price: price,
          })
        } else {
          // 把数据存进data
          _this.setData({
            attrId: attrId,
            gg_price: price,
            colors: colors,
            colour_txt: colour_txt,
            material: material,
            material_txt: material_txt,
            sizes: sizes,
            sizes_txt: sizes_txt,
            guigeList: goodsAttributes,
            detList: resData,
            starTime: starTime,
            endTime: endTime,
            surplusTime: surplusTime
          })
        }

      }
    })


  },
  // DY函数定义 请求活动剩余时间
  activity: function() {
    var _this = this
    // 活动开始时间
    let starTime = _this.data.starTime
    // 活动结束时间
    let endTime = _this.data.endTime
    // 获取当前时间
    let surplusTime = this.data.surplusTime
    // 剩余秒数
    var actTimer = setInterval(function() {
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
  // DY分享商品弹窗
  Toshare: function(e) {
    var _this = this
    var activity_type = e.currentTarget.dataset.activity;
    _this.setData({
      showModalStatus:true
    })
  },
  // 砍价购物
  reqsucOrder: function() {
    var _this = this
    // uesr_id
    var user_id = _this.data.user_id
    // 声明user_id
    var goods_id = _this.data.goodsId
    var activityType = _this.data.detList.activityType
    var styleId = this.data.styleId
    var attrId = this.data.attrId

    // 拼装请求所需参数
    var params = {
      // 请求方法名
      action: 'advanceOrder',
      // 请求参数
      requestParam: {
        styleId: styleId,
        attrId: attrId,
        activityType: activityType,
        userId: user_id,
        goodsId: goods_id,
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
        var bargainId = res.data.bargainId
        if (res.data.code == 0) {
          wx.navigateTo({
            url: '/pages/shareSuccess/shareSuccess?bargainId=' + bargainId,
          })
        }

      }
    })


  },
  // 拼团购物
  pintGm: function() {
    var _this = this
    // uesr_id
    var user_id = _this.data.user_id
    // 声明user_id
    var goods_id = _this.data.goodsId
    var activityType = _this.data.detList.activityType
    var styleId = this.data.styleId
    var attrId = this.data.attrId

    // 拼装请求所需参数
    var params = {
      // 请求方法名
      action: 'advanceOrder',
      // 请求参数
      requestParam: {
        styleId: styleId,
        attrId: attrId,
        activityType: activityType,
        userId: user_id,
        goodsId: goods_id,
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
        console.log(res.data.assembleId)
        var assembleId = res.data.assembleId
        if (res.data.code == 0) {
          wx.navigateTo({
            url: '/pages/OrderPayment/OrderPayment?assembleId=' + assembleId,
          })
        }
      }
    })
  },
  // 0元购
  zeroGm: function() {
    var _this = this
    // uesr_id
    var user_id = _this.data.user_id
    // 声明user_id
    var goods_id = _this.data.goodsId
    var activityType = _this.data.detList.activityType
    var styleId = this.data.styleId
    var attrId = this.data.attrId

    // 拼装请求所需参数
    var params = {
      // 请求方法名
      action: 'advanceOrder',
      // 请求参数
      requestParam: {
        styleId: styleId,
        attrId: attrId,
        activityType: activityType,
        userId: user_id,
        goodsId: goods_id,
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
        var zeroId = res.data.zeroId
        if (res.data.code == 0) {
          wx.navigateTo({
            url: '/pages/OrderPayment/OrderPayment?zeroId=' + zeroId,
          })
        }
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
          user_id: res.data.userId
        })
      },
    })
    // 获取上个页面携带的参数goods_id
    var goodsId = options.goods_id
    // 把参数goods_id存入data
    _this.setData({
      goodsId: goodsId
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    //ZX函数执行 请求banner轮播图函数
    this.reqBanner()
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
   * 用户点击右上角分享s
   */
  onShareAppMessage: function(ops) {

  }
})