var WxLicUrl = getApp().globalData.wx_url_1;
// 引入省市区的JavaScript库
var  area =  require('../../utils/area.js');

var  areaInfo = []; 
//所有省市区县数据
var  provinces = []; 
//省
var  provinceNames = []; 
//省名称
var  citys = []; 
//城市
var  cityNames = []; 
//城市名称
var  countys = []; 
//区县
var  countyNames = []; 
//区县名称
var  value = [0,  0,  0]; 
//0
var  addressList =  null;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 收货人
    consignee: '',
    // 手机号
    mobile: '',
    // 详细地址
    address: '',
    // 主键
    addrid: '',
    provinceIndex:  0,
      //省份
    cityIndex:  0,
      //城市
    countyIndex:  0,
      //区县
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    // 重定向this值
    var _this = this;
    console.log(options)
    if (options.addrId) {
      _this.setData({
        addrid: options.addrId
      })
    }
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
    if (this.data.addrid != '') {
      this.detInfo()
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;


    // 执行调用JavaScript省市区库
    area.getAreaInfo(function(arr) {
      areaInfo = arr;
      //ZX函数 执行获取省份数据
      that.getProvinceData();
    });
  },
  // DY函数执行 如果是编辑则获取信息
  detInfo: function() {
    var that = this
    var addrid = this.data.addrid
    var params = {
      // 请求方法名
      action: 'getDeliveryAddress',
      // 请求参数
      requestParam: {
        addrid: addrid
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
        console.log(res)
        // 如果请求成功则跳转
        that.setData({
          consignee: res.data.receiverName,
          mobile: res.data.receiverPhone,
          address: res.data.detailedAddress,
          provinceIndex: res.data.province,
        })
        // 开始执行当前所选省份
        that.bindProvinceNameChangeTwo(res.data.province)
      }
    })
  },
  // DY函数执行 获取收货人输入框内容
  consigneeFn: function(e) {
    this.setData({
      consignee: e.detail.value
    })
  },
  // DY函数执行 获取收货人输入框内容
  mobileFn: function(e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  // DY函数执行 获取详细地址输入框内容
  addressFn(e) {
    this.setData({
      address: e.detail.value
    })
  },
  // DY函数执行 执行省份函数
  getProvinceData: function() {
    var  that =  this;
    var  s;
    // 省份数据列表
    provinces = [];
    // 省份数据名字列表
    provinceNames = [];
    var  num =  0;
    for  (var  i =  0; i < areaInfo.length; i++) {
      s = areaInfo[i];
      if  (s.di ==  "00"  && s.xian ==  "00") {
        provinces[num] = s;
        provinceNames[num] = s.name;
        num++;
      }
    }
    // 把得到的省份数据名字列表放入data中
    that.setData({
      provinceNames: provinceNames
    })
    // ZX函数执行 执行获取城市列表函数
    that.getCityArr();
    // Zx函数执行 执行获取区县列表函数
    that.getCountyInfo();  
  },
  // DY函数执行 执行城市函数
  getCityArr: function(count =  0) {
    var  c;
    // 城市数据列表
    citys = [];
    // 城市名字数据列表
    cityNames = [];
    var  num =  0;
    for  (var  i =  0; i < areaInfo.length; i++) {
      c = areaInfo[i];
      if  (c.xian ==  "00"  && c.sheng == provinces[count].sheng && c.di !=  "00") {
        citys[num] = c;
        cityNames[num] = c.name;
        num++;
      }
    }
    if  (citys.length ==  0) {
      citys[0] = {
        name:   ''
      };
      cityNames[0] = {
        name:   ''
      };
    }
    var  that =  this;
    that.setData({
      citys: citys,
      cityNames: cityNames
    })
    console.log('cityNames:'  + cityNames);
    that.getCountyInfo(count,  0);  
  },
  // DY函数执行 获取区县数据
  getCountyInfo: function(column0 =  0, column1 =  0) {
    var  c;
    countys = [];
    countyNames = [];
    var  num =  0;
    for  (var  i =  0; i < areaInfo.length; i++) {
      c = areaInfo[i];
      if  (c.xian !=  "00"  && c.sheng == provinces[column0].sheng && c.di == citys[column1].di) {
        countys[num] = c;
        countyNames[num] = c.name;
        num++;
      }
    }

    if  (countys.length ==  0) {
      countys[0] = {
        name:   ''
      };
      countyNames[0] = {
        name:   ''
      };
    }
    console.log('countyNames:'  + countyNames);
    var  that =  this;
    // value = [column0, column1, 0];
    that.setData({
      countys: countys,
      countyNames: countyNames,
      // value: value,
    })  
  },
  // DY函数定义 选择省份函数定义
  bindProvinceNameChange: function(e) {
    var  that =  this;
    console.log('picker province 发生选择改变，携带值为', e.detail.value);
    var  val = e.detail.value
    that.getCityArr(val);  //获取地级市数据
    that.getCountyInfo(val,  0);  //获取区县数据
    value = [val,  0,  0];
    this.setData({
      provinceIndex: e.detail.value,
      cityIndex:  0,
      countyIndex:  0,
      value: value
    })  
  },
  // DY函数定义 选择省份函数定义Two 修改进入
  bindProvinceNameChangeTwo: function(e) {
    console.log(e)
    var that = this;
    var val = e
    that.getCityArr(val);  //获取地级市数据
    that.getCountyInfo(val, 0);  //获取区县数据
    value = [val, 0, 0];
    this.setData({
      provinceIndex: e,
      cityIndex: 0,
      countyIndex: 0,
      value: value
    })
    // ZX函数执行 开始执行请求所选城市数据
    this.cityMa()
  },
  // DY函数定义 开始执行请求所选城市数据
  cityMa: function() {
    var that = this
    var addrid = this.data.addrid
    var params = {
      // 请求方法名
      action: 'getDeliveryAddress',
      // 请求参数
      requestParam: {
        addrid: addrid
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
        console.log(res)
        // 如果请求成功则跳转
        that.setData({
          cityIndex: res.data.city,
        })
        //ZX函数执行 开始执行请求所选区县数据
        that.countysMa()
      }
    })
  },
  // ZX函数定义 开始执行请求所选城市数据
  countysMa: function() {
    var that = this
    var addrid = this.data.addrid
    var params = {
      // 请求方法名
      action: 'getDeliveryAddress',
      // 请求参数
      requestParam: {
        addrid: addrid
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
        console.log(res)
        // 如果请求成功则跳转
        that.setData({
          countyIndex: res.data.county
        })

      }
    })
  },
  // DY函数定义 选择城市函数定义
  bindCityNameChange: function(e) {
    var  that =  this;
    console.log('picker city 发生选择改变，携带值为', e.detail.value);
    var  val = e.detail.value
    that.getCountyInfo(value[0], val);  //获取区县数据
    value = [value[0], val,  0];
    this.setData({
      cityIndex: e.detail.value,
      countyIndex:  0,
      value: value
    }) 

  },
  // DY函数定义 选择区县函数定义
  bindCountyNameChange:   function(e) {
    var  that =  this;
    console.log('picker county 发生选择改变，携带值为', e.detail.value);
    this.setData({
      countyIndex: e.detail.value
    })  
  },
  //DY函数定义 确认提交
  addAddressFn: function() {
    var _this = this
    // 收货人
    let receiver_name = this.data.consignee;
    // 手机号
    let receiver_phone = this.data.mobile;
    // 详细地址
    let detailed_address = this.data.address;
    // 省份
    let province = this.data.provinceNames[this.data.provinceIndex]
    let provinceIndex = this.data.provinceIndex
    // 城市
    let city = this.data.cityNames[this.data.cityIndex]
    let cityIndex = this.data.cityIndex
    // 区县
    let county = this.data.countyNames[this.data.countyIndex]
    let countyIndex = this.data.countyIndex

    // 用户id
    var user_id = this.data.user_id
    // 主键Id
    var addrid = this.data.addrid
    // 拼装请求所需参数
    var params = {
      // 请求方法名
      action: 'addOrEditAddr',
      // 请求参数
      requestParam: {
        userId: user_id,
        addrId: addrid,
        receiverName: receiver_name,
        receiverPhone: receiver_phone,
        province: province,
        city: city,
        county: county,
        provinceIndex: provinceIndex,
        cityIndex: cityIndex,
        countyIndex: countyIndex,
        detailedAddress: detailed_address

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
        wx.navigateTo({
          url: '/pages/myAddress/myAddress',
        })
      }
    })
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