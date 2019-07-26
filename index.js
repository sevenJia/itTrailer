const Koa = require('koa')
const views = require('koa-views')
const Router = require('koa-router')
const apiHome = require('./controller/index.js')

const app = new Koa()
const router = new Router()
const home = new apiHome('itTrailer','movie');
app.use(views(__dirname + '/views', {
    extension: 'pug',
}))

router
.get('/',async (ctx,next)=>{
    const  data = await home.getHome();
    console.log(data)
    await ctx.render('index.pug', {data})
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
