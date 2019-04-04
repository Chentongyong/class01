//  图片上传 
var imgObj = document.getElementById('imgObj')//图片盒子
var files = [];
(function($, doc) {
	mui.init({
		swipeBack: true //启用右滑关闭功能
	});
	document.addEventListener("plusready", plusReady, false);

	function plusReady() {
		var wv = plus.webview.currentWebview();
		document.getElementById("addnew").addEventListener("tap", function() {
			showActionSheet(); //拍照还是相册  
		});
		plus.nativeUI.closeWaiting();
	}
}(mui, document));
var uid = '';
var sid = '';
var tel = '';
var member = '';

var typead = document.getElementById("assignment").value;
var quyu0 = document.getElementById("quyu").value;
var mj = document.getElementById("mj").value;
var zujin = document.getElementById("zujin").value;
var leixing = document.getElementById("hy").value;
var phoness = document.getElementById("phoness").value;
var diduan = document.getElementById("diduan").value;
var zrf = document.getElementById("zrf").value;
var ms = document.getElementById("ms").value;
var title = document.getElementById("biaoti").value;
var lianxiren = document.getElementById("lianxiren").value;

var city_text = '';
var quyu = document.getElementById('quyu');//区域
var diqv = document.getElementById('diqv');//地区
var diqv_fu = document.getElementById('diqv_fu');//地区遮罩层
quyu.addEventListener('tap',function(){//点击显示地区
	diqv.className = 'sus_dis';
})
mui('#diqv').on('tap','p',function(){//选择地区
	quyu.value = this.innerText;
	diqv.className = '';
})

diqv_fu.addEventListener('tap',function(){
	diqv.className = '';
})


window.addEventListener('newsId', function(o) {
	diqv.className = '';
	quyu.value = '';
	typead.value ='';
	quyu0.value ='';
	mj.value ='';
	zujin.value ='';
	leixing.value ='';
	diduan.value ='';
	zrf.value ='';
	ms.value ='';
	title.value ='';
	lianxiren.value ='';
	imgObj.innerHTML = '';
	uid = o.detail.uid;
	sid = o.detail.sid;
	tel = o.detail.tel;
	member = o.detail.member;
	city_text = o.detail.city_text;
	
	var cityshi = {"store.city": city_text};
		mui.ajax({ //根据市获取区域
			url: "http://wwwgezimd.com/Store/cityaction!main.action",
			type: 'post',
			data: cityshi,
			async: true,
			dataType: 'json',
			crossDomain: true, //强制使用5+跨域
			timeout: '10000',
			success: function(data) {
				var city = document.getElementById('fenqv');
				for(var i = 0; i < data.length; i++) {
					var p = document.createElement('p'); //创建元素节点
					p.innerHTML += data[i].text;
					city.appendChild(p);
				}
			},
			error: function(xhr, type, errorThrown) {
				mui.toast("请重新刷新")
			}
		})
	
	
	if(sid != null) {
		mui.ajax({
			url: 'http://wwwgezimd.com/Store/storeactions!uidoneToOne.action?store.sid=' + sid+'&store.uid='+uid,
			type: 'post',
			async: true,
			dataType: 'json',
			crossDomain: true, //强制使用5+跨域
			timeout: '10000',
			success: function(data) {
				if(data != null) {
					typead.value = data.typead;
					quyu.value = data.address;
					mj.value = data.square;
					zujin.value = data.price;
					leixing.value = data.shoptype;
					phoness.value = data.theshortestlease;
					diduan.value = data.residuallease;
					zrf.value = data.transferfee;
					ms.value = data.shopintroduction;
					title.value = data.sname;
					lianxiren.value = data.monthlyrent;
					but.innerText = '保存';
				}
			},
			error: function(xhr, type, errorThrown) {
				mui.toast("网络延迟");
			}
		});
	}
})
// 上传文件
function upload() {
	quyu = city_text + quyu0;
	if(quyu != '' && mj != '' && leixing != '' && phoness != '' && diduan != '' && ms != '' && biaoti != '' && lianxiren != '') {
		if(sid != 'undefined' && sid != null) {
			var data = '?typead=' + typead + '&quyu=' + quyu + '&mj=' + mj + '&zujin=' + zujin + '&leixing=' + leixing + '&tel=' + phoness + '&diduan=' + diduan + '&zrf=' + zrf + '&ms=' + ms + '&lianxiren=' + lianxiren + '&title=' + title + '&uid=' + uid + '&sid=' + sid + '&member=' + member;
		} else {
			var data = '?typead=' + typead + '&quyu=' + quyu + '&mj=' + mj + '&zujin=' + zujin + '&leixing=' + leixing + '&tel=' + phoness + '&diduan=' + diduan + '&zrf=' + zrf + '&ms=' + ms + '&lianxiren=' + lianxiren + '&title=' + title + '&uid=' + uid + '&member=' + member;
		}
		var task = plus.uploader.createUpload('http://wwwgezimd.com/Store/Upload' + data, {
				method: "POST"
			},
			function(t, status) { //上传完成  
				if(status == 200) {
					var result = jQuery.parseJSON(t.responseText);
				} else {
					console.log("上传失败：" + status);
				}
			}
		);
		for(var i = 0; i < files.length; i++) {
			var f = files[i];
			task.addFile(f.path, {
				key: f.name
			});
		}
		task.start();
		var detailPage = mui.preload({
			url: 'issue.html',
			id: 'issue.html'
		})
		mui.fire(detailPage, 'newsId', {
			tel: tel,
			uid: uid,
			member: member
		});
		mui.openWindow({
			url: 'issue.html',
			id: 'issue.html'
		})
	} else {
		mui.toast("填写信息不完整，请补充完整再发布");
	}

}

