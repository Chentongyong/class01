//header ------ 顶部导航js

var a = 0;
$('#xiaSype a').click(function() { //点击是改变背景颜色
	a = $(this).index();
	$(this).removeClass('a_back').eq(a).addClass('a_back');
})

$(document).ready(function() {
	if($.cookie("uid") == undefined) {
		$('.a_sty').text('登录');
		$('.a_sty').css('color', '#666');
		$('#zc').show();
	} else {
		$('.a_sty').text($.cookie("userName"));
		$('.a_sty').css('color', '#0b9ad6');
		$('#zc').hide();
		
	}
	
	
	if($.cookie("my_city")==''){
		$('.collss').text('北京市')
	}else{
		$('.collss').text($.cookie("my_city"))
		
	}

});

$('#login').click(function(){
	console.log($.cookie("uid"));
	if($.cookie("uid") == undefined){
		 window.location.href='register.html';
	}else{
		window.location.href='myAccount.html';
	}
});

//$.cookie("rmbUser", "true", {//將登状态保存到cookie中
//	expires: 7,
//	path:   '/'
//})