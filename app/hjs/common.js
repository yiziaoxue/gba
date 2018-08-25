var addr = "http://localhost:8000/";  //全局变量
$.ajaxSetup({ cache: true });
$.ajax({ url: addr+"v1/poem/recommend", data:{'num':10}, headers: {'Cache-Control': "private"}, success: function(data){
        if(data && data.status == 1){
            $.each(data.data,function(index, val){
                var html = '<li class="mui-table-view-cell mui-media"><a href="detail/shi.html?id='+val.Id+'"><div class="mui-media-body">'
                html += '《'+val.Title+'》'+val.Dynasty+':'+val.Author
                html += '<p class="mui-ellipsis" align="left">'+val.Content+'</p></div></a></li>'
                $("#recom-list").append(html)
            });
        }
    }
});