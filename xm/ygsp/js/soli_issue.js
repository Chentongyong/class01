var city = null;
var aas = []; //配套设施

$("#header").load("header.html");
$("#tabbar").load("tabbar.html");
city = $.cookie("myCity"); //城市
$.ajax({ //城市获取区域
	url: "http://192.168.3.5/sun/drcon/citi?citi=" + city,
	type: 'post',
	data: '',
	async: false,
	dataType: 'json',
	success: function(res) {
		var region1 = document.getElementById("region1");
		for(var i = 0; i < res.length; i++) {
			var option = document.createElement('option'); // 鍒涘缓鍏冪礌鑺傜偣
			option.innerHTML += res[i].text;
			region1.appendChild(option);
		}
	},
	error: function() {
		alert('网络出错了')
	}
})

$('.upBox li').click(function() {
	var i = $(this).index();
	if($('.upBox i').eq(i).hasClass('iconfont icon-queren')) {
		$('.upBox i').eq(i).removeClass('iconfont icon-queren');
		var se = $('.upBox span').eq(i).text();
		aas.splice(jQuery.inArray(se, aas), 1);
		console.log(aas)
		//			$('.issUp span').siblings('span').removeClass('sps_back').eq(2).addClass('sps_back');//发布类型
	} else {
		$('.upBox i').eq(i).addClass('iconfont icon-queren');
		aas.push($('.upBox span').eq(i).text());
		console.log(aas)
	}
})

$('#but').click(function() {
	var data = {
		'name': $('#tits').val(),
		'jyyt': $('#jyyt').val(),
		'mj': $('#mj').val(),
		'zj': $('#zj').val(),
		'zdzq': $('#zq').val(),
		'qy': city + $('#region1').val(),
		'dd': $('#dd').val(),
		'pp': aas,
		'lxr': $('#lxr').val(),
		'tel': $('#tel').val(),
		'details': $('#ms').val()
	}
	$.ajax({ //
		url: "http://192.168.3.5/sun/site/pcqzsava",
		type: 'post',
		data: data,
		async: false,
		dataType: 'json',
		success: function(res) {
			$('.issUp span').eq(2).addClass('sps_back').siblings('span').removeClass('sps_back');
			alert('发布成功');
			window.location.href = 'issue.html';
		},
		error: function() {
			alert('网络出错了')
		}
	})

})