$(function() {
	var delParent;
	var quyu;
	var shi;// 市
	
	var title;
	var leixng;
	var zj;
	var detailedaddress;
	var dd;
	var zrf;
	var xxms;
	var lianxiren;
	var tel;
	var mj;
	var typead;
	var uid;
	var img;
	var sid;
	var region1;

	$(document).ready(function() {
		shi = $.cookie("my_city");

	})
	function qiuzu_quyu() {
		if ($.cookie("my_city") == '' || $.cookie("my_city") == undefined) {
			shi = '北京市';
		} else {
			shi = $.cookie("my_city");
		}
		data9 = {
			"store.city" : shi
		};
		$.ajax({
			url : "../cityaction!main.action",
			type : 'post',
			async : false, // 不是异步处理
			data : data9,
			dataType : 'json',
			success : function(data) {
				var region1 = document.getElementById("region1");
				for (var i = 0; i < data.length; i++) {
					var option = document.createElement('option'); // 创建元素节点
					option.innerHTML += data[i].text;
					region1.appendChild(option);
				}
			},
			error : function(xhr, type, errorThrown) {
				alert("网络不给力，请查看网络11");
			}
		});
	}
	qiuzu_quyu();
	var defaults = {
		fileType : [ "jpg", "png", "bmp", "jpeg" ], // 上传文件的类型
		fileSize : 1024 * 1024 * 10
	// 上传文件的大小 10M
	};
	/* 点击图片的文本框 */
	$(".file").change(
					function() {
						var idFile = $(this).attr("id");
						var file = document.getElementById(idFile);
						var imgContainer = $(this).parents(".z_photo"); // 存放图片的父亲元素
						var fileList = file.files; // 获取的图片文件
						var input = $(this).parent(); // 文本框的父亲元素
						var imgArr = [];
						// 遍历得到的图片文件
						var numUp = imgContainer.find(".up-section").length;
						var totalNum = numUp + fileList.length; // 总的数量
						if (fileList.length > 8 || totalNum > 8) {
							alert("上传图片数目不可以超过8个，请重新选择"); // 一次选择上传超过5个
															// 或者是已经上传和这次上传的到的总数也不可以超过5个
						} else if (numUp < 8) {
							fileList = validateUp(fileList);
							// console.log(fileList)
							for (var i = 0; i < fileList.length; i++) {
								var imgUrl = window.URL
										.createObjectURL(fileList[i]); // 选择图片路径
								// console.log(imgUrl)
								imgArr.push(imgUrl);
								var $section = $("<section class='up-section fl loading'>");
								imgContainer.prepend($section);
								var $span = $("<span class='up-span'>");
								$span.appendTo($section);

								var $img0 = $("<img class='close-upimg'>").on(
										"click", function(event) {
											event.preventDefault();
											event.stopPropagation();
											$(".works-mask").show();
											delParent = $(this).parent();
										});
								$img0.attr("src", "img/a7.png").appendTo(
										$section);
								var $img = $("<img class='up-img up-opcity'>");
								$img.attr("src", imgArr[i]);
								$img.appendTo($section);
								var $p = $("<p class='img-name-p'>");
								$p.html(fileList[i].name).appendTo($section);
								var $input = $("<input id='taglocation' name='taglocation' value='' type='hidden'>");
								$input.appendTo($section);
								var $input2 = $("<input id='tags' name='tags' value='' type='hidden'/>");
								$input2.appendTo($section);
							}
						}
						setTimeout(function() {
							$(".up-section").removeClass("loading");
							$(".up-img").removeClass("up-opcity");
						}, 450);
						numUp = imgContainer.find(".up-section").length;
						if (numUp >= 8) { // 图片等于5张是隐藏上传图片按钮
							$(this).parent().hide();
						}
					});

	$(".z_photo").delegate(".close-upimg", "click", function() {
		$(".works-mask").show();
		delParent = $(this).parent();
	});

	$(".wsdel-ok").click(function() { // 确认
		$(".works-mask").hide();
		var numUp = delParent.siblings().length;
		if (numUp < 9) {
			delParent.parent().find(".z_file").show();
		}
		delParent.remove();
	});

	$(".wsdel-no").click(function() { // 取消
		$(".works-mask").hide();
	});

	function validateUp(files) {
		var arrFiles = []; // 替换的文件数组
		for (var i = 0, file; file = files[i]; i++) {
			// 获取文件上传的后缀名
			var newStr = file.name.split("").reverse().join("");
			if (newStr.split(".")[0] != null) {
				var type = newStr.split(".")[0].split("").reverse().join("");
				// console.log(type + "===type===");
				if (jQuery.inArray(type, defaults.fileType) > -1) {
					// 类型符合，可以上传
					if (file.size >= defaults.fileSize) {
						alert(file.size);
						alert('您这个"' + file.name + '"文件大小过大');
					} else {
						// 在这里需要判断当前所有文件中
						arrFiles.push(file);
					}
				} else {
					alert('您这个"' + file.name + '"上传类型不符合');
				}
			} else {
				alert('您这个"' + file.name + '"没有类型, 无法识别');
			}
		}
		return arrFiles;
	}
	//验证表单
	function yanzhenbiaodan(){
		if($('#title').val()==''){
			alert("请输入标题");
			return false;
		}
		if($('#mj').val()==''){
			alert("请输入面积");
			return false;
		}
		if($('#zj').val()==''){
			alert("请输入租金");
			return false;
		}
		if($('#lianxiren').val()==''){
			alert("请输入联系人");
			return false;
		}
		if($('#tel').val()==''){
			alert("请输入手机号码");
			return false;
		}
		return true;
	}
	function imgUp() {
			var	data;
			var  trueorfalse=yanzhenbiaodan();
			var uid=$.cookie("uid");
			var formData = new FormData(document.getElementById("uploading")); // 表单id
			data='?uid='+uid+'&title='+$('#title').val()+'&typead='+$('#typead').text()+'&leixing='+$('#leixng').val()+'&mj='+$('#mj').val()+'&zujin='+$('#zj').val()+'&quyu='+$('#region1').val()+'&detailedaddress='+$('#detailedaddress').val()+'&diduan='+$('#dd').val()+'&zrf='+$('#zrf').val()+'&ms='+$('#xxms').val()+'&lianxiren='+$('#lianxiren').val()+'&tel='+$('#tel').val();
			if(trueorfalse==true){
				$.ajax({
					url : '../Upload'+data,
					type : 'POST',
					data : formData,
					async : false,
					cache : false,
					contentType : false,
					processData : false,
					success : function(result) {
						// console.log(111)
					}
				});
			}
	};
	
	//获取url中的参数
	function getUrlParam(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
		var r = window.location.search.substr(1).match(reg); //匹配目标参数
		if (r != null)
			return unescape(r[2]);
		return null; //返回参数值
	}
	
	sid = getUrlParam('sid');
	if(sid != "" && sid != null){
		$("#but").text("保存");
		my_get();
		$("#but").click(function(){
			my_update();
		});
	}else{
		$('#but').click(function() {
			imgUp();
		})
	}
	
	//根据sid查询详情
	function my_get(){
		data3 = {"store.sid": sid};
		$.ajax({
			url: "../storeactions!oneToOneupdate.action",
			type: 'post',
			data: data3,
			dataType: 'json',
			success: function(data) {
				document.getElementById("title").value = data.sname;
				$("#leixng").val(data.shoptype);
				document.getElementById("mj").value = data.square;
				if(data.price == ""){
					document.getElementById("zj").value = 0;
				}else{
					document.getElementById("zj").value = data.price;
				}
				document.getElementById("detailedaddress").value = data.detailedaddress;
				document.getElementById("dd").value = data.residuallease;
				if(data.transferfee == undefined){
					document.getElementById("zrf").value = "空";
				}else{
					document.getElementById("zrf").value = data.transferfee;
				}
				document.getElementById("typead").value = data.typead;
				document.getElementById("xxms").value = data.shopintroduction;
				document.getElementById("lianxiren").value = data.monthlyrent;file
				document.getElementById("tel").value = data.theshortestlease;
			 },
			error: function(xhr, type, errorThrown) {
				alert("查询失败，请查看网络111");
			}
		});
	}

	//根据sid修改详情
	function my_update(){
		uid = $.cookie("uid");
		if(uid != undefined || uid != null){
			title = $("#title").val();
			leixng = $("#leixng").val();
			mj = $("#mj").val();
			zj = $("#zj").val();
			detailedaddress = $("#detailedaddress").val();
			region1 = $("#region1").val();
			dd = $("#dd").val();
			zrf = $("#zrf").val();
			xxms = $("#xxms").val();
			lianxiren = $("#lianxiren").val();
			tel = $("#tel").val();
			typead = $("#typead").val();
			console.log(uid);
			var formData = new FormData(document.getElementById("uploading")); // 表单id
			data4 = '?uid='+uid+'&sid='+sid+'&title='+$('#title').val()+'&typead='+$('#typead').text()+'&leixing='+$('#leixng').val()+'&mj='+$('#mj').val()+'&zujin='+$('#zj').val()+'&quyu='+$('#region1').val()+'&detailedaddress='+$('#detailedaddress').val()+'&diduan='+$('#dd').val()+'&zrf='+$('#zrf').val()+'&ms='+$('#xxms').val()+'&lianxiren='+$('#lianxiren').val()+'&tel='+$('#tel').val();
			$.ajax({
				url: "../Upload"+data4,
				type: 'post',
				data: formData,
				dataType: 'json',
				async : false,
				cache : false,
				contentType : false,
				processData : false,
				success: function(data) {
					alert("修改成功")
				 }
			});
		}else{
			alert("请登录后修改");
		}
		
	}

})


