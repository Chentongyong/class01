Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    code: 1,
    userName: '',
    userImg: '',
    member: '',
    openids: '',
    userUid: ''
  },
  onShow: function() {
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function(res) {
        // console.log(res)
        if (res.authSetting['scope.userInfo']) {
          // wx.getUserInfo({
          // success: function(res) {
          wx.login({
            success: res => {
              var codes = res.code;
                that.queryUsreInfo(codes);
            }
          })
          //     console.log(res)
          //     //从数据库获取用户信息
          //     that.queryUsreInfo();
          //     //用户已经授权过
          //     wx.switchTab({
          //       url: '../index/index'
          //     })
          //   }
          // });
        }
      }
    })
  },
  bindGetUserInfo: function(e) {
    var that = this;
    if (e.detail.userInfo) {
      wx.login({
        success: res => {
          //用户按了允许授权按钮
          //插入登录的用户的相关信息到数据库
          // console.log(res.code, e.detail.iv, e.detail.encryptedData)
          wx.request({
            url: 'https://wwwgezimd.com/Store/wxs!login.action',
            data: {
              code: res.code,
              iv: e.detail.iv,
              encryptedData: e.detail.encryptedData,
            },
            header: {
              'content-type': 'application/json'
            },
            success: function(res) {
              console.log(res)
              //从数据库获取用户信息
              that.setData({
                userName: res.data.nickName,
                userImg: res.data.avatarurl,
                member: res.data.member,
                openids: res.data.openid,
                userUid: res.data.uid
              })
              wx.setStorageSync('gzmd', {
                'userName': that.data.userName,
                'userImg': that.data.userImg,
                'member': that.data.member,
                'openids': that.data.openids,
                'userUid': that.data.userUid
              })
              // 授权成功后，跳转进入小程序首页
              wx.switchTab({
                url: '../index/index'
              })
            },
            fail: function(info) {
              //失败回调
              console.log('授权失败，请重新授权')
            }
          });
        }
      })
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
    }
  },
  //获取用户信息接口
  queryUsreInfo: function(codes) {
    var that = this;
    wx.request({
      url: 'https://wwwgezimd.com/Store/wxs!getUser.action',
      data: {
        code: codes
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        // console.log(res)
        that.setData({
          userName: res.data.nickName,
          userImg: res.data.avatarurl,
          member: res.data.member,
          openids: res.data.openid,
          userUid: res.data.uid
        })
        wx.setStorageSync('gzmd', {
          'userName': that.data.userName,
          'userImg': that.data.userImg,
          'member': that.data.member,
          'openids': that.data.openids,
          'userUid': that.data.userUid
        })
        wx.switchTab({
          url: '../index/index'
        })
      }
    });
  },

})