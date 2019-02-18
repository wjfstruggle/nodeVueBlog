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
// 生成model
module.exports.User = mongoose.model('user', userSchema)