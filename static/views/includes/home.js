/**
 * 配置申明
 */
//图片高度
const img_height = 0.7;

window.addEventListener('load',function()
{
    //将背景图大小一致
    let card_img_box = document.getElementsByClassName('card_img_box');
    let img_width = card_img_box[0].offsetWidth;
    if(card_img_box.length > 0)
    {
        for(let dom of card_img_box){
            dom.style.height = `${img_width/0.7}px`;   
        }
    }
    
    //懒加载 未实现 有时间可以写写
    let card_img_top = document.getElementsByClassName('card-img-top');
    if(card_img_top.length > 0)
    {
        for(let dom of card_img_top)
        {
            dom.src = dom.dataset.src;
        }
    }

    /**** 弹出窗口逻辑 */
    // click 事件委托
    let body = document.body;
    
    body.addEventListener('click',(e) =>
    {
        let class_name = e.target.className;
        let id = e.target.id;
        
        if(class_name === 'card-img-top' || class_name === 'card-title')
        {//展示弹出层逻辑
            deal_fixed('block');
            let card = e.target.parentNode.parentNode;
            let card_title_node = card.getElementsByClassName('card-title')[0];
            let card_video_url = card.getElementsByClassName('card-desc')[0];

            //获取trailer资料
            let trailer_title = card_title_node.innerHTML;
            //let trailers = JSON.parse(card_title_node.dataset.trailer);
            
            //弹出层换值
            let video_title = document.getElementById('video_title');
            let video_src = document.getElementById('video_src');
            
            video_title.innerHTML = trailer_title;
            if(!card_video_url.dataset.vidio) return;
            video_src.src = card_video_url.dataset.vidio;
        }
        if(id === 'details')
        {//隐藏弹出层逻辑
            deal_fixed('none');
        }
    },false)

    /**详情事件委托  mouseover mouseout*/
    body.addEventListener('mouseover',(e) => 
    {
        if(e.target.className != 'card-desc') return;
        let pop_up_windows = document.getElementsByClassName('pop_up_window');
        let pop_up_window = e.target.nextElementSibling;
        if(((1+[].indexOf.call(pop_up_windows,pop_up_window))%4) == 0)  pop_up_window.style.left = "-125%"
        pop_up_window.style.display = 'block';
    },false)
    body.addEventListener('mouseout',(e) => 
    {
        if(e.target.className != 'card-desc') return;
        e.target.nextElementSibling.style.display = 'none'
    },false)

},false)

//弹出层处理
function deal_fixed(dis)
{
    let details = document.getElementById('details');
    let fixed_background = document.getElementById('fixed_background');
    //样式处理
    details.style.display = dis;
    fixed_background.style.display = dis;
    if(dis = "none"){
        let video_src = document.getElementById('video_src');
        //终止视屏播放
        video_src.pause();
        //video_src.abort();
    }
}

