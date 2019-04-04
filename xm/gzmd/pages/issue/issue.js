Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  tranIssue:function(){
    wx.navigateTo({
      url: '../tran_issue/tran_issue?id=1',
      success: function () { },
      fail: function () { },
      complete: function () { }
    })
  },
  wanIssue: function () {
    wx.navigateTo({
      url: '../wan_issue/wan_issue?id=1',
      success: function () { },
      fail: function () { },
      complete: function () { }
    })
  },
  onShareAppMessage: function () {
    return {
      title: '转发',
      path: '/pages/index/index',
    }
  }
})