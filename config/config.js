//豆瓣api接口值过滤
const DOUBAN_API_FILTER = [
    'id','title','rating','trailers','images','year','alt','summary','reviews_count','original_title','blooper_urls',
    'pubdate','writers','pubdates','website','durations','trailer_urls','bloopers','countries','popular_reviews'
]
//爬取数据页数
const PAGE_NUM = 5
//爬取等待时长
const WAIT_TIME = 2000
//exports.douban_api_filter = douban_api_filter

module.exports = {
    DOUBAN_API_FILTER,
    PAGE_NUM,
    WAIT_TIME,
}