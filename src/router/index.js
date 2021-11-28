import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from "../views/Login";

Vue.use(VueRouter);
//封装vue的所有路由对象

const routes = [
  {
    path: '/',
    name: '登录',
    component: Login,
    hidden:true
  },
  {
    path: '/home',
    name: '主页',
    component: Home,
    children:[{
      path: '/emp/basic',
      name: '基本资料',
      component: () => import('@/views/emp/EmpBasic')
    },
      {
        path: '/emp/adv',
        name: '高级资料',
        component: () => import('@/views/emp/EmpAdv')
      },
      {
        path: '/per/emp',
        name: '员工资料',
        component: () => import('@/views/per/PerEmp')
      },
      {
        path: '/per/ec',
        name: '员工奖惩',
        component: () => import('@/views/per/PerEc')
      },
      {
        path: '/per/mv',
        name: '员工调动',
        component: () => import('@/views/per/PerMv')
      },
      {
        path: '/per/salary',
        name: '员工调薪',
        component: () => import('@/views/per/PerSalary')
      },
      {
        path: '/per/train',
        name: '员工培训',
        component: () => import('@/views/per/PerTrain')
      },
      {
        path: '/sal/month',
        name: '月末处理',
        component: () => import('@/views/sal/SalMonth')
      },
      {
        path: '/sal/search',
        name: '工资表查询',
        component: () => import('@/views/sal/SalSearch')
      },
      {
        path: '/sal/sob',
        name: '工资账套管理',
        component: () => import('@/views/sal/SalSob')
      },
      {
        path: '/sal/sobcfg',
        name: '员工账套设置',
        component: () => import('@/views/sal/SalSobCfg')
      },
      {
        path: '/sal/table',
        name: '工资表管理',
        component: () => import('@/views/sal/SalTable')
      },
      {
        path: '/sta/all',
        name: '综合信息统计',
        component: () => import('@/views/sta/StaAll')
      },
      {
        path: '/sta/pers',
        name: '人事信息统计',
        component: () => import('@/views/sta/StaPers')
      },
      {
        path: '/sta/record',
        name: '人事记录统计',
        component: () => import('@/views/sta/StaRecord')
      },
      {
        path: '/sta/score',
        name: '员工积分统计',
        component: () => import('@/views/sta/StaScore')
      },
      {
        path: '/sys/admin',
        name: '操作员管理',
        component: () => import('@/views/sys/SysAdmin')
      },
      {
        path: '/sys/basic',
        name: '基础信息设置',
        component: () => import('@/views/sys/SysBasic')
      },
      {
        path: '/sys/cfg',
        name: '系统管理',
        component: () => import('@/views/sys/SysConfig')
      },
      {
        path: '/sys/data',
        name: '备份恢复数据库',
        component: () => import('@/views/sys/SysDate')
      },
      {
        path: '/sys/init',
        name: '初始化数据库',
        component: () => import('@/views/sys/SysInit')
      },
      {
        path: '/sys/log',
        name: '操作日志管理',
        component: () => import('@/views/sys/SysLog')
      }
    ]
  }

]
//定义router常量，封装router数组
const router = new VueRouter({
  routes
});

export default router
