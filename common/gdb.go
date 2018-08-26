package common

import (
	. "fmt"
	"database/sql"
	_"github.com/go-sql-driver/mysql"
	"log"
)

var DB *sql.DB
var logger *log.Logger = GetLogger()

func init(){	
	db, err := sql.Open("mysql", "root:czh5316344@tcp(119.29.245.47:3306)/poem?charset=utf8")
	if err != nil{
		Println(err)
	}
	
	db.SetMaxIdleConns(20)
	db.SetMaxOpenConns(20)
	
	if err := db.Ping(); err != nil{
		Println(err)
	}
	DB = db
}

func Query(sql string)(map[string]interface{}, error) {
	rows, err := DB.Query(sql)
	defer rows.Close()
	if err != nil {
		return nil, err
	}
	//构造scanArgs、values两个数组，scanArgs的每个值指向values相应值的地址
	cloumns, _ := rows.Columns()
	scanArgs := make([]interface{}, len(cloumns))
	values := make([]interface{}, len(cloumns))
	for i := range values {
	    scanArgs[i] = &values[i]
	}
	record := make(map[string]interface{})
	for rows.Next() {
	    //将行数据保存到record字典
	    err = rows.Scan(scanArgs...)
	    for i, col := range values {
	        if col != nil {
	            record[cloumns[i]] = string(col.([]byte))
	        }
	    }
	}
	return record, nil
}

func QueryRows(sqlstr string)([]map[string]interface{}, error) {
	rows, err := DB.Query(sqlstr)
	if err != nil {
		Println(err)
	}
	defer rows.Close()
	cloumns, err := rows.Columns()//获取数据表的列名
	if err != nil {
		Println(err)
	}
	rowMaps := make([]map[string]interface{}, 0)
	values := make([]sql.RawBytes, len(cloumns))
	scanArgs := make([]interface{}, len(values))
	for i := range values {
		scanArgs[i] = &values[i]
	}
	for rows.Next() {
		err = rows.Scan(scanArgs...)
		if err != nil {
			logger.Fatal(err)
		}
		record := make(map[string]interface{})
		for i, col := range values {
			if col != nil {
				record[cloumns[i]] = string(col)
			}
		}
		rowMaps = append(rowMaps, record)
	}
	return rowMaps, nil
}