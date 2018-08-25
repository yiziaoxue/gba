package common

import (
	"os"
	"log"
	"gba/conf"
)

var LogFile *os.File

func InitLogger(){
	LogFile,err  := os.Create(conf.Logfile)
	defer LogFile.Close()
	if err != nil {
		log.Fatalln("open file error !")
	}
}

func GetLogger() *log.Logger{
	// 创建一个日志对象
	debugLog := log.New(LogFile,"[Debug]",log.LstdFlags)
	//配置一个日志格式的前缀
	debugLog.SetPrefix("[Info]")
	//配置log的Flag参数
	debugLog.SetFlags(debugLog.Flags() | log.LstdFlags)
	return debugLog
}