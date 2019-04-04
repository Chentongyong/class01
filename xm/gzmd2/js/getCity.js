var getCity = null;
var mapObj = new AMap.Map('iCenter');
mapObj.plugin("AMap.CitySearch", function () {
    var citysearch = new AMap.CitySearch();
    //自动获取用户IP，返回当前城市
    citysearch.getLocalCity();
    //监听触发了调用定位时发生
    AMap.event.addListener(citysearch, "complete", function (result) {
        if (result && result.city && result.info == "OK") {
        	console.log(result.city)
            getCity = result.city;
            var cityText = document.getElementById('city_text');         
            cityText.innerText = getCity;
            sy();
        }
    });
    //
    AMap.event.addListener(citysearch, "error", function (result) {
        throw '获取定位失败';
        console.log(222)
    });
});

	function sy() {//出租
		var shis = document.getElementById('city_text').innerText; //城市
		var store = {
			"store.address": shis
		};
		mui.ajax({
			url: 'http://wwwgezimd.com/Store/storeactions!chuzuQuery.action',
			type: 'post',
			async: true,
			dataType: 'json',
			data: store,
			crossDomain: true, //强制使用5+跨域
			timeout: '10000',
			success: function(data) {
				spcz.innerHTML = '所有商铺(<span>' + data + '</span>)';
			},
			error: function(xhr, type, errorThrown) {
				mui.toast("错误502")
			}
		});
		data1 = {"store.typead":'出租',"store.address": shis};
		mui.ajax({//出租
			url: 'http://wwwgezimd.com/Store/storeactions!oneToTw.action',
			type: 'post',
			async: true,
			data: data1,
			dataType: 'json',
			crossDomain: true, //强制使用5+跨域
			timeout: '10000',
			success: function(data) {
				var uls = document.getElementById('list');
				var seeHeight = document.documentElement.clientHeight;
                var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
				for(var i = 0; i < data.length; i++) {
					var li = document.createElement('li');
					li.className = 'mui-table-view-cell mui-media';
					li.innerHTML += '<a id=' + data[i].sid + ' title="' + data[i].name + '" href="javascript:;"><img src="images/logo2.png" guoyu-src="' + data[i].img + '" class="mui-media-object mui-pull-left" width=100 height=80/><div class="mui-media-body"><h5>' +
						data[i].name + '</h5><div><span>' +
						+data[i].square + '平方</span><span>' + data[i].address + '</span><span>' +
						data[i].shoptype + '</span></div><div class="hyhg iconfont icon-huiyuan"></div><em style="display:none">'+data[i].member+'</em><p class="mui-ellipsis"><b>' +
						data[i].transferfee + '</div></a>';
					uls.appendChild(li); //将数据添加在后面
					fu();
				}
				var hyhg = document.getElementsByClassName('hyhg');
				var emObj = document.getElementsByTagName('em')
				for(var p = 0 ; p < emObj.length; p++){
					if(emObj[p].innerText!=3){
						hyhg[p].style.display = "none";
					}else{
						hyhg[p].style.display = 'block';
					}
				}

			},
			error: function(xhr, type, errorThrown) {
				mui.toast("网络出错")
			}
		});
	}