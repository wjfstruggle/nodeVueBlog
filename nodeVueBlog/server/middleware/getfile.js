const koaBody = require('koa-body')
const path = require('path')

module.exports = koaBody({     // 先处理请求再进入对应的路由
  multipart: true,    // 支持多文件上传
  formidable: {
    uploadDir: path.resolve(__dirname, 'public/image'),
    maxFieldsSize : ((5 * 1024 * 1024)), // 文件大小
    keepExtensions : true, // 保留扩展名
    onFileBegin: function(name, file) {// 文件保存前的钩子函数
      console.log(name, file);
      let baseDir = path.resolve(__dirname, 'public/image')
      // 获取扩展名.png
      let extIndex = file.name.lastIndexOf('.')
      let extname = file.name.substr(extIndex)
      console.log('扩展名',extname);
      file.path = baseDir +  '/' + name + '-' + (new Date().getTime()) +  extname;
    }
  }
})