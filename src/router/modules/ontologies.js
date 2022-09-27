const Layout = () => import('@/layout/index.vue')

export default {
    path: '/ontologies',
    component: Layout,
    name: 'ontologies',
    meta: {
        title: '本体管理',
        icon: 'ontologies'
    },
    children: [
        {
            path: '',
            name: 'ontologiesIndex',
            component: () => import('@/views/ontologies/index.vue'),
            meta: {
                title: '本体管理',
                sidebar: false,
                breadcrumb: false,
                activeMenu: '/ontologies'
            }
        }
    ]
}
