//api 及header 相关
//原官方网站（150/h）会判断 referer 如果需要使用原网址 可以使用nginx 反向代理  现10000/h
const DOUBAN_API = 'https://douban.uieee.com/v2/movie/subject/' //豆瓣电影详情api
const PUPPETEER_URL = 'https://movie.douban.com/tag/#/'                   //puppeteer 所爬取页面
const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36'

//豆瓣api接口值过滤
const DOUBAN_API_FILTER = [
    'id','title','rating','trailers','images','year','alt','summary','reviews_count','original_title','blooper_urls',
    'pubdate','writers','pubdates','website','durations','trailer_urls','bloopers','countries','popular_reviews'
]
//爬取数据页数
const PAGE_NUM = 0
//爬取等待时长
const WAIT_TIME = 2000

module.exports = {
    DOUBAN_API_FILTER,
    PAGE_NUM,
    WAIT_TIME,
    DOUBAN_API,
    PUPPETEER_URL,
    USER_AGENT,
}