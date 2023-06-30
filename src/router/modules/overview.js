const Layout = () => import('@/layout/index.vue')

export default {
    path: '/overview',
    component: Layout,
    redirect: '/overview',
    name: 'overview',
    meta: {
        title: '项目概览',
        icon: 'overview',
        sidebar: false
    },
    children: [
        {
            path: '',
            name: 'overviewIndex',
            component: () => import('@/views/overview/index.vue'),
            meta: {
                title: '图谱管理',
                sidebar: false,
                breadcrumb: false,
                activeMenu: '/overview'
            }
        }
    ]
}
