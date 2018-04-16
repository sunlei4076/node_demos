
var fs = require('fs');
var file="/Users/sunlei/Desktop/data.json";
var result=JSON.parse(fs.readFileSync( file));
// console.dir(result)
var pinyin = require("pinyin");

function translateToPinyin(str) {
  let py = pinyin(str, {
    style: pinyin.STYLE_NORMAL // 设置拼音风格
  })
    .map(e => e[0])
    .join("")
    return py
}

function changeToPy(data, key) {
  if (Array.isArray(data)) {
    return data.map(e=>changeToPy(e))
  } else if (typeof(data) == 'object'){
    var keys = Object.keys(data)
    var newObj = {}
    keys.map(e=>{
      newObj[e] = changeToPy(data[e],e)
    })
    return newObj
  } else {
    if (key == "SuitFocus" || key == "ProductFocus") {
      return translateToPinyin(data)
    }else {
      return data
    }
  }
}
var newresult = changeToPy(result)
// console.log(newresult)
fs.writeFileSync("/Users/sunlei/Desktop/data1.json", JSON.stringify(newresult));
