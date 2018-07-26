;(function() {
	var App = function(ele, opt){
		
	}
	App.prototype = {
		exec : function() {
			var _this = this;
			$('#reg').bind("click", _this, function(){
				$(location).attr('href', 'reg.html');
			});
			$('#login').bind("click", _this, function(){
				_this.login()
			});
		},
	
	/**
	 * 用户登录
	 **/
		login : function() {
			var _this = this;
			var username = $('#account').val();
			if (!username) {
				alert('用户名最短需要 5 个字符');
				return
			}
			var password = $('#password').val();
			if (!password.length) {
				alert('密码最短需要 6 个字符');
				return
			}
			var param = {
					'username':username,
					'password':password,
			}
			$.ajax({type:"POST", dataType:'json', url:'http://127.0.0.1:8000/v1/sys/login', data:param,
				success: function (data){
					if(data.status == 1){
						var checked = $("#autoLogin").hasClass("mui-active");//获取“是否记住密码”复选框  
						if(checked){ //判断是否选中了“记住密码”复选框    
							window.app.setCookie("account", data.data)
						}
						$(location).attr('href', 'index.html');
					}else{
						alert("登录失败，请重新输入")
					}
   	            },
   	            error:function (data){
   	            	alert("请求失败，请重试")
   	            }
 		    });
		},
		
	}
	
	
	
	
	
	
	
	var app = new App();
	app.exec();
}());