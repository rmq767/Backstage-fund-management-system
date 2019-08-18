import axios from 'axios'
import { Loading, Message } from 'element-ui'
import router from './router/index'

let loading;

function startLoading() { //使用Element loading-start 方法
    loading = Loading.service({
        //加载样式
        lock: true,
        text: '拼命加载中...',
        background: 'rgba(0,0,0,0.7)'
    })
}

function endLoading() {
    loading.close()
}

axios.defaults.baseURL = 'http://localhost:3000/api'

//请求拦截设置统一header
axios.interceptors.request.use(
    config => {
        // 加载动画
        startLoading()

        if (localStorage.eleToken) {
            // 设置统一的请求头，这样就可以拿着token随意访问了
            config.headers.Authorization = localStorage.eleToken
        }
        return config

    },
    error => {
        return Promise.reject(error)
    }
)

//响应拦截 401 token过期处理
axios.interceptors.response.use(
    response => {
        // 结束加载动画
        endLoading()
        return response
    },
    error => {
        //错误提醒
        endLoading()
        Message.error(error.response.data) //消息提示框错误提醒

        // 获取错误状态码
        const { status } = error.response
        if (status == 401) {
            Message.error('token失效了，请重新登录')
                // 清除token
            localStorage.removeItem('eleToken')
                // 跳转登录页面
            router.push('/login')
        }

        return Promise.reject(error)
    }
)

export default axios