const Koa = require('koa')
const views = require('koa-views')
const Router = require('koa-router')
const Static = require('koa-static')
const path = require('path');
const apiHome = require('./controller/index.js')

const app = new Koa()
const router = new Router()
const home = new apiHome('itTrailer','movie');
//静态资源目录
const saticPath = './static'
app.use(Static(
    path.join(__dirname,saticPath)
))

app.use(views(__dirname + '/static/views', {
    extension: 'pug',
}))

router
.get('/',async (ctx,next)=>{
    try{
        const  data = await home.getHome()
        await ctx.render('index.pug', {data})
    }catch(e){
        console.log(e)
    }
})
.get('/backoffice',async (ctx,next)=>{
    await ctx.render('backoffice.pug', {
        me:'backoffice',
    })
})

// app.use(async (ctx, next) =>
// {
//     await ctx.render('index.pug', {
//         you:'欢迎来到',
//         me:'v1.2',
//     })
// })
app
    .use(router.routes())
    .use(router.allowedMethods())
// app
//     .use(backoffice.routes())
//     .use(backoffice.allowedMethods())
app.listen(6789)
console.log('已连接到 localhost:6789')
