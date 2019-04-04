Page({

  /**
   * 页面的初始数据
   */
  data: {
    palance: '0.00',
    money: null,
    openid: '',
    uid: null,
    opineid: null
  },
  onShow: function() {
    var that = this;
    wx.getStorage({
      key: 'gzmd',
      success: function(res) {
        that.setData({
          openid: res.data.openids,
          uid: res.data.userUid
        })
        that.bala();
      }
    })
  },
  inpClick: function(e) {
    var that = this;
    that.data.money = e.detail.value;
  },
  bala: function() {
    var that = this;
    wx.request({
      url: 'https://wwwgezimd.com/Store/appuser!chaxunye.action',
      data: {
        'u.uid': that.data.uid
      },
      header: {
        'content-type': 'aspplication/json' // 默认值
      },
      success: function(res) {
        console.log(res)
        if (res.data.money == 0) {
          that.setData({
            balance: '0.00'
          })
        } else {
          that.setData({
            balance: res.data.money
          })
        }

      }
    })
  },
  pays: function() {
    var that = this;
    wx.request({
      url: 'https://wwwgezimd.com/xcxpays!wxPay.action',
      data: {
        'im.openid': that.data.openid,
        'im.totalfee': that.data.money,
        'im.uid': that.data.uid +'congzhi'
      },
      method: 'GET',
      success: function(res) {
        if (that.data.money > 0){
          that.doWxPay(res.data);
        }
      }
    });
  },
  doWxPay(param) {
    var that = this;
    //小程序发起微信支付
    wx.requestPayment({
      timeStamp: param[0].timeStamp,
      nonceStr:param[0].nonceStr,
      package: param[0].package,
      signType: 'MD5',
      paySign: param[0].paySign,
      success: function(event) {
        wx.showToast({
          title: '支付成功',
          icon: 'success',
          duration: 2000
        });
        that.bala();
        that.setData({
          money:null
        })
      },
      fail: function(error) {
        // fail   
        console.log("支付失败")
        console.log(error)
      },
      complete: function() {
        // complete   
        console.log("pay complete")
      }
    });
  },
  onShareAppMessage: function () {
    return {
      title: '转发',
      path: '/pages/index/index',
    }
  }
})