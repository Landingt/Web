//登录
var terminal = null;
var urlSearch = '';
var show_num = [];
window.onload = function() {





	



	var hg = ($(document).height() / 2 - $(".signin-content").height() / 2) - 50;
	$(".signin-content").css("top", hg + "px");

	var wd = ($(document).width() / 2 - 70 / 2);
	
	if('addEventListener' in document) {
		document.addEventListener('DOMContentLoaded', function() {
			FastClick.attach(document.body);
		}, false);
	}
	draw(show_num); //初始化验证码
	onUserAgent();

	if(window.localStorage.userName) {
		$('#inputName').val(window.localStorage.userName);
	}
	//getKeyUser();
	urlSearch = location.search.split('?')[1];

	$.ajax({
		type: "post",
		url: "/api/server/version_adapt",
		data: "fromPath=",
		success: function(dt) {
			if(dt.HttpStatus == 200 && dt.HttpData.code == 200) {
				if(dt.HttpData.data != '适配成功') {
					$('#message').html('当前服务无法与AlarmCenter服务匹配!');
					$('.btn').unbind();
					$('.btn').bind('click', function() {
						alert('无法登陆，未匹配AlarmCenter服务！');
					});
				}
			}
		}
	});

	document.onkeydown = function(event) {
		var e = event || window.event;
		if(e && e.keyCode == 13) { //回车键的键值为13
			onSumitLogining(); //调用登录按钮的登录事件
		}
	};
}
function verificationCode(){
	draw(show_num);   
	}
function getKeyUser() {
	if(window.localStorage.ac_appkey && window.localStorage.ac_infokey) {
		$.ajax({
			type: 'post',
			url: '/api/server/',
			dataType: "json",
			data: {
				appkey: window.localStorage.ac_appkey,
				infokey: window.localStorage.ac_infokey
			},
			success: function(dt) {
				if(dt.HttpStatus == 200) {
					var dts = dt.HttpData;
					if(dts.code == 200) {
						var getUserInfor = dts.data;
						$('#inputName').val(getUserInfor[0]);
						$('#inputPassword').val(getUserInfor[1]);
					}
				}
			}
		});
	}
}

window.onresize = function() {
	var hg = ($(document).height() / 2 - $(".signin-content").height() / 2) - 50;
	$(".signin-content").css("top", hg + "px");
}

//判断访问终端
function onUserAgent() {
	var sUserAgent = navigator.userAgent.toLowerCase();
	//var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
	var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
	var bIsMidp = sUserAgent.match(/midp/i) == "midp";
	var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
	var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
	var bIsAndroid = sUserAgent.match(/android/i) == "android";
	//var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
	var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
	if(bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsWM) {
		terminal = "Mobile";
	} else {
		terminal = "Mobile";
	}
}

var strServiceURLs = '';

function onSumitLogining() {
	$('.loading-text').html('正在连接…');
	var strName = document.getElementById("inputName").value;
	var strPWD = document.getElementById("inputPassword").value;
	var val=document.getElementById("verificationCode").value;
	var num = show_num.join("");
            if(val==''){
                alert('请输入验证码！');
            }else if(val == num){
				if(strName == "") {
					document.getElementById("message").innerHTML = "用户名不能为空！";
				} else if(strPWD == "") {
					document.getElementById("message").innerHTML = "密码不能为空！";
				} else {
					//window.localStorage.userPWD = Encrypt(strPWD);
					getServerKey();
					document.getElementById("loginFormBoxId").className = "flipOutX animated loginFormBox";
					setTimeout(function() {
						document.getElementById("loginFormBoxId").style.display = "none";
						document.getElementById("loading-center").style.display = "block";
						setTimeout(function() {
							document.getElementById("loading-center-absolute").style.transform = "rotate(720deg)";
						}, 1000);
					}, 1000);
				}

            }else{
                alert('验证码错误！\n你输入的是:  '+val+"\n正确的是:  "+num+'\n请重新输入！');
                document.getElementById("verificationCode").value='';
                draw(show_num);
            }

	
	return false;
}

//回车事件
/*function onkeyiptEvent(event) {
    if (event.keyCode == 13) {
        onSumitLogining();
    }
}*/

//加密与解密
function Encrypt(Text) {
	output = new String;
	alterText = new Array();
	varCost = new Array();
	TextSize = Text.length;
	for(i = 0; i < TextSize; i++) {
		idea = Math.round(Math.random() * 111) + 77;
		alterText[i] = Text.charCodeAt(i) + idea;
		varCost[i] = idea;
	}
	for(i = 0; i < TextSize; i++) {
		output += String.fromCharCode(alterText[i], varCost[i]);
	}
	return output;
}

