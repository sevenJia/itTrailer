const rp = require('request-promise-native')
const path = require('path')
const { mkdir } = require('../../include/commonfun.js')
const url = require('url')
const fs = require('fs')
const {douban_api_filter} = require('../../config/config.js')
const {mongo} = require('../../model/mongo.js')

async function fetchMovie(item)
{
    //原官方网站（150/h）会判断 referer 如果需要使用原网址 可以使用nginx 反向代理  现10000/h
    const url = `https://douban.uieee.com/v2/movie/subject/${item.id}`;
    const res = await rp(url);
    return res;
}
let movieDatas = [];
let saveMovieFile = async (movies) => {
    movies.forEach(async movie =>{
        let movieData = await fetchMovie(movie)
        try{
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
				let url_path = url.parse(image)
				let file_path = path.parse(url_path.path)
				//创建文件夹
				await mkdir(path.resolve(__dirname, '../../static' + file_path.dir))
				//文件路径
				let image_save_path = path.resolve(__dirname, '../../static' +url_path.path)
				movieDatas['image_save_path'] = image_save_path
				//写入文件
				await rp(image).pipe(fs.createWriteStream(image_save_path))
				//写入数据库操作
				let dbs = new mongo('itTrailer','movie')
				dbs.save(movieDatas,(err,result) => 
				{
					if(err) return console.error(err)
					console.log(`数据插入成功: ${result}`)
				}) 
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
