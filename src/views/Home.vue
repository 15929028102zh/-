<template>
  <el-container>
    <el-header class="homeHeader">
      <div class="title">云e办</div>
      <el-dropdown  @command="handleCommand">
  <span class="el-dropdown-link">
    {{user.name}}
    <i class="icon" ><img src="https://tse3-mm.cn.bing.net/th/id/OIP-C.ST4QhlqZeK6sk5IGQD5irAHaHa?w=198&h=198&c=7&r=0&o=5&dpr=1.25&pid=1.7"></i>
  </span>
        <el-dropdown-menu slot="dropdown" >
          <el-dropdown-item command="userinfo">个人中心</el-dropdown-item>
          <el-dropdown-item command="setting">设置</el-dropdown-item>
          <el-dropdown-item command="logout">注销登陆</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header >
    <el-container>
      <el-aside width="200px">
       <!--  通过循环路由表的属性拿到对应的路由的名字-->
        <el-menu router unique-opened >
          <el-submenu :index="index+''"
                      v-for="(item,index) in  routes"
                      :key="index" v-if="!item.hidden">
            <template slot="title">
              <i :class="item.iconCls" style="color: #1accff;margin-right: 5px"></i>
              <span>{{item.name}}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item :index="children.path" v-for="(children,indexj) in item.children" :key="indexj">
                {{children.name}}
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <el-breadcrumb v-if="this.$router.currentRoute.path!='/home'"
                       separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{this.$router.currentRoute.name}}</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="welcome" v-if="this.$router.currentRoute.path=='/home'">
          欢迎来到云e办系统
        </div>
        <router-view class="homeRouterVue" />
      </el-main>
     </el-container>
    </el-container>
</template>

<script>
export default {
  name: "Home",
  data(){
    return {
      user:JSON.parse(window.sessionStorage.getItem('user'))
    }
  },
  //vue的计算属性
  computed:{
    routes(){
      //获取vuex中的routes
      return this.$store.state.routes;
    }
  },
  methods: {
    handleCommand(command) {
      if(command=='logout'){
        this.$confirm('此操作将注销登录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.postRequest('/logout');
          //清除用户信息
          window.sessionStorage.removeItem('tokenStr');
          window.sessionStorage.removeItem('user');
          this.$store.commit('initRoutes',[]);
          this.$router.replace('/');
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      }
    }
  }
}
</script>

<style scoped>
   .homeHeader{
      background: #409eff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 15px;
      box-sizing: border-box;
   }
   .title{
     font-size: 30px;
     font-family: 华文楷体;
     color: #eaeaea;
   }
   .homeHeader .userInfo{
     cursor: pointer;
   }
   .icon img{
     width: 48px;
     height: 48px;
     border-radius: 24px;
     margin-left: 8px;
   }
   .welcome{
     text-align: center;
     font-size: 30px;
     font-family: 华文楷体;
     padding-top: 50px;
     color: #1accff;
   }
    .homeRouterVue{
      margin-top: 10px;
    }
</style>