Page({

  /**
   * 页面的初始数据
   */
  data: {
    homeImg: [
      {
        'imgUrl': 'https://pic4.zhimg.com/v2-3da78883263a03fe9b14b6f72e88e0de_1200x500.jpg'
      },
      {
        'imgUrl': 'https://pic1.zhimg.com/80/v2-0cfa27275a933e6ab81ec1097a24d25c_hd.jpg'
      }
    ],
    homeCom: [],
    frequency: [],
    nullHouse: true, //先设置隐藏
    swiperCurrent: 0,
    currentSwiper: 0
  },
  goWeimeng: function() {
    wx.navigateTo({
      url: 'outWeimeng/outWeimeng',
    })
  },
  swiperChange: function(e) {
    this.setData({
      currentSwiper: e.detail.current
    })
  },
  ruleshow: function() {
    var currentSwiper = this.data.currentSwiper
    if (currentSwiper==1){
      wx.navigateTo({
        url: 'phoneCharge/phoneCharge',
      })
    }
    if (currentSwiper==0){
      var that = this;
      this.setData({
        nullHouse: false, //弹窗显示
      })
      setTimeout(function () {
        that.data.nullHouse = true
      }, 1000)
    }else{
      console.log(currentSwiper)
    }

  },
  ruleHide: function() {
    this.setData({
      nullHouse: true, //弹窗关闭
    })
  },


  bindToCharge(e) {
    //e是事件源 e.currentTarget点击的目标
    var chickId = e.currentTarget.dataset.chick;
    if (chickId == 5) {
      wx.navigateTo({
        url: 'phoneCharge/phoneCharge'
      })
    } else if (chickId == 8) {
      url: "mall/mall?frequency_id=" + chickId
    } else {
      wx.navigateTo({
        url: "mall/mall?frequency_id=" + chickId
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    var that = this;
    wx.getStorage({
      key: "uerid",
      success: function(res) {
        that.setData({
          user_id: res.data
        })
      }
    })
    //设置数据到data中
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    var that = this;
    wx.getStorage({
      key: "uerid",
      success: function(res) {
        that.setData({
          user_id: res.data
        })
      }
    })
    //获取公共接口
    var phoneUrl = getApp().globalData.wx_url_1
    //执行初始化事件函数
    this.HomeRequest(phoneUrl, this.homeCallback)

  },
  // 初始化页面请求 遍历数据函数
  HomeRequest: function(url, callback) {
    wx.request({
      url: url,
      method: "POST",
      data: {
        service: "home",
        channel: '2'
      },
      header: {
        "content-type": "application/json"
      },
      success: function(res) {
        callback(res.data)
      }
    })
  },
  // 初始化页面请求 遍历数据函数的回调函数
  homeCallback: function(res) {
    console.log(res)
    //轮播接口参数
    var bannerList = res.banner_list;
    var homeImg = [];
    // 商品列表参数
    var comList = res.goods_list;
    var homeCom = [];
    // 循环轮播参数
    for (var idx in bannerList) {
      // 轮播图
      var imgUrl = bannerList[idx].imgUrl;
      // id参数
      var id = bannerList[idx].id;
      var temp = {
        imgUrl: imgUrl,
        id: id,
      }
      homeImg.push(temp)
    };
    // 循环商品参数
    for (var idx in comList) {
      var goods_id = comList[idx].goods_id;
      //广告词
      var ad_words = comList[idx].ad_words;
      // 商品name
      var goods_name = comList[idx].goods_name;
      // 商品原价
      var price = comList[idx].price;
      //商品现价
      var sale_price = comList[idx].sale_price
      //商品介绍图
      var pic_list = comList[idx].pic_list[0].picUrl
      //skuid
      var sku_id = comList[idx].sku_id

      var temp = {
        ad_words: ad_words,
        goods_name: goods_name,
        price: price,
        sale_price: sale_price,
        pic_list: pic_list,
        goods_id: goods_id,
        sku_id: sku_id
      }
      homeCom.push(temp)
    }
    var frequencyList = res.frequency_list;
    var frequency = [];
    for (var i in frequencyList) {
      var frequencyName = frequencyList[i].name;
      var frequencyId = frequencyList[i].id;
      var frequencyImg = frequencyList[i].picUrl;

      var temp = {
        frequencyName: frequencyName,
        frequencyId: frequencyId,
        frequencyImg: frequencyImg
      }
      frequency.push(temp)
    };
    this.setData({
      homeImg: homeImg,
      homeCom: homeCom,
      frequency: frequency
    })
  },
  //点击进入详情页面
  bindToModity: function(e) {
    var goods_id = e.currentTarget.dataset['modity'];
    var sku_id = e.currentTarget.dataset['sku']
    wx.navigateTo({
      url: "/pages/home/commodityDet/commodityDet?goods_id=" + goods_id + "&" + "sku_id=" + sku_id
    })
  },
  bindToMall: function(e) {

    wx.navigateTo({
      url: "mall/mall"
    })
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

  onShareAppMessage: function(res) {
    // return {
    //   title:'转多鱼',
    //   path: 'pages/login/login?sharrUserId=' + this.data.user_id
    // }
  },
})