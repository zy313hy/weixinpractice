const express=require("express");
const app=express();
const sha1=require('sha1');
const {parseString} = require('xml2js');



app.use( async (req,res)=>{
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
    
     const xmlData=await new Promise((resolve, reject) => {
             let xmlData="";
             req.on('data',data=>{
             xmlData+=data.toString();
             }).on('end',()=>{
                 resolve(xmlData)
             })
         })
         let jsData=null;
         //xml数据转换json数据
           parseString(xmlData, {trim: true}, function (err, result) {
             if(!err){
                 jsData=result;
             }else{
                 jsData={}
             }
         });
         //格式化jsData
         const {xml}=jsData;
         let userData={};
         for (let key in xml){
             const value=xml[key];
             //去掉数组
             userData[key]=value[0];
         }
         let content="what are you talking about";
         if(userData.Content==='1'){
             content="are you kidding me";
         }else if(userData.Content==='2'){
             content="how are you";
         }
     let replyMessage = `<xml>
      <ToUserName><![CDATA[${userData.FromUserName}]]></ToUserName>
      <FromUserName><![CDATA[${userData.ToUserName}]]></FromUserName>
      <CreateTime>${Date.now()}</CreateTime>
      <MsgType><![CDATA[text]]></MsgType>
      <Content><![CDATA[${content}]]></Content>
    </xml>`
     res.send(replyMessage)
    }
    else {
     res.end('error')
 }
//获取用户发过来的消息


});
app.listen(3000,err=>{
 if(!err){console.log('服务器连接成功')
 }else {
     console.log(err)
 }
})