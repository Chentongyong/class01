Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    datas:'',
    date:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      id: options.id,
    });
    wx.getStorage({
      key: 'maps',
      success: function (res) {
      }
    })
    var sid = this.data.id;
    wx.request({
      url: 'https://wwwgezimd.com/Store/storeactions!oneToOne.action', 
      data: {
        'store.sid': sid
      },
      header: {
        'content-type': 'application/json' 
      },
      success: function (res) {
        that.setData({
          datas: res.data,
          date: that.formatDate(res.data.sdate)
        })
      },
      fail:function(){

      }
    })
  },
  phoneCall: function (e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.replyPhone,
      success: function () {
        console.log("成功拨打电话")
      },
    })
  },
  formatDate: function (time) {
    var date = new Date(time);
    var year = date.getFullYear(),
      month = date.getMonth() + 1, //月份是从0开始的
      day = date.getDate(),
      hour = date.getHours(),
      min = date.getMinutes(),
      sec = date
        .getSeconds();
    var newTime = year + '-' + (month < 10 ? '0' + month : month) + '-' +
      (day < 10 ? '0' + day : day);
    return newTime;
  },
  onShareAppMessage: function () {
    return {
      title: '转发',
      path: '/pages/index/index',
    }
  }
})