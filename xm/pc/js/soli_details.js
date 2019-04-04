
var spid;

$("#header").load("header.html");
$('#base').load('base.html');
//soli_details.html     ll求购\求租详情页面
function qiuzuxiangqing(){//接收soliciting.html传过来的spid
	C1=window.location.href.split("?")[1]; //得到id=spid
	spid=C1.split("=")[1]; //得到spid
	data8 = {"shopPurchase.spid": spid};//,"shopPurchase.region":""
	$.ajax({
		url: "../spapp!getmyone.action",
		type: 'post',
		async:false, //不是异步处理
		data: data8,
		dataType: 'json',
		success: function(data) {
			var qiugouxiang = document.getElementById("qiugouxiang");
			da = new Date(data.startdate);
			var year = da.getFullYear();
			var month = da.getMonth() + 1;
			var date = da.getDate();
			var dates = [year, month, date].join('.');
			var startdate = dates;
			if(data.purchasebudget == undefined){
				purchasebudget = 0;
			}
			qiugouxiang.innerHTML =	'<div class="leftUp"><h5>'+data.title+'</h5><span>更新时间：'+startdate+'</span>'
				+'<span class="span"><i class="iconfont icon-shoucang"></i><span id="spans">取消收藏</span></span></div><div><div class="bor_bott">'
				+'<span>姓名：<b>'+data.contacts+'</b></span><span>联系人：<b>'+data.tel+'</b></span><span>咨询名店：<b>020-37268113</b></span></div>'
				+'<div class="bor_bott"><span>面积需求：<b>'+data.acreage+'平方</b></span><span>租金预算：<b>'+ purchasebudget +'元/月</b></span>'
				+'<span>经营业态：<b>'+data.type+'</b></span></div><div class="bor_bott"><span>区域：<b>'+data.region+'</b></span><span>配套设施：<b>客梯</b></span></div>'
				+'<div class="bor_bott"><p>意向商铺描述：</p><span>'+data.describe+'</span></div></div>';
			
			$(".leftUp .span").hide();
			/*$('.leftUp .span').click(function(){//收藏
				if($('.leftUp i').hasClass('iconfont icon-shoucang ee')==true){
					$(this).css('color','#0b9ad6');
					$('.leftUp i').removeClass('ee');
					$('#spans').text('取消收藏');
				}else{
					$(this).css('color','#666');
					$('.leftUp i').addClass('ee');
					$('#spans').text('收藏')
				}
			})*/
		
		},
		error: function(xhr, type, errorThrown) {
			alert("网络不给力，请查看网络");
		}
	});
}

qiuzuxiangqing();