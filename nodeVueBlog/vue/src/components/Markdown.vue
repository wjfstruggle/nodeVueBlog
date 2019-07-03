<template>
  <div class="home">
    <!-- md编辑页面 -->
    <div>
      <div class="title">
        <el-input placeholder="请输入文章标题" v-model="title"></el-input>
        <el-dropdown>
          <el-button type="primary">
            文章分类<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>js</el-dropdown-item>
            <el-dropdown-item>html</el-dropdown-item>
            <el-dropdown-item>css</el-dropdown-item>
            <el-dropdown-item>vue</el-dropdown-item>
            <el-dropdown-item>node</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <mavon-editor 
        v-model="md_value" ref="editor"
        codeStyle="monokai-sublime"/>
      <el-button v-if="ShowFag" @click="submit" type="primary">发表</el-button>
      <el-button v-else @click="updateUser" type="primary">更新</el-button>
    </div>
  </div>
</template>

<script>

export default {
  created() {
    this.token = this.$cookieStore.getCookie('token')
    this.edit_id = this.$route.query.edit_id
    if (this.$route.query.edit_id) {
      this.ShowFag = !this.ShowFag
      this.renderArcticle()
    }
  },
  // props: 'editId', 'editTitle', 'editMdValue', 'msg'
  data() {
    return {
      md_value: '', // 文章内容
      token: '',
      title: '',// 文章标题
      edit_id: '',
      ShowFag: true,
      users: []
    }
  },
  computed: {
    md_render() {
      return this.$refs.editor.d_render
    },
  },
  methods: {
    // 提交文章内容
    submit() {
      if (this.md_value !== '' && this.title !== '') {
        this.axios.post('arcticle/submit', {
          md_value: this.md_value,
          title: this.title,
          createdTime: this.timeCreated(),
          updatedTime: this.timeCreated()
          },{
            headers:{
              // Bearer 记得有空格
              'Authorization': 'Bearer ' + this.token
            }         
          }).then(res => {
            if (res.data.msg === '创建文章成功') {
              this.$notify({
                title: '发表成功',
                type: 'success'
              });
            }
            console.log('文章已发表', res);
          })
        } else {
          this.$notify.error({
            title: '文章或标题内容不能为空',
            message: '请重新输入内容',
          });
        }
      },
    // 更新
    updateUser() {
      this.axios.get('user/updateArcticle', {
        params: {
          title: this.title,
          md_value: this.md_value,
          _id: this.edit_id,
          updatedTime: this.timeCreated()
        },
        headers:{
          // Bearer 记得有空格
          'Authorization': 'Bearer ' + this.token
        } 
      }).then(res => {
        console.log('更新成功',res)
        this.$notify({
          title: '更新成功',
          type: 'success'
        });
      })
    },
    timeCreated() {
      var d = new Date();
      let year = d.getFullYear();
      let month = d.getMonth() + 1;
      let day = d.getDate();
      let h = d.getHours();
      let m = d.getMinutes();
      let s = d.getSeconds();
      return year + '-' + month + '-' + day + '-' + h + ':' + m + ':' + s;
    },
    // 编辑
     renderArcticle() {
      this.axios.get('user/findSelect', {
        params: {
          title: this.title,
          md_value: this.md_Value,
          _id: this.edit_id,
        },
        headers:{
          // Bearer 记得有空格
          'Authorization': 'Bearer ' + this.token
          }
        }).then(res => {
          this.users = res.data.result;
          this.md_value = res.data.result.md_value;
          this.title = res.data.result.title;
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
.v-note-wrapper {
  min-height: 450px;
}
.title {
  .el-input {
    margin-right: 30px;
    width: 500px;
  }
}
</style>

