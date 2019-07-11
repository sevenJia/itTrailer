const rp = require('request-promise-native')
const path = require('path')
const { mkdir } = require('../../include/commonfun.js')
const url = require('url')
const fs = require('fs')

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
          movieDatas.push({
            rating: movieData.rating,
            images: movieData.images.large.replace('s_ratio','l_ratio'),
            title: movieData.title,
            medium: movieData.trailers[0]['medium'],
            resource_url: movieData.trailers[0]['resource_url'],
          })
          let url_path = url.parse(movieData.images.large.replace('s_ratio','l_ratio'))
          let file_path = path.parse(url_path.path)
          //创建文件夹
          await mkdir(path.resolve(__dirname, '../../static' + file_path.dir))
          //写入文件
          await rp(movieData.images.large.replace('s_ratio','l_ratio')).pipe(fs.createWriteStream(path.resolve(__dirname, '../../static' +url_path.path)))
          //写入数据库操作
          
        }catch(err){
          console.log(err)
        }
    })
}
module.exports = {
  saveMovieFile
}
