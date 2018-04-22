var express = require("express");
var path = require("path");
var http = require("http");
var fs = require('fs');
var app = express();
var publicPath = path.resolve(__dirname, "src"); 
app.use(express.static(publicPath)); 
app.get('/data',function(request, response) {
    let data = fs.readFileSync("./data.json")
    response.json(JSON.parse(data))
});
app.use(function(request, response) {
    response.writeHead(404);
    response.end('404!')
});
http.createServer(app).listen(3001);

// 1、接口地址：
// "http://47.98.133.108/data"

// 2、图片请求方法：

// a、首页：
// "http://47.98.133.108/index/"+图片名称
// 比如:
// "http://47.98.133.108/index/jidiweijinghua.png"

// b、列表:
// "http://47.98.133.108/list/"+图片名称
// 比如:
// "http://47.98.133.108/list/gaobieyouguanghaizaomolizao.png"

// c、详情：
// "http://47.98.133.108/detail/"+图片名称

// "http://47.98.133.108/detail/jitouxiuhuyanbumijijinghualou_1.jpg"

// d、推荐：
// "http://47.98.133.108/recommend/"+图片名称

// "http://47.98.133.108/recommend/terunxiuhujitoujinghualou.png"

// e、购物车：
// "http://47.98.133.108/shopcar/"+图片名称

// "http://47.98.133.108/shopcar/jitouxiuhumianmojingcuimi.png"