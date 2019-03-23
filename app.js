App({
  /**     * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）     */
  onLaunch: function() {
    var that = this;
  },
  /**     * 设置全局变量     */
  globalData: {
    wx_url_1: 'http://192.168.1.105:8080/yxqpg/index',
    // wx_url_1:'http://47.105.235.162:8080/yxqpg/index'
  }
})