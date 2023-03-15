import router from "~/router"
import { getToken } from "~/composables/auth"
import { toast, showFullLoading, hideFullLoading } from "~/composables/util"
import store from '~/store'

//全局路由
router.beforeEach(async (to, from, next) => {
    //显示全局加载进度
    showFullLoading()
    const token = getToken()
    //没有登陆则跳转到login页
    if (!token && to.path != '/login') {
        toast('请先登录!', 'error')
        return next({ path: '/login' })
    }
    //防止重复登录
    if (token && to.path == '/login') {
        toast('请勿重复登录!', 'error')
        return next({ path: from.path ? from.path : '/' })
    }

    //token存在则获取用户信息 
    if (token) {
        await store.dispatch("getinfo")
    }

    //设置页面标题
    let title = (to.meta.title ? to.meta.title : '') + '-Moiaussi商城后台'
    document.title = title
    next()
})

//全局后置守卫
router.afterEach((to, from) => {
    //隐藏全局加载进度
    hideFullLoading()
})