;(function() {
	var App = function(){
		this.addr = addr
        this.count = 0;
        this.url = addr+"v1/poem/recommend"
	}
	App.prototype = {
		exec : function() {
			var _this = this;
            mui.init({
                pullRefresh: {
                    container: '#pullrefresh',
                    down: {
                        contentrefresh: '正在加载...',
                        callback: app.pulldownRefresh
                    },
                    up: {
                        auto:true,
                        contentrefresh: '正在加载...',
                        callback: app.pullupRefresh
                    }
                }
            });
            mui('body').on('tap','a',function(){document.location.href=this.href;});
			mui('.mui-scroll-wrapper').scroll();
			//进入页面自动轮播  简单明了
			var gallery = mui('.mui-slider');
			gallery.slider({  
			  interval:1000//自动轮播周期，若为0则不自动播放，默认为0；  
			});  
		},

        pullupRefresh : function() {
            var _this = this
            setTimeout(function() {
                $.ajax({ url: app.url, data:{'num':6}, success: function(data){
                        if(data && data.status == 1){
                            $.each(data.data,function(index, val){
                                var html = '<li class="mui-table-view-cell mui-media list-detail"><div class="mui-media-body">'
                                html += '《'+val.Title+'》'+val.Dynasty+':'+val.Author
                                html += '<p class="mui-ellipsis" align="left">'+val.Content+'</p></div></a></li>'
                                $('#recom-list').append(html)
                            });
                        }
                    }
                });
                mui('#pullrefresh').pullRefresh().endPullupToRefresh(); //参数为true代表没有更多数据了。
            }, 100);
        },

        /**
         * 下拉刷新具体业务实现
         */
        pulldownRefresh : function() {
            setTimeout(function() {
                $.ajax({ url: app.url, data:{'num':6}, success: function(data){
                        if(data && data.status == 1){
                            $.each(data.data,function(index, val){
                                var html = '<li class="mui-table-view-cell mui-media list-detail"><div class="mui-media-body">'
                                html += '《'+val.Title+'》'+val.Dynasty+':'+val.Author
                                html += '<p class="mui-ellipsis" align="left">'+val.Content+'</p></div></a></li>'
                                $(html).insertBefore($($("#recom-list").children("li").get(0)))
                            });
                        }
                    }
                });
                mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
                mui.toast("为你推荐了6首詩歌");
            }, 100);
        }
	    
	}
	
	
	var app = new App();
	app.exec();
}());