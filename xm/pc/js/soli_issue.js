
	var title;
	var type;
	var acreage;//面积
	var purchaseBudget;//租金
	var region1;//区域
	var region2;//地址
	var region;
	var near;
	var describe;
	var contacts;//联系人
	var tel;
	var uid;
	var ss;
	var spid;
	
	//soli_issue.html    求租区域
	function qiuzu_quyu(){
		
		if($.cookie("my_city")=='' || $.cookie("my_city")== undefined){
			ss='北京市';
		}else{
			ss = $.cookie("my_city");
		}
		data1 = {"store.city": ss}; 
		$.ajax({
			url: "../cityaction!main.action",
			type: 'post',
			async:false, //不是异步处理
			data: data1,
			dataType: 'json',
			success: function(data) {
				var region1 = document.getElementById("region1");
				for(var i=0;i<data.length;i++){
					var option = document.createElement('option'); //创建元素节点
					option.innerHTML +=	data[i].text;
					region1.appendChild(option);
				}
			 },
			error: function(xhr, type, errorThrown) {
				alert("网络不给力，请查看网络");
			}
		});
	}
	

	//soli_issue.html   ll求租发布
	function qiuzufabu(){
		title = $("#title").val();
		type = $("#type_type").val();
		acreage = $("#acreage").val();
		purchaseBudget = $("#purchaseBudget").val();
		region1 = $("#region1").val();
		region2 = $("#region2").val();
		region = ss + region1 + region2;
		near = $("#near").val();
		describe = $("#describe").val();
		contacts = $("#contacts").val();
		tel = $("#tel").val();
		uid=$.cookie("uid");
		if(title!="" && contacts!="" && tel!=""){
			data2 = {"shopPurchase.suser.uid": uid,"shopPurchase.typeid": 2,"shopPurchase.title": title,"shopPurchase.type": type,"shopPurchase.acreage": acreage,"shopPurchase.purchaseBudget": purchaseBudget,"shopPurchase.region": region,"shopPurchase.near": near,"shopPurchase.describe": describe,"shopPurchase.contacts": contacts,"shopPurchase.tel": tel};
			$.ajax({
				url: "../spapp!addApp.action",
				type: 'post',
				//async:false, //不是异步处理
				data: data2,
				dataType: 'json',
				success: function(data) {
					alert("上传成功");
				 },
				error: function(xhr, type, errorThrown) {
					alert("上传失败，请查看网络");
				}
			});
		}else{
			alert("请将输入框填写完整");
		}
		
	}
	
	qiuzu_quyu();
	
	$("#header").load("header.html");
	$('#base').load('base.html');
	$('.upBox i').click(function(){//商铺配套多选框
		if($(this).attr('class') == "iconfont icon-dagouwuquan" ){
			$(this).removeClass('iconfont icon-dagouwuquan');
			$(this).css({
				border:'1px solid #eee'
			});
			$('.issUp span').siblings('span').removeClass('sps_back').eq(2).addClass('sps_back');
		}else{
			$(this).addClass('iconfont icon-dagouwuquan');
			$(this).css({
				border:'1px solid #0b9ad6'
			})
		}
	})
	
	C1=window.location.href.split("?")[1]; //得到id=spid
	spid=C1.split("=")[1]; //得到spid
	if(spid != ""){
		$(".btn").text("保存");
		my_get();
		$(".btn").click(function(){
			my_update();
		});
	}else{
		qiuzufabu();
	}
	
	$("")
	
	//根据spid查询详情
	function my_get(){
		data3 = {"shopPurchase.spid": spid};
		$.ajax({
			url: "../spapp!getmyone.action",
			type: 'post',
			//async:false, //不是异步处理
			data: data3,
			dataType: 'json',
			success: function(data) {
				document.getElementById("title").value = data.title;
				$("#type_type").val(data.type);
				document.getElementById("acreage").value = data.acreage;
				if(data.purchaseBudget == ""){
					document.getElementById("purchaseBudget").value = 0;
				}else{
					document.getElementById("purchaseBudget").value = data.purchaseBudget;
				}
				document.getElementById("region2").value = data.region;
				if(data.near == undefined){
					document.getElementById("near").value = "空";
				}else{
					document.getElementById("near").value = data.near;
				}
				document.getElementById("describe").value = data.describe;
				document.getElementById("contacts").value = data.contacts;
				document.getElementById("tel").value = data.tel;
			 },
			error: function(xhr, type, errorThrown) {
				alert("查询失败，请查看网络");
			}
		});
	}
	
	//根据spid修改发布信息
	function my_update(){
		title = $("#title").val();
		type = $("#type_type").val();
		acreage = $("#acreage").val();
		purchaseBudget = $("#purchaseBudget").val();
		region1 = $("#region1").val();
		if(ss.indexOf("市") != -1){
			ss = "";
		}else{
			ss;
		}
		if(region1.indexOf("区") != -1){
			region1 = "";
		}else{
			region1;
		}
		/*region1.indexOf("3") != -1*/
		region2 = $("#region2").val();
		region = ss + region1 + region2;
		near = $("#near").val();
		describe = $("#describe").val();
		contacts = $("#contacts").val();
		tel = $("#tel").val();
		uid=$.cookie("uid");
		data4 = {"shopPurchase.spid": spid,"shopPurchase.suser.uid": uid,"shopPurchase.typeid": 2,"shopPurchase.title": title,"shopPurchase.type": type,"shopPurchase.acreage": acreage,"shopPurchase.purchaseBudget": purchaseBudget,"shopPurchase.region": region,"shopPurchase.near": near,"shopPurchase.describe": describe,"shopPurchase.contacts": contacts,"shopPurchase.tel": tel};
		$.ajax({
			url: "../spapp!upmyone.action",
			type: 'post',
			//async:false, //不是异步处理
			data: data4,
			dataType: 'json',
			success: function(data) {
				window.location.href='source.html';
			 },
			error: function(xhr, type, errorThrown) {
				alert("查询失败，请查看网络");
			}
		});
	}
	
	
	
	