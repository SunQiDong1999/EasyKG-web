const Layout = () => import('@/layout/index.vue')

export default {
    path: '/models',
    component: Layout,
    name: 'models',
    meta: {
        title: '模型管理',
        icon: 'models'
    },
    children: [
        {
            path: '',
            name: 'modelsIndex',
            component: () => import('@/views/models/index.vue'),
            meta: {
                title: '模型管理',
                sidebar: false,
                breadcrumb: false,
                activeMenu: '/models'
            }
        }
    ]
}
