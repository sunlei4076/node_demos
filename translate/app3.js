var OpenCC = require('opencc');
var opencc = new OpenCC('t2s.json');
var simpl = opencc.convertSync("漢字");
console.log(simpl)

var path = require("path");
var fs = require("fs");
var rootPath = __filename;
renameFilesInDir("/Users/sunlei/Library/Containers/com.tencent.xinWeChat/Data/Library/Application\ Support/com.tencent.xinWeChat/2.0b4.0.9/302e188d912c8a0be03a6a193e184d66/Message/MessageTemp/eadad77e54bcb0c5fa58c2ae0bbf9087/File/切图3");

function changeFileName(filepath) {
  fs.stat(filepath, function(err, stats) {
    if (err) {
      // console.warn('error', err)
      return
    }
    if (stats.isFile()) {
      //console.log("isFile,chaning filename...");
      var filename = path.basename(filepath);
      var parentDir = path.dirname(filepath);
      var parentDirname = path.basename(path.dirname(filepath));
      var thisFilename = path.basename(__filename);
      //console.log(thisFilename);
      //这个if就是进行更改文件名的逻辑,可以自行定义,这里定义为将文件命名为当前文件夹的名字加"-文件自身名"
      if (filename != thisFilename && filename.indexOf(parentDirname) < 0) {
          var newName = opencc.convertSync(filename)
          var newPath = parentDir + "/" + newName;
          console.log("going to rename from " + filepath + " to " + newPath);
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
