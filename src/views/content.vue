<template>
  <el-container style="height: 100%; border: 1px solid #eee">
    <el-menu
      :default-active="navselected"
      :active="navselected"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
    >
      <div class="auth">
        <img :src="users.imgUrl" alt="^_^"/>
        <span v-if="!isCollapse">{{users.auth}}</span>
      </div>
      <el-menu-item v-for="item in navList" :key="item.title" :index="item.path">
        <i :class="item.icon"></i>
        <span slot="title">{{item.title}}</span>
      </el-menu-item>
    </el-menu>

    <el-container>
      <el-header class="header">
        <div style="float:left">
          <el-radio-group v-model="isCollapse">
            <el-radio-button :label="false">展开</el-radio-button>
            <el-radio-button :label="true">收起</el-radio-button>
          </el-radio-group>
        </div>
        <div style="text-align: right;">
          <span class="nickname">{{users.nickname}}</span>
          <el-button class="pointer sure" id="submit" @click="loginOut">退出登录</el-button>
        </div>
      </el-header>
      <el-main class="content">
        <!-- 子页面 -->
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import https from "@/axios";
export default {
  data() {
    return {
       users: this.$store.getters.TOKEN,
      isCollapse: false,
      navList: [
        {
          title: "我的天下",
          path: "/home",
          icon: "el-icon-menu"
        },
        {
          title: "权限管理",
          path: "/content/authority",
          icon: "el-icon-document"
        }
      ],
      navselected: this.$route.path
    };
  },
  mounted() {
  },
  methods: {
    loginOut() {
      https.fetchGet("/loginOut", {}).then(data => {
        this.$router.push({
          path: "/login"
        });
      });
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
<style lang="stylus" scoped>
.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
  height: -moz-calc(100vh - 20px);
  height: -webkit-calc(100vh - 20px);
  height: -o-calc(100vh - 20px);
  height: -ms-calc(100vh - 20px);
  height: calc(100vh - 20px);
}

.el-aside {
  color: #333;
  width: 200px !important;
  min-height: 400px !important;
}

.nickname {
  display: inline-block;
  margin-right: 20px;
  font-size: 18px;
  color: red;
}

.header {
  font-size: 12px;
}

.content {
  height: -moz-calc(100vh - 96px);
  height: -webkit-calc(100vh - 96px);
  height: -o-calc(100vh - 96px);
  height: -ms-calc(100vh - 96px);
  height: calc(100vh - 96px);
  overflow-y: auto;
}

.auth {
  color: #fff;
  height: 50px;
  border-bottom: 1px solid dimgray;
  display: flex;
  justify-content: center;
  align-items: center;
  >img{
    width 25px
  }
  >span{
    display inline-block
    margin-left 8px
  }
}
</style>