const Layout = () => import('@/layout/index.vue')

export default {
    path: '/model',
    component: Layout,
    redirect: '/model/index',
    name: 'model',
    meta: {
        title: '模型管理',
        icon: 'model'
    },
    children: [
        {
            path: 'index',
            name: 'modelIndex',
            component: () => import('@/views/model/index.vue'),
            meta: {
                title: '模型管理',
                sidebar: false,
                breadcrumb: false,
                activeMenu: '/model'
            }
        }
    ]
}
