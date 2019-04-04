var amapFile = require('../../libs/amap-wx.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    city: '',
    list: [],
    latitude: '',
    longitude: '',
    key: "bae2697f5d1a1e5db9dd855e7cd083bf"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    //用微信小程序的api接口获取经度，维度
    // wx.getLocation({
    //   type: 'wgs84',
    //   success: function (res) {
    //     that.data.latitude = res.latitude,
    //     that.data.longitude = res.longitude
    //     that.map();
    //     wx.getStorage({
    //       key: 'maps',
    //       success: function (res) {
    //         console.log(111)
    //         that.setData({
    //           city: res.data
    //         })
    //       }
    //     })
    //   }
    // });
  },
  onShow: function () {
    var that = this;
    if(that.data.city==''){
      wx.getLocation({
        type: 'wgs84',
        success: function (res) {
          that.data.latitude = res.latitude,
          that.data.longitude = res.longitude
          that.map();
          wx.getStorage({
            key: 'maps',
            success: function (res) {
              that.setData({
                city: res.data
              })
              that.zrsj();
            }
          })
        }
      });
    }else{
      wx.getStorage({
        key: 'maps',
        success: function (res) {
          that.setData({
            city: res.data
          })
          that.zrsj();
        }
      })
    }
  },

  map: function() {
    var that = this;
    var myAmapFun = new amapFile.AMapWX({
      key: that.data.key
    });
    myAmapFun.getRegeo({
      location: '' + that.data.longitude + ',' + that.data.latitude + '', //location的格式为'经度,纬度'
      success: function(data) {
        wx.setStorageSync('maps', data[0].regeocodeData.addressComponent.city)
      },
      fail: function(info) {
        wx.setStorageSync('maps', '北京市')
      }

    })
  },
  mapFu: function() { //选择城市
    var that = this;
    let city = that.data.city;
    wx.navigateTo({
      url: '../map/map',
    })
  },
  shopTran: function() { //店铺转让
    var that = this;
    let city = that.data.city;
    wx.navigateTo({
      url: '../transfer/transfer',
    })
  },
  shopWan: function() { //店铺求租
    var that = this;
    let city = that.data.city;
    wx.navigateTo({
      url: '../wanted/wanted',
    })
  },
  shopDeta: function(e) { //转让详情
    var tr = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../tran_details/tran_details?id=' + tr,
    })
  },
  zrsj: function() {
    var that = this;
    wx.request({
      url: 'https://wwwgezimd.com/Store/storeactions!oneToTw.action', //仅为示例，并非真实的接口地址
      data: {
       'store.address' : that.data.city
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        var sum = [];
        for (var i = 0; i < res.data.length; i++) {
          sum.push(res.data[i])
        }
        that.setData({
          list: sum
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