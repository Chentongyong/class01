// register  ------------ 登录js

//记住密码
$(document).ready(function() {
	if($.cookie("rmbUser") == "true") {
		$("#rmbUser").attr("checked", true);
		$("#my_userName").val($.cookie("userName"));
		$("#my_password").val($.cookie("passWord"));
	}
});

$('#rmbUser').click(function(){//改变多选框的值
	if($(this).prop("checked")==true){
		$(this).attr("checked",false);
	}else{
		$(this).attr("checked",true);
	}
})

function saveUserInfo() {
	if($("#rmbUser").prop("checked")==true) {//判断是否选中记住密码
		var userName = $("#my_userName").val();
		var passWord = $("#my_password").val();
		$.cookie("rmbUser", "true", {
			expires: 7,
//			path: '/'
		}); // 存储一个带7天期限的 cookie
		$.cookie("userName", userName, {
			expires: 7,
			path: '../register.html'
		}); // 存储一个带7天期限的 cookie
		$.cookie("passWord", passWord, {
			expires: 7,
			path: '../register.html'
		}); // 存储一个带7天期限的 cookie
	} else {
		$.cookie("rmbUser", "false", {
			expires: -1,
			path: '../register.html'
		}); // 删除 cookie
		$.cookie("userName", '', {
			expires: -1,
			path: '../register.html'
		});
		$.cookie("passWord", '', {
			expires: -1,
			path: '../register.html'
		});
	}
}
//记住密码end

$('.dlType span').click(function() { //切换登录方式
		$(this).addClass('s_color').siblings('span').removeClass('s_color');
		if($(this).index() == 0) {
			console.log($(this).index())
			$('#dxdl').css('display', 'none');
			$('#denglu').css('display', 'block');
		} else {
			$('#dxdl').css('display', 'block');
			$('#denglu').css('display', 'none');
			console.log($(this).index())
		}

	})

	$('.inpuBox i').click(function() {//显示隐藏密码
		if($(this).hasClass('iconfont icon-guanbi-yanjing')) {
			$(this).removeClass("icon-guanbi-yanjing").addClass("icon-yanjing");
			$(this).prev().attr("type", "text");
		    $(this).css('color','#0B9AD6');
		} else {
			$(this).removeClass("icon-yanjing").addClass("icon-guanbi-yanjing");
			$(this).prev().attr("type", "password");
			$(this).css('color','#666');
		}
	})
	
//60秒倒计时	
var countdown=60; 
function sendemail(){
    var obj = $(".inpt2s");
    settime(obj);
    
    }
function settime(obj) { //发送验证码倒计时
    if (countdown == 0) { 
        obj.attr('disabled',false); 
        //obj.removeattr("disabled"); 
        obj.val("免费获取验证码");
        countdown = 60; 
        return;
    } else { 
        obj.attr('disabled',true);
        obj.val("重新发送(" + countdown + ")");
        countdown--; 
    } 
setTimeout(function() { 
    settime(obj) }
    ,1000) 
}