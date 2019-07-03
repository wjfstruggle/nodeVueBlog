// 获取token

const jwt = require('jsonwebtoken');
const koaJwt = require('koa-jwt');
const secret = 'test my secret'; // 密码
/**
 * @param {*} data
 * @returns
 * jwt.sign({
    data: 'foobar'
  }, 'secret', { expiresIn: 60 * 60 });
 */
module.exports.getToken = function(data) {
  return jwt.sign(data, secret, {expiresIn: '2h'})
}

// 处理没有携带token的请求

module.exports.errorHandle = function(ctx, next) {
  return next().catch( err => {
    if (401 == err.status) {
      ctx.status = 401;
      ctx.body = 'Protected resource, use Authorization header to get access\n';
    } else {
      throw err;
    }
  })
}
module.exports.testJwt = koaJwt({
  secret:secret,
  key: 'jwtdata'
}).unless({ // 不需要登录的接口
  path: [/\/login/, /\/register/]
});

// 返回token
module.exports.verify = function(auth) {
  let token = auth.substring( auth.indexOf(' ')+1)
  console.log(token);
  return jwt.verify(token, secret)
}