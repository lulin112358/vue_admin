import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/store'
import NProgress from 'nprogress' //进度条
import 'nprogress/nprogress.css'
Vue.use(Router)
    // 路由懒加载
const getComponent = (name, component) => () =>
    import (`@/views/${name}/${component}.vue`);


const routes = [
    {
        path: '/login',
        name: 'login',
        component: getComponent('login', 'index')
    },
    {
        path: '/',
        redirect: '/login',
        component: getComponent('login', 'index')
    },
    {
        path: '/home',
        component: getComponent('layout', 'Layout'),
        children: [{
            path: '/home',
            component: getComponent('home', 'order'),
            meta: {
                title: 'home'
            }
        },
            {
                path: '/source',
                component: getComponent('source', 'source'),
                meta: {
                    title: '来源管理'
                }
            },
            {
                path: '/account',
                component: getComponent('account', 'account'),
                meta: {
                    title: '账号列表'
                }
            },
            {
                path: '/account_cate',
                component: getComponent('accountCate', 'accountCate'),
                meta: {
                    title: '账号类型'
                }
            },
            {
                path: '/404',
                component: getComponent('error', '404'),
                meta: {
                    title: '404'
                }
            },
            {
                path: '/menu',
                component: getComponent('menu', 'menu'),
                meta: {
                    title: '菜单管理'
                }
            },
            {
                path: '/role',
                component: getComponent('role', 'role'),
                meta: {
                    title: '角色管理'
                }
            },
            {
                path: '/user',
                component: getComponent('user', 'user'),
                meta: {
                    title: '用户管理'
                }
            },
            {
                path: '/403',
                component: getComponent('error', '403'),
                meta: {
                    title: '403'
                }
            }
        ]
    }, {
        path: '*',
        redirect: '/404',
    }
]

const myRouter = new Router({
    routes,
    mode: 'history'
})

//判断是否存在token
myRouter.beforeEach((to, from, next) => {
    NProgress.start()
    if (to.path !== '/login' && !store.state.token) {
        next('/login')
        NProgress.done() // 结束Progress
    } else {
        next();
    }

    if (to.path === '/' || to.path === '/login' && store.state.token) {
        next('/home')
        NProgress.done()
    }else {
        next()
    }

    if (to.meta.roles) {
        to.meta.roles.includes(...store.getters.roles) ? next() : next('/404')
    } else {
        next();
    }
})

myRouter.afterEach(() => {
    NProgress.done() // 结束Progress
})
export default myRouter