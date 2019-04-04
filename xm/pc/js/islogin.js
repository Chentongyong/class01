$("#mffb").click(function(){
		if($.cookie("uid") == undefined ){
			alert("请登录!");
			window.location.href="register.html";
		}else{
			window.location.href='issue.html';
		}
		
	});


$('#tccdl').click(function(){
	 $.cookie("uid", "", {
		expires: -1,
	}); 
	$(window).attr('location','index.html');
})