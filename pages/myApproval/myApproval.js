// pages/myApproval/myApproval.js
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
    business_license: '',
    result_state:false,
    merAuth_id: '',
    proveState: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 重定向this指向，预防回调函数改变this问题
    var _this = this;
    // 主键data
    if (options.merAuth_id) {
      // 把主键存入data
      _this.setData({
        merAuth_id: options.merAuth_id
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
    if (this.data.merAuth_id) {
      // 查询商户认证信息
      this.editView()
    }

  },
  //DY函数定义 选择照片上传
  choose: function() {
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
                business_license: result,
                result_state:true
              })
              wx.hideLoading();
            },
            function(result) {
              console.log("======上传失败======", result);
              _this.setData({
                business_license: result,
                result_state: false
              })
              wx.hideLoading()
            }
          )
        }
      }
    })
  },
  // 如果是编辑或是查看则执行
  editView: function() {
    let _this = this
    // 获取主键id
    let merAuth_id = _this.data.merAuth_id;
    // 拼装请求所需参数
    var params = {
      // 请求方法名
      action: 'getMerchantAuth',
      // 请求参数
      requestParam: {
        merAuthId: merAuth_id
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
        console.log(resData)
        // 企业名称
        let traOne = resData.companyName;
        // 企业法人
        let traTwo = resData.corporate;
        // 组织机构码
        let traThree = resData.organizationCode;
        // 联系人姓名
        let traFour = resData.contactName;
        // 联系人 电话
        let traFive = resData.contactTel;
        // 公司地址
        let traSix = resData.companyAddr;
        // 公司营业执照
        let business_license = resData.businessLicense;
        // 主键ID
        let merAuth_id = _this.data.merAuth_id
        if (resData.state == 1) {
          //  认证中
          _this.setData({
            proveState: true,
            traOne: traOne,
            traTwo: traTwo,
            traThree: traThree,
            business_license: business_license,
            traFour: traFour,
            traFive: traFive,
            traSix: traSix,
          })
        } else if (resData.state == 2) {
          // 认证通过
          _this.setData({
            proveState: true,
            traOne: traOne,
            traTwo: traTwo,
            traThree: traThree,
            business_license: business_license,
            traFour: traFour,
            traFive: traFive,
            traSix: traSix,
          })
        } else if (resData.state == 3) {
          // 认证失败
          _this.setData({
            proveState: false,
            traOne: traOne,
            traTwo: traTwo,
            traThree: traThree,
            business_license: business_license,
            traFour: traFour,
            traFive: traFive,
            traSix: traSix,
          })
        }

      }
    })
  },
  // 企业名称
  ToTraOne: function(e) {
    let _this = this
    let traOne = e.detail.value
    _this.setData({
      traOne: traOne
    })
  },
  // 企业法人
  ToTraTwo: function(e) {
    let _this = this
    let traTwo = e.detail.value
    _this.setData({
      traTwo: traTwo
    })
  },
  // 组织机构代码
  ToTraThree: function(e) {
    let _this = this
    let traThree = e.detail.value
    _this.setData({
      traThree: traThree
    })
  },
  // 联系人姓名
  ToTraFour: function(e) {
    let _this = this
    let traFour = e.detail.value
    _this.setData({
      traFour: traFour
    })
  },
  // 联系人电话
  ToTraFive: function(e) {
    let _this = this
    let traFive = e.detail.value
    _this.setData({
      traFive: traFive
    })
  },
  // 公司地址
  ToTraSix: function(e) {
    let _this = this
    let traSix = e.detail.value
    _this.setData({
      traSix: traSix
    })
  },

  Submission: function() {
    var _this = this
    // 声明user_id
    let user_id = _this.data.user_id;
    let traOne = _this.data.traOne;
    let traTwo = _this.data.traTwo;
    let traThree = _this.data.traThree;
    let traFour = _this.data.traFour;
    let traFive = _this.data.traFive;
    let traSix = _this.data.traSix;
    let business_license = _this.data.business_license;
    let merAuth_id = _this.data.merAuth_id
    // 拼装请求所需参数
    var params = {
      // 请求方法名
      action: 'addOrEditCertification',
      // 请求参数
      requestParam: {
        userId: user_id,
        companyName: traOne,
        corporate: traTwo,
        organizationCode: traThree,
        businessLicense: business_license,
        contactName: traFour,
        contactTel: traFive,
        companyAddr: traSix,
        merAuthId: merAuth_id
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
          console.log(res.data)
          wx.switchTab({
            url: '/pages/personal/personal',
          })
        }
      }
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
  onShareAppMessage: function() {

  }
})