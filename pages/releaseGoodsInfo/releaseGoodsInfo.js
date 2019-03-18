// 声明接口名称
var WxLicUrl = getApp().globalData.wx_url_1;
// 引入阿里上传图片的JavaScript库
var uploadImage = require('../../utils/uploadFile.js');
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 列表图片
    ListChooseImages: '../../images/up_img.png',
    // 商品图
    ImgChooseImages: '../../images/up_img.png',
    // 详情图片
    DetChoose: '../../images/up_img.png',
    // 开始时间
    star_date: '2016-09-01',
    // 结束时间
    end_date: '2016-09-01',
    // 索引
    index: 0,
    // 活动性质数组
    array: ['砍价商品', '拼团商品', '0元购商品'],
    SkuArr: ['单一属性商品', '多类属性商品'],
    indexSku: 0,
    // 是否承担运费 数组
    SingleItems: [{
        name: '包邮',
        checked: true
      },
      {
        name: '自理',
        checked: false
      }
    ],
    // 运费
    freight: 0,
    // SKU第一行数组
    SkuOne: [{
      styles: "",
      prices: "",
      stock: ''
    }, ],
    // SKU第二行数组
    SkuTwo: [{
      colour: "",
      texture: "",
      size: '',
      prices: '',
      stock: ''
    }],
    // 商品属性显示条件
    attrType: true,
    // 活动性质
    activity_type: 1,
    // 选择商品性质之后判断应该显示的输入框
    ZeroState: false,
    AssembleState: false,
    BargainState: true,
    sex: "包邮"
  },
  // 监听商品名称函数
  ToGoodsName: function(e) {
    this.setData({
      goods_name: e.detail.value
    })
  },
  // 监听商品简介函数
  ToGoodsDescribe: function(e) {
    this.setData({
      goods_describe: e.detail.value
    })
  },
  // 选择商品属性
  bindPickerChangeSku: function(e) {
    var attrType = e.detail.value
    if (attrType == 1) {
      this.setData({
        indexSku: e.detail.value,
        attrType: false
      })
    } else {
      this.setData({
        indexSku: e.detail.value,
        attrType: true
      })
    }

  },
  // 选择活动性质
  bindPickerChange: function(e) {
    var act = e.detail.value
    if (act == 0) {
      var activity_type = 1;
      var BargainState = true;
      var AssembleState = false
      var ZeroState = false
    } else if (act == 1) {
      var activity_type = 2
      var AssembleState = true;
      var BargainState = false
      var ZeroState = false
    } else {
      var activity_type = 3
      var ZeroState = true;
      var AssembleState = false
      var BargainState = false
    }
    this.setData({
      index: act,
      activity_type: activity_type,
      ZeroState: ZeroState,
      AssembleState: AssembleState,
      BargainState: BargainState,
    })
  },
  // 选择开始时间
  bindStarDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      star_date: e.detail.value
    })
  },
  // 选择结束时间
  bindEndDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      end_date: e.detail.value
    })
  },
  // 点击增加"款式，售价，库存"（第一行）
  AddSkuOne: function(e) {
    var _this = this
    // 获取数组中（第一行）
    var SkuOne = _this.data.SkuOne
    var temp = {
      styles: '',
      prices: '',
      stock: ''
    }
    // 把新的空数组放到数组的末尾
    SkuOne.push(temp)
    _this.setData({
      SkuOne: SkuOne
    })
  },
  // 点击删除"款式，售价，库存"（第一行）
  RemSkuOne: function(e) {
    var _this = this
    // 获得操作项的索引
    var index = e.target.dataset.index
    // 获取数组中（第一行）
    var SkuOne = _this.data.SkuOne
    // 删除的指定项
    SkuOne.splice(index, 1)
    _this.setData({
      SkuOne: SkuOne
    })
  },
  // 监听'款式'输入框（第一行）
  SkuOneStyles: function(e) {
    var _this = this
    // 当前输入值
    var styles = e.detail.value
    // 点击操作的数组索引
    var index = e.target.dataset.index
    // 当前数组
    var SkuOne = _this.data.SkuOne
    // 改变原有的数组的指定项
    SkuOne[index].styles = styles;
    _this.setData({
      SkuOne: SkuOne
    })

  },
  // 监听'售价'输入框（第一行）
  SkuOnePrices: function(e) {
    var _this = this
    // 当前输入值
    var prices = e.detail.value
    // 点击操作的数组索引
    var index = e.target.dataset.index
    // 当前数组
    var SkuOne = _this.data.SkuOne
    // 改变原有的数组的指定项
    SkuOne[index].prices = prices;
    _this.setData({
      SkuOne: SkuOne
    })
  },
  // 监听'售价'输入框（第一行）
  SkuOneStock: function(e) {
    var _this = this
    // 当前输入值
    var stock = e.detail.value
    // 点击操作的数组索引
    var index = e.target.dataset.index
    // 当前数组
    var SkuOne = _this.data.SkuOne
    // 改变原有的数组的指定项
    SkuOne[index].stock = stock;
    _this.setData({
      SkuOne: SkuOne
    })
  },
  // 点击增加"款式，售价，库存"（第二行）
  AddSkuTwo: function(e) {
    var _this = this
    // 获取数组中（第一行）
    var SkuTwo = _this.data.SkuTwo
    var temp = {
      colour: "",
      texture: "",
      size: "",
      prices: "",
      stock: ""
    }
    // 把新的空数组放到数组的末尾
    SkuTwo.push(temp)
    _this.setData({
      SkuTwo: SkuTwo
    })
  },
  // 点击删除"款式，售价，库存"（第二行）
  RemSkuTwo: function(e) {
    var _this = this
    // 获得操作项的索引
    var index = e.target.dataset.index
    // 获取数组中（第一行）
    var SkuTwo = _this.data.SkuTwo
    // 删除的指定项
    SkuTwo.splice(index, 1)
    _this.setData({
      SkuTwo: SkuTwo
    })
  },
  // 监听“颜色”输入框（第二行）
  SkuTwoColour: function(e) {
    var _this = this
    // 当前输入值
    var colour = e.detail.value
    // 点击操作的数组索引
    var index = e.target.dataset.index
    // 当前数组
    var SkuTwo = _this.data.SkuTwo
    //  
    SkuTwo[index].colour = colour;
    _this.setData({
      SkuTwo: SkuTwo
    })
  },
  // 监听“材质”输入框（第二行）
  SkuTwoTexture: function(e) {
    var _this = this
    // 当前输入值
    var texture = e.detail.value
    // 点击操作的数组索引
    var index = e.target.dataset.index
    // 当前数组
    var SkuTwo = _this.data.SkuTwo
    //  
    SkuTwo[index].texture = texture;
    _this.setData({
      SkuTwo: SkuTwo
    })
  },
  // 监听“尺码”输入框（第二行）
  SkuTwoSize: function(e) {
    var _this = this
    // 当前输入值
    var size = e.detail.value
    // 点击操作的数组索引
    var index = e.target.dataset.index
    // 当前数组
    var SkuTwo = _this.data.SkuTwo
    //  
    SkuTwo[index].size = size;
    _this.setData({
      SkuTwo: SkuTwo
    })
  },
  // 监听“售价”输入框（第二行）
  SkuTwoPrices: function(e) {
    var _this = this
    // 当前输入值
    var prices = e.detail.value
    // 点击操作的数组索引
    var index = e.target.dataset.index
    // 当前数组
    var SkuTwo = _this.data.SkuTwo
    //  
    SkuTwo[index].prices = prices;
    _this.setData({
      SkuTwo: SkuTwo
    })
  },
  // 监听“库存”输入框（第二行）
  SkuTwoStock: function(e) {
    var _this = this
    // 当前输入值
    var stock = e.detail.value
    // 点击操作的数组索引
    var index = e.target.dataset.index
    // 当前数组
    var SkuTwo = _this.data.SkuTwo
    //  
    SkuTwo[index].stock = stock;
    _this.setData({
      SkuTwo: SkuTwo
    })
  },
  // 上传图片 商品列表
  ListChoose: function() {
    var _this = this
    wx.chooseImage({
      count: 1, // 默认最多一次选择9张图
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        var nowTime = util.formatTime(new Date());

        //支持多图上传
        for (var i = 0; i < res.tempFilePaths.length; i++) {
          //显示消息提示框
          wx.showLoading({
            title: '上传中' + (i + 1) + '/' + res.tempFilePaths.length,
            mask: true
          })

          //上传图片
          //你的域名下的/cbb文件下的/当前年月日文件下的/图片.png
          //图片路径可自行修改
          uploadImage(res.tempFilePaths[i], 'cbb/' + nowTime + '/',
            function(result) {
              console.log("======上传成功图片地址为：", result);
              _this.setData({
                ListChooseImages: result,

              })
              wx.hideLoading();
            },
            function(result) {
              console.log("======上传失败======", result);
              _this.setData({
                ListChooseImages: result,

              })
              wx.hideLoading()
            }
          )
        }
      }
    })
  },
  // 上传图片 商品图
  ImgChoose: function() {
    var _this = this
    wx.chooseImage({
      count: 1, // 默认最多一次选择9张图
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        var nowTime = util.formatTime(new Date());

        //支持多图上传
        for (var i = 0; i < res.tempFilePaths.length; i++) {
          //显示消息提示框
          wx.showLoading({
            title: '上传中' + (i + 1) + '/' + res.tempFilePaths.length,
            mask: true
          })

          //上传图片
          //你的域名下的/cbb文件下的/当前年月日文件下的/图片.png
          //图片路径可自行修改
          uploadImage(res.tempFilePaths[i], 'cbb/' + nowTime + '/',
            function(result) {
              console.log("======上传成功图片地址为：", result);
              _this.setData({
                ImgChooseImages: result,

              })
              wx.hideLoading();
            },
            function(result) {
              console.log("======上传失败======", result);
              _this.setData({
                ImgChooseImages: result,

              })
              wx.hideLoading()
            }
          )
        }
      }
    })
  },
  // 上传图片 商品详情
  DetChoose: function() {
    var _this = this
    wx.chooseImage({
      count: 1, // 默认最多一次选择9张图
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        var nowTime = util.formatTime(new Date());

        //支持多图上传
        for (var i = 0; i < res.tempFilePaths.length; i++) {
          //显示消息提示框
          wx.showLoading({
            title: '上传中' + (i + 1) + '/' + res.tempFilePaths.length,
            mask: true
          })

          //上传图片
          //你的域名下的/cbb文件下的/当前年月日文件下的/图片.png
          //图片路径可自行修改
          uploadImage(res.tempFilePaths[i], 'cbb/' + nowTime + '/',
            function(result) {
              console.log("======上传成功图片地址为：", result);
              _this.setData({
                DetChoose: result,

              })
              wx.hideLoading();
            },
            function(result) {
              console.log("======上传失败======", result);
              _this.setData({
                DetChoose: result,

              })
              wx.hideLoading()
            }
          )
        }
      }
    })
  },
  // 是否包邮函数
  changeSex: function(e) {
    console.log(e.detail.value)
    var Sex = e.detail.value
    this.setData({
      sex: Sex
    })
  },
  // 运费函数
  ToSex: function(e) {
    console.log(e)
    this.setData({
      freight: e.detail.value
    })
  },
  // 商品底价函数
  TofloorPrice: function(e) {
    console.log(e)
    this.setData({
      floor_price: e.detail.value
    })
  },
  // 拼团人数函数
  TogroupNumber: function(e) {
    console.log(e)
    this.setData({
      group_number: e.detail.value
    })
  },
  // 团购价函数
  TogroupPurchasePrice: function(e) {
    console.log(e)
    this.setData({
      group_purchase_price: e.detail.value
    })
  },
  // 0元购需要人数函数
  TozeroNumber: function(e) {
    console.log(e)
    this.setData({
      zero_number: e.detail.value
    })
  },
  // 提交信息
  RqSUmit: function() {
    var _this = this
    // 声明user_id
    let user_id = _this.data.user_id;
    // 拼装请求所需参数
    // 判断商品属性单一还是多选
    var indexSku = _this.data.indexSku
    if (indexSku == 0) {
      var goodsStyle = _this.data.SkuOne
      var goodsAttribute = []
    } else {
      var goodsStyle = []
      var goodsAttribute = _this.data.SkuTwo
    }
    // 判断是否包邮
    var sex = _this.data.sex
    if (sex == "包邮") {
      var freight = 0
    } else {
      var freight = _this.data.freight
    }

    var params = {
      // 请求方法名
      action: 'releaseOrEditGoods',
      // 请求参数
      requestParam: {
        // 商品ID 新增时为0
        goodsId: 0,
        // 商户ID 
        busId: user_id,
        // 商品名称
        goodsName: _this.data.goods_name,
        // 商品简介
        goodsDescribe: _this.data.goods_describe,
        // 商品列表图片
        listImage: _this.data.ListChooseImages,
        // 商品详情图片
        detailsImage: _this.data.DetChoose,
        // 商品详情大图
        detailsBigImage: _this.data.ImgChooseImages,
        // 活动类型：砍价，拼团，0元购
        activityType: _this.data.activity_type,
        // 开始时间
        activityStartTime: _this.data.star_date,
        // 结束时间
        activityEndTime: _this.data.end_date,
        // 运费
        freight: freight,
        // 几人成团
        groupNumber: _this.data.group_number,
        // 团购价
        groupPurchasePrice: _this.data.group_purchase_price,
        // 0元购人数
        zeroNumber: _this.data.zero_number,
        // 商品底价
        floorPrice: _this.data.floor_price,
        // 款式
        goodsStyle: goodsStyle,
        // 商品属性
        goodsAttribute: goodsAttribute,
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
        let resData = res.data
        if (resData.code == 0) {
          wx.navigateTo({
            url: '/pages/publishPreview/publishPreview?goodsId=' + resData.goodsId,
          })
        }
      }
    })

  },
  // 跳转页面
  publishPreview: function() {
    wx.navigateTo({
      url: '/pages/publishPreview/publishPreview',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this
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