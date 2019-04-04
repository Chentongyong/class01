$("#header").load("header.html");
$("#tabbar").load("tabbar.html");

var sum = 0;
var a = 0;
var s = [];
var sid = null;
//获取url中的参数
function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg); //匹配目标参数
	if(r != null)
		return unescape(r[2]);
	return null; //返回参数值
}

$(function() {
	sid = getUrlParam('sid');
	$.ajax({
		type: "post",
		url: "http://192.168.3.5/sun/store/getOne?id=" + sid,
		success: function(data) {
			var list = data;
			$("#bt").text(list.name);
			$(".superior b").text(formatDate(list.fbdate));
			$('#scjl span').text(list.ddl);
			$("#pf").text(list.mj);
			$("#zj").text(list.zj);
			$("#zrf").text(list.zrf);
			$('#jyyt').text(list.jyyt);
			$('#dz').text(list.dd);
			$('.up_cenLeft .up_span').text(list.lxr);
			$('#tel').text(list.tel);
			$('#recBox').text(list.details);

			$("#img1").attr("src", list.img);
			var img = list.imgbo;
			var ulsB = document.getElementById('ulsB');
			for(var j = 0; j < img.length; j++) {
				var imgObj = document.createElement('img');
				imgObj.setAttribute("class", 'img2');
				imgObj.setAttribute("src", img[j].imgs);
				ulsB.appendChild(imgObj);
			}
			$('#ulsB .img2').eq(0).addClass('img_sty');
			$('#ulsB .img2').mouseover(function() {
				var a = $(this).attr('src');
				var sum = $(this).index();
				$('#ulsB .img2').eq(sum).addClass('img_sty').siblings('img').removeClass('img_sty');
				$('#img1').attr('src', a)
			})
			
			fn();

			//获取定位
			s = list.jwd;
			s = s.replace(/\[|]/g, '');
			s = s.split(',');
			var map = new AMap.Map("container", {
				resizeEnable: true,
				center: s,
				zoom: 13
			});
			var marker = new AMap.Marker({
				position: map.getCenter(),
				draggable: true,
				cursor: 'move',
				raiseOnDrag: true
			});
			marker.setMap(map);
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

function fn() {
	lis = $('#ulsB .img2').length;
	$('#ulsB .img2').mouseover(function() {
		a = $(this).attr('src');
		sum = $(this).index();
		$('#ulsB .img2').eq(sum).addClass('img_sty').siblings('img').removeClass('img_sty');
		$('#img1').attr('src', a)
	})
	$('.w').click(function() {
		if($(this).attr('class') == 'w w_left') {
			sum--;
			if(sum < 0) {
				sum = lis - 1; //下标值是li的长度8 减去 1
			}
			a = $('.img2').eq(sum).attr('src');
			$('#ulsB .img2').eq(sum).addClass('img_sty').siblings('img').removeClass('img_sty');
			$('#img1').attr('src', a)

		} else {
			sum++;
			if(sum == lis) {
				sum = 0;
			}
			a = $('.img2').eq(sum).attr('src');
			$('#ulsB .img2').eq(sum).addClass('img_sty').siblings('img').removeClass('img_sty');
			$('#img1').attr('src', a)

		}
	})
}

$(function(){
	$.ajax({ //精选广告
		url: "http://192.168.3.5/sun/store/pcStorejx?number=4",
		type: 'GET',
		data: '',
		async: false,
		dataType: 'json',
		success: function(res) {
			var ggBox = document.getElementById("ggBox");
			for(var i = 0; i < res.rows.length; i++) {
				var aObj = document.createElement('a');
				aObj.setAttribute("title", res.rows[i].storeid);
				aObj.innerHTML += '<img src="' + res.rows[i].img + '" alt="" /><div class="rec_r"><p>' +
					res.rows[i].name + '</p><div>区域：<span>' +
					res.rows[i].qy + '</span></div><div>租金：<span>' +
					res.rows[i].zj + '</span>元/月</div><div>面积：<span>' +
					res.rows[i].mj + '</span>平方米</div></div>'
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