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
    tet: false,
    imgs: [], //图片路径
    tranXxdz: '', //详细地址
    tranMj: '', //面积
    tranZj: '', //租金
    tranSj: '', //手机
    tranLj: '', //临近
    tranZrf: '', //转让费
    tranBt: '', //标题
    tranLxr: '', //联系人
    tranMs: '' //内容描述
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    that.setData({
      sid: options.id,
    });
    console.log(that.data.sid)
    if (that.data.sid !=1) {
      wx.request({
        url: 'https://wwwgezimd.com/Store/storeactions!uidoneToOne.action', //仅为示例，并非真实的接口地址
        data: {
          'store.sid': that.data.sid
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function(res) {//修改发布信息
          var imgse = that.data.imgs;
          console.log(res)
          that.setData({
            area: res.data.address,
            tranXxdz: res.data.detailedaddress,
            tranMj: res.data.square,
            tranZj: res.data.price,
            types: res.data.shoptype,
            tranSj: res.data.theshortestlease,
            tranLj: res.data.residuallease,
            tranZrf: res.data.transferfee,
            tranBt: res.data.sname,
            tranLxr: res.data.monthlyrent,
            tranMs: res.data.shopintroduction
          })
          for (var i = 0; i < res.data.imgentity.length; i++) {
            let base64 = res.data.imgentity[i].imgurl;
            imgse.push(base64)
          }
          that.setData({
            imgs: imgse
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
  // 上传图片
  chooseImg: function(e) {
    var that = this;
    var imgs = this.data.imgs;
    if (imgs.length >= 9) {
      this.setData({
        lenMore: 1
      });
      setTimeout(function() {
        that.setData({
          lenMore: 0
        });
      }, 2500);
      return false;
    }
    wx.chooseImage({
      // count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        if (tempFilePaths.length > 0){
          that.setData({
            imgs: []
          })
        }
        var imgs = that.data.imgs;
        // console.log(tempFilePaths + '----');
        for (var i = 0; i < tempFilePaths.length; i++) {
          console.log(tempFilePaths[i])
          if (imgs.length >= 9) {
            that.setData({
              imgs: imgs
            });
            return false;
          } else {
            imgs.push(tempFilePaths[i]);
          }
        }
        // console.log(imgs);
        that.setData({
          imgs: imgs
        });
      }
    });
  },
  // 删除图片
  deleteImg: function(e) {
    var imgs = this.data.imgs;
    var index = e.currentTarget.dataset.index;
    imgs.splice(index, 1);
    this.setData({
      imgs: imgs
    });
  },
  // 预览图片
  previewImg: function(e) {
    //获取当前图片的下标
    var index = e.currentTarget.dataset.index;
    //所有图片
    var imgs = this.data.imgs;
    wx.previewImage({
      //当前显示图片
      current: imgs[index],
      //所有图片
      urls: imgs
    })
  },
  formSubmit: function(e) {
    var that = this;
    var imagse = that.data.imgs;
    // console.log('form发生了submit事件，携带数据为：', e.detail.value);
    let {
      area,
      tranXxdz,
      tranMj,
      tranZj,
      types,
      tranSj,
      tranLj,
      tranZrf,
      tranBt,
      tranLxr,
      tranMs
    } = e.detail.value;
    var data = {
      'store.address': that.data.city + area,
      'store.detailedaddress': tranXxdz,
      'store.square': tranMj,
      'store.price': tranZj,
      'store.shoptype': types,
      'store.theshortestlease': tranSj,
      'store.residuallease': tranLj,
      'store.transferfee': tranZrf,
      'store.sname': tranBt,
      'store.monthlyrent': tranLxr,
      'store.shopintroduction': tranMs,
      'store.uid': that.data.uid,
      'store.sid': that.data.sid
    }
    if (!area || !tranMj || !tranZj || !types || !tranSj || !tranZrf || !tranBt || !tranLxr) {
      this.setData({
        warn: "输入信息不完整",
        isSubmit: true
      })
      return;
    } else {
      wx.request({
        url: 'https://wwwgezimd.com/Store/storeactions!addAppStore.action', 
        data: data,
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function(res) {
          var aa = res.data;
          if (imagse.length > 0) {
            for (var i = 0; i < imagse.length; i++) {
              wx.uploadFile({
                url: 'https://wwwgezimd.com/Store/Upimg?sid=' + aa, 
                filePath: imagse[i],
                name: 'file',
                formData: {},
                success: function(res) {
                  console.log(res)
                },
                fail: function(e) {
                  console.log(2222)
                }
              })
            }
          }
          that.setData({
            area: '',
            tranXxdz: '',
            tranMj: '',
            tranZj: '',
            types: '',
            tranSj: '',
            tranLj: '',
            tranZrf: '',
            tranBt: '',
            tranLxr: '',
            tranMs: '',
            imgs: []
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
        fail:function(){
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