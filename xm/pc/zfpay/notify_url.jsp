<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ page import="java.util.*"%>
<%@ page import="java.sql.Date"%>
<%@ page import="java.util.Map"%>
<%@ page import="com.zhifubao.alipay.config.*"%>
<%@ page import="com.zhifubao.alipay.util.*"%>
<%@ page import="com.alipay.api.*"%>
<%@ page import="com.alipay.api.internal.util.*"%>
<%@ page import="org.springframework.web.context.*"%>
<%@ page import="org.springframework.web.context.support.*"%>
<%@ page import="service.*"%>
<%@ page import="entity.*"%>
<%@ page import="utility.Datejisuan"%>
<%
/* *
 * 功能：支付宝服务器异步通知页面
 * 日期：2017-03-30
 * 说明：
 * 以下代码只是为了方便商户测试而提供的样例代码，商户可以根据自己网站的需要，按照技术文档编写,并非一定要使用该代码。
 * 该代码仅供学习和研究支付宝接口使用，只是提供一个参考。


 *************************页面功能说明*************************
 * 创建该页面文件时，请留心该页面文件中无任何HTML代码及空格。
 * 该页面不能在本机电脑测试，请到服务器上做测试。请确保外部可以访问该页面。
 * 如果没有收到该页面返回的 success 
 * 建议该页面只做支付成功的业务逻辑处理，退款的处理请以调用退款查询接口的结果为准。
 */
 
	//获取支付宝POST过来反馈信息
	Map<String,String> params = new HashMap<String,String>();
	Map<String,String[]> requestParams = request.getParameterMap();
	for (Iterator<String> iter = requestParams.keySet().iterator(); iter.hasNext();) {
		String name = (String) iter.next();
		String[] values = (String[]) requestParams.get(name);
		String valueStr = "";
		for (int i = 0; i < values.length; i++) {
			valueStr = (i == values.length - 1) ? valueStr + values[i]
					: valueStr + values[i] + ",";
		}
		//乱码解决，这段代码在出现乱码时使用
		//valueStr = new String(valueStr.getBytes("ISO-8859-1"), "utf-8");
		params.put(name, valueStr);
	}
	
	boolean signVerified = AlipaySignature.rsaCheckV1(params, AlipayConfigpc.alipay_public_key, AlipayConfigpc.charset, AlipayConfigpc.sign_type); //调用SDK验证签名
	//——请在这里编写您的程序（以下代码仅作参考）——
	
	/* 实际验证过程建议商户务必添加以下校验：
	1、需要验证该通知数据中的out_trade_no是否为商户系统中创建的订单号，
	2、判断total_amount是否确实为该订单的实际金额（即商户订单创建时的金额），
	3、校验通知中的seller_id（或者seller_email) 是否为out_trade_no这笔单据的对应的操作方（有的时候，一个商户可能有多个seller_id/seller_email）
	4、验证app_id是否为该商户本身。
	*/
	if(signVerified) {//验证成功
		//商户订单号
		String out_trade_no = new String(request.getParameter("out_trade_no").getBytes("ISO-8859-1"),"UTF-8");
	
		//支付宝交易号
		String trade_no = new String(request.getParameter("trade_no").getBytes("ISO-8859-1"),"UTF-8");
	
		//交易状态
		String trade_status = new String(request.getParameter("trade_status").getBytes("ISO-8859-1"),"UTF-8");
		
		
		
		if(trade_status.equals("TRADE_FINISHED")){
			//判断该笔订单是否在商户网站中已经做过处理
			//如果没有做过处理，根据订单号（out_trade_no）在商户网站的订单系统中查到该笔订单的详细，并执行商户的业务程序
			//如果有做过处理，不执行商户的业务程序
			
			//注意：
			//退款日期超过可退款期限后（如三个月可退款），支付宝系统发送该交易状态通知
		}else if (trade_status.equals("TRADE_SUCCESS")){
			//判断该笔订单是否在商户网站中已经做过处理
			//如果没有做过处理，根据订单号（out_trade_no）在商户网站的订单系统中查到该笔订单的详细，并执行商户的业务程序
			//如果有做过处理，不执行商户的业务程序
			String uid = params.get("body");
			String subject = params.get("subject");
			String price = params.get("total_amount");
			String notify_time = params.get("notify_time");
			
			WebApplicationContext ctx = WebApplicationContextUtils
					.getWebApplicationContext(request.getSession().getServletContext());
			RrechargeSeriver rs = ctx.getBean(RrechargeSeriver.class);
			UserServices us = ctx.getBean(UserServices.class);
			StoreService s = ctx.getBean(StoreService.class);
			String fangshi = "支付宝";
			//判断该笔订单是否在商户网站中已经做过处理
			//如果没有做过处理，根据订单号（out_trade_no）在商户网站的订单系统中查到该笔订单的详细，并执行商户的业务程序
			//判断交易号在是否存在数据库
			long b = rs.getnosadjh(out_trade_no);
			if (b == 0) {
				//判断是否充值
				if (!uid.contains("充值")) {
					//添加充值记录
					int a = rs.addRechargerecord(uid, subject, price, fangshi, out_trade_no, trade_no);
					//判断是充会员还是发布一条信息
					double aa = Double.parseDouble(price);
					if (aa == 39.0 || aa == 105.0 || aa == 190.0 || aa == 300.0) {
						Date te = new Date(Datejisuan.jisuanshijian(aa));
						Date dates = new Date(System.currentTimeMillis());
						Suser u = us.userget(uid);//判断是不是会员，是会员就延期，不是就改成会员
						if (u.getMember().getMid() == 3) {
							Date tes = new Date(Datejisuan.xujisuanshijian(aa, u.getEndtime()));
							us.userudate(uid, u.getStarttime(), tes);//给会员延期
						} else {
							us.userudate(uid, dates, te); //把该用户改成会员
						}

						List<Store> store = s.queryone(uid); //查询用户发布的店铺信息
						for (Store ss : store) {
							ss.setMytop("3");
							s.storerupdate(ss); //修改成会员的店铺做排序
						}
					} else if (aa == 2.0) {
						//普通用户发布
					}
				} else {
					uid=uid.replace("充值", "");
					int a = rs.addRechargerecord(uid, subject, price, fangshi, out_trade_no, trade_no);
					Suser u = us.userget(uid);
					System.out.println(u.getMoney());
					if(u.getMoney()!=null){
						double money=Double.parseDouble(price)+u.getMoney();
						u.setMoney(money);
					}else{
						u.setMoney(Double.parseDouble(price));
					}
					us.userupdate(u); //充值金额
				}
			}
			//注意：
			//付款完成后，支付宝系统发送该交易状态通知
		}
		
		out.println("success");
		
	}else {//验证失败
		out.println("fail");
	
		//调试用，写文本函数记录程序运行情况是否正常
		//String sWord = AlipaySignature.getSignCheckContentV1(params);
		//AlipayConfig.logResult(sWord);
	}
	
	//——请在这里编写您的程序（以上代码仅作参考）——
	
%>