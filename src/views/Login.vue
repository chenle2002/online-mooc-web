<template>
  <body id="paper">
  <el-form :model="loginForm" :rules="rules" class="login-container" label-position="left"
           label-width="0px" v-loading="loading" v-if="registerJudge">
    <h3 class="login_title">系统登录</h3>
    <el-form-item prop="username">
      <el-input type="text" v-model="loginForm.username"
                auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="loginForm.password"
                auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-checkbox class="login_remember" v-model="checked"
                 label-position="left"><span style="color: #505458">记住密码</span></el-checkbox>
    <el-form-item style="width: 100%">
      <el-button type="primary" style="margin-right: 25px; width: 40%;background: #505458;border: none"
                 v-on:click="login">登录
      </el-button>

      <el-button type="primary" style="margin-right: 25px; width: 40%;background: #505458;border: none"
                 v-on:click="register">注册
      </el-button>
    </el-form-item>
  </el-form>

  <el-form :model="loginForm" :rules="rules" class="login-container" label-position="left"
           label-width="0px" v-loading="loading" v-if="!registerJudge">
    <h3 class="login_title">系统注册</h3>
    <el-form-item prop="username">
      <el-input type="text" v-model="loginForm.username"
                auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="loginForm.password"
                auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>

    <el-form-item prop="passwordjudge">
      <el-input type="password" v-model="passwordjudge"
                auto-complete="off" placeholder="请再次输入密码"></el-input>
    </el-form-item>
    <el-form-item style="width: 100%">

      <el-button type="primary" style="margin-right: 25px; width: 40%;background: #505458;border: none"
                 v-on:click="submit">提交
      </el-button>
    </el-form-item>
  </el-form>
  <p style="background:none;height: 5%;position: fixed;bottom: 0px;width: 100%;text-align: center;">
    <a href="https://beian.miit.gov.cn/" target="_blank">鲁ICP备2022036998号-1</a>
  </p>
  </body>
</template>

<script>


export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Login",
  data() {
    return {
      rules: {
        username: [{required: true, message: '用户名不能为空', trigger: 'blur'}],
        password: [{required: true, message: '密码不能为空', trigger: 'blur'}],
        passwordjudge: [{required: true, message: '密码不能为空', trigger: 'blur'}]
      },
      checked: true,
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      passwordjudge:'',
      loading: false,
      registerJudge:true
    }
  },
  mounted() {
    this.registerJudge=true
  },
  methods: {
    login() {
      const x=this
      console.log(this.loginForm.username)
      this.axios.get('/member/user/login', {
            params: {
              username: this.loginForm.username,
              password: this.loginForm.password
            }
          }
      ).then(resp => {
        console.log(resp.data.msg)
        if (resp.data.msg == "success") {
          // console.log(111)
          localStorage.setItem("chenletoken", resp.data.user.id);
          // console.log(localStorage.getItem("chenletoken"))
          x.$router.push("/main");
        } else {
          this.$message.error('请输入正确的账号和密码！');
        }
      }).catch(() => {})
    },
    register(){
      this.registerJudge=false
      this.loginForm.username=''
      this.loginForm.password=''
    },

    submit(){
      // console.log(this.loginForm)
      // console.log(this.)
      if(this.passwordjudge!=this.loginForm.password){
        this.$message({
          message: "两次密码输入不一样！",
          type: "error"
        })
      }else {
        this.axios.get('/member/user/register', {
              params: {
                username: this.loginForm.username,
                password: this.loginForm.password
              }
            }
        ).then(resp => {
          console.log(resp.data.msg)
          if (resp.data.msg == "success") {
            // console.log(111)
            this.registerJudge=true
          } else {
            this.$message.error('注册失败！');
          }
        }).catch(() => {})
      }
    }
  }
}
</script>
<style>
#paper {
  background: url("../assets/img/back.png") no-repeat;
  background-position: center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
}

body {
  margin: 0;
}

.login-container {
  border-radius: 15px;
  background-clip: padding-box;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  margin-left: 65%;
  margin-top: 10%;
  opacity: 85%
}

.login_title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}

.login_remember {
  margin: 0px 0px 35px 0px;
  text-align: left;
}
</style>
