const Router = require('koa-router');
const userRouter = new Router();
const { User } = require('../db/index');
const {getToken, verify} = require('../middleware/koa-jwt');

// 前缀

userRouter.prefix('/user');

userRouter
.post('/register', async (ctx) => {
  let { account, password } = ctx.request.body;
  // 实例化model 得到 doc文档
  var user = new User({
    account,
    password
  })
  // 先判断这个账号是否被占用
  let TakeUp = await User.find({account: account})
  if (TakeUp.length !== 0) {
    ctx.body = {
      msg: '这个账号已被占用，请换其他账号'
    }
    return ;
  }
  // 文档.save() 保存数据
  let res = await user.save()
  ctx.body = {
    result: res,
  }
})
.post('/login', async (ctx) => {
  let { account, password} = ctx.request.body;
  ctx.body = {
  }
})

module.exports = userRouter