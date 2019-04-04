var uid = '';
var qiuzu = '';
var qiugou = '';

var quyu = document.getElementById('quyu');//区域
var diqv = document.getElementById('diqv');//地区
var diqv_fu = document.getElementById('diqv_fu');//地区遮罩层
var input = document.getElementsByTagName('input');
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



mui.plusReady(function(){
	window.addEventListener('newsId',function(s){
		for(var t=0;t<input.length;t++){
			input[t].value = '';
		}
		uid=s.detail.uid;
		qiuzu=s.detail.qiuzu;
		qiugou=s.detail.qiugou;
		city_text = s.detail.city_text;
		
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
		
		mui('.mui-input-group').on('tap', '#but', function(e) {
			var quyu0 = document.getElementById('quyu').value;
			quyu = city_text + quyu0;
			var mianji = document.getElementById('mianji').value;
			var zujinyusuan = document.getElementById('zujinyusuan').value;
			inp.value;
			phone;
			var title1 = document.getElementById('title1').value;
			ms.value;
			var lianxiren = document.getElementById('lianxiren').value;
			if(quyu != '' && mianji != '' && zujinyusuan != '' && inp.value != '' && phone != '' && title1 != '' && ms.value != '' && lianxiren != '') {
				if(qiuzu=="商铺求租" && uid!=undefined && uid!=''){
					var urls='http://wwwgezimd.com/Store/spApp!addApp.action?shopPurchase.region='+quyu
						+'&shopPurchase.acreage='+mianji+'&shopPurchase.purchaseBudget='+zujinyusuan+'&shopPurchase.type='+inp.value
						+'&shopPurchase.title='+title1+'&shopPurchase.describe='+ms.value
						+'&shopPurchase.contacts='+lianxiren+'&shopPurchase.tel='+phone
						+'&shopPurchase.typeid=2&shopPurchase.suser.uid='+uid
				}
				if(qiugou=="商铺求购" && uid!=undefined){
					var urls='http://wwwgezimd.com/Store/spApp!addApp.action?shopPurchase.region='+quyu
						+'&shopPurchase.acreage='+mianji+'&shopPurchase.purchaseBudget='+zujinyusuan+'&shopPurchase.type='+inp.value
						+'&shopPurchase.title='+title1+'&shopPurchase.describe='+ms.value
						+'&shopPurchase.contacts='+lianxiren+'&shopPurchase.tel='+phone
						+'&shopPurchase.typeid=1&shopPurchase.suser.uid='+uid
				}
				mui.ajax({
					url:urls,
					type:'post',
					async: true,
				    dataType: 'json',
				    crossDomain: true, //强制使用5+跨域
				    timeout:'10000',
					success:function(data){
						if(data!=null){
							mui.openWindow({
								url:'issue.html',
								id:'issue',
								style:{}
					         })
						}
					},
					error:function(xhr, type, errorThrown){
						alert("提交失败","请先登录");
					}
				});
			}else{
				mui.toast("请填写所有");
			}
		});
		
	})
})