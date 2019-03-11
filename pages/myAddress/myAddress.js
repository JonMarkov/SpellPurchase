var WxLicUrl = getApp().globalData.wx_url_1;
Page({
  /**
   * 页面的初始数据
   */

  data: {
    // 地址列表
    addressList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    // 重定向this值
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
    //ZX函数执行  进入页面遍历地址列表数据
    this.selectAdress()
  },
  // DY函数定义 查询地址列表函数
  selectAdress: function() {
    var _this = this
    var user_id = this.data.user_id
    // 拼装请求所需参数
    var params = {
      // 请求方法名
      action: 'getDeliveryAddrsByUserId',
      // 请求参数
      requestParam: {
        userId: user_id
      }
    }
    // 请求参数合并
    const newparams = Object.assign(params);
    wx.request({
      url: WxLicUrl,
      method: "POST",
      data: newparams,
      header: {
        "content-type": "application/json"
      },
      success: function(res) {
        console.log(res)
        let resData = res.data
        // 把地址列表放入data  
        _this.setData({
          addressList: resData
        })
      }
    })
  },

  //DY函数执行 长按事件地址条目执行删除
  longTap: function(e) {
    var _this = this
    var index = e.target.dataset.index;
    var addrId = _this.data.addressList[index].addrId;
    wx.showModal({
      title: '提示',
      content: '确定删除',
      success: function(res) {
        console.log(res.confirm)
        if (res.confirm) {
          // 拼装请求所需参数
          var params = {
            // 请求方法名
            action: 'deleteAddress',
            // 请求参数
            requestParam: {
              addrId: addrId
            }
          }
          // 请求参数合并
          const newparams = Object.assign(params);

          wx.request({
            url: WxLicUrl,
            method: "POST",
            data: newparams,
            header: {
              "content-type": "application/json"
            },
            success: function(res) {
              console.log(res)
              let resData = res.data

              if (resData.code == 0) {
                // 重新请求列表页面
                _this.selectAdress()

              }
            }
          })
        }

      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},
  //DY函数定义 点击进入添加页面
  addAddress: function() {
    wx.navigateTo({
      url: '../address/address'
    });
  },
  // DY函数定义 修改当前地址
  modAddress: function(e) {
    var index = e.target.dataset.index;
    var addrId = this.data.addressList[index].addrId;
    wx.navigateTo({
      url: '../address/address?province=' + addrId,
    })
  }
})