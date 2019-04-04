$("#header").load("header.html");
$("#tabbar").load("tabbar.html");
var city = null;
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

$(function() {
	var delParent;
	var quyu;
	var defaults = {
		fileType: ["jpg", "png", "bmp", "jpeg"], // 上传文件的类型
		fileSize: 1024 * 1024 * 10 // 上传文件的大小 10M
	};
	/*点击图片的文本框*/
	$(".file").change(function() {
		var idFile = $(this).attr("id");
		var file = document.getElementById(idFile);
		var imgContainer = $(this).parents(".z_photo"); //存放图片的父亲元素
		var fileList = file.files; //获取的图片文件
		var input = $(this).parent(); //文本框的父亲元素
		var imgArr = [];
		//遍历得到的图片文件
		var numUp = imgContainer.find(".up-section").length;
		var totalNum = numUp + fileList.length; //总的数量
		if(fileList.length > 8 || totalNum > 8) {
			alert("上传图片数目不可以超过8个，请重新选择"); //一次选择上传超过8个 或者是已经上传和这次上传的到的总数也不可以超过8个
		} else if(numUp < 8) {
			fileList = validateUp(fileList);
			//			console.log(fileList)
			for(var i = 0; i < fileList.length; i++) {
				var imgUrl = window.URL.createObjectURL(fileList[i]); //选择图片路径
				//				console.log(imgUrl)
				imgArr.push(imgUrl);
				var $section = $("<section class='up-section fl loading'>");
				imgContainer.prepend($section);
				var $span = $("<span class='up-span'>");
				$span.appendTo($section);

				var $img0 = $("<img class='close-upimg'>").on("click", function(event) {
					event.preventDefault();
					event.stopPropagation();
					$(".works-mask").show();
					delParent = $(this).parent();
				});
				$img0.attr("src", "img/a7.png").appendTo($section);
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
		if(numUp >= 8) { //图片等于5张是隐藏上传图片按钮
			$(this).parent().hide();
		}
	});

	$(".z_photo").delegate(".close-upimg", "click", function() {
		$(".works-mask").show();
		delParent = $(this).parent();
	});

	$(".wsdel-ok").click(function() { //确认
		$(".works-mask").hide();
		var numUp = delParent.siblings().length;
		if(numUp < 9) {
			delParent.parent().find(".z_file").show();
		}
		delParent.remove();
	});

	$(".wsdel-no").click(function() { //取消
		$(".works-mask").hide();
	});

	function validateUp(files) {
		var arrFiles = []; //替换的文件数组
		for(var i = 0, file; file = files[i]; i++) {
			//获取文件上传的后缀名
			var newStr = file.name.split("").reverse().join("");
			if(newStr.split(".")[0] != null) {
				var type = newStr.split(".")[0].split("").reverse().join("");
				//				console.log(type + "===type===");
				if(jQuery.inArray(type, defaults.fileType) > -1) {
					// 类型符合，可以上传
					if(file.size >= defaults.fileSize) {
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

	function imgUp() {

		var formData = new FormData(document.getElementById("uploading")); //表单id
		var quyu = city+$('#region1').val();
		
		$.ajax({
			url: 'http://192.168.3.5/sun/store/pcsave?qy='+quyu,
			type: 'POST',
			data: formData,
			async: false,
			cache: false,
			contentType: false,
			processData: false,
			success: function(result) {
				$('.issUp span').eq(2).addClass('sps_back').siblings('span').removeClass('sps_back');
				alert('发布成功');
				window.location.href='issue.html';
			},
			error: function() {
				alert('网络出错，请检查网络');
			}
		});

	};
	$('#but').click(function() {
		imgUp();
	})
})