<template>
  <div class="home">
    <el-table
      :data="users"
      style="width: 100%">
      <el-table-column
        prop="title"
        label="标题"
        width="220">
      </el-table-column>
      <el-table-column
        prop="name"
        label="文章分类"
        width="160">
      </el-table-column>
      <el-table-column
        prop="createdTime"
        label="创建时间">
      </el-table-column>
      <el-table-column
        prop="updatedTime"
        label="更新时间">
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="primary" @click="editUser(scope)">编辑</el-button>
          <el-button type="danger">删除</el-button>
        </template>
      </el-table-column>
  </el-table>
  </div>
</template>

<script>
export default {
  created() {
    this.token = this.$cookieStore.getCookie('token')
    this.renderArcticle()
  },
  data() {
    return {
      token: '',
      users: []
    }
  },
  methods: {
    // 文章信息
   renderArcticle() {
    this.axios.get('user/findAll', {
      headers:{
        // Bearer 记得有空格
        'Authorization': 'Bearer ' + this.token
        }
      }).then(res => {
        this.users = res.data.result;
      })
    },
    // 编辑
    editUser(scope) {
      let { _id, title, md_value } = scope.row
      console.log(scope, _id, title, md_value)
      this.$router.push({
        path: 'markdown',
        query: {
          edit_id: _id
        }
      })
    }
  },
}
</script>
