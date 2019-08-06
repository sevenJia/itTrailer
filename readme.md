# 项目所使用插件

### 框架
- koa
- koa-views
- koa-router
- koa-sattic
### 模板渲染
pugjs
### 爬取文件相关插件
- [puppeteer](https://github.com/GoogleChrome/puppeteer,'puppeteer') 
- request
- request-promise-native
### 数据库（mongodb）
- mongoose
____

## server
crawler/puppeteer 用于爬取豆瓣页面信息
tasks/douban 通过豆瓣api 获取详细信息并将资源保存在static文件夹下（图片、预告片）
tasks/child_movie 用子进程跑爬虫 防止影响站点访问
commonfun 为封装的一些异步函数
## model
用mongoose封装了mongodb的链接 和一些简单方法同时存放Schema文件


## Config
调整配置文件内常量数值，可控制豆瓣资源的爬取页数

![效果图](https://www.iyou.ink/itrailer.png)
