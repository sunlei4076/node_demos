
var fs = require('fs');
var dataJson = "/Users/sunlei/Git/node_demos/test/src/data.json"

var dataDic = JSON.parse(fs.readFileSync(dataJson));

// // console.log(data1Dic)
function changeToPy(data, key) {
  // console.log("changeToPy=------------>\n\n\n\n",data, '  \n\n\n\n')
  if (Array.isArray(data)) {
    // console.log("Array.isArray(data))=------------>\n\n\n\n",data, '  \n\n\n\n')
    return data.map(e => changeToPy(e, key))
  } else if (typeof (data) == 'object') {
    // console.log("(typeof (data) == 'object')=------------>\n\n\n\n",data, '  \n\n\n\n')
    if (data.CatagoryName) {
      let keys = Object.keys(data)
      let obj = {}
      keys.map(e => {
        data[e] = changeToPy(data[e], data.CatagoryName)
      })
      return data
    } else {
      if (data.Type == 'Package') {
        let obj = dataDic.ResultData.PackageList[data.ID]
        if (key == "首 頁") {
          obj.indexFocus = "index/" + obj.PackageFocus
        } else {
          obj.listFocus = "list/" + obj.PackageFocus
        }
        dataDic.ResultData.PackageList[data.ID] = obj
        obj.ProductID.map(e => {
          let obj1 = dataDic.ResultData.ProductList[e]
          obj1.listFocus = "list/" + obj1.ProductFocus
          obj1.shopCarFocus = "shopcar/" + obj1.ProductFocus
          dataDic.ResultData.ProductList[e] = obj1
        })
      } else if (data.Type == 'Product') {
        let obj = dataDic.ResultData.ProductList[data.ID]
        if (key == "首 頁") {
          obj.indexFocus = "index/" + obj.ProductFocus
        } else {
          obj.listFocus = "list/" + obj.ProductFocus
        }
        obj.shopCarFocus = "shopcar/" + obj.ProductFocus
        dataDic.ResultData.ProductList[data.ID] = obj
      }
      return data
    }
  } else {
    return data
  }
}



changeToPy(dataDic.ResultData.DataList)


Object.keys(dataDic.ResultData.ProductList).map(e=>{
  let obj = dataDic.ResultData.ProductList[e]
  console.log('obj.ProductContent===',obj.ProductContent)
  if (obj.ProductContent) {
    obj.ProductContent = obj.ProductContent.map(f=>{
      return "detail/"+f
    })
  }
  if (obj.ProductRecommendation) {
    obj.ProductRecommendation.map(f=>{
      let tempobj = dataDic.ResultData.ProductList[f]
      if (!tempobj.recommendFocus || tempobj.recommendFocus.indexOf('recommend/') == -1) {
        tempobj.recommendFocus = "recommend/"+tempobj.ProductFocus
      }
      
      dataDic.ResultData.ProductList[f] = tempobj
    })
  }
  dataDic.ResultData.ProductList[e] = obj
})
fs.writeFileSync("/Users/sunlei/Git/node_demos/test/data2.json", JSON.stringify(dataDic));
