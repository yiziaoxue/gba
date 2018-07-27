;(function() {
	var App = function(ele, opt){
        this.addr = "http://127.0.0.1:8000/"
	}
	App.prototype = {
		exec : function() {
			var _this = this;
			$('#reg').bind("click", _this, function(){
				_this.reg()
			});
		},
	
	/**
	 * 新用户注册
	 **/
		reg : function() {
			var username = $('#account').val();
			if (username.length < 3) {
				alert('用户名最短需要 5 个字符');
				return
			}
			var password = $('#account').val();
			if (password.length < 3) {
				alert('密码最短需要 6 个字符');
				return
			}
			var email = $('#email').val();
			var param = {
					'username':username,
					'password':password,
					'email':email,
			}
			url = _this.addr+"v1/sys/regist"
			$.ajax({type:"POST", dataType:'json', url:url, data:param,
				success: function (data){
					if(data.Status == 1){
						$(location).attr('href', 'index.html');
					}else{
						if(data.Errcode == 20002){
							alert("账号名已存在，请重新输入")
						}
					}
   	            },
   	            error:function (data){
   	            	alert("请求失败，请重试")
   	            }
 		    });
		},
		
		/**
		 * 检查邮箱
		 */
		checkEmail : function(email) {
			email = email || '';
			return (email.length > 3 && email.indexOf('@') > -1);
		}
		
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	var app = new App();
	app.exec();
}());