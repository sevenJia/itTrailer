//引入数据库
const mongoose = require('mongoose')
const schema = require('./schema/index.js')

class mongo
{
	constructor(dbs,collection)
	{
		if (mongoose.connection.readyState === 0) 
		{//防止多次重复链接  readyState == 0 时是未连接状态
			//连接数据库
			mongoose.connect(`mongodb://localhost/${dbs}`)
			let db = mongoose.connection
			//绑定错误事件
			db.on('error',console.error.bind(console,'connection error:'))
			//加载模式
			//let dbSchema = mongoose.Schema()
		}
		//从schema编译过来的构造函数 模型
		this.model = mongoose.model(collection,schema[collection])
		//增删改查操作
	}
	//获取共用部分
	getModel(field)
	{
		if(field){
			return new this.model(field)
		}else{//注意...................................查询等方法 绑定在model上
			//可以直接从实例取得model 调用对应查询方法 从这里看实际无需封装以下方法（下面返回this可以实现连调）
			return this.model
		}
	}
	
	/**
	 * callback函数返回示例 参数需要是错误参数 
	 * function(err,result)  
	 * {
	 * 	if(err) return console.error(err)
	 * 	console.log(`数据查找成功: ${result}`) 
	 * }
	 */
	
	 /**
	 * 保存数据 
	 * @param {Object|被存入字段} field 
	 * @param {Function|返回错误、获取数据集} callback 
	 */
	save (field, callback)
	{
		this.getModel(field).save(callback)
		return this
	}
	 /**
	 * 移除数据 
	 * @param {Object|查找条件} where 
	 * @param {Function|返回错误、获取数据集} callback 
	 */
	remove(where,callback)
	{
		this.getModel().remove(where,callback)
		return this
	}
	/***
	 * 查找数据
	 * where type Object
	 * 用 mongoose 查询文档相当容易啦，
	 * 它支持 MongoDB 的高级（ rich ）查询语法。 
	 * 查询文档可以用 model 的 find, 
	 * findById, findOne, 和 where 这些静态方法。
	 * Tank.find({ size: 'small' }).where('createdDate').gt(oneYearAgo).exec(callback);
	 */
	find(where,callback,query='')
	{
		this.getModel().find(where,query,callback)
		return this
	}
	findOne(where,callback)
	{
		this.getModel().findOne(where).query(query).exec(callback)
		return this
	}
	/**
	 * 更新数据
	 * update
	 * where type Object
	 */
	update(where,field,callback)
	{
		this.getModel().update(where, { $set: field},callback)
		return this
	}

}

exports.mongo = mongo
