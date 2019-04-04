$("#header").load("header.html");
	$('#base').load('base.html');

	$('.mineLeft a').click(function() {
		$(this).addClass('aStyle').siblings('a').removeClass('aStyle');
	})
	$('.gender i').click(function() { //选择性别
		if($(this).attr('class') == 'i_back1') { //
			$(this).addClass('i_back2').siblings('i').removeClass('i_back2');
		}
	})

	$('.tcdl').click(function() { //点击退出登录
		$('#denglu').css('display', 'block')
	})
	$('.zzc').click(function() { //
		$('#denglu').css('display', 'none')
	})

	//会员充值
	$('.top_xinx p').click(function() {//点击充值会员
		$('#member').css('display', 'block');
	})

	$('.top_xinx b').click(function() { //点击vip充值会员
		if($(this).attr('class') != 'b_style') {
			$('#member').css('display', 'block');
			$(this).addClass('b_style');
		} else {
			$(this).removeClass('b_style');
		}
	})
	var uid;
	//会员充值遮罩层
	$('.memFu').click(function() {
		$('#member').css('display', 'none');
	})
	var member;
	function querywoall(){
		uid=$.cookie("uid");
		$.ajax({
			type : "post",
			url : "../appuser!chaxunye.action?u.uid="+uid,
			success : function(data) {
				var list = JSON.parse(data);
				member=list.member;
				if(list.member==3){
					$(".top_xinx b").addClass('b_style');	
				}
				$('#span_id').html(list.tel);
				$('#yeq').html(list.money);
				$('#username').val(list.username);
				$('#name').val(list.name);
				$("input[name='sex'][value="+list.sex +"]").attr("checked",true); 
			}})
	}
	
	function  uplodmy(){
		console.log(member);
		$.ajax({
			type : "post",
			url : "../appuser!updatepc.action",
			data:{"u.username":$("#username").val(),"u.name":$("#name").val(),"u.uid":$.cookie("uid"),"u.sex":$('input:radio:checked').val(),"u.member.mid":member},
			success : function(data) {
				alert("修改成功");
				querywoall();
			}});
	}
	
	$(function() {
		querywoall();
	})