const rp = require('request-promise-native')
const path = require('path')
const url = require('url')
const fs = require('fs')
const { mkdir } = require('../commonfun.js')
const {douban_api_filter} = require('../../config/config.js')
const {mongo} = require('../../model/mongo.js')

async function fetchMovie(item)
{
    //原官方网站（150/h）会判断 referer 如果需要使用原网址 可以使用nginx 反向代理  现10000/h
    const url = `https://douban.uieee.com/v2/movie/subject/${item.id}`;
    const res = await rp(url);
    return res;
}

let saveMovieFile = async (movies) => {
	let movieDatas = []
	let movieData = null
	let dbs = null
	let findBack = null
	let url_path = null
	let file_path = null
	let image_save_path = ''
	let replace_img = ''
    movies.forEach(async movie =>{
        try{
			movieData = await fetchMovie(movie)
			//console.log(movieData)
          	movieData = JSON.parse(movieData);
			//获取api值  并并过滤放入新数组
			for(let i = 0; i < douban_api_filter.length; i++){
				if (movieData.hasOwnProperty(douban_api_filter[i])) {
					movieDatas[douban_api_filter[i]] = movieData[douban_api_filter[i]] != undefined ? movieData[douban_api_filter[i]] : 'WARN: no value';
				}
			}
			image = movieData.images.large.replace('s_ratio','l_ratio') != undefined ? movieData.images.large.replace('s_ratio','l_ratio') : ''
			
			if(image)
			{
				url_path = url.parse(image)
				replace_img = url_path.path.replace('/view','');
				file_path = path.parse(replace_img)
				//创建文件夹
				await mkdir(path.resolve(__dirname, '../../static' + file_path.dir))
				//文件路径
				image_save_path = path.resolve(__dirname, '../../static' +replace_img)
				movieDatas['image_save_path'] = replace_img
				//写入文件
				await rp(image).pipe(fs.createWriteStream(image_save_path))
				//写入数据库操作
				dbs = new mongo('itTrailer','movie')
				//如果数据存在则不提交
				findBack = await dbs.find({id:movieDatas['id']});
				console.log(findBack)//数据有重复 明天检查
				if(findBack.length == 0 || !findBack){
					dbs.save(movieDatas,(err,result) => 
					{
						if(err) return console.error(err)
						console.log(`数据插入成功: ${movieDatas['id']}`)
					})
				}
				
				// })
				//console.log(movieDatas)
			}
        }catch(err){

          console.log(err)
        }
    })
}
module.exports = {
  saveMovieFile
}
