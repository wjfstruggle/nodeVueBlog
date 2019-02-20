const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/VueBlog',
  {
    // 兼容就方法
    useNewUrlParser: true
  },
  (err, con) => {
  if (err) {
    console.log('连接失败');
  }else {
    console.log('连接成功');
    
  }
})

let userSchema = new mongoose.Schema({
  account: String,
  password: String,
  header: {
    type: String,
    default: '/xxx/yyy.png'
  }
})
// 文章
let arcticleSchema = new mongoose.Schema({
  title: String, // 文章标题
  md_value: String, // 内容
  author: Object , // 内嵌。改动机会很少，特点：1、写入数据比较复杂，慢，读取快   
  classify: String, // 文章分类
  createdTime: String, // 创建时间
  updatedTime: String, // 更新时间
})
// 生成model    
// 第一参数是指集合的名称  但是，创建时是以复数的名称去添加
module.exports.User = mongoose.model('user',userSchema);
module.exports.Arcticle = mongoose.model('arcticle',arcticleSchema);