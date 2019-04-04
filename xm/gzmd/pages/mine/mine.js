Page({

  /**
   * 页面的初始数据
   */
  data: {
    picture:'',
    name:'',
    member:''
  },
  onShow: function() {
    var that = this;
    wx.getStorage({
      key: 'gzmd',
      success: function (res) {
        that.setData({
          picture: res.data.userImg,
          name: res.data.userName,
          member: res.data.member
        })
      }
    })
  },
  myIssue: function() {
    wx.navigateTo({
      url: '../mine_issue/mine_issue',
      success: function() {},
      fail: function() {},
      complete: function() {}
    })
  },
  myYe: function() {
    var tr = 1;
    wx.navigateTo({
      url: '../balance/balance?id=' + tr + '&page=4',
      success: function() {},
      fail: function() {},
      complete: function() {}
    })
  },
  myHy: function() {
    var tr = 1;
    wx.navigateTo({
      url: '../member/member?id=' + tr + '&page=4',
      success: function() {},
      fail: function() {},
      complete: function() {}
    })
  },
  onShareAppMessage: function () {
    return {
      title: '转发',
      path: '/pages/index/index',
    }
  }
})