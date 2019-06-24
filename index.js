const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');

app.use(views(__dirname + '/views', {
    extension: 'pug',
}));

app.use(async (ctx, next) =>
{
    await ctx.render('index.pug', {
        you:'Ace',
        me:'seven Ja',
    });
});

app.listen(6789);
