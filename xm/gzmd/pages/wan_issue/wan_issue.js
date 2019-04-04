Page({

  /**
   * 页面的初始数据
   */
  data: {
    areas: [],
    city: '',
    uid: '',
    sid: '',
    genre: ['酒楼餐饮', '美容美发', '服饰鞋包', '休闲娱乐', '百货超市', '生活服务', '电子通讯', '汽修美容', '医药保健', '家居建材', '教育培训', '空铺转让', '旅行宾馆', '其他行业'],
    area: '', //区域
    types: '', //类型
    qys: false,
    tys: false,
    tet:false,
    tranMj: '', //面积
    tranZj: '', //租金
    tranSj: '', //手机
    tranBt: '', //标题
    tranLxr: '', //联系人
    tranMs: '' //内容描述

  },
  onLoad: function (options) {
    console.log(options)
    var that = this;
    that.setData({
      sid: options.id,
    });
    if (that.data.sid != 1) {
      console.log(that.data.sid)
      wx.request({
        url: 'https://wwwgezimd.com/spapp!getmyone.action', //仅为示例，并非真实的接口地址
        data: {
          'shopPurchase.spid': that.data.sid
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {//修改发布信息
          console.log(res)
          that.setData({
            area: res.data.region,
            tranMj: res.data.acreage,
            tranZj: res.data.purchaseBudget,
            types: res.data.type,
            tranSj: res.data.tel,
            tranBt: res.data.title,
            tranLxr: res.data.contacts,
            tranMs: res.data.describe
          })
        }
      })
    }
  },
  onShow: function() {
    var that = this;
    wx.getStorage({
      key: 'gzmd',
      success: function(res) {
        that.setData({
          uid: res.data.userUid
        })
      }
    })
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
              areas: sun,
            })
          }
        })
      }
    })
  },
  xsqy: function() { //显示区域
    var that = this;
    that.setData({
      tet: true,
      qys: (!that.data.qys)
    })
  },
  zone: function(e) { //选择区域
    var that = this;
    var qy = e.currentTarget.dataset.text;
    that.setData({
      area: qy,
      tet: false,
      qys: (!that.data.qys)
    })
  },
  genres: function() { //显示类型
    var that = this;
    that.setData({
      tet: true,
      tys: (!that.data.tys)
    })
  },
  tyge: function(e) { //选择类型
    var that = this;
    var tyger = e.currentTarget.dataset.text;
    that.setData({
      types: tyger,
      tet: false,
      tys: (!that.data.tys)
    })
  },
  zzc: function() {
    var that = this;
    that.setData({
      qys: false,
      tet: false,
      tys: false
    })
  },
  formSubmit: function(e) {
    var that = this;
    var imagse = that.data.imgs;
    let {
      area,
      types,
      tranMj,
      tranZj,
      tranSj,
      tranBt,
      tranLxr,
      tranMs
    } = e.detail.value;
    console.log(tranLxr)
    var data = {
      'shopPurchase.region': that.data.city + area,
      'shopPurchase.acreage': tranMj,
      'shopPurchase.purchaseBudget': tranZj,
      'shopPurchase.type': types,
      'shopPurchase.tel': tranSj,
      'shopPurchase.title': tranBt,
      'shopPurchase.describe': tranMs,
      'shopPurchase.contacts': tranLxr,
      'shopPurchase.suser.uid': that.data.uid,
      'shopPurchase.typeid': 2,
      'shopPurchase.spid': that.data.sid
    }
    if (!area || !tranMj || !tranZj || !tranSj || !tranBt || !tranLxr) {
      this.setData({
        warn: "输入信息不完整",
        isSubmit: true
      })
      return;
    } else {
      wx.request({
        url: 'https://wwwgezimd.com/spapp!add_update.action',
        data: data,
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function(res) {
          console.log(1111)
          that.setData({
            area: '',
            types: '',
            tranMj: '',
            tranZj: '',
            tranSj: '',
            tranBt: '',
            tranLxr: '',
            tranMs: ''
          });
          wx.showToast({
            title: '发布成功',
            icon: 'success',
            duration: 2000
          });
          wx.switchTab({
            url: '../issue/issue'
          })
        },
        fail: function () {
          wx.showToast({
            title: '发布失败，请检查网络',
            icon: 'success',
            duration: 2000
          })
        }
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