//designWidth:设计稿的实际宽度值，需要根据实际设置
//maxWidth:制作稿的最大宽度值，需要根据实际设置
//这段js的最后面有两个参数记得要设置，一个为设计稿实际宽度，一个为制作稿最大宽度，例如设计稿为750，最大宽度为750，则为(750,750)
;
(function(designWidth, maxWidth) {
	var doc = document,
		win = window,
		docEl = doc.documentElement,
		remStyle = document.createElement("style"),
		tid;
	//浏览器竖屏与横屏转换的BUG。
	function refreshRem() {
		var width = docEl.getBoundingClientRect().width;
		maxWidth = maxWidth || 320;
		width > maxWidth && (width = maxWidth);
		var rem = width * 100 / designWidth;
		remStyle.innerHTML = 'html{font-size:' + rem + 'px;}';
	}

	if(docEl.firstElementChild) {
		docEl.firstElementChild.appendChild(remStyle);
	} else {
		var wrap = doc.createElement("div");
		wrap.appendChild(remStyle);
		doc.write(wrap.innerHTML);
		wrap = null;
	}
	//要等 wiewport 设置好后才能执行 refreshRem，不然 refreshRem 会执行2次；
	refreshRem();

	win.addEventListener("resize", function() {
		clearTimeout(tid); //防止执行两次
		tid = setTimeout(refreshRem, 300);
	}, false);

	win.addEventListener("pageshow", function(e) {
		if(e.persisted) { // 浏览器后退的时候重新计算
			clearTimeout(tid);
			tid = setTimeout(refreshRem, 300);
		}
	}, false);

	if(doc.readyState === "complete") {
		doc.body.style.fontSize = "16px";
	} else {
		doc.addEventListener("DOMContentLoaded", function(e) {
			doc.body.style.fontSize = "16px";
		}, false);
	}
})(720, 720);

function lis(){
		//点击切换添加底部下划线
	var sun = 0;
	if($.cookie('classify') == undefined) {
		$('#db2 span').eq(sun).addClass('s_style2').siblings('span').removeClass('s_style2');
	} else {
		sun = $.cookie('classify');
		$('#db2 span').eq(sun).addClass('s_style2').siblings('span').removeClass('s_style2');
// 		sun = 0;
// 		$.cookie('classify', sun);
	}
	
	$('#db2 span').click(function() {
		sun = $(this).index();
		var sum = $(this).text();
		$(this).addClass('s_style2').siblings('span').removeClass('s_style2');
		$.cookie('classify', sun);
		$.cookie('classify-t', sum);
		fun(sum)
	})
	
	function fun(e) {
		switch(e) {
			case '首页':
				window.location.href = "index.html?";
				break;
			case '关于我们':
				window.location.href = "about.html";
				break;
			case '服务项目':
				window.location.href = "server.html";
				break;
			case '加盟合作':
				window.location.href = "league.html";
				break;
			case '新闻资讯':
				window.location.href = "news.html";
				break;
		}
	}
}