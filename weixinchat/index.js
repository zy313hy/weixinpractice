const rp=require('request-promise-native');
const fetchAccessToken=require('./access_token')

const menu={
    "button":[
        {
            "name":"好骚啊😍",
            "sub_button":[
                {
                    "type":"view",
                    "name":"搜索",
                    "url":"http://www.soso.com/"
                },
                {
                    "type":"view",
                    "name":"度娘",
                    "url":"http://www.baidu.com"
                },
                {
                    "type":"view",
                    "name":"金瓶梅在线",
                    "url":"http://www.baidu.com"
                }
            ]
        },
        {
            "name":"网页",
            "sub_button":[
                {
                    "type":"view",
                    "name":"搜索",
                    "url":"http://www.soso.com/"
                },
                {
                    "type":"view",
                    "name":"度娘",
                    "url":"http://www.baidu.com"
                },
                {
                    "type":"view",
                    "name":"金瓶梅在线",
                    "url":"http://www.baidu.com"
                }
            ]
        },
        {
            "type":"view",
            "name":"一起骚😍",
            "url":"https://btsow.pw/tags"
        }]
}
async function createMenu() {
  const {access_token}=  await fetchAccessToken();
  const url= `https://api.weixin.qq.com/cgi-bin/menu/create?access_token=${access_token}`
  const result= await rp({method:'POST',url,json:true,body:menu});
  return result;
}
async function deleteMenu() {
    const {access_token}=  await fetchAccessToken();
    const url= `https://api.weixin.qq.com/cgi-bin/menu/delete?access_token=${access_token}`
    let result=await rp({method:'GET',url,json:true})
    return result;
}
(async()=>{
    let result=await deleteMenu();
    console.log(result)
    result=await createMenu();
    console.log(result)
})();