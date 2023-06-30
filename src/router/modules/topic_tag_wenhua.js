const Layout = () => import('@/layout/index.vue')

export default {
    path: '/wenhua',
    component: Layout,
    name: 'wenhua',
    meta: {
        title: '素材类别：文化',
        icon: 'ontologies'
    },
    children: [
        {
            path: '/wenhua/org',
            name: 'wenhuaorg',
            component: () => import('@/views/treeview/wenhua_org.vue'),
            meta: {
                title: '组织',
                sidebar: true,
                breadcrumb: true,
                activeMenu: '/wenhua'
            }
        },
        {
            path: '/wenhua/event',
            name: 'wenhuaevent',
            component: () => import('@/views/treeview/wenhua_event.vue'),
            meta: {
                title: '事件',
                sidebar: true,
                breadcrumb: true,
                activeMenu: '/wenhua'
            }
        },
        {
            path: '/wenhua/topic',
            name: 'wenhuatopic',
            component: () => import('@/views/treeview/wenhua_topic.vue'),
            meta: {
                title: '话题',
                sidebar: true,
                breadcrumb: true,
                activeMenu: '/wenhua'
            }
        }
    ]
}
