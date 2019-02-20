<template>
  <div class="register">
    <transition name="fade">
      <div class="register-wrap">
        <div id="owl-login" class="forget-owl">
          <div class="hand"></div>
          <div class="hand hand-r"></div>
        </div>
        <section class='info'>
          <div class="account-info">
            <el-input v-model="account" placeholder="请输入账号"></el-input>
          </div>
          <div  class="password-info">
            <el-input v-model="password" type="password" placeholder="请输入密码"></el-input>
          </div>
          <div  class="code-info">
            <el-input v-model="checkCode" placeholder="请输入验证码"></el-input>
            <a id="code" href="javascript:;" @click="changeCode()">{{randomCode}}</a>
          </div>
          <div class="hasReg">
            <router-link to="/login">已经注册?</router-link>
            <el-button type="primary" @click="reg">注册</el-button>
          </div>
        </section>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  created() {
    this.changeCode()
  },
  data() {
    return {
      account: '', // 账号
      password: '', // 密码
      // 随机数
      code:[0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','X','Y','Z','W','V','U','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','x','y','z','w','v','u'],
      checkCode: "", // 输入框的验证码
      randomCode: ""// 已有的验证码
    }
  },
  methods: {
    reg() {
      // 验证手机号正则
      const phone = /^1((3[0-9])|4(5|7)|(5[0-35-9])|(7[1-7])|(8[0-9]))\d{8}$/
      // 验证密码强度,至少六位 ，包括至少1个大写字母和一个小写字母，一个数字一个特殊子符 ?!@#$_
      const passwordInfo = /((?=.*[A-Z]+)(?=.*[a-z]+)(?=.*\d+)(?=.*[ ?!@#$_]+))([A-Za-z\d?!@#$_]){6,}/
      if (this.account !== '' && this.password !== '') {
        if (phone.test(this.account)) {
          if (passwordInfo.test(this.password)) {
            if (this.checkCode === this.randomCode.toLowerCase()) { // 忽略大小写
              this.axios.post('/user/register', {
                account: this.account,
                password: this.password
                  }).then( res => {
                    console.log(res);
                    if (res.data.msg === '这个账号已被占用，请换其他账号') {
                      // 消息弹窗
                      this.$notify.error({
                        title: '这个账号已被占用，请换其他账号',
                        message: '请换成其他账号',
                      });
                    } else {
                      this.$notify({
                        title: '注册成功',
                        message: '3s后将会跳到登录界面',
                        type: 'success'
                      });
                      // 跳转到登录页
                      setTimeout(() => {
                        this.$router.push({
                          name: 'register'
                        })
                      }, 3000)
                    }
                  })
              this.changeCode(); // 重新打乱验证码
              } else if (this.checkCode === '') {
                this.$notify.error({
                  title: '验证码不能为空',
                  message: '请重新输入验证码'
                });
                this.changeCode(); // 重新打乱验证码
                this.checkCode = '' // 判断结束后清空
              } else {
                this.$notify.error({
                  title: '验证码错误',
                  message: '请重新输入正确的验证码'
                });
                this.changeCode(); // 重新打乱验证码
                this.checkCode = '' // 判断结束后清空
              }
              this.checkCode = '' // 判断结束后清空
            } else {
              this.$notify.error({
                title: '密码强度不够',
                message: '(密码至少6位以上,含大小写和?!@#$_任意一个字符)'
              });
            }
          } else {
            this.$notify.error({
            title: '手机号不存在',
            message: '请输入正确的手机号'
          });

        }
      } else {
        this.$notify.error({
          title: '注册失败',
          message: '账号和密码不能为空'
        });
      }
    },
    changeCode() { // a标签的验证码
      let str = '';
      const codeLength = 4; // 验证码长度
      for (let i = 0; i < codeLength; i++) {
        let index = Math.floor(Math.random()*62) // 62个字母+数字
        str += this.code[index]
      }
      this.randomCode = str// 渲染到a标签内容
    },
  },
}
</script>
<style lang="scss" scoped>
  .fade-enter-active{
    transition: transform 1s ease;
  }
  .fade-enter {
    -webkit-transform:translate3d(-100%, 0, 0);
    opacity:0;
    transform:translate3d(-100%, 0, 0);
  }
  .register {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: url('http://edu.bluej.cn/public/uploads/snow.jpg');
    background-repeat: no-repeat;
    background-size: cover;
  }
  .register-wrap {
    position: relative;
    width: 400px;
    height: 300px;
    margin: 150px auto 0;
    text-align: center;
    background-color: aliceblue;
    #owl-login {
      top: -99px;
      left: 50%;
      transform: translateX(-50%);
      width: 211px;
      height: 108px;
      background-image: url('http://edu.bluej.cn/public/uploads/owl-login.png');
      position: absolute;
      .hand {
        width: 34px;
        height: 34px;
        -webkit-border-radius: 40px;
        border-radius: 40px;
        background-color: #472d20;
        -webkit-transform: scaleY(0.6);
        -moz-transform: scaleY(0.6);
        -o-transform: scaleY(0.6);
        -ms-transform: scaleY(0.6);
        transform: scaleY(0.6);
        -webkit-transition: 0.3s ease-out;
        -moz-transition: 0.3s ease-out;
        -o-transition: 0.3s ease-out;
        -ms-transition: 0.3s ease-out;
        transition: 0.3s ease-out;
        position: absolute;
        left: 14px;
        bottom: -8px;
      }
      .hand-r {
        left: 170px;
      }
    }
    .info {
      padding: 30px;
      .el-input {
        margin: 14px 0;
      }
      .code-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
          #code {
            display: inline-block;
            vertical-align: middle;
            width: 110px;
            height: 30px;
            line-height: 30px;
            background-color: #aaa;
            color: #fff;
            font-weight: bold;
            text-align: center;
            letter-spacing: 4px;
            font-style: oblique ;
            text-decoration: none;
            font-size: 14px;
            border-radius: 8px;
        }
        .el-input {
          width: 180px;
        }
      }
    }
    .hasReg {
      display: flex;
      justify-content: space-between;
      align-items: center;
      a {
        font-weight: bold;
        color: #2c3e50;
      }
    }
  }
</style>