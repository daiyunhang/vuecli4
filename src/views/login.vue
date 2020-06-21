<template>
  <div class="login">
    <el-col :md="9">
      <div class="User_Login">
        <label class="title">登录</label>
        <el-input class="User_Width" type="input" placeholder="请输入用户名" v-model="username"></el-input>
        <el-input class="User_Width" type="password" placeholder="请输入密码" v-model="password"></el-input>
        <el-button class="pointer sure" id="submit" @click="onLogin">登录</el-button>
      </div>
    </el-col>
  </div>
</template>

<script>
import https from "../axios";
export default {
  name: "login",
  data() {
    return {
      username: "admin", //储存用户名
      password: "123456" //储存密码
    };
  },
  mounted() {
    // this.login();
  },
  methods: {
    onLogin() {
      if (!this.username) {
        this.$alert("请输入用户名", "提示", {
          confirmButtonText: "确定",
          callback: action => {
            console.log("确定");
            return;
          }
        });
        return;
      }
      if (!this.password) {
        this.$alert("请输入密码", "提示", {
          confirmButtonText: "确定",
          callback: action => {
            console.log("确定");
            return;
          }
        });
        return;
      }
      this.login();
    },
    login() {
      // 成功
        https.fetchPost("/login",{
          username:this.username,
          password:this.password
        }).then(data => {
          if(data.code == 200){
            this.$store.commit("TOKEN", data.data);
            this.$router.push({
              path: "home"
            });
          }else{
            this.$message.error(data.data);
          }
        });
    },
    
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.User_Login {
  text-align: center;
  width: 330px;
  background: #fff;
  border-radius: 10px;
  padding: 62px;

  .title {
    color: #1b1f29;
    font-size: 32px;
    font-weight: bold;
    display: block;
    text-align: center;
  }

  .User_Width {
    width: 268px;
    height: 40px;
    margin: 10px auto;
  }

  .sure {
    width: 268px;
    height: 50px;
    color: #fff !important;
    background: #278fe3;
    border-radius: 6px;
    font-size: 20px;
  }
}
</style>