function unEncrypt(Text) {
	output = new String;
	alterText = new Array();
	varCost = new Array();
	TextSize = Text.length;
	for(i = 0; i < TextSize; i++) {
		alterText[i] = Text.charCodeAt(i);
		varCost[i] = Text.charCodeAt(i + 1);
	}
	for(i = 0; i < TextSize; i = i + 2) {
		output += String.fromCharCode(alterText[i] - varCost[i]);
	}
	return output;
}

//获取key
function getServerKey() {
	$.ajax({
		type: 'post',
		url: '/api/server/getkey_mobile',
		dataType: "json",
		data: {
			username: $('#inputName').val(),
			userpwd: md5($('#inputPassword').val()),
            verificationCode: $("#verificationCode").val()
		},
		success: function(dt) {
			//console.log(dt);
			$('.loading-text').html('获取登录结果…');
			if(dt.HttpStatus == 200) {
				var dts = dt.HttpData;
				if(dts.code == 200) {
					var getkeys = dts.data;
					window.localStorage.userName = $('#inputName').val();
					//window.localStorage.userPwd = Encrypt($('#inputPassword').val());
					window.localStorage.ac_appkey = getkeys.appkey;
					window.localStorage.ac_infokey = getkeys.infokey;
					window.localStorage.terminal = terminal + ".Web";
					setTimeout(function() {
						if(urlSearch == '' || urlSearch == undefined || urlSearch == null) {
							window.location.href = "/Views/" + terminal + "/home.html";
						} else {
							window.location.href = urlSearch;
						}
					}, 1500);
				} else {
					$('.loading-text').html(dts.message);
					setTimeout(function() {
						document.getElementById("loginFormBoxId").className = "";
						document.getElementById("loginFormBoxId").style.display = "block";
						document.getElementById("loading-center").style.display = "none";
						document.getElementById("loading-center-absolute").style.transform = "";
						document.getElementById("message").innerHTML = "code:" + dts.code;
						draw(show_num); 
					}, 2500);
				}
			} else {
				$('.loading-text').html('HttpStatus:' + dt.HttpStatus);
				setTimeout(function() {
					document.getElementById("loginFormBoxId").className = "";
					document.getElementById("loginFormBoxId").style.display = "block";
					document.getElementById("loading-center").style.display = "none";
					document.getElementById("loading-center-absolute").style.transform = "";
					document.getElementById("message").innerHTML = "code:" + dt.HttpStatus;
					draw(show_num); 
				}, 2500);
			}
		}
	});
}

function draw(show_num) {
	var canvas_width=document.getElementById('canvas').clientWidth;
	var canvas_height=document.getElementById('canvas').clientHeight;
	var canvas = document.getElementById("canvas");//获取到canvas的对象，演员
	var context = canvas.getContext("2d");//获取到canvas画图的环境，演员表演的舞台
	canvas.width = canvas_width;
	canvas.height = canvas_height;
	var sCode = "A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0,q,w,e,r,t,y,u,i,o,p,a,s,d,f,g,h,j,k,l,z,x,c,v,b,n,m";
	var aCode = sCode.split(",");
	var aLength = aCode.length;//获取到数组的长度
		
	for (var i = 0; i <= 3; i++) {
		var j = Math.floor(Math.random() * aLength);//获取到随机的索引值
		var deg = Math.random() * 30 * Math.PI / 180;//产生0~30之间的随机弧度
		var txt = aCode[j];//得到随机的一个内容
		show_num[i] = txt;
		var x = 10 + i * 20;//文字在canvas上的x坐标
		var y = 20 + Math.random() * 8;//文字在canvas上的y坐标
		context.font = "bold 23px 微软雅黑";

		context.translate(x, y);
		context.rotate(deg);

		context.fillStyle = randomColor();
		context.fillText(txt, 0, 0);

		context.rotate(-deg);
		context.translate(-x, -y);
	}
	for (var i = 0; i <= 5; i++) { //验证码上显示线条
		context.strokeStyle = randomColor();
		context.beginPath();
		context.moveTo(Math.random() * canvas_width, Math.random() * canvas_height);
		context.lineTo(Math.random() * canvas_width, Math.random() * canvas_height);
		context.stroke();
	}
	for (var i = 0; i <= 30; i++) { //验证码上显示小点
		context.strokeStyle = randomColor();
		context.beginPath();
		var x = Math.random() * canvas_width;
		var y = Math.random() * canvas_height;
		context.moveTo(x, y);
		context.lineTo(x + 1, y + 1);
		context.stroke();
	}
}
function randomColor() {//得到随机的颜色值
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + "," + g + "," + b + ")";
}
