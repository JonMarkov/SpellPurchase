// pages/product/product.js
// 声明接口名称
var WxLicUrl = getApp().globalData.wx_url_1;
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  // DY函数定义 请求产品列表页面的商品列表函数
  productList: function() {

    var _this = this
    // 声明user_id
    var user_id = this.data.user_id
    // 拼装请求所需参数
    var params = {
      // 请求方法名
      action: 'getAllGoodsByType',
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
  // DY函数定义 查看全部商品跳转
  ToViewAll: function(e) {
    let actType = e.currentTarget.dataset.type
    wx.navigateTo({
      url: '/pages/singleProduct/singleProduct?type=' + actType,
    })
  },
  // DY函数定义 点击进入商品详情页面
  ToDetails: function(e) {
    let goods_id = e.currentTarget.dataset.goods_id
    wx.navigateTo({
      url: '/pages/comDetails/comDetails?goods_id=' + goods_id,
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
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    // 函数执行 请求产品列表页面的商品列表函数
    this.productList()
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