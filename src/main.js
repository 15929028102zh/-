import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'font-awesome/css/font-awesome.css'

import store from'./store'
import {postRequest} from "@/utils/api";
import {putRequest} from "@/utils/api";
import {getRequest} from "@/utils/api";
import {deletedRequest} from "@/utils/api";
import {initMenu} from "@/utils/menus";

Vue.use(ElementUI,{size:'small'});

Vue.config.productionTip = false
//以插件的形式使用请求
Vue.prototype.postRequest=postRequest;
Vue.prototype.putRequest=putRequest;
Vue.prototype.getRequest=getRequest;
Vue.prototype.deletedRequest=deletedRequest;
//to表示目标地址，from表示起始地址
router.beforeEach( (to,from,next)=>{
  //如果有token，说明已经登录，初始化菜单
  if(window.sessionStorage.getItem('tokenStr')){
    initMenu(router,store);
    //判断是否存在user对象，如果不存在，去后端获取后存到sessionStorage中
    if(!window.sessionStorage.getItem('user')){
      return getRequest('admin/info').then(resp=>{
        console.log(resp)
        if(resp){
          window.sessionStorage.setItem('user',JSON.stringify(resp));
          next();
        }
      })
    }
   next();
  }else{
    //如果未登录，判断用户的目标地址是不是登录页面，如果是，直接跳转
    if(to.path=='/'){
      next();
    }else {
      next('/?redirect'+to.path);
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
