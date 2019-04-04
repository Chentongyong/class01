//类型
var inp = document.getElementById('hy');
var suspend = document.getElementById('suspend');
mui('.mui-input-row').on('tap', '#hy', function() {
	suspend.className = 'sus_dis';
})
mui('ul').on('tap', 'li', function() {
	inp.value = this.innerText;
	suspend.className = ''
})
//详细描述
var describe = document.getElementById('describe');
var textObj = document.getElementById('text');
var i_color = document.getElementById('i_color');
var ms = document.getElementById('ms');
var shade =document.getElementById('shade');
var ercds = document.getElementsByClassName('ercds');
mui('.mui-input-row').on('tap', '#ms', function() {
	describe.className = 'des_dis';
	textObj.addEventListener('keyup', function() {
		i_color.innerText = this.value.length
	})

	mui('.des_nei').on('tap', '.mui-pull-right', function() {
		textObj.value = '';
		i_color.innerText = 0
	})

	mui('.des_nei').on('tap', '#but2', function() {
		ms.value = textObj.value;
		describe.className = ''
	})
})

shade.addEventListener('tap',function(){
	suspend.className = '';
})

ercds[0].addEventListener('tap',function(){
	describe.className = ''
})
//身份
var span = document.getElementsByTagName('span');
mui('#identity').on('tap', 'span', function() {
	for(var j = 0; j < span.length; j++) {
		span[j].className = '';
	}
	this.className = 'span_color';

})
//手机号码
var phone = '';
var but = document.getElementById('but');
but.addEventListener('tap', function() {
	phone = document.getElementById('phoness').value;
	var reg = /^[1-9]\d*$|^0$/;
	var input = document.querySelector('input');
	if(input.value == '') {
		console.log("您填写的信息不完整")
	} else {
		if(!(/^1[34578]\d{9}$/.test(phone))) {
			console.log("手机号码有误，请重新填");
		}
	}
})