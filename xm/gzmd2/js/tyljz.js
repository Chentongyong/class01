function fu(){
		
				var aImages = document.getElementById("ulBox").getElementsByTagName('img'); //获取id为SB的文档内所有的图片
				loadImg(aImages);
				window.onscroll = function() { //滚动条滚动触发
					loadImg(aImages);
				};
				//getBoundingClientRect 是图片懒加载的核心
				function loadImg(arr) {
					for(var i = 0, len = arr.length; i < len; i++) {
						if(arr[i].getBoundingClientRect().top < document.documentElement.clientHeight && !arr[i].isLoad) {
							arr[i].isLoad = true; //图片显示标志位
							//arr[i].style.cssText = "opacity: 0;"; 
							(function(i) {
//								console.log(arr[i])
								setTimeout(function() {
									var gsrc = arr[i].getAttribute("guoyu-src");
									if(arr[i].dataset&&gsrc!=''&&gsrc!='undefined') { //兼容不支持data的浏览器
										aftLoadImg(arr[i], arr[i].dataset.imgurl);
										arr[i].src = arr[i].getAttribute("guoyu-src");
                                     
									} else {
										aftLoadImg(arr[i], arr[i].getAttribute("guoyu-src"));
									}
									arr[i].style.cssText = "transition: 1s; opacity: 1;" //相当于fadein
								}, 500)
							})(i);
						}
					}
				}
	