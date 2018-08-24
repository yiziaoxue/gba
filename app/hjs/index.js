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
                        style:'circle',//必选，下拉刷新样式，目前支持原生5+ ‘circle’ 样式
                        height: 36,
                        contentinit: '下拉可以刷新',
                        contentdown: '下拉可以刷新',
                        contentover: '释放立即刷新',
                        contentrefresh: '正在加载...',
                        callback: app.pulldownRefresh
                    }
                }
            });
            mui('body').on('tap','a',function(){document.location.href=this.href;});
            mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });
			//进入页面自动轮播  简单明了
			var gallery = mui('.mui-slider');
			gallery.slider({  
			  interval:1000//自动轮播周期，若为0则不自动播放，默认为0；  
			});  
		},

        pullupRefresh : function() {
            var _this = this
            setTimeout(function() {
                $.ajax({ url: app.url, data:{'num':10}, headers: {'Cache-Control': "no-cache"},success: function(data){
                        if(data && data.status == 1){
                            $.each(data.data,function(index, val){
                                var html = '<li class="mui-table-view-cell mui-media"><a href="detail/shi.html?id='+val.Id+'"><div class="mui-media-body">'
                                html += '《'+val.Title+'》'+val.Dynasty+':'+val.Author
                                html += '<p class="mui-ellipsis" align="left">'+val.Content+'</p></div></a></li>'
                                $('#recom-list').append(html)
                            });
                        }
                    }
                });
                mui('#pullrefresh').pullRefresh().endPullupToRefresh(); //参数为true代表没有更多数据了。
            }, 1000);
        },

        /**
         * 下拉刷新具体业务实现
         */
        pulldownRefresh : function() {
            setTimeout(function() {
                $.ajax({ url: app.url, data:{'num':10}, success: function(data){
                        if(data && data.status == 1){
                            $.each(data.data,function(index, val){
                                var html = '<li class="mui-table-view-cell mui-media"><a href="detail/shi.html?id='+val.Id+'"><div class="mui-media-body">'
                                html += '《'+val.Title+'》'+val.Dynasty+':'+val.Author
                                html += '<p class="mui-ellipsis" align="left">'+val.Content+'</p></div></a></li>'
                                $(html).insertBefore($($("#recom-list").children("li").get(0)))
                            });
                        }
                    }
                });
                mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
                mui.toast("为你推荐了6首詩歌");
            }, 1000);
        }
	    
	}
	
	
	var app = new App();
	app.exec();
}());