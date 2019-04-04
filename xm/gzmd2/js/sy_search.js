var search_up = document.getElementById('search_up');
	var search_below = document.getElementById('search_below');
	var sea_inp = document.getElementById('sea_inp');
	var nav_righr = document.getElementById('nav_righr');
	mui('.mui-bar-nav').on('keyup','input',function(){
		if(sea_inp.value==''){
			search_up.style.display = 'block';
			search_below.style.display = 'none';
			nav_righr.innerText='取消';
		}else{
			search_below.style.display = 'block';
			search_up.style.display = 'none';
			nav_righr.className = 'mui-pull-right'
			nav_righr.innerText='确定';
		}
	})
	nav_righr.addEventListener('tap',function(){
		if(sea_inp.value==''){
		}else{
			var ul_up = document.getElementById('ul_up');
			var li = "<li><a>"+sea_inp.value+"</a></li>";
			ul_up.innerHTML+=li; 
		}
	})