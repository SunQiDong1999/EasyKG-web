const Layout = () => import('@/layout/index.vue')

export default {
    path: '/graph',
    component: Layout,
    redirect: '/graph/index',
    name: 'graph',
    meta: {
        title: '图谱管理',
        icon: 'graph'
    },
    children: [
        {
            path: 'index',
            name: 'graphIndex',
            component: () => import('@/views/graph/index.vue'),
            meta: {
                title: '图谱管理',
                sidebar: false,
                breadcrumb: false,
                activeMenu: '/graph'
            }
        }
    ]
}
