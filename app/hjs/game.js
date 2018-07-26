;(function() {
	var App = function(ele, opt){
		
	}
	App.prototype = {
		exec : function() {
			mui.init();
			mui('.mui-scroll-wrapper').scroll();
			//进入页面自动轮播  简单明了
			var slider = mui("#slider");
			var gallery = mui('.mui-slider');  
			gallery.slider({  
			  interval:1000//自动轮播周期，若为0则不自动播放，默认为0；  
			});  
			var _this = this;
			$('#issue').bind("click", _this, function(){
				$(location).attr('href', 'detail/publish.html');
			});
		},
	    
	}
	
	
	var app = new App();
	app.exec();
}());