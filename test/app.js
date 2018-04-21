var express = require("express");
var path = require("path");
var http = require("http");
var fs = require('fs');
var app = express();
var publicPath = path.resolve(__dirname, "src"); 
app.use(express.static(publicPath)); 
app.get('/data',function(request, response) {
    let data = fs.readFileSync("./src/data.json")
    response.json(JSON.parse(data))
});
app.use(function(request, response) {
    response.writeHead(404);
    response.end('404!')
});
http.createServer(app).listen(80);