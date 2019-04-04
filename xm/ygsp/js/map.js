$("#header").load("header.html");
$("#tabbar").load("tabbar.html");
$('#map a').click(function() {
	var myCity = $(this).text();
	$.cookie("myCity", myCity, {
		expires: 7,
//		path: '/'
	}); // 存储一个带7天期限的 cookie
})