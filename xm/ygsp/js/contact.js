$("#header").load("header.html");
$("#tabbar").load("tabbar.html");
var jwd;

$(function() {
	$.ajax({ //城市获取区域
		url: "http://192.168.3.5/sun/details/one",
		type: 'post',
		async: false,
		dataType: 'json',
		success: function(res) {
			console.log(res[0])
			//获取定位
			jwd = res[0].jwd;
			jwd = jwd.replace(/\[|]/g, '');
			jwd = jwd.split(',');
			var map = new AMap.Map("container", {
				resizeEnable: true,
				center: jwd,
				zoom: 60
			});
			var marker = new AMap.Marker({
				position: map.getCenter(),
				draggable: true,
				cursor: 'move',
				raiseOnDrag: true
			});
			marker.setMap(map);
			$('#dz').text(res[0].gsdd);
			$('#jt').text(res[0].jt);
			$('#yb').text(res[0].yb);
			$('#rx').text(res[0].kfrx);
		},
		error: function() {
			alert('网络出错了')
		}
	})
})