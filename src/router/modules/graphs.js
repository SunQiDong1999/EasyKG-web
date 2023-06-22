const Layout = () => import('@/layout/index.vue')

export default {
    path: '/graphs',
    component: Layout,
    name: 'graphs',
    meta: {
        title: '图谱管理',
        icon: 'graphs'
    },
    children: [
        {
            path: '',
            name: 'graphsIndex',
            component: () => import('@/views/graphs/index.vue'),
            meta: {
                title: '图谱管理',
                sidebar: false,
                breadcrumb: false,
                activeMenu: '/graphs'
            }
        },
        {
            path: '/tableview/:id',
            name: 'tableview',
            component: () => import('@/views/graphs/tableview.vue'),
            meta: {
                title: '列表视图',
                sidebar: false,
                breadcrumb: true,
                activeMenu: '/graphs'
            }
        },
        {
            path: '/treetableview/:id',
            name: 'treetableview',
            component: () => import('@/views/graphs/treetableview.vue'),
            meta: {
                title: '目录视图',
                sidebar: false,
                breadcrumb: true,
                activeMenu: '/graphs'
            }
        },
        {
            path: '/graphview/:id',
            name: 'graphview',
            component: () => import('@/views/graphs/graphview.vue'),
            meta: {
                title: '图谱视图',
                sidebar: false,
                breadcrumb: true,
                activeMenu: '/graphs'
            }
        },
        {
            path: '/treegraphview/:id',
            name: 'treegraphview',
            component: () => import('@/views/graphs/treegraphview.vue'),
            meta: {
                title: '树图视图',
                sidebar: false,
                breadcrumb: true,
                activeMenu: '/graphs'
            }
        },
        {
            path: '/subgraphview/:id/:subgraphId',
            name: 'subgraphview',
            component: () => import('@/views/graphs/subgraphview.vue'),
            meta: {
                title: '子图视图',
                sidebar: false,
                breadcrumb: true,
                activeMenu: '/graphs'
            }
        }
    ]
}
