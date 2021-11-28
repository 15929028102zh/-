import axios from 'axios'
import { Message } from 'element-ui';
import router from '../router/index'

//请求拦截器
axios.interceptors.request.use((config) => {
//如果存在token，请求携带token
    if(window.sessionStorage.getItem('tokenStr')){
        config.headers['Authorization'] = window.sessionStorage.getItem('tokenStr');
    }
    return config ;
}, (error) => {
    Message.error({ message: error ,type:'error'});
})

//api接口 响应成功 / 响应失败 【响应拦截器】
//后端提供：响应码，响应信息，对象
axios.interceptors.response.use((success) => {
    if (success.status && success.status == 200) {
        if (success.data.code == 500 || success.data.code == 401 || success.data.code == 403) {   //接口请求成功，业务逻辑错误
            Message.error({ message: success.data.message,type:'error' });
            return;
        }
        if (success.data.message) {
            Message({ message: success.data.message,type:'success' });
        }
    }
    return success.data;
}, (error) => {
    if (error.response.code == 504 || error.response.code == 404) {
        Message.error({ message: '服务器被吃了( ╯□╰ )' ,type:'error'});
    } else if (error.response.code == 403) {
        Message.error({ message: '权限不足，请联系管理员',type:'error' });
    } else if (error.response.code == 401) {
        Message.error({ message: '请登录账号' ,type:'error'});
        router.replace('/');
    } else {
        if (error.response.message) {
            Message({ message: error.response.message,type:'error' });
        } else {
            Message({ message: '该错误触及盲区(●ˇ∀ˇ●)' ,type:'error'});
        }
    }
});

//封装请求
//post
let base = '';
export const postRequest = (url, params) => {
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: params
    })
};

//put
export const putRequest = (url, params) => {
    return axios({
        method: 'put',
        url: `${base}${url}`,
        data: params
    })
};

//get
export const getRequest = (url, params) => {
    return axios({
        method: 'get',
        url: `${base}${url}`,
        data: params
    })
};

//del
export const deletedRequest = (url, params) => {
    return axios({
        method: 'delete',
        url: `${base}${url}`,
        data: params
    })
};
