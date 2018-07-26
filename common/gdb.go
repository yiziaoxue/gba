package common

import (
	. "fmt"
	"database/sql"
	_"github.com/go-sql-driver/mysql"
)

var DB *sql.DB

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

func QueryRows(sql string)(map[string]interface{}, error) {
	rows, err := DB.Query(sql)
	if err != nil {
		return nil, err
	}
	//构造scanArgs、values两个数组，scanArgs的每个值指向values相应值的地址
	columns, _ := rows.Columns()
	scanArgs := make([]interface{}, len(columns))
	values := make([]interface{}, len(columns))
	for i := range values {
	    scanArgs[i] = &values[i]
	}
	record := make(map[string]interface{})
	for rows.Next() {
	    //将行数据保存到record字典
	    err = rows.Scan(scanArgs...)
	    for i, col := range values {
	        if col != nil {
	            record[columns[i]] = string(col.([]byte))
	        }
	    }
	}
	return record, nil
}