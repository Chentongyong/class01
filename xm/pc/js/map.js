//map ------------- 城市定位js
$("#header").load("header.html");
$('#base').load('base.html');
$('.container a').click(function() {
	var my_city = $(this).text();
	$.cookie("my_city", my_city, {
		expires: 7,
		path: '/'
	}); // 存储一个带7天期限的 cookie
})