import Vue from 'vue'
import Router from 'vue-router'
import Index from '../components/Index'
import Register from '../components/Register'
import Login from '../components/Login'
import Home from '../components/Home'
import InfoShow from '../components/InfoShow'
import FundList from '../components/FundList'
import NotFound from '../components/404'

Vue.use(Router)

const router = new Router({
    routes: [{
            path: '/',
            redirect: '/index'
        },
        {
            path: '/index',
            component: Index,
            name: 'index',
            children: [{
                    path: '',
                    component: Home
                },
                {
                    path: '/home',
                    component: Home
                },
                {
                    path: '/infoshow',
                    component: InfoShow
                },
                {
                    path: '/fundlist',
                    component: FundList
                },
            ]
        },
        {
            path: '/register',
            component: Register,
            name: 'register'
        },
        {
            path: '*',
            component: NotFound,
            name: '404'
        },
        {
            path: '/login',
            component: Login,
            name: 'login'
        },
    ]
})

// 路由守卫
router.beforeEach((to, from, next) => {
    const isLogin = localStorage.eleToken ? true : false
    if (to.path == '/login' || to.path == '/register') {
        next()
    } else {
        isLogin ? next() : next('/login')
    }
})

export default router