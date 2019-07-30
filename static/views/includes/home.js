/**
 * 配置申明
 */
//图片高度
const img_height = 0.7;

window.addEventListener('load',function(){
    //将背景图大小一致
    let card_img_box = document.getElementsByClassName('card_img_box');
    let img_width = card_img_box[0].offsetWidth;
    if(card_img_box.length > 0)
    {
        for(let dom of card_img_box){
            dom.style.height = `${img_width/0.7}px`;   
        }
    }
    //懒加载 未实现
    let card_img_top = document.getElementsByClassName('card-img-top');
    if(card_img_top.length > 0)
    {
        for(let dom of card_img_top)
        {
            dom.src = dom.dataset.src;
        }
    }


},false)