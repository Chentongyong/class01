$("#header").load("header.html");
$("#tabbar").load("tabbar.html");
$(function() {
	$.ajax({ //城市获取区域
		url: "http://192.168.3.5/sun/details/one",
		type: 'post',
		async: false,
		dataType: 'json',
		success: function(res) {
			$('#int_gy').text(res[0].gywm);
			$('#qy_title').text(res[0].btone);
			$('#qy_text').text(res[0].xqone);
			$('#yj_title').text(res[0].bttwo);
			$('#yj_text').text(res[0].xqtwo);
		},
		error: function() {
			alert('网络出错了')
		}
	})
})