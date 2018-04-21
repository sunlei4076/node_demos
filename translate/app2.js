
var fs = require('fs');
var data1Json = "/Users/sunlei/Git/node_demos/test/data.json"

var data1Dic = JSON.parse(fs.readFileSync(data1Json));

// // console.log(data1Dic)
var ecpcIndex = 1
function changeToPy(data, key) {
  // console.log("changeToPy=------------>\n\n\n\n",data, '  \n\n\n\n')
  if (Array.isArray(data)) {
    // console.log("Array.isArray(data))=------------>\n\n\n\n",data, '  \n\n\n\n')
    return data.map(e => changeToPy(e))
  } else if (typeof (data) == 'object') {
    // console.log("(typeof (data) == 'object')=------------>\n\n\n\n",data, '  \n\n\n\n')
    if (data.CatagoryName) {
      let keys = Object.keys(data)
      let obj = {}
       keys.map(e=>{
         data[e]=changeToPy(data[e])
       })
       return data
    } else {
      // console.log('data.Suitable')
      if (data.Suitable) {
        var obj = {
          "Type": "Package",
          "ID": "ecpc0000"+ecpcIndex,
          "Position": data.ID
        }
        var packageObj = {
          "ID": 5,
          "PackageID": "ecpc0000"+ecpcIndex,
          "ProductID": data.Suit.map(e=>e.ProductID),
          "PackageLayout": "UpDown",
          "ProductLayout": "",
          "PackageStatus": 10,
          "PackageCreateTime": "2018-04-13 17:42:00",
          "PackageFocus": data.SuitFocus,
          "PackageName": "packeg测试"+ecpcIndex
        }
        data2Dic.ResultData.PackageList["ecpc0000"+ecpcIndex] = packageObj
        data.Suit.map(e=>{
          // var obj = {
          //   "Type": "Product",
          //   "ID": e.ProductID,
          //   "Position": data.ID
          // }
          data2Dic.ResultData.ProductList[data.ProductID] = e
        })
        ecpcIndex ++
        return obj
      } else {
        // console.log('data.Productcl')
        var obj = {
          "Type": "Product",
          "ID": data.ProductID,
          "Position": data.ID
        }
        console.log(data.ProductContent)
        data2Dic.ResultData.ProductList[data.ProductID] = data
        return obj
      }
    }
   } else {
     return data
  }
}


var data2Dic = {
  "IsSuccess": true,
  "Message": "",
  "Text": "获取成功",
  "ReturnUrl": "",
  "ResultData": {
    "IsChange": "False",
    "NowVersion": "1.0",
    "DataList": [
    ],
    "ProductList": {

    },
    "PackageList": {

    }
  }
}
data2Dic.ResultData.DataList = changeToPy(data1Dic)

fs.writeFileSync("/Users/sunlei/Git/node_demos/test/data2.json", JSON.stringify(data2Dic));
