var express = require("express");
var cookieParser = require('cookie-parser');
var http = require("http");

var app = express();
app.use(cookieParser())
app.use(function(request, response) {
  const Cookies = request.cookies
  const ssotoken = Cookies.ssotoken || ''
  const ucCallback = "ucCallback('"+ssotoken+"')"
  console.log('Cookies: ', Cookies)
  console.log('ssotoken: ', ssotoken)
  console.log('ucCallback', ucCallback)
  response.end(ucCallback)
});
http.createServer(app).listen(3002);