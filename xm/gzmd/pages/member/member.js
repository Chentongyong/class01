Page({

  /**
   * 页面的初始数据
   */
  data: {
    pres: [
      {
        preX: "月度VIP会员",
        sj:"1个月会员",
        je:59
      },
      {
        preX: "季度VIP会员",
        sj: "3个月会员",
        je: 150
      },
      {
        preX: "代理VIP会员",
        sj: "代理服务",
        je: 899
      },
      {
        preX: "代理VIP会员",
        sj: "全权代理",
        je: 2899
      }
    ],
    id:'',
    money:59,
    openid:null,
    uid:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  onShow: function () {
    var that = this;
    wx.getStorage({
      key: 'gzmd',
      success: function (res) {
        that.setData({
          openid: res.data.openids,
          uid: res.data.userUid
        })
      }
    })
  },
  click:function(e){
    var thas = this;
    var ids = e.currentTarget.dataset.id;
    var sew = e.currentTarget.dataset.text;
    thas.setData({
      id:ids,
      money:sew
    })
  },
  pays: function () {
    var that = this;
    wx.request({
      url: 'https://wwwgezimd.com/xcxpays!wxPay.action',
      data: {
        'im.openid': that.data.openid,
        'im.totalfee': that.data.money,
        'im.uid': that.data.uid
      },
      method: 'GET',
      success: function (res) {
        that.doWxPay(res.data);
      }
    });
  },
  doWxPay(param) {
    console.log(param)
    //小程序发起微信支付
    wx.requestPayment({
      timeStamp: param[0].timeStamp,
      nonceStr: param[0].nonceStr,
      package: param[0].package,
      signType: 'MD5',
      paySign: param[0].paySign,
      success: function (event) {
        console.log(event);
        wx.showToast({
          title: '支付成功',
          icon: 'success',
          duration: 2000
        });
      },
      fail: function (error) {
        // fail   
        console.log("支付失败")
        console.log(error)
      },
      complete: function () {
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