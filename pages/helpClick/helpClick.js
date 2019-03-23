// pages/helpClick/helpClick.js
// 声明接口名称
var WxLicUrl = getApp().globalData.wx_url_1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    zeroId: 'fc9a5bb8149f451da77a338d57ab779a'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this
    wx.getStorage({
      key: 'loginInfo',
      success: function(res) {
        // 把user_id存入本地data数据
        _this.setData({
          user_id: res.data.userId,
        })
      },
    })

    // 从缓存缓存是否已经注册
    wx.getStorage({
      key: 'phone',
      success: function(res) {
        // 把user_id存入本地data数据
        _this.setData({
          phone: res.data,
        })
      },
    })

    // 0元购
    if (options.zeroId) {
      _this.setData({
        zeroId: options.zeroId || ''
      })
    }
    // 拼团
    if (options.assembleId) {
      _this.setData({
        assembleId: options.assembleId || ''
      })

    }

  },
  // DY函数定义  进入页面之后遍历数据
  PointsFn: function() {
    var _this = this
    if (_this.data.assembleId) {
      var helpData = {
        assembleId: _this.data.assembleId
      }
    }
    if (_this.data.zeroId) {
      var helpData = {
        zeroId: _this.data.zeroId
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
  // DY点击帮他免费拿
  zeroIdFnClick: function() {
    var _this = this
    // 标记
    var zeroNumMa = _this.data.zeroId
    // 如果存在userID则证明授权过
    if (!_this.data.user_id) {
      wx.navigateTo({
        url: '/pages/login/login?zeroNumMa=' + zeroNumMa,
      })
    } else {
      var goodsId = this.data.infoDet.goodsId;
      // 如果有phone则跳转详情
      if (!_this.data.phone) {
        wx.switchTab({
          url: '/pages/personal/personal?zeroNumMa=' + zeroNumMa,
        })
      } else {
        // 获取订单Id
        var zeroId = this.data.zeroId
        // 获取用户Id
        var clickUserId = this.data.user_id
        // 拼装请求所需参数
        var params = {
          // 请求方法名
          action: 'clickToRegister',
          // 请求参数
          requestParam: {
            zeroId: zeroId,
            clickUserId: clickUserId
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
            // 如果请求成功则跳转
            
          }
        })
      }
    }
  },
  // 拼团
  assembleIdFnClick: function() {
    var _this = this
    // 标记
    var assembleNumMa = _this.data.assembleId
    // 如果存在userID则证明授权过
    if (!_this.data.user_id) {
      wx.navigateTo({
        url: '/pages/login/login?assembleNumMa=' + assembleNumMa,
      })
    } else {
      var goodsId = this.data.infoDet.goodsId;
      // 如果有phone则跳转详情
      if (!_this.data.phone) {
        wx.switchTab({
          url: '/pages/personal/personal?assembleNumMa=' + assembleNumMa,
        })
      } else {
        // 获取订单Id
        var assembleId = this.data.assembleId
        // 获取用户Id
        var clickUserId = this.data.user_id
        // 拼装请求所需参数
        var params = {
          // 请求方法名
          action: 'clickToGroup',
          // 请求参数
          requestParam: {
            assembleId: assembleId,
            clickUserId: clickUserId
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
            // 如果请求成功则跳转
          }
        })
      }
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.PointsFn()
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