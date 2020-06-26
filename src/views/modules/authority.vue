<template>
  <div>
    <div class="create-user">
      <el-button type="primary" @click="createUser">创建用户</el-button>
      <el-button type="primary" @click="obtain">刷新用户列表</el-button>
    </div>
    <el-table :data="tableData">
      <el-table-column prop="id" label="id" width="140"></el-table-column>
      <el-table-column prop="username" label="用户名" width="120"></el-table-column>
      <el-table-column prop="password" label="密码"></el-table-column>
      <el-table-column prop="nickname" label="姓名"></el-table-column>
      <el-table-column prop="Role.roleName" label="权限"></el-table-column>
      <el-table-column label="头像" width="120">
        <template slot-scope="scope">
          <!-- <img :src="" alt style="width:50px" /> -->
          <el-image
            style="width: 50px;"
            :src="scope.row.imgUrl"
            :preview-src-list="amplification(scope.row.imgUrl)"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 编辑模态框 -->
    <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
      <div>
        <el-form label-width="80px" :model="edit">
          <el-form-item label="密码">
            <el-input v-model="edit.password"></el-input>
          </el-form-item>
          <!-- <el-form-item label="头像">
            <el-input v-model="compile.imgUrl"></el-input>
          </el-form-item>-->
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 创建用户模态框 -->
    <el-dialog title="创建用户" :visible.sync="createVisible" width="30%">
      <div>
        <el-form label-width="80px" :model="create">
          <el-form-item label="用户名">
            <el-input v-model="create.username"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="create.password"></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="create.nickname"></el-input>
          </el-form-item>
          <el-form-item label="权限">
            <el-select v-model="create.authId" placeholder="请选择" style="width:100%">
              <el-option
                v-for="item in authList"
                :key="item.authId"
                :label="item.authName"
                :value="item.authId"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="createVisible = false">取 消</el-button>
        <el-button type="primary" @click="createSave">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "authority",
  data() {
    return {
      tableData: [],
      editVisible: false,
      createVisible: false,
      compile: {},
      edit: {
        password: ""
      },
      create: {
        username: "",
        password: "",
        nickname: "",
        authId: ""
      },
      authList: []
    };
  },
  mounted() {
    this.user();
  },
  methods: {
    amplification(imgURl) {
      return [imgURl];
    },
    success(msg) {
      this.$message({ message: msg, type: "success" });
    },
    error(msg) {
      this.$message({ message: msg, type: "error" });
    },
    async user() {
      const { code, data } = await this.$http.getUser();
      if (code == 200) {
        this.tableData = data;
      }
    },
    handleEdit(index, row) {
      this.compile = row;
      this.editVisible = true;
      this.edit = {
        password: ""
      };
    },
    async handleDelete(index, row) {
      let param = {
        id: row.id
      };
      const { code, msg } = await this.$http.removeUser(param);
      if (code == 200) {
        this.success(msg);
        this.user();
      } else if (code == 201) {
        this.error(msg);
      }
    },
    // 编辑
    async save() {
      let param = {
        id: this.compile.id,
        password: this.edit.password
      };
      const { code, msg } = await this.$http.editUser(param);
      if (code == 200) {
        this.success(msg);
        this.user();
        this.editVisible = false;
      }
    },

    // 创建用户
    createUser() {
      this.createVisible = true;
      this.getAuth();
    },
    async createSave() {
      let param = {
        username: this.create.username,
        password: this.create.password,
        nickname: this.create.nickname,
        authId: this.create.authId
      };
      const { code, data, msg } = await this.$http.createUser(param);
      if (code == 200) {
        this.createVisible = false;
        this.user();
      }
    },
    // 获取所有权限
    async getAuth() {
      const { code, data } = await this.$http.getAuth();
      if (code == 200) {
        this.authList = data;
      }
    },

    // 方便测试
    obtain() {
      this.user();
    }
  }
};
</script>

<style scoped lang="stylus">
.create-user {
  float: right;
}
</style>
<style lang="stylus">
.el-dialog__body {
  padding-right: 50px !important;
  text-align: left;
}
</style>