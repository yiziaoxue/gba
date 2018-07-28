package sys

import (
	. "fmt"
	"time"
//	"net/http"
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
	v := router.Group("/v1/sys")
	v.GET("/index", Index)
	v.POST("/login", Login)
	v.POST("/regist", Regist)
	db = common.DB
}

type LoginParam struct {
	Username 		string `form:"username" json:"username" binding:"required"`
	Password		string `form:"password" json:"password" binding:"required"`
	Email			string `form:"email" json:"email"`
}

type Res struct {
    Status int64
    Errcode int64
    Msg string
    data interface{}
}
//系统入口接口
func Index(c *gin.Context){
//	if cookie, err := c.Request.Cookie("uid"); err == nil {
//		c.Redirect(http.StatusMovedPermanently, "http://192.168.1.104/app/")
//	} else {
//		c.Redirect(http.StatusMovedPermanently, "http://192.168.1.104/app/login.html")
//	}
}

//登陆接口
func Login(c *gin.Context){
	username := c.PostForm("username")
	password := c.PostForm("password")
	Println(1,username,password)
	var uid int64
	err := db.QueryRow("SELECT uid FROM poem_user WHERE username = ? and password = ?", username, password).Scan(&uid)
	if err != nil {
	    Println(err)
	}
	if uid == 0 {
		c.JSON(200, gin.H{
	       	"status": 1,
	       	"err_code":20001,
	       	"msg":"该账号不存在，请重新输入",
		})
	}
	c.JSON(200, gin.H{
       	"status": 1,
       	"data":gin.H{
	        "username": username,
			"password": password,
	},
	})
}

//注册接口
func Regist(c *gin.Context){
	var res interface{}
	username := c.PostForm("username")
	password := c.PostForm("password")
	email := c.PostForm("email")
	var creattime = time.Now().Unix()
	rows, err := db.Query("SELECT 1 FROM poem_user WHERE username = ?", username)
	if err != nil {
	    Println(err)
	}
	if rows.Next() {
		res = Res{
	       	Status: 0,
	       	Errcode: 20002,
	       	Msg: "用户名已存在，请重试！",
		}
	}else{
		rs, err := db.Exec(
		    "INSERT INTO poem_user (username, password,email,creattime) VALUES (?, ?, ?, ?)",
		    username,
		    password,
		    email,
		    creattime,
		)
		if err != nil {
		    Println(err)
		}
		//我们可以获得插入的id
		id, err := rs.LastInsertId()
		if id == 0 || err != nil {
		    Println(err)
		}
		res = Res{
			Status: 1,
	       	Errcode: 0,
	       	Msg: "",
		}
	}
	c.JSON(200, res)
}
