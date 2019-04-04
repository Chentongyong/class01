Page({

  /**
   * 页面的初始数据
   */
  data: {
    uid: '',
    data_list: [],
    types: false,
    sum: ['转让', '求租'],
    ames: false,
    stype: false,
  },
  onShow: function() {
    var that = this;
    wx.getStorage({
      key: 'gzmd',
      success: function(res) {
        that.setData({
          uid: res.data.userUid
        })
        that.zrfus();
      }
    })
  },
  shows: function() {
    var that = this;
    that.setData({
      types: (!that.data.types),
    })
  },
  hides: function() {
    var that = this;
    that.setData({
      types: (!that.data.types),
    })
  },
  xuanze: function(e) {
    var that = this;
    var tyse = e.currentTarget.dataset.id;
    that.setData({
      types: (!that.data.types),
    })
    var aa = 11;
    if (tyse == 1) {
      that.setData({
        stype: (!that.data.stype),
      })
      that.qzfus();
    } else {
      that.setData({
        stype: (!that.data.stype),
      })
      that.zrfus();
    }
  },
  click: function(e) { //显示隐藏
    var thas = this;
    var ids = e.currentTarget.dataset.id; //获取自定义的id   
    thas.setData({
      id: ids, //把获取的自定义id赋给当前组件的id(即获取当前组件)
      ames: (!thas.data.ames)
    })
  },
  tranClick: function(e) { //跳转转让详情
    var tr = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../tran_details/tran_details?id=' + tr,
    })
  },
  wanClick: function(e) { //跳转求租详情
    var tr = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../wan_details/wan_details?id=' + tr,
    })
  },
  tranIssue: function(e) { //修改转让
    var tr = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../tran_issue/tran_issue?id=' + tr,
    })
  },
  wanIssue: function(e) { //修改求租
    var tr = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../wan_issue/wan_issue?id=' + tr,
    })
  },
  zrfus: function() { //获取转让
    var that = this;
    wx.request({
      url: 'https://wwwgezimd.com/Store/storeactions!MyStore.action', //仅为示例，并非真实的接口地址
      data: {
        'user.uid': that.data.uid,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        that.setData({
          data_list: res.data
        })
      },
      fail: function() {

      }
    })
  },
  qzfus: function() { //获取求租
    var that = this;
    wx.request({
      url: 'https://wwwgezimd.com/Store/spapp!queryword.action', //仅为示例，并非真实的接口地址
      data: {
        'u.uid': that.data.uid,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        console.log(res.data)
        that.setData({
          data_list: res.data
        })
      },
      fail: function() {

      }
    })
  },
  delete1: function(e) { //转让删除
    var that = this;
    var tr = e.currentTarget.dataset.id;
    var xb = e.currentTarget.dataset.text;
    wx.request({
      url: 'https://wwwgezimd.com/Store/storeactions!my_delete.action',
      data: {
        'store.sid': tr
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        that.zrfus()
        wx.showToast({
          title: '删除成功',
          icon: 'success',
          duration: 2000
        })

      },
      fail: function() {
        wx.showToast({
          title: '网络延迟',
          icon: 'success',
          duration: 2000
        })
      }
    })
  },
  delete2: function(e) { //求租删除
    var that = this;
    var tr = e.currentTarget.dataset.id;
    var xb = e.currentTarget.dataset.text;
    wx.request({
      url: 'https://wwwgezimd.com/Store/spapp!my_delete.action',
      data: {
        'shopPurchase.spid': tr
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        that.qzfus()
        wx.showToast({
          title: '删除成功',
          icon: 'success',
          duration: 2000
        })

      },
      fail: function() {
        wx.showToast({
          title: '网络延迟',
          icon: 'success',
          duration: 2000
        })

      }
    })
  },
  onShareAppMessage: function () {
    return {
      title: '转发',
      path: '/pages/index/index',
    }
  }
})