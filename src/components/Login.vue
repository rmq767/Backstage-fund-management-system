<template>
  <div class="login">
    <section class="form_container">
        <div class="manage_tip">
            <span class="title">小阮后台管理体统</span>
            <el-form :model="loginUser" :rules="rules" ref="loginForm" label-width="80px" class="loginForm">
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="loginUser.email" placeholder="请输入email"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="loginUser.password" placeholder="请输入密码"></el-input>
            </el-form-item>                       
            <el-form-item>
                <el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">登录</el-button> <!-- 这里提交的是ref的 -->
            </el-form-item>
            <span class="jump">
                没有账号？ <router-link to="/register">点击注册</router-link>
            </span>
            </el-form>
        </div>
    </section>
  </div>
</template>

<script>
import jwt_decode from 'jwt-decode';
  export default {
    props:[''],
    data () {
      return {
          loginUser:{
              email:'',
              password:''
          },
          rules:{//验证规则，一个{}一个规则
              email:[
                  {
                      type:'email',
                      required:true,
                      message:'邮箱不能为空',
                      trigger:'blur'
                  }
              ],
              password:[
                  {
                      required:true,
                      message:'密码不能为空',
                      trigger:'blur'
                  },
                  {
                      min:6,
                      max:20,
                      message:'密码在6-20个字符之间',
                      trigger:'blur'
                  }
              ]
          }
      };
    },

    methods: {//提交验证
        submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post('/users/login',this.loginUser)
            .then(res => {
                //登录成功,拿到token
                const { token } = res.data
                // 把token存储到LocalStorage
                localStorage.setItem('eleToken',token)

                // 解析token
                const decode = jwt_decode(token)
                // token存储到vuex中
                this.$store.dispatch('setAuthenticated', !this.isEmpty(decode))
                this.$store.dispatch('setUser', decode)

                // 登录成功，页面跳转到登录页面
                this.$router.push('/index')
            })
          }
        });
      },
        isEmpty(value){
            return (
                value === undefined ||
                value === null ||
                (typeof value === 'object' && Object.keys(value).length === 0) ||
                (typeof value === 'string' && value.trim().length === 0)
            )
        }
    },

    components: {},

    computed: {},

    created() {},
  }

</script>
<style scoped>
.login{
    background-image: url('../assets/scenery5.jpg');
    background-size: cover;
    height: 100%;
    width: 100%;
    position: relative;
}
.form_container{
    width: 450px;
    position: absolute;
    left: 50%;
    top: 10%;
    margin-left: -225px;
    text-align: center;
}
.el-form {
    background-color: white;
    padding: 30px;
    border-radius: 5px;
    margin-top: 10px;
    box-shadow: 0px 0px 15px rgba(71, 191, 228, 0.7);
}
.form_container .manage_tip .title{
    font-family: Arial, Helvetica, sans-serif;
    font-size: 26px;
    font-weight: bold;
    color: white;
}
.submit_btn{
    width: 100%;
}
.jump{
    float: right;
}
.jump a{
    color: skyblue;
}
</style>