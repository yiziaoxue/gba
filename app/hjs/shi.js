;(function() {
	var App = function(ele, opt){
        this.addr = "http://127.0.0.1:8000/"
	}
	App.prototype = {
		exec : function() {
			var _this = this;
			url = _this.addr+"v1/poem/detail"
			var id = _this.getQueryString('id');
			//加载推荐数据
			$.ajax({ url: url,type:"POST", data:{'id':id}, success: function(data){
				if(data && data.status == 1){
					var poem = data.data
					var html = '<li class="mui-input-row"> <input type="text" class="mui-input-clear mui-input" style="text-align:center" placeholder="'+poem.title+'" disabled /></li>'
					$('#title').append(html);
					$.each(poem.content,function(index, val){
						var html = '<li class="mui-input-row"><input type="text" class="mui-input-clear mui-input" style="text-align:center" placeholder="'+val+'" disabled /></li>'
	                    $('#content').append(html)
					});
				}
		    }});
			$('#issue').bind("click", _this, function(){
				$(location).attr('href', 'detail/publish.html');
			});
		},
		
		getQueryString : function(name) {
		    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		    var r = window.location.search.substr(1).match(reg);
		    if (r != null) return unescape(r[2]); return null;
		},

	    
	}
	
	
	var app = new App();
	app.exec();
}());