;(function() {
	var App = function(ele, opt){
		this.addr = addr
	}
	App.prototype = {
		exec : function() {
			var _this = this;
			mui.init();
			mui('.mui-scroll-wrapper').scroll();
			//进入页面自动轮播  简单明了
			var slider = mui("#slider");
			var gallery = mui('.mui-slider');  
			gallery.slider({  
			  interval:1000//自动轮播周期，若为0则不自动播放，默认为0；  
			});  
			url = _this.addr+"v1/poem/recommend"
			//加载推荐数据
			$.ajax({ url: url, data:{'num':6}, success: function(data){
				if(data && data.status == 1){
					$.each(data.data,function(index, val){
						var html = '<li class="mui-table-view-cell mui-media"><a href="detail/shi.html?id='+val.Id+'"><div class="mui-media-body">'
							html += '《'+val.Title+'》'+val.Dynasty+':'+val.Author
							html += '<p class="mui-ellipsis" align="left">'+val.Content+'</p></div></a></li>'
	                    $('#recom-list').append(html)
					});
				}
		    }});
			$('#issue').bind("click", _this, function(){
				$(location).attr('href', 'detail/publish.html');
			});
		},
	    
	}
	
	
	var app = new App();
	app.exec();
}());