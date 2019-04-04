	$("#header").load("header.html");
	$('#base').load('base.html');
	$('.way .way_i').click(function() {
		$(this).addClass('i_back').siblings('.i_back').removeClass('i_back');
		if($(this).index()==2){
			$('.wxBox').css('display','block');
			$('.pattern button').css('display','none');
		}else{
			$('.wxBox').css('display','none');
			$('.pattern button').css('display','block');
		}

	})
	
	var price;
	var uid;
	//获取url中的参数
	function getUrlParam(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
		var r = window.location.search.substr(1).match(reg); //匹配目标参数
		if (r != null)
			return unescape(r[2]);
		return null; //返回参数值
	}

	function acllsda() {
		price = getUrlParam('price');
		$('#price').text(price);
		$("#WIDtotal_amount").val(price);
		$("#WIDbody").val($.cookie("uid"));
		if (price == 39) {
			$('#year').text("1月");
		}
		if (price == 105) {
			$('#year').text("3月");
		}
		if (price == 190) {
			$('#year').text("半年");
		}
		if (price == 300) {
			$('#year').text("1年");
		}
	}


	// 页面加载时初始化分页
	$(function() {
		acllsda();
	});