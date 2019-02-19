const koaRouter = require('koa-router');
// const ObjectID = require('mongodb').ObjectID;
const ArcticleRouter = new koaRouter();
const {
  Arcticle,
  User
} = require('../db/index');
const {
  verify
} = require('../middleware/getcookie')

ArcticleRouter.prefix('/arcticle'); // 前缀

ArcticleRouter
  .post('/submit', async (ctx) => {
    let { md_value } = ctx.request.body;
    let {
      id
    } = verify(ctx.header.authorization);
    // 查找user集合当中的数据 排除一些不必要的内容
    var user = await User.findById(id).select('-password -__v');
    // 实力化Arcticle的model
    var art = new Arcticle({
      md_value: md_value,
      author: user
    });
    var res = await art.save();
    ctx.body = {
      msg: '创建文章成功',
      res
    }
  })

module.exports.ArcticleRouter = ArcticleRouter;