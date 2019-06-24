const puppeteer = require('puppeteer');
const url = 'https://movie.douban.com/tag/#/';

(async () => {
    console.log('start !');
    const browser = await puppeteer.launch({
        args: ['--no-sandbox'],
        dumpio:false
    });
    const page = await browser.newPage();
    await page.goto(url, {
        waitUntil: 'networkidle2'
    });
    await page.waitForSelector('.more');
    for(let i = 0;i < 2;i++)
    {
        await page.click('.more');
    }
    const result = await page.evaluate(()=>{
        let $ = window.$;
        let items = $('.list-wp a');
        let links = [];
        if(items.length>=1)
        {
            items.each((index, item)=>{
                let it = $(item);
                let id = it.find('.cover-wp').data('id');
                let title = it.find('.title').text();
                let rate = it.find('.rate').text();
                let img = it.find('img').attr('src').replace('s_ratio','l_ratio');
                links.push({
                    id,
                    title,
                    rate,
                    img,
                });
            })
        }
        return links;
    });
    browser.close();
    process.send({result});
    process.exit(0);
})();