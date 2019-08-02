const rp = require('request-promise-native')
const path = require('path')
const url = require('url')
const fs = require('fs')
const { mkdir } = require('../commonfun.js')
const {DOUBAN_API_FILTER,DOUBAN_API,USER_AGENT} = require('../../config/config.js')
const {mongo} = require('../../model/mongo.js')

async function fetchMovie(item)
{
    //原官方网站（150/h）会判断 referer 如果需要使用原网址 可以使用nginx 反向代理  现10000/h
    const url = DOUBAN_API+item.id;
    const res = await rp({
		'method':'get',
		'url':url,
		'headers':{
            'User-Agent': USER_AGENT,
		},
		'json': true
	});
    return res;
}

let saveMovieFile = async (movies) => {
	let movieDatas = []
	let movieData = null
	let count = 0
	let url_path = null
	let file_path = null
	let image_save_path = ''
	let replace_img = ''
	let image_url = ''
	let video_url = ''
	let video_save_path= ''
	//数据库链接
	let dbs = new mongo('itTrailer','movie')
	
	for(let movie of movies)//会不会同步执行大量代码 性能比循环内多次申明变量更弱
	{//使用foreach 回调函数为异步函数时 会导致上一条数据没有写入 下一条数据 已经准备好写入 导致两次或多次moviedatas 覆盖为最后一次的值 多次写入 除非变量声明在循环内（有性能为题） 
		try{
			movieData = await fetchMovie(movie)
			//  movieData = JSON.parse(movieData);
			//获取api值  并并过滤放入新数组
			for(let i = 0; i < DOUBAN_API_FILTER.length; i++)
			{
				if (movieData.hasOwnProperty(DOUBAN_API_FILTER[i])) 
				{
					movieDatas[DOUBAN_API_FILTER[i]] = movieData[DOUBAN_API_FILTER[i]] != undefined ? movieData[DOUBAN_API_FILTER[i]] : 'WARN: no value';
				}
			}
			image_url = movieDatas.images.large.replace('s_ratio','l_ratio')
			image_url = image_url != undefined ? image_url : false

			if(movieDatas['trailers'].length > 0)
			{
				video_url = movieDatas['trailers'][0]['resource_url']
				video_url = video_url != undefined ? video_url: false;
			}
			
			if(image_url)
			{
				url_path = url.parse(image_url)
				replace_img = url_path.path.replace('/view','');
				file_path = path.parse(replace_img)
				//创建文件夹 图片
				await mkdir(path.resolve(__dirname, '../../static' + file_path.dir))
				//文件路径
				image_save_path = path.resolve(__dirname, '../../static' +replace_img)
				movieDatas['image_save_path'] = replace_img
				
				if(video_url)
				{//获取并插入数据
					video_save_path = video_url.match(/\/[\w-]+\.mp4$/)[0]
					
					//创建文件夹 视频
					await mkdir(path.resolve(__dirname, '../../static/movie'))
					movieDatas['video_save_path'] = `/movie${video_save_path}`
					video_save_path = path.resolve(__dirname, '../../static/movie' + video_save_path)
					await rp({
						'method':'get',
						'url':video_url,
						'headers':{
							'User-Agent': USER_AGENT,
						}
					}).pipe(fs.createWriteStream(video_save_path))
				}
				if(!video_url) movieDatas['trailers'] = [{}]
				if(!video_url) movieDatas['video_save_path'] = ''
				
				//写入文件
				await rp(image_url).pipe(fs.createWriteStream(image_save_path))
				//写入数据库操作
				//如果数据存在则不提交
				count = await dbs.count({id:movieDatas['id']})
				if(count != 0) console.log(`数据已存在 ******************************************* ${movieDatas['id']}`) 
				if(count == 0)
				{
					let result = await dbs.save(movieDatas)
					console.log(`数据插入成功 ----------------------------------------- ${result['id']}`)
				} 
			}
        }catch(err){
          console.log(err)
        }
	}
}
module.exports = {
  saveMovieFile
}
