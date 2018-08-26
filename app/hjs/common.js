var addr = "http://www.kameika.cn/";  //全局变量
$.ajaxSetup({ cache: true });
$.ajax({ url: addr+"v1/poem/recommend", data:{'num':10}, headers: {'Cache-Control': "private"}, success: function(data){
        if(data && data.status == 1){
            $.each(data.data,function(index, val){
                var html = '<li class="mui-table-view-cell mui-media"><a href="detail/shi.html?id='+val.id+'"><div class="mui-media-body">'
                html += '《'+val.title+'》'+val.dynasty+':'+val.author
                html += '<p class="mui-ellipsis" align="left">'+val.content+'</p></div></a></li>'
                $("#recom-list").append(html)
            });
        }
    }
});