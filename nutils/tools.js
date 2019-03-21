const {parseString}=require('xml2js')

module.exports={
    getUserData(req){
       return  new Promise((resolve, reject) => {
            let xmlData="";
            req.on('data',data=>{
                xmlData+=data.toString();
            }).on('end',()=>{
                resolve(xmlData)
            })
        })
    },
    parseXMLData(xmlData){
        let jsData=null;
        //xml数据转换json数据
        parseString(xmlData, {trim: true}, function (err, result) {
            if(!err){
                jsData=result;
            }else{
                jsData={};
            }
        })
        return jsData;
    },
    formatJsData(jsData){
        const {xml}=jsData;
        let userData={};
        for (let key in xml){
            const value=xml[key];
            //去掉数组
            userData[key]=value[0];
        }
        return userData
    }


}