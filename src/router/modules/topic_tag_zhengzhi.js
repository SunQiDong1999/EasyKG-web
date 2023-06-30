const Layout = () => import('@/layout/index.vue')

export default {
    path: '/zhengzhi',
    component: Layout,
    name: 'zhengzhi',
    meta: {
        title: '素材类别：政治',
        icon: 'ontologies'
    },
    children: [
        {
            path: '/zhengzhi/person',
            name: 'zhengzhiperson',
            component: () => import('@/views/treeview/zhengzhi_person.vue'),
            meta: {
                title: '人物',
                sidebar: true,
                breadcrumb: true,
                activeMenu: '/zhengzhi'
            }
        },
        {
            path: '/zhengzhi/org',
            name: 'zhengzhiorg',
            component: () => import('@/views/treeview/zhengzhi_org.vue'),
            meta: {
                title: '组织',
                sidebar: true,
                breadcrumb: true,
                activeMenu: '/zhengzhi'
            }
        },
        {
            path: '/zhengzhi/event',
            name: 'zhengzhievent',
            component: () => import('@/views/treeview/zhengzhi_event.vue'),
            meta: {
                title: '事件',
                sidebar: true,
                breadcrumb: true,
                activeMenu: '/event'
            }
        },
        {
            path: '/zhengzhi/topic',
            name: 'zhengzhitopic',
            component: () => import('@/views/treeview/zhengzhi_topic.vue'),
            meta: {
                title: '话题',
                sidebar: true,
                breadcrumb: true,
                activeMenu: '/zhengzhi'
            }
        }
    ]
}
