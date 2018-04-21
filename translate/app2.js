
var fs = require('fs');
var dataJson = "/Users/sunlei/Git/node_demos/test/src/new.json"

var dataDic = JSON.parse(fs.readFileSync(dataJson));

// // console.log(data1Dic)
function changeToPy(data) {
  Object.keys(data.ResultData.ProductList).map(e=>{
    data.ResultData.ProductList[e] = {
      ...data.ResultData.ProductList[e],
      ProductFocus: data.ResultData.ProductList[e].ProductFocus+".png"
    }
  })
  Object.keys(data.ResultData.PackageList).map(e=>{
    data.ResultData.PackageList[e] = {
      ...data.ResultData.PackageList[e],
      PackageFocus: data.ResultData.PackageList[e].PackageFocus+".png"
    }
  })
  return data
}



dataDic = changeToPy(dataDic)

fs.writeFileSync("/Users/sunlei/Git/node_demos/test/src/data.json", JSON.stringify(dataDic));
