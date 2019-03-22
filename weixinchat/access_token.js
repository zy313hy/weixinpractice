const {readFile,writeFile} =require('fs')
const rp =require('request-promise-native')

  async function getAccessToken(){
    const appId='wx66ff720182365482';
    const appSecret='4015128392cd98ebbc366544172a75b3';
    const url=`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${appSecret}`;
    const result=await rp({method: 'GET', url, json: true});
      console.log(result);
    result.expires_in=Date.now()+7200000-300000;
    writeFile('./accessToken.txt',JSON.stringify(result),(err)=>{
      if(!err){console.log('数据保存成功')}
      else{
          console.log(err)
      }
    })
      return result;

}


/*
    一上来读取本地保存access_token，
        有：
          判断有没有过期
            - 没有过期， 直接使用
            - 过期了， 重新发送请求、获取access_token，保存起来，设置过期时间
        没有
          发送请求、获取access_token，保存起来，设置过期时间
   */
module.exports=function fetchAccessToken() {
    return new Promise((resolve, reject) => {
        readFile('./accessToken.txt',(err,data)=>{
            if(!err){
        resolve(JSON.parse(data.toString()))
            }else {
                reject(err)
            }
        })
    }).then(res=>{
        if(res.expires_in<=Date.now()){
           return getAccessToken();
        }else {
         return res;
        }
    })
    .catch(err=>{
        //正常错误
        //Promise 内部有accessToken
        return getAccessToken();
    })

}