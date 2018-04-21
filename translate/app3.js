var OpenCC = require('opencc');
var opencc = new OpenCC('t2s.json');
var simpl = opencc.convertSync("漢字");
console.log(simpl)

var path = require("path");
var fs = require("fs");
var rootPath = __filename;
renameFilesInDir("/Users/sunlei/Desktop/产品切图/列表页（购物车同比缩小即可）");

function changeFileName(filepath) {
  fs.stat(filepath, function(err, stats) {
    if (err) {
      // console.warn('error', err)
      return
    }
    if (stats.isFile()) {
      // console.log(path.basename(filepath));
      var filename = path.basename(filepath);
      var parentDir = path.dirname(filepath);
      var parentDirname = path.basename(path.dirname(filepath));
      var thisFilename = path.basename(__filename);
      //console.log(thisFilename);
      //这个if就是进行更改文件名的逻辑,可以自行定义,这里定义为将文件命名为当前文件夹的名字加"-文件自身名"
      if (filename != thisFilename && filename.indexOf(parentDirname) < 0) {
          var newName = opencc.convertSync(filename)
          var newPath = parentDir + "/" + newName;
          // console.log(newName);
          fs.rename(filepath, newPath);
        // }
      }
    } else if (stats.isDirectory()) {
      // console.log("============[" + filepath + "] isDir===========");
      renameFilesInDir(filepath);
    } else {
      // console.log("unknow type of file");
    }
  });
}

function renameFilesInDir(dir) {
  fs.readdir(dir, function(error, files) {
    var len = files.length;
    var file = null;
    for (var i = 0; i < len; i++) {
      file = files[i];
      changeFileName(dir + "/" + file);
    }
  });
}
