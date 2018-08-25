package main

import (
//	. "fmt" aaa
	_ "gba/common"
    "github.com/gin-gonic/gin"
    "github.com/gin-contrib/cors"
	"os"
	"log"
)

func main() {
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

	fileName := "/data1/logs/golang.log"
	logFile,err  := os.Create(fileName)
	defer logFile.Close()
	if err != nil {
		log.Fatalln("open file error !")
	}
}

