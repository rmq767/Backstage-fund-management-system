<template>
  <div class="register">
    <section class="form_container">
        <div class="manage_tip">
            <span class="title">小阮后台管理体统</span>
            <el-form :model="registerUser" :rules="rules" ref="registerForm" label-width="80px" class="registerForm">
            <el-form-item label="用户名" prop="name">
                <el-input v-model="registerUser.name" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="registerUser.email" placeholder="请输入email"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="registerUser.password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="password2">
                <el-input type="password" v-model="registerUser.password2" placeholder="请确认密码"></el-input>
            </el-form-item>  
            <el-form-item label="选择身份">
                <el-select v-model="registerUser.identity" placeholder="请选择身份">
                    <el-option label="管理员" value="manager"></el-option>
                    <el-option label="员工" value="employee"></el-option>
                </el-select>
            </el-form-item>                        
            <el-form-item>
                <el-button type="primary" @click="submitForm('registerForm')" class="submit_btn">注册</el-button> <!-- 这里提交的是ref的 -->
            </el-form-item>
            </el-form>
        </div>
    </section>
  </div>
</template>

<script>

  export default {
    props:[''],
    data () {
        var validatePass2 = (rule, value, callback) => {
            if(value != this.registerUser.password){
                callback(new Error('两次输入密码不一致!'))
            }else{
                callback()
            }
        }
      return {
          registerUser:{
              name:'',
              email:'',
              password:'',
              password2:'',
              identity:''
          },
          rules:{//验证规则，一个{}一个规则
              name:[
                  {
                      required:true,
                      message:'用户名不能为空',
                      trigger:'blur'
                  },
                  {
                      min:2,
                      max:10,
                      message:'长度在2-10个字符之间',
                      trigger:'blur'
                  }
              ],
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
              ],
              password2:[
                  {
                      required:true,
                      message:'确认密码不能为空',
                      trigger:'blur'
                  },
                  {
                      min:6,
                      max:20,
                      message:'密码在6-20个字符之间',
                      trigger:'blur'
                  },
                  {
                      validator:validatePass2,
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
            this.$http.post('/users/register',this.registerUser)
            .then(res => {
                //注册成功
                this.$message({
                    message:'账号注册成功！',
                    type:'success'
                })
            })
            // 注册成功，页面跳转到登录页面
            this.$router.push('/login')
          }
        });
      }
    },

    components: {},

    computed: {},

    created() {},
  }

</script>
<style scoped>
.register{
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
</style>