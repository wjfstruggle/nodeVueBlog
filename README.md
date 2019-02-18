## node + vue 博客管理后台应用

1、登录和注册功能

    node： 注册 - 创建User(账号，密码，用户名，头像)

           登录 - 根据账号查找User是否存在， 对比提交和保存的秒是否一致，返回token

    Vue： 获取token，将token保存到cookie和axios里面的请求头

2、功能

- 添加文档

  vue： 使用markdown编辑器(vue组件)， 保存源文件和转换HTML代码，提交

  node： 接收并创建

- 文档列表(查)

  vue： ElementUI的table组件，功能按钮，例如修改和预览(_id去查询)

  node： fine({}).sort('-updateTime) // 排序

- 编辑功能(改)

  vue： 同样使用markdown编辑页面 (复用)

  node: find找到文章的记录，前端再提交新的内容进来，findByIdUpdate()

- 导航守卫

- 退出功能

  vue： 利用Vue-router的导航守卫去判断cookie中的token，如果没有，强制跳到login