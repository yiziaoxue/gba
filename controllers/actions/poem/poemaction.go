package poem

import (
	. "fmt"
	"log"
//	"time"
	"math/rand"
//	"net/http"
	"strings"
	"strconv"
	"gba/common"
	"database/sql"
//	"encoding/json"
    "github.com/gin-gonic/gin"
    _"github.com/go-sql-driver/mysql"
)
var db *sql.DB
var logger *log.Logger = common.GetLogger()

//定义路由器结构类型
type Routers struct {}

//初始化接口
func (this *Routers) Inits(router *gin.Engine){
	v := router.Group("/v1/poem")
	v.GET("/recommend", Recommend)
	v.GET("/detail", Detail)
	db = common.DB
}

// Poem 信息
type Poem struct {
	Id         int
    Title      string
    Author 	   string
    Dynasty    string
    Content    string
}

type Res struct {
    Status int64
    Errcode int64
    Msg string
    data interface{}
}

//推荐接口
func Recommend(c *gin.Context){
	sizes := c.DefaultQuery("num", "6")
	nums := rand.Intn(300000)
	var size,_ = strconv.Atoi(sizes)
	var page = nums + size
	//rows, err := db.Query("SELECT id, title,author,dynasty,content FROM poem_detail limit ?,?", page, size)
	sql := Sprintf("SELECT id, title,author,dynasty,content FROM poem_detail limit %d, %d", page, size)
	data, err := common.QueryRows(sql)
	if err != nil {
		logger.Println(err)
	}
	iist := data[0:size]
	for _, row := range iist {
		if(row != nil && len(row) > 0){
			var content_arr = convertContent(row["content"].(string))
			row["content"] = content_arr[0]
			row["count"] = "5"
		}
	}
	c.JSON(200, gin.H{
       	"status": 1,
       	"data": iist,
	})
}

//详情接口
func Detail(c *gin.Context){
	//sid := c.PostForm("id")
	sid := c.DefaultQuery("id", "0")
	var id,_ = strconv.Atoi(sid)
	sql := Sprintf("SELECT * FROM poem_detail where id = %d", id)
	data, err := common.Query(sql)
	str := convertContent(data["content"].(string))
	data["content"] = str
	if err != nil {
	    c.JSON(200, gin.H{
	       	"status": 0,
	       	"data": err,
		})
	}else{
		logger.Println(err)
	}
	c.JSON(200, gin.H{
       	"status": 1,
       	"data": data,
	})
}

//诗歌内容转换
func convertContent(content string)(ret []string){
	a := strings.Split(content, "。")
	a_len := len(a)
	for i := 0; i < a_len; i++ {
		if (i > 0 && a[i-1] == a[i]) || len(a[i]) == 0 {
			continue
		}
		ret = append(ret, a[i])
	}
	return ret
}