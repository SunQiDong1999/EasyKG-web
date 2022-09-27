const Layout = () => import('@/layout/index.vue')

export default {
    path: '/graphs',
    component: Layout,
    name: 'graphs',
    meta: {
        title: '图谱管理',
        icon: 'graphs'
    },
    children: [
        {
            path: '',
            name: 'graphsIndex',
            component: () => import('@/views/graphs/index.vue'),
            meta: {
                title: '图谱管理',
                sidebar: false,
                breadcrumb: false,
                activeMenu: '/graphs'
            }
        }
    ]
}