// 添加文件  
var index = 1;
var newUrlAfterCompress;

function appendFile(p) {
	files.push({
		path: p,
		name: "uploadkey_" + index
	});
	index++;
}
// 产生一个随机数  
function getUid() {
	return Math.floor(Math.random() * 100000000 + 10000000).toString();
}

function galleryImgs() { // 从相册中选择图片  
	plus.gallery.pick(function(e) {
//		console.log("选择了" + e.files.length + "个图片");
		for(var i = 0; i < e.files.length; i++) {
			if(i < 6) {//添加图片<b class='b_sc mui-icon mui-icon-closeempty'></b>
				$(".dynamic_images ul").prepend("<li class='pickimg'><img src='" + e.files[i] + "' /></li>");
				var dstname = "_downloads/" + getUid() + ".jpg"; //设置压缩后图片的路径
				newUrlAfterCompress = compressImage(e.files[i], dstname);
				appendFile(dstname);
			}
		}
	}, function(e) {
		console.log("取消选择图片");
	}, {
		filter: "image",
		multiple: true
	});
}


//压缩图片，这个比较变态的方法，无法return  
function compressImage(src, dstname) {
	//var dstname="_downloads/"+getUid()+".jpg";  
	plus.zip.compressImage({
			src: src,
			dst: dstname,
			overwrite: true,
			quality: 20
		},
		function(event) {
			//console.log("Compress success:"+event.target);  
			return event.target;
		},
		function(error) {
			console.log(error);
			return src;
		});
}

function showActionSheet() {
	var bts = [{
		title: "拍照"
	}, {
		title: "从相册选择"
	}];
	plus.nativeUI.actionSheet({
			cancel: "取消",
			buttons: bts
		},
		function(e) {
			if(e.index == 1) {
				getImage();
			} else if(e.index == 2) {
				galleryImgs();
			}
		});
}
//拍照  
function getImage() {
	var cmr = plus.camera.getCamera();
	cmr.captureImage(function(p) {
		plus.io.resolveLocalFileSystemURL(p, function(entry) {
			var localurl = entry.toLocalURL(); // 拍照<b class='mui-icon mui-icon-closeempty'></b>
			$(".dynamic_images ul").prepend("<li class='pickimg'><img src='" + localurl + "' /></li>");
			var dstname = "_downloads/" + getUid() + ".jpg"; //设置压缩后图片的路径  
			newUrlAfterCompress = compressImage(localurl, dstname);
			appendFile(dstname);
		});
	});
}