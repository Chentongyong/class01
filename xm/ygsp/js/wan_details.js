$("#header").load("header.html");
$("#tabbar").load("tabbar.html");
//获取url中的参数
function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg); //匹配目标参数
	if(r != null)
		return unescape(r[2]);
	return null; //返回参数值
}
var sid = null;
var tit = null;
$(function() {
	sid = getUrlParam('sid');
	$.ajax({
		type: "post",
		url: "http://192.168.3.5/sun/site/pcgetone?id=" + sid,
		success: function(data) {
			var list = data;
			$("#bt").text(list.name);
			$(".leftUp span").text(formatDate(list.xzdate));
			$("#pf").text(list.mj);
			$("#zj").text(list.zj);
			$('#jyyt').text(list.jyyt);
			$('#qy').text(list.qy)
			$('#lxr').text(list.lxr);
			$('#tel').text(list.tel);
			$('#ms').text(list.details);
			if(list.keminghuo=='0'){
				$('#ptBox li').eq(0).addClass('li_color');
			}
			if(list.dianya=='1'){
				$('#ptBox li').eq(1).addClass('li_color');
			}
			if(list.guanmei=='2'){
				$('#ptBox li').eq(2).addClass('li_color');
			}
			if(list.paiyan=='3'){
				$('#ptBox li').eq(3).addClass('li_color');
			}
			if(list.tingchewei=='4'){
				$('#ptBox li').eq(4).addClass('li_color');
			}
			if(list.zjqq=='5'){
				$('#ptBox li').eq(5).addClass('li_color');
			}
		},
		error: function() {
			alert('网络出错，请检查网络');
		}

	});

})
//创建时间格式化显示
function formatDate(time) {
	var date = new Date(time);

	var year = date.getFullYear(),
		month = date.getMonth() + 1, //月份是从0开始的
		day = date.getDate(),
		hour = date.getHours(),
		min = date.getMinutes(),
		sec = date
		.getSeconds();
	var newTime = year + '-' + (month < 10 ? '0' + month : month) + '-' +
		(day < 10 ? '0' + day : day) + ' ' +
		(hour < 10 ? '0' + hour : hour) + ':' +
		(min < 10 ? '0' + min : min) + ':' +
		(sec < 10 ? '0' + sec : sec);
	return newTime;
}

$(function(){
	$.ajax({ //精选广告
		url: "http://192.168.3.5/sun/store/pcStorejx?number=5",
		type: 'GET',
		data: '',
		async: false,
		dataType: 'json',
		success: function(res) {
			var ggBox = document.getElementById("ggBox");
			for(var i = 0; i < res.rows.length; i++) {
				var aObj = document.createElement('a');
				aObj.setAttribute("title", res.rows[i].storeid);
				aObj.innerHTML += '<img src="' + res.rows[i].img + '" alt="" /><div class="aBox"><h5>' +
					res.rows[i].name + '</h5><div><div class="aBox-zi">区域：<span>' +
					res.rows[i].qy + '</span></div><div class="aBox-zi">租金：<b>' +
					res.rows[i].zj + '</b>元/月</div><div class="aBox-zi">面积：<b>' +
					res.rows[i].mj + '</b>平方米</div></div></div>'
				ggBox.appendChild(aObj);
			}
		},
		error: function() {
			alert('网络出错了')
		}
	});
})
$('#ggBox a').click(function() {
	tit = $(this).attr('title');
	var aa = 1;
	$.cookie("header", aa);
	window.location.href = 'rent_details.html?sid='+tit;
	//console.log($(this).attr('title'))
})