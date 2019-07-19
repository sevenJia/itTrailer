const {mongo} = require('../model/mongo.js')

let dbs = new mongo('itTrailer','movie')

dbs.model.findOne({id:26100958},function(err,result) 
{
    if(err) return console.error(err)
    console.log(`数据查找成功: ${result}`)
})

