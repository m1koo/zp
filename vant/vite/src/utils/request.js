import axios from 'axios';



let header = {
    'Content-Type': 'application/json',

}

if(localStorage.getItem('Authorization')){
    header.Authorization = localStorage.getItem('Authorization')
}
export const apiClient = axios.create({
    baseURL: 'http://localhost:7893/api/app', // Replace with your actual backend server URL
    headers: header
});

// 添加响应拦截器
apiClient.interceptors.response.use(
    function(response) {
        // 对响应数据做点什么

        if(response.data.code === 5001){
            console.log('token已失效')
            window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx9e2078a357bdd7a7&redirect_uri=https%3A%2F%2Fwww.tmallab.cn%2Fwxzp%2Fjob&response_type=code&scope=snsapi_userinfo&state=&connect_redirect=1#wechat_redirect'
            // return Promise.reject();
        }
        return response;
    }
);
