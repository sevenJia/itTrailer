const rp = require('request-promise-native')
const path = require('path')
const { mkdir } = require('../../include/commonfun.js')


async function fetchMovie(item)
{
    //原官方网站（150/h）会判断 referer 如果需要使用原网址 可以使用nginx 反向代理  现10000/h
    const url = `https://douban.uieee.com/v2/movie/subject/${item.id}`;
    const res = await rp(url);
    return res;
}
(async () => {

    const movieDatas = [];
    let movies = [
      {
        id: 27060077,
      }]
    movies.map(async movie =>{
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
        }catch(err){
          console.log(err)
        }
        console.log({
          rating: movieData.rating,
          images: movieData.images.large.replace('s_ratio','l_ratio'),
          title: movieData.title,
          medium: movieData.trailers[0]['medium'],
          resource_url: movieData.trailers[0]['resource_url'],
        })
    })
})()
