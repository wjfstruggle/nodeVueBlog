const Koa = require('koa')

const app = new Koa()
const port = 8082
const koaCors = require('koa-cors')
const koaBody = require('koa-body')
const userRouter = require('./router/user');
const {ArcticleRouter} = require('./router/arcticle')
const {errorHandle, testJwt} = require('./middleware/getcookie') // 验证登录

app.use(koaCors())
app.use(errorHandle).use(testJwt) //检验登录的中间件
app.use(koaBody()) // 处理post请求
app.use(userRouter.routes()).use(userRouter.allowedMethods())
app.use(ArcticleRouter.routes()).use(ArcticleRouter.allowedMethods())

app.listen(port, () => {
  console.log(`start at http://localhost:${port}/`);
})