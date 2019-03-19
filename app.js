const express=require("express");
const app=express();
const sha1=require('sha1');


app.use((req,res)=>{
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
        res.send('555')
    } else{
        res.send(err)
    }
 }else if(req.method==='POST'){
     req.on('data',data=>{
      console.log(data.toString())
     })
     // if(sha1Str!==signature){
     //     res.send('err');
     //     return;
     // }
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