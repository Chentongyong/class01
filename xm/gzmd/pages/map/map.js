Page({

  /**
   * 页面的初始数据
   */
  data: {
    dcCity:'',
    ss:false,
    money:null,
    ssCity:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'maps',
      success: function (res) {
        that.setData({
          dcCity: res.data
        })
      }
    })
  },
  mapClick:function(e){
    var citys = e.currentTarget.dataset.text;
    wx.setStorageSync('maps',citys);
    wx.switchTab({
      url: '../index/index',
    })
  },
  inpClick: function (e) {
    var that = this;
    that.setData({
      money: e.detail.value
    })
    if (e.detail.value != ''){
      that.setData({
        ss:true
      })
      wx.request({
        url: 'https://wwwgezimd.com/Store/cityaction!wxxcyti.action', 
        data: {
          'store.city': e.detail.value
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          var sum = [];
          for (var i = 0; i < res.data.length; i++){
            sum.push(res.data[i]);
          }
          that.setData({
            ssCity:sum
          })
          console.log(that.data.ssCity)
        },
        fail:function(){
       
        }
      })
    }else{
      that.setData({
        ss: false,
        ssCity:[]
      })
    }
  },
  onShareAppMessage: function () {
    return {
      title: '转发',
      path: '/pages/index/index',
    }
  }
})