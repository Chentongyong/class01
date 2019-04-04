//logs.js
const util = require('../../utils/util.js')

// Page({
//   data: {
//     logs: []
//   },
//   onLoad: function () {
//     this.setData({
//       logs: (wx.getStorageSync('logs') || []).map(log => {
//         return util.formatTime(new Date(log))
//       })
//     })
//   }
// })


//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    list: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e.detail.userInfo)
    app.globalData.userInfo = e.detail.userInfo,
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    if (e.detail.userInfo) {
      wx.login({
        success: res => {
          console.log(res.code)
          console.log(e.detail.encryptedData)
          console.log(e.detail.iv)
          wx.request({
            url: 'http://192.168.3.5/Store/wxs!login.action',
            data: {
              code: res.code,
              iv: e.detail.iv,
              encryptedData: e.detail.encryptedData,
            },
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              //从数据库获取用户信息
              console.log(res)
              // 授权成功后，跳转进入小程序首页
              wx.switchTab({
                url: '../index/index'
              })
            },
            fail: function (info) {
              //失败回调
              console.log('授权失败，请重新授权')
            }
          })
        }
      })
    } else {
      console.log(333, '执行到这里，说明拒绝了授权')
      wx.showToast({
        title: "为了您更好的体验,请先同意授权",
        icon: 'none',
        duration: 2000
      })
    }
  }
})
