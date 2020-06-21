<template>
  <div>
    <el-table :data="tableData">
      <el-table-column prop="id" label="id" width="140"></el-table-column>
      <el-table-column prop="username" label="用户名" width="120"></el-table-column>
      <el-table-column prop="password" label="密码"></el-table-column>
      <el-table-column prop="nickname" label="姓名"></el-table-column>
      <el-table-column prop="auth" label="权限"></el-table-column>
      <el-table-column label="头像" width="120">
        <template slot-scope="scope">
          <!-- <img :src="" alt style="width:50px" /> -->
          <el-image style="width: 50px;" :src="scope.row.imgUrl" :preview-src-list="amplification(scope.row.imgUrl)"></el-image>
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
    <el-dialog title="编辑" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
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
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import https from "@/axios";
export default {
  name: "authority",
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      compile: {},
      edit: {
        password: ""
      },
    };
  },
  mounted() {
    this.user();
  },
  methods: {
    amplification(imgURl){
      return [imgURl]
    },
    user() {
      https.fetchGet("/user").then(data => {
        this.tableData = data.data;
        console.log(data);
      });
    },
    handleEdit(index, row) {
      this.compile = row;
      this.dialogVisible = true;
      this.edit = {
        password: ""
      };
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    save() {
      console.log(this.compile.password);
      let date = {
        id: this.compile.id,
        password: this.edit.password
      };
      https.fetchPost("/userEdit", date).then(data => {
        if (data.code == 200) {
          this.$message({
            message: data.msg,
            type: "success"
          });
          this.user();
          this.dialogVisible = false;
        }
      });
    },
    handleClose(done) {
      // this.$confirm("确认关闭？")
      //   .then(_ => {
      //     done();
      //   })
      //   .catch(_ => {});
    }
  }
};
</script>

<style scoped lang="stylus"></style>