const Layout = () => import('@/layout/index.vue')

export default {
    path: '/tree',
    component: Layout,
    name: 'tree',
    meta: {
        title: '树图结构展示',
        icon: 'ontologies'
    },
    children: [
        {
            path: '',
            name: 'treeview',
            component: () => import('@/views/treeview/treegraphview.vue'),
            meta: {
                title: '',
                sidebar: false,
                breadcrumb: true,
                activeMenu: '/tree'
            }
        }
    ]
}
