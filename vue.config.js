let proxyObj={}
//代理类
proxyObj['/']={
    //websocket
    ws:false,
    //目标地址
    target:'http://localhost:8081',
    //发送的请求头的地址会被改写成target的地址
    changeOrigin:true,
    //不重写请求地址
    pathRewrite:{
        '^/':'/'
    }
}



module.exports={
    devServer:{
        host:'localhost',
        port:'8080',
        proxy:proxyObj
    }
}