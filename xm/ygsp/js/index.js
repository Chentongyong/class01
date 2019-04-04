$("#header").load("header.html");
$("#tabbar").load("tabbar.html");
var sum = 0;
var time = '';
var city = null;

city = $.cookie("myCity"); //城市

function fu() {
	$.ajax({ //轮播图
		url: "http://192.168.3.5/sun/store/pcStorelbt",
		type: 'GET',
		data: '',
		async: false,
		dataType: 'json',
		success: function(res) {
			var carousel = document.getElementById("box_up");
			var ulObj = document.getElementById("ulObj");
			for(var i = 0; i < res.length; i++) {
				var aObj = document.createElement('a');
				var liObj = document.createElement('li');
				aObj.setAttribute("title", res[i].storeid);
				aObj.innerHTML += '<img src="' + res[i].img + '"/>';
				carousel.appendChild(aObj);
				ulObj.appendChild(liObj);
			}
			$('#ulObj li').eq(0).addClass('on');
			lbo();
		},
		error: function() {
			alert('网络出错了')
		}
	});
	
	$.ajax({ //轮播成交案例
		url: "http://192.168.3.5/sun/store/pcStoretsus",
		type: 'GET',
		data: '',
		async: false,
		dataType: 'json',
		success: function(res) {
			var wzUl = document.getElementById("wzUl");
			for(var i = 0; i < res.length; i++) {
				var liObj = document.createElement('li');
				liObj.innerHTML+='<a>'+res[i].lxr+res[i].name+'</a>'
				wzUl.appendChild(liObj);
			}
		},
		error: function() {
			alert('网络出错了')
		}
	});
	
	$.ajax({ //精选
		url: "http://192.168.3.5/sun/store/pcshouye",
		type: 'GET',
		data: '',
		async: false,
		dataType: 'json',
		success: function(res) {
			var data = res.rows;
			var jxBox = document.getElementById("jxBox");
			for(var i = 0; i < data.length; i++) {
				var liObj = document.createElement('li');
				liObj.innerHTML+='<a href="rent_details.html" title="'+data[i].storeid+'"><img src="'+data[i].img+'" alt="" /><div class="aBox"><h5>'
				+data[i].name+'</h5><div><span>月租金：</span><b>'+
				data[i].zj+'</b></div><div><span>转让费：</span><span>'+data[i].zrf+'</span></div><div class="aBox-zi"><div><span>面积：</span><span>'+
				data[i].mj+'</span></div><i>精选</i></div></div></a>'
				jxBox.appendChild(liObj);
			}
		},
		error: function() {
			alert('网络出错了')
		}
	});
	
		$.ajax({ //图文
		url: "http://192.168.3.5/sun/store/pcpshouye",
		type: 'GET',
		data: '',
		async: false,
		dataType: 'json',
		success: function(res) {
			var data = res.rows;
			var twBox = document.getElementById("twBox");
			for(var i = 0; i < data.length; i++) {
				var liObj = document.createElement('li');
				liObj.innerHTML+='<a href="rent_details.html" title="'+data[i].storeid+'"><img src="'+data[i].img+'" alt="" /><div class="aBox"><h5>'
				+data[i].name+'</h5><div><span>月租金：</span><b>'+
				data[i].zj+'</b></div><div><span>转让费：</span><span>'+data[i].zrf+'</span></div><div class="aBox-zi"><div><span>面积：</span><span>'+
				data[i].mj+'</span></div></a>'
				twBox.appendChild(liObj);
			}
		},
		error: function() {
			alert('网络出错了')
		}
	});
	
}

fu();
//轮播图
//为li添加鼠标放上去事件
/*
 * @fadeOut   渐渐消失    
 * @stop()   停止当前动画效果
 */

function lbo() {
	var lis = $('#carousel li').length;
	$('#carousel li').mousemove(function() {
		sum = $(this).index();
		$(this).addClass('on').siblings('li').removeClass('on');
		$('#carousel a').eq(sum).stop().fadeIn(100).show().siblings('a').fadeOut(100).hide();
	})

	//鼠标放上去显示箭头
	$('.box_up').mouseover(function() {
		clearInterval(time); //清除定时器
		$('.w').show();
	})

	//给箭头添加点击事件
	$('.w').click(function() {
		//判断是那个箭头箭头
		if($(this).attr('class') == 'w w_l') { //左箭头
			sum--;
			if(sum < 0) {
				sum = lis - 1;
			}
			$('#carousel li').eq(sum).addClass('on').siblings('li').removeClass('on'); //添加class名on（让小球背景色变成红色）
			$('#carousel a').eq(sum).show().siblings('a').hide();
		} else { //右箭头
			clock();
		}
	})

	//鼠标离开时箭头消失
	$('.box_up').mouseleave(function() {
		$('.w').hide();
		time = setInterval(function() {
			clock();
		}, 2000);
	})

	//定时器
	time = setInterval(function() {
		clock();
	}, 2000);

	function clock() {
		sum++;
		if(sum == lis) {
			sum = 0;
		}
		$('#carousel li').eq(sum).addClass('on').siblings('li').removeClass('on');
		$('#carousel a').eq(sum).show().siblings('a').hide();
	}

	$(function() { //轮播文字
		$('.myscroll').myScroll({
			speed: 100, //数值越大，速度越慢
			rowHeight: 26 //li的高度
		});
	});
}

//轮播图end