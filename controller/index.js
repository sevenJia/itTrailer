const {mongo} = require('../model/mongo.js')

class Index 
{
    constructor(dbs,table)
    {
        this.dbs = new mongo(dbs,table)
    }
    //首页电影信息
    async getHome()
    {
          return await this.dbs.model.find({})
    }

}

module.exports = Index