

const rp = require('request-promise-native')

async function fetchMovie(item)
{
    //原官方网站（150/h）会判断 referer 如果需要使用原网址 可以使用nginx 反向代理  现10000/h
    const url = `https://douban.uieee.com/v2/movie/subject/${item.id}`;
    const res = await rp(url);
    return res;
}

(async () => {
    let movies = [{
        id: 30175306,
        title: '追龙Ⅱ',
        rate: '5.7',
        img: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2558294190.jpg'
      },
      {
        id: 27060077,
        title: '绿皮书',
        rate: '8.9',
        img: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2549177902.jpg'
      },]
      movies.map(async movie =>{
          let movieData = await fetchMovie(movie)
          try{
            movieData = JSON.parse(movieData);
          }catch(err){
            console.log(err)
          }
          console.log(movieData)
      })
})()