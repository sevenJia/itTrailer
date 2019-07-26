const {mongo} = require('../model/mongo.js')

class Index 
{
    constructor(dbs,table)
    {
        this.dbs = new mongo(dbs,table)
    }
    //首页电影信息
    getHome()
    {
        return new Promise((resolve,reject)=>{
            this.dbs.model.find({id:26100958},function(err,result) 
            {
                if(err){
                    reject(err)
                    return console.error(err)
                }
                resolve(result);
            })
        })
    }

}

module.exports = Index