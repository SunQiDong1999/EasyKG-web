const Layout = () => import('@/layout/indexMain.vue')

export default {
    path: '/kgs',
    component: Layout,
    name: 'kgs',
    meta: {
        title: 'KG hub',
        icon: 'main-kgs'
    },
    children: [
        {
            path: '',
            name: 'kgsIndex',
            component: () => import('@/views/main/kgs/index.vue'),
            meta: {
                title: 'KG hub',
                sidebar: false,
                breadcrumb: false,
                activeMenu: '/kgs'
            }
        }
    ]
}
