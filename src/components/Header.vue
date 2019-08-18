<template>
<header class="header-nav">
        <el-row class="header-container">
        <el-col :span="6" class="logo-container">
          <img src="../assets/logo.png" class="logo">
            <span class="title">亿柒后台管理系统</span>
        </el-col>
        <el-col :span="6" class="user">
          <div class="userinfo">
            <img :src="user.avatar" alt="" class="avatar">
            <div class="welcome">
              <p class="name comename">欢迎</p>
              <p class="name avatarname">{{user.name}}</p>
            </div>
            <span class="username">
              <!-- 下拉菜单 -->
            <el-dropdown @command="setDialogInfo" trigger="click">
              <span class="el-dropdown-link">
                <i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="info">个人信息</el-dropdown-item>
                <el-dropdown-item command="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            </span>
          </div>
        </el-col>
      </el-row>
</header>
</template>

<script>

  export default {
    props:[''],
    data () {
      return {

      };
    },

    methods: {
      setDialogInfo(cmdItem){//点击哪个下拉菜单，传过来哪个command
        switch(cmdItem){
          case 'info':
            this.showInfo()
            break
          case 'logout':
            this.logout()
            break
        }
      },
      showInfo(){
        this.$router.push('infoshow')
      },
      logout(){
        // 清除token
        localStorage.removeItem('eleToken')
        // 设置vuex store，清除授权和用户
        this.$store.dispatch('clearCurrentState')
        // 跳转登录页面
        this.$router.push('/login')
      }
    },

    components: {},

    computed: {
      user(){
        return this.$store.getters.user
      }
    },

    created() {},
  }

</script>
<style scoped>
.header-nav{
    height: 60px;
    min-width: 600px;
    padding: 5px;
    background: #006e99;
    color: #ffffff;
    border-bottom: 1px solid #006e99;
}
.logo-container{
  line-height: 60px;
  min-width: 400px;
  float: left;
}
.logo{
  height: 60px;
  width: auto;
  margin-right: 5px;
  vertical-align: middle;
  display: inline-block;
}
.title{
  vertical-align: middle;
}
.user{
  float: right;
}
.userinfo{
  line-height: 60px;
  float: right;
}
.avatar{
  width: 50px;
  height: 50px;
  border-radius: 50%;
  vertical-align: middle;
  display: inline-block;
}
.welcome{
  display: inline-block;
  width: auto;
  vertical-align: middle;
  padding: 0 5px;
}
.name{
  line-height: 20px;
  text-align: center;
  font-size: 14px;
  margin: 0;
}
.comename{
  font-size: 12px;
}
.avatarname{
  color: #0e4e8d;
  font-weight: bolder;
}
.username{
  cursor: pointer;
  margin-right: 5px;
}
</style>