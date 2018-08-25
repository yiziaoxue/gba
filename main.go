package main

import (
//	. "fmt" aaa
    "github.com/gin-gonic/gin"
    "github.com/gin-contrib/cors"
	"gba/common"
)

func main() {
	common.InitLogger()
	config := cors.Config{
		AllowAllOrigins:  true,  
        AllowMethods:     []string{"*"},  
        AllowHeaders:     []string{"Origin", "Authorization", "Access-Control-Allow-Origin"},  
        AllowCredentials: false,  
	}
	router := gin.New()
	router.Use(cors.New(config))
	router.Static("/app", "./app")//加载静态资源
	inits(router)//初始化
	router.Run(":8000")
}

