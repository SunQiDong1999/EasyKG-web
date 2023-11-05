const Layout = () => import('@/layout/index.vue')

export default {
    path: '/renzhi',
    component: Layout,
    name: 'renzhi',
    meta: {
        title: '认知图谱展示',
        icon: 'ontologies'
    },
    children: [
        {
            path: '',
            name: 'renzhi',
            component: () => import('@/views/treeview/renzhi.vue'),
            meta: {
                title: '',
                sidebar: false,
                breadcrumb: true,
                activeMenu: '/renzhi'
            }
        }
    ]
}
