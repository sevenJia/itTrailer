const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');

app.use(views(__dirname + '/views', {
    extension: 'pug',
}));

app.use(async (ctx, next) =>
{
    await ctx.render('index.pug', {
        you:'欢迎来到',
        me:'v1.2',
    });
});

app.listen(6789);
