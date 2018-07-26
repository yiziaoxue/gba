;(function() {
	var App = function(ele, opt){
		
	}
	App.prototype = {
		/**
		 * 检查邮箱
		 */
		checkEmail : function(email) {
			email = email || '';
			return (email.length > 3 && email.indexOf('@') > -1);
		},
		
		/**
		 * 设置cookie
		 */
		setCookie : function (key, param){ //设置cookie    
			 alert(JSON.stringify(param))
	         $.cookie(key,JSON.stringify(param), { expires: 30 });//调用jquery.cookie.js中的方法设置cookie中的用户名    
	    },
	    
	    /**
		 * 设置cookie
		 */
		getCookie : function (key){ //设置cookie    
	         var res = $.cookie(key);//调用jquery.cookie.js中的方法设置cookie中的用户名    
	         alert(res)
	    },
	    
	}
	
	var app = new App();
	window.app = app
}());