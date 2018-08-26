;(function() {
	var App = function(ele, opt){
        this.addr = addr
	}
	App.prototype = {
		exec : function() {
			var _this = this;
			url = _this.addr+"v1/poem/detail"
			var id = _this.getQueryString('id');
			//加载推荐数据
			$.ajax({ url: url,type:"GET", data:{'id':id}, success: function(data){
				if(data && data.status == 1){
					var poem = data.data
					var html = '<li class="mui-table-view-cell" style="text-align: center">'+poem.title+'</li>'
					$('#title').append(html);
                    var html = '<li class="mui-table-view-cell" style="text-align: right;color:#6d6d72;font-size: 13px;">'+poem.author+'</li>'
                    $('#author').append(html);
					$.each(poem.content,function(index, val){
						var html = '<li class="mui-table-view-cell" style="color:#6d6d72;font-size: 15px;">'+ val +'</li>'
	                    $('#content').append(html)
					});
				}
		    }});
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