$("#header").load("header.html");
	$('#base').load('base.html');
	
	
	
	
	//获取url中的参数
	function getUrlParam(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
		var r = window.location.search.substr(1).match(reg); //匹配目标参数
		if (r != null)
			return unescape(r[2]);
		return null; //返回参数值
	}
	
	var sid;
	var uid;
	$(function() {
		 sid = getUrlParam('sid');
		 uid=$.cookie("uid");
		console.log(uid);
		//添加浏览记录
		if(uid!= undefined){
			$.ajax({url:"../appclt!addliulan.action?s.sid="+sid+"&u.uid="+uid,async:false});
		}
		$.ajax({
					type : "post",
					url : "../storeactions!oneToOne.action?store.sid="+sid+"&store.uid="+uid,
					success : function(data) {
						var list = JSON.parse(data);
						console.log(list);
						//	collect  0是为收藏   1是收藏
						if(list.collect==1){
							$('#scjl').removeClass('i_color');
							$('#scjl').css('color','#0b9ad6')
							$('#scjl span').text('取消收藏');
						}else{
							$('#scjl').addClass('i_color');
							$('#scjl').css('color','#666')
							$('#scjl span').text('收藏');
						}
						$("#bt").text(list.sname);
						$(".superior b").text(formatDate(list.sdate));
						$("#pf").text(list.square);
						$("#zj").text(list.price);
						$("#zrf").text(list.transferfee);
						$("#lx").text(list.shoptype);
						$("#xxdz").text(list.address + list.detailedaddress);
						$("#lxr").text(list.monthlyrent);
						$("#tel").text(list.theshortestlease);
						$("#xxjs").text(list.shopintroduction);
						$("#img1").attr("src",list.img);
						if(list.imgentity.length > 0){
							var  img=list.imgentity;
							var html=[];
							for(var i=0;i<img.length;i++){
								 html+='<li><img class="img2" src="'+img[i].imgurl +'" alt="" /></li>';
							}
							$('#img').html(html);
							$('#img .img2').mouseover(function() {
								var a = $(this).attr('src');
								//							$(this).addClass('img_sty').siblings('img').removeClass('img_sty');
								$('#img1').attr('src', a)
							})
						}
						s = list.jwd;
						s = s.replace(/\[|]/g, '');
						s = s.split(',');
						sss();
					},
					error : function() {
						window.location.href="502.html";
					}

				});
	})
	//判断是否收藏
	$('#scjl').click(function() {
		sid = getUrlParam('sid');
		uid=$.cookie("uid");
		if ($(this).hasClass('i_color') == true) {
			$(this).removeClass('i_color');
			$(this).css('color','#666')
			$('#scjl span').text('收藏');
			$.ajax({url:"../storeactions!my_deleteshoucang.action?store.sid="+sid+"&store.uid="+uid,async:false});
		} else {
			$(this).addClass('i_color');
			$(this).css('color','#0b9ad6')
			$('#scjl span').text('取消收藏');
			$.ajax({url:"../appclt!AddCollection.action?s.sid="+sid+"&u.uid="+uid,async:false});
		}
	})
	//创建时间格式化显示
	function formatDate(time) {
		var date = new Date(time);

		var year = date.getFullYear(), month = date.getMonth() + 1, //月份是从0开始的
		day = date.getDate(), hour = date.getHours(), min = date.getMinutes(), sec = date
				.getSeconds();
		var newTime = year + '-' + (month < 10 ? '0' + month : month) + '-'
				+ (day < 10 ? '0' + day : day) + ' '
				+ (hour < 10 ? '0' + hour : hour) + ':'
				+ (min < 10 ? '0' + min : min) + ':'
				+ (sec < 10 ? '0' + sec : sec);

		return newTime;
	}
	function sss() {
		var map = new AMap.Map("container", {
			resizeEnable : true,
			center : s,
			zoom : 13
		});
		var marker = new AMap.Marker({
			position : map.getCenter(),
			draggable : true,
			cursor : 'move',
			raiseOnDrag : true
		});
		marker.setMap(map);
	}