
var fs = require('fs');
var file = "/Users/sunlei/Git/node_demos/translate/data1.json";
var result = JSON.parse(fs.readFileSync( file));
console.dir(result)
// var pinyin = require("pinyin");

// function translateToPinyin(str) {
//   let py = pinyin(str, {
//     style: pinyin.STYLE_NORMAL // 设置拼音风格
//   })
//     .map(e => e[0])
//     .join("")
//     return py
// }
var OpenCC = require('opencc');
var opencc = new OpenCC('s2t.json');
// var simpl = opencc.convertSync("汉子");

function changeToPy(data, key) {
  if (Array.isArray(data)) {
      return data.map(e=>changeToPy(e))
  } else if (typeof(data) == 'object'){
    var keys = Object.keys(data)
    var newObj = {}
    keys.map(e=>{
      if (e === 'ProductDes') {
        return
      } else {
        newObj[e] = changeToPy(data[e],e)
      }
    })
    return newObj
  } else {
      return data
  }
}
var newresult = changeToPy(result)
// console.log(newresult)
fs.writeFileSync("/Users/sunlei/Git/node_demos/translate/data2.json", JSON.stringify(newresult));
