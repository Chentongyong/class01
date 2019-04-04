var page = 0;
var rows = 15;
var moment_list = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: ['', '', '', '', '', '', '', ''],
    lx_list: ['酒楼餐饮', '美容美发', '服饰鞋包', '休闲娱乐', '百货超市', '生活服务', '空铺转让', '电子通信', '汽修美容', '医药保健', '教育培训', '其他行业'],
    lx_mj: [{
      mj: 20,
      mj_sm: '平方以下'
    }, {
      mj: '20~50',
      mj_sm: '平方'
    }, {
      mj: '50~100',
      mj_sm: '平方'
    }, {
      mj: '100~200',
      mj_sm: '平方'
    }, {
      mj: '200~500',
      mj_sm: '平方'
    }, {
      mj: 500,
      mj_sm: '平方以上'
    }],
    lx_qy: [],
    qu: false, //区域显示隐藏
    zzc: false, //遮罩层显示隐藏
    lx: false, //类型显示隐藏
    mj: false, //面积显示隐藏
    moment: [],
    leix: '类型',
    quyu: '区域',
    mianji: '面积',
    city: '', //城市
    mjMax: '', //面积最大值
    mjMin: '', //面积最小值
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function(options) {
    var that = this;
    wx.getStorage({
      key: 'maps',
      success: function(res) {
        that.setData({
          city: res.data
        })
        //城市定位
        wx.request({
          url: 'https://wwwgezimd.com/Store/cityaction!main.action', //仅为示例，并非真实的接口地址
          data: {
            'store.city': that.data.city
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function(res) {
            var sun = res.data;
            that.setData({
              lx_qy: sun,
            })
          },
          fail: function() {

          }
        });
        that.onReachBottom();
      }
    })
  },
  onChangeShowState1: function() { //区域二级
    var that = this;
    that.setData({
      qu: (!that.data.qu),
      zzc: (!that.data.zzc),
      lx: that.data.lx = false,
      mj: that.data.mj = false
    })
  },

  onChangeShowState2: function() { //类型二级
    var that = this;
    that.setData({
      lx: (!that.data.lx),
      zzc: (!that.data.zzc),
      mj: that.data.mj = false,
      qu: that.data.qu = false,
    })
  },

  onChangeShowState3: function() { //面积二级
    var that = this;
    that.setData({
      mj: (!that.data.mj),
      zzc: (!that.data.zzc),
      lx: that.data.lx = false,
      qu: that.data.qu = false,
    })
  },

  zzc: function() { //遮罩層
    var that = this;
    that.setData({
      zzc: (!that.data.zzc),
      qu: that.data.qu = false,
      lx: that.data.lx = false,
      mj: that.data.mj = false,
    })
  },
  qus: function(e) { //选择区域
    var that = this;
    var quyus = e.currentTarget.dataset.text;
    that.setData({
      qu: (!that.data.qu),
      zzc: (!that.data.zzc),
      quyu: quyus
    })
    page = 0,
      moment_list = [],
      that.onReachBottom();
  },
  types: function(e) { //选择类型
    var that = this;
    var leixing = e.currentTarget.dataset.text;
    that.setData({
      lx: (!that.data.lx),
      zzc: (!that.data.zzc),
      leix: leixing
    })
    page = 0,
      moment_list = [],
      that.onReachBottom();
  },
  area: function(e) { //选择面积
    var that = this;
    var mianjis = e.currentTarget.dataset.text;
    var mjIndex = e.currentTarget.dataset.id;
    that.setData({
      mj: (!that.data.mj),
      zzc: (!that.data.zzc),
      mianji: mianjis
    })
    if (mjIndex == 0) {
      that.setData({
        mjMin: 20
      })
    } else if (mjIndex == 1) {
      that.setData({
        mjMax: 50,
        mjMin: 20
      })
    } else if (mjIndex == 2) {
      that.setData({
        mjMax: 100,
        mjMin: 50
      })
    } else if (mjIndex == 3) {
      that.setData({
        mjMax: 200,
        mjMin: 100
      })
    } else if (mjIndex == 4) {
      that.setData({
        mjMax: 500,
        mjMin: 200
      })
    } else {
      that.setData({
        mjMax: 500
      })
    }
    page = 0,
      moment_list = [],
      that.onReachBottom();
  },
  onReachBottom: function() { //数据分页
    var that = this;
    // 显示加载图标  
    wx.showLoading({
      title: '玩命加载中',
    })
    // 页数+1  
    page = page + 1;
    wx.request({
      url: 'https://wwwgezimd.com/Store/spapp!wxxqiuzu.action?page=' + page + '&rows=' + rows,
      method: "GET",
      data: {
        'shopPurchase.region': that.data.city + that.data.quyu,
        'shopPurchase.type': that.data.leix,
        'shopPurchase.acreage': that.data.mjMax,
        'shopPurchase.addreaa': that.data.mjMin
      },
      // 请求头部  
      header: {
        'content-type': 'application/text'
      },
      success: function(res) {
        // 回调函数  
        if (res.data.length == 1) {
          wx.showToast({
            title: '暂时没有您需要的资源',
            icon: 'success',
            duration: 2000
          })
          that.setData({
            moment: []
          })
        } else {
          for (var i = 0; i < res.data.length; i++) {
            res.data[i].startdate = that.formatDate(res.data[i].startdate);
            moment_list.push(res.data[i])
          }
        }
        // 设置数据  
        that.setData({
          moment: moment_list
        })
        // 隐藏加载框  
        wx.hideLoading();
      }
    })
  },
  wanClick: function(e) {
    var tr = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../wan_details/wan_details?id=' + tr,
      success: function() {},
      fail: function() {},
      complete: function() {}
    })
  },
  formatDate: function(time) {
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
  onShareAppMessage: function() {
    return {
      title: '转发',
      path: '/pages/index/index',
    }
  }
})