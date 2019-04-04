
	//register.html登录页面的方法    cty
	$('.dlType span').click(function(){//切换登录方式
		$(this).addClass('s_color').siblings('span').removeClass('s_color');
        if($(this).index()==0){
        	$('#dxdl').css('display','none');
        	$('#denglu').css('display','block');
        }else{
        	$('#dxdl').css('display','block');
        	$('#denglu').css('display','none');
        }
	});


	//register.html   ll登录页面的登录方法
	$('#but1').click(function(){//ll账户登录和手机号登录
		var tel = $('#my_userName').val();
		var pwd = $('#my_password').val();
		if(tel!=null){
			data1 = {"u.tel": tel,"u.password": pwd};
		}
		$.ajax({
			url: "../appuser!login.action",
			type: 'post',
			data:  data1,
			dataType: 'json',
			success: function(data) {
				if(data!=null){
					console.log(data.username);
					$.cookie("uid", data.uid, {
						expires: 7,
					});
					$.cookie("member", data.member, {
						expires: 7,
					});
					$.cookie("name", data.username, {
						expires: 7,
					});
					window.location.href='index.html';
				}
			},
			error: function(xhr, type, errorThrown) {
				alert("登录失败");
			}
		});
	});
	
	//forget_pas.html        ll忘记密码方法
	$('#but3').click(function(){
		var tel = $('#tel').val();
		var code = $('#code').val();
		if(tel != "" && code != ""){
			data6 = {"u.tel": tel,"u.code": code};
			/* $.ajax({
				url: "../appuser!noshortmess.action",
				type: 'post',
				data:  data6,
				dataType: 'json',
				success: function(data) { */
					$('.boxBox').css('display','none');//cty
					$('.boxBox2').css('display','block');//cty
					var iphoto = document.getElementById("iphoto");
					iphoto.innerHTML  = tel;
				/* },
				error: function(xhr, type, errorThrown) {
					alert("登录失败");
				}
			}); */
		}else{
			alert("请填写手机号以及验证码");
		}
	});
	
	//forget_pas.html        ll忘记密码方法修改密码
	$('#but2').click(function(){
		var tel = $('#tel').val();
		var pwd1 = $('#pwd1').val();
		var pwd2 = $('#pwd2').val();
		data2 = {"u.tel": tel,"u.password": pwd1};
		if(pwd1 !="" && pwd1 == pwd2){
			$.ajax({
				url: "../appuser!update_mima.action",
				type: 'post',
				data:  data2,
				dataType: 'json',
				success: function(data) {
					if(data == 1){
						window.location.href='register.html';
					}
				 },
				error: function(xhr, type, errorThrown) {
					alert("登录失败");
				}
			}); 
		}else{
			alert("请填写密码或您输入的两次密码不一样！！！");
		}
	});
	
	//enroll.html        ll注册用户获取验证码方法
	$('#btn').click(function(){
		var tel = $('#tel').val();
		data3 = {"u.tel": tel};
		if(tel!=""){
			alert("获取验证码");
			/*$.ajax({
				url: "../appuser!shortmess.action",
				type: 'post',
				data:  data3,
				dataType: 'json',
				success: function(data) {
					alert("验证码已发送，请注意查收");
				 },
				error: function(xhr, type, errorThrown) {
					alert("验证码发送失败");
				}
			}); */
		}else{
			alert("请填写手机号！");
		}
	});
	
	//enroll.html        ll注册用户方法
	$('#btn4').click(function(){
		var tel = $('#tel').val();
		var code = $('#code').val();
		var pwd = $('#pwd').val();
		data5 = {"u.tel": tel,"u.verCode": code};
		if(tel!="" && code!=""){
			data4 = {"u.tel": tel,"u.verCode": code};
			/*$.ajax({
				url: "../appuser!jiaoya.action",
				type: 'post',
				data:  data4,
				dataType: 'json',
				success: function(data) {
					alert("验证码校验成功");
					if(tel!="" && code!="" && pwd!=""){
						$.ajax({
							url: "../appuser!add.action",
							type: 'post',
							data:  data5,
							dataType: 'json',
							success: function(data) {
								if(data==1){
									alert("您已注册成功，请登录")
								}else{
									alert("您的号码已注册")
								}
							 },
							error: function(xhr, type, errorThrown) {
								alert("登录失败");
							}
						});
					}
					
				 },
				error: function(xhr, type, errorThrown) {
					alert("验证码发送失败");
				}
			});*/
		}else{
			alert("手机号\验证码\密码填写不完整");
		}
	});
	
	
	
	
	
	
	
	
	
	
	