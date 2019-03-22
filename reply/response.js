/*
处理回复功能
 */
module.exports=(userData)=>{
    let options={
        toUserName:userData.FromUserName,
        fromUserName:userData.ToUserName,
        creatTime:Date.now(),
        type:'text',
        content:"what are you talking about",

    }
    if(userData.MsgType==='text'){
        if(userData.Content==='1'){
            options.content="are you kidding me";
        }else if(userData.Content.indexOf('2')!==-1){
            options.content="how are you";
    }
    }if(userData.MsgType==='image'){
        options.mediaId=userData.MediaId;
        options.type='image'
    }if(userData.MsgType==='location'){
        options.content=`地理位置纬度：${userData.Location_X}
    \n 地理位置经度: ${userData.Location_Y}
    \n 地图缩放大小: ${userData.Scale}
    \n 地理位置信息: ${userData.Label}`;
    }if (userData.MsgType==='voice'){
        options.content = userData.Recognition;}
    else if (userData.MsgType === 'event') {
        if (userData.Event === 'subscribe') {
            // 用户订阅事件
            options.content = '欢迎你关注公众号~';
            if (userData.EventKey) {
                // 扫描带参数的二维码 --> 不是普通二维码  活动中使用
                options.content = '欢迎扫描带参数二维码， 关注公众号~';
            }
        } else if (userData.Event === 'unsubscribe') {
            console.log('无情取关~');}
            // 如果不给值， 微信服务器会请求三次
            // options.content = '';
        // } else if (userData.Event === 'CLICK') {
        //     // 用户点击菜单
        //     options.content = '';
        // }
    }
  return options;
}
