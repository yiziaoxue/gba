#!/usr/bin/python
# coding: utf-8
'''
    python图片处理
    @author:fc_lamp
    @blog:http://fc-lamp.blog.163.com/
'''
from PIL import Image

#等比例压缩图片
def resizeImg(args):
    im = Image.open(args["ori_img"])
    ori_w,ori_h = im.size
    widthRatio = heightRatio = None
    ratio = 1
    if (ori_w and ori_w > args['dst_w']) or (ori_h and ori_h > args['dst_h']):
        if args['dst_w'] and ori_w > args['dst_w']:
            widthRatio = float(args['dst_w']) / ori_w #正确获取小数的方式
        if args['dst_h'] and ori_h > args['dst_h']:
            heightRatio = float(args['dst_h']) / ori_h

        if widthRatio and heightRatio:
            if widthRatio < heightRatio:
                ratio = widthRatio
            else:
                ratio = heightRatio

        if widthRatio and not heightRatio:
            ratio = widthRatio
        if heightRatio and not widthRatio:
            ratio = heightRatio

        newWidth = int(ori_w * ratio)
        newHeight = int(ori_h * ratio)
    else:
        newWidth = ori_w
        newHeight = ori_h

    im.resize((newWidth,newHeight),Image.ANTIALIAS).save(args['dst_img'],quality=args['save_q'])

#Demon
#源图片
ori_img = "C:/Users/asus/Desktop/group11.jpg"
#目标图片
dst_img = "C:/Users/asus/Desktop/group1.png"
#目标图片大小
dst_w = 160
dst_h = 100
#保存的图片质量
save_q = 5
#等比例压缩
args = {'ori_img':ori_img,'dst_img':dst_img,'dst_w':dst_w,'dst_h':dst_h,'save_q':save_q}
resizeImg(args)