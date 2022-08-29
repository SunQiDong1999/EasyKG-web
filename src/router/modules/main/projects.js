const Layout = () => import('@/layout/indexMain.vue')

export default {
    path: '/projects',
    component: Layout,
    redirect: '/projects/index',
    name: 'projects',
    meta: {
        title: '我的项目',
        icon: 'main-projects'
    },
    children: [
        {
            path: 'index',
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
