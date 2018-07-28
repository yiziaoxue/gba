package main

import (
	"reflect"
    "github.com/gin-gonic/gin"
    "shi/controllers/actions/sys"
    "shi/controllers/actions/poem"
)
//路由器
var routers = [2]interface{}{&sys.Routers{},&poem.Routers{}}

func inits(router *gin.Engine){
	//初始化路由器中各个action的方法
	for _, r := range routers {
		v := reflect.ValueOf(r)
		m := v.MethodByName("Inits")
		p := []reflect.Value{reflect.ValueOf(router)}
		m.Call(p)
	}
}
