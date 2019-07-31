const puppeteer = require('puppeteer');
const {sleep} = require('../commonfun.js')
const {PAGE_NUM,WAIT_TIME} = require('../../config/config.js')
const url = 'https://movie.douban.com/tag/#/';

(async () => {
    try{
        console.log('爬取数据开始 ----------- start !');
        //调用浏览器
        const browser = await puppeteer.launch({
            args: ['--no-sandbox'],
            dumpio:false,
        });
        //创建新页面
        const page = await browser.newPage();
        //进入网址
        await page.goto(url, {
            waitUntil: 'networkidle2'
        });
        //设置页面高度 宽度
        await page.setViewport({'height':1080,'width':1920})
        //获取元素并点击
        await sleep(WAIT_TIME)//睡面函数作用 等待页面加载完毕
        await page.waitForSelector('.more');
        for(let i = 0;i < PAGE_NUM; i++)
        {
            await page.click('.more');
            await sleep(WAIT_TIME)
        }
        //获取页面上下文内容
        const result = await page.evaluate(()=>{
            let $ = window.$;
            let items = $('.list-wp > a');
            let links = [];
            if(items.length>=1)
            {
                for(let i = 0; i < items.length; i++)
                {
                    links.push({
                        id: $(items[i]).find('.cover-wp').data('id'),
                    });
                }
            }
            return links;
        });
        
        browser.close();
        process.send({result});
        process.exit(0);
    }catch(e){
        console.log(e)
    }
})();