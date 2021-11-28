<template>
<div>
  <el-form v-loading="loading"
           element-loading-text="拼命加载中"
           element-loading-spinner="el-icon-loading"
           element-loading-background="rgba(0, 0, 0, 0.8)"
           :rules="rules" ref="loginForm"
           :model="loginForm"
           class="loginCaner" >
    <h3 class="loginTitle"> 系统登录</h3>
    <el-form-item  prop="username">
    <el-input type="text" aoto-complete="false" v-model="loginForm.username"
              placeholder="请输入用户名"/>
    </el-form-item>
    <el-form-item prop="password" >
      <el-input type="password" aoto-complete="false" v-model="loginForm.password"
                placeholder="请输密码"/>
    </el-form-item>
    <el-form-item prop="code">
      <el-input type="text" aoto-complete="false" v-model="loginForm.code"
                style="width: 250px" placeholder="点击图片更改验证码" />
      <img :src="captchaUrl" @click="updateCaptchaURl">
    </el-form-item>
    <el-form-item>
      <el-checkbox v-model="checked" >记住密码</el-checkbox>
      <el-button type="primary" @click="submitLogin">登录</el-button>
    </el-form-item>

  </el-form>
</div>
</template>

<script>


export default {
  name: "Login",
  data(){
    return{
      //每次给后端不同的参数以获取验证码
      captchaUrl:'/captcha?time'+new Date(),
      loginForm:{
          username:'admin',
          password:'123',
          code:''
      },
      loading:false,
      checked:true,
      rules:{
        //配置验证 required开启验证
        username:[{required:true,message:"请输入用户名",trigger:'blur'}],
        password: [{required:true,message:"请输入密码",trigger:'blur'}],
        code:[{required:true,message:"请输入验证码",trigger:'blur'}]
      }
    }
  },
  methods:{

    submitLogin(){
      //开启验证后直接获取验证结果，成功则登录，失败则提示
      this.$refs.loginForm.validate((valid) =>{
        if(valid){
          this.loading=true;
          this.postRequest('/login',this.loginForm).then(resp=>{
              if(resp){
                this.loading=false;
                //封装后端的token
                const tokenStr=resp.obj.tokenHead+resp.obj.token;
                //将token存储导sessionStorage对象中
                window.sessionStorage.setItem('tokenStr',tokenStr);
                //跳转到主页
                let path=this.$route.query.redirect;
                console.log(this.$router.currentRoute)
                this.$router.replace(path=='/' || path==undefined ?'/home' : path)
              }
          })
        }else{
          this.$message.error('请输入所有字段');
        }
      });
    },
    updateCaptchaURl(){
      this.captchaUrl='/captcha?time'+new Date()
    }
  }
}
</script>


<style scoped>
.loginCaner{
  border-radius: 15px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 15px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.loginTitle{
  margin: 0px auto 40px auto;
  text-align: center;
}
.el-form-item__content{
  display: flex;
  align-items: center;
}
</style>