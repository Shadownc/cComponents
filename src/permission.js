import router from './router'
//存放不需要登录即可访问的path
const whiteList = ['/','/login', '/cCode', '/grayscale', '/worldCloud', '/waterMark', '/3d-rotate', '/3d-map'];
//获取token判断是否已登录，自行修改参数
let hasToken = localStorage.getItem('token');
const routeBefore = (to, callBack) => {
    //跳转前可进行的操作，如设置网页标题
    if (to.meta && to.meta.title) {
        document.title = to.meta.title
    }
    callBack(to)
}
let notAllow = false
router.beforeEach(async (to, from, next) => routeBefore(to, () => {
    if (hasToken) {
        if (to.path === '/login') {
            //如果已经登录跳转到首页
            next({
                path: '/'
            })
        } else {
            next()
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            //未登录在白名单中的path直接进行跳转
            next()
        } else {
            if (notAllow) {
                next('/errorTip')
            } else {
                next({ name: 'login' })
                // next(`/login?redirect=${to.fullPath}`)
            }
        }
    }
}))