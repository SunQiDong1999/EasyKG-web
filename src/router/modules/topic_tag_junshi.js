const Layout = () => import('@/layout/index.vue')

export default {
    path: '/junshi',
    component: Layout,
    name: 'junshi',
    meta: {
        title: '素材类别：军事',
        icon: 'ontologies'
    },
    children: [
        {
            path: '/junshi/org',
            name: 'junshiorg',
            component: () => import('@/views/treeview/junshi_org.vue'),
            meta: {
                title: '组织',
                sidebar: true,
                breadcrumb: true,
                activeMenu: '/junshi'
            }
        },
        {
            path: '/junshi/event',
            name: 'junshievent',
            component: () => import('@/views/treeview/junshi_event.vue'),
            meta: {
                title: '事件',
                sidebar: true,
                breadcrumb: true,
                activeMenu: '/junshi'
            }
        },
        {
            path: '/junshi/topic',
            name: 'junshitopic',
            component: () => import('@/views/treeview/junshi_topic.vue'),
            meta: {
                title: '话题',
                sidebar: true,
                breadcrumb: true,
                activeMenu: '/junshi'
            }
        }
    ]
}
