#!/usr/bin/python
# coding: utf-8
import sys
import urllib,urllib2
import time,datetime
import json
import MySQLdb
from time import sleep

###########
#爬数据类
###########
class Poem:
    def __init__(self):
        self.page = 1
        self.size = 10
        self.token = "gswapi"
        self.dynastys = ["唐代","先秦","魏晋","南北朝","隋代","两汉","五代","宋代","金朝","元代","明代","清代"]
        self.url = "https://app.gushiwen.org/api/shiwen/Default.aspx"
        self.detail_table = "poem_detail"
        self.db = MySQLdb.connect("119.29.245.47", "root", "czh5316344", "poem", charset='utf8' )
        
    def run(self):
        num = 0
        page = self.page
        token = self.token
        for dynasty in dynastys:
            data = self.getData(dynasty, page, token);
            while data and len(data["gushiwens"]) > 0:
                self.insertData(data["gushiwens"])
                data = self.getData(dynasty, page, token);
                time.sleep(1) # 休眠1秒
                num = num + 1
                page = page + 1
            print num
        self.db.close()
        
    def getData(self, dynasty, page, token):
        url = self.url + "?cstr=" + dynasty + "&id=0&page=" + str(page) + "&pwd=&token=" + token #此处为没有经过CA认证的URL地址。
        request = urllib2.Request(url)
        response = urllib2.urlopen(request)
        res = response.read()
        data = json.loads(res)
        return data
    
    def insertData(self, data):
        cursor = self.db.cursor()
        keys = ["title","tag","dynasty","author","country","content","creattime","updatetime"]
        for row in data:
            t = int(time.time())
            param = {
                "title":row["nameStr"],
                "tag":row["tag"],
                "dynasty":row['chaodai'],
                "author":row['author'],
                "content":row["cont"],
                "country":"中国",
                "creattime":str(t),
                "updatetime":str(t),
            }
            insertSql = "INSERT INTO "+self.detail_table+" (`"+"`,`".join(keys)+"`) VALUES "
            valueStrings = []
            value = []
            for key in keys:
                value.append(param[key])
            valueString = "('" + "','".join(value) + "')"
            valueStrings.append(valueString)
            insertSql += ",".join(valueStrings)
            try:
                cursor.execute(insertSql)
                conn.commit()
            except Exception as e:
                print insertSql
                print e.message

now = int(time.time())           
print "start:" + time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(now))
reload(sys)
sys.setdefaultencoding('utf8')          
peom = Poem()
peom.run()


