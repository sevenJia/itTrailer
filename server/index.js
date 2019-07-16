const {mongo} = require('../model/mongo.js')

console.log(mongo)
let dbs = new mongo('itTrailer','movie')
console.log(dbs)
dbs.findOne({id:26100958},function(err,result) 
{
    if(err) return console.error(err)
    console.log(`数据查找成功: ${result}`)
})