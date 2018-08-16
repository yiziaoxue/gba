package poem

import (
	. "fmt"
//	"time"
//	"net/http"
	"strings"
	"shi/common"
	"database/sql"
//	"encoding/json"
    "github.com/gin-gonic/gin"
    _"github.com/go-sql-driver/mysql"
)
var db *sql.DB

//定义路由器结构类型
type Routers struct {}

//初始化接口
func (this *Routers) Inits(router *gin.Engine){
	v := router.Group("/v1/poem")
	v.GET("/recommend", Recommend)
	v.POST("/detail", Detail)
	db = common.DB
}

// Poem 信息
type Poem struct {
	Id         int
    Title      string
    Author 		string
    Dynasty    string
    Content     string
}

type Res struct {
    Status int64
    Errcode int64
    Msg string
    data interface{}
}

//推荐接口
func Recommend(c *gin.Context){
	num := c.Query("num")
	rows, err := db.Query("SELECT id, title,author,dynasty,content FROM poem_detail limit ?", num)
	ls := []Poem{}
	for rows.Next() {
		var id int
		var title string
	    var author string
	    var dynasty string
	    var content string
		err := rows.Scan(&id, &title, &author, &dynasty, &content)
		if err != nil {
			Println(err.Error())
			continue
		}
		str := convertContent(content)
		p := Poem{id, title,author,dynasty,str[0]}
		ls = append(ls,p)
	}
	if err != nil {
	    Println(err)
	}
	c.JSON(200, gin.H{
       	"status": 1,
       	"data": ls,
	})
}

//详情接口
func Detail(c *gin.Context){
	id := c.PostForm("id")
	sql := Sprintf("SELECT * FROM poem_detail where id = %s", id)
	data, err := common.QueryRows(sql)
	str := convertContent(data["content"].(string))
	data["content"] = str
	if err != nil {
	    c.JSON(200, gin.H{
	       	"status": 0,
	       	"data": err,
		})
	}
	c.JSON(200, gin.H{
       	"status": 1,
       	"data": data,
	})
}

//诗歌内容转换
func convertContent(content string)(ret []string){
	a := strings.Split(content, "|")
	a_len := len(a)
	for i := 0; i < a_len; i++ {
		if (i > 0 && a[i-1] == a[i]) || len(a[i]) == 0 {
			continue
		}
		ret = append(ret, a[i])
	}
	return ret
}