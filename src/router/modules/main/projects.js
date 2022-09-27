const Layout = () => import('@/layout/indexMain.vue')

export default {
    path: '/projects',
    component: Layout,
    name: 'projects',
    meta: {
        title: '我的项目',
        icon: 'main-projects'
    },
    children: [
        {
            path: '',
            name: 'projectsIndex',
            component: () => import('@/views/main/projects/index.vue'),
            meta: {
                title: '我的项目',
                sidebar: false,
                breadcrumb: false,
                activeMenu: '/projects'
            }
        }
    ]
}
