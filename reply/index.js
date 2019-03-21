const sha1=require('sha1');
const {getUserData,parseXMLData,formatJsData}=require('../nutils/tools');
const template=require('./template')
module.exports=()=> {
    return async (req,res)=>{
        console.log(req.query)

        const {signature,echostr,timestamp,nonce}=req.query;
        const token='huoyingPKhaizeiwang';
        //将token，timestamp,nonce三个参数进行字典序排序
        const sortedArr=[token,timestamp,nonce].sort();
        console.log(sortedArr)
        //三个字符串拼成一个字符串进行sha1加密
        const sha1Str=sha1(sortedArr.join(''));
        console.log(sha1Str)
        if(req.method==='GET'){
            //验证消息是否来自微信
            if(sha1Str===signature){
                res.end(echostr)
            } else{
                res.end('error')
            }
        }else if(req.method==='POST'){

            const xmlData=await getUserData(req);
            const jsData=parseXMLData(xmlData);
            const userData=formatJsData(jsData);
            let options={
                toUserName:userData.FromUserName,
                fromUserName:userData.ToUserName,
                creatTime:Date.now(),
                type:'text',
                content:"what are you talking about",

            }

            if(userData.Content==='1'){
               options.content="are you kidding me";
            }else if(userData.Content==='2'){
               options.content="how are you";
            }if(userData.MsgType==='image'){
                options.mediaId=userData.MediaId;
                options.type='image'
            }

            const replyMessage = template(options);
            res.send(replyMessage)
        }
        else {
            res.end('error')
        }
    }
}