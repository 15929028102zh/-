import Vue from "vue";
import Vuex from 'vuex'

Vue.use(Vuex);
//封装vue存放对象状态的一个配置文件
export default new Vuex.Store({
    state:{
        routes:[]
    },
    //改变state值的一个方法,封装routes
    mutations:{
        initRoutes(state,data){
            state.routes=data;
        }
    },
    axios:{

    }
})