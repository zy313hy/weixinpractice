const sha1=require('sha1');
const {getUserData,parseXMLData,formatJsData}=require('../nutils/tools');
const template=require('./template');
const handleResponse=require('./response')
module.exports=()=> {
    return async (req,res)=>{
        const {signature,echostr,timestamp,nonce}=req.query;
        const token='huoyingPKhaizeiwang';
        //将token，timestamp,nonce三个参数进行字典序排序
        const sortedArr=[token,timestamp,nonce].sort();
        console.log(sortedArr)
        //三个字符串拼成一个字符串进行sha1加密
        const sha1Str=sha1(sortedArr.join(''));

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
            const options=handleResponse(userData);

            const replyMessage = template(options);
            res.send(replyMessage)
        }
        else {
            res.end('error')
        }
    }
}