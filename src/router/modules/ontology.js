const Layout = () => import('@/layout/index.vue')

export default {
    path: '/ontology',
    component: Layout,
    redirect: '/ontology/index',
    name: 'ontology',
    meta: {
        title: '本体管理',
        icon: 'ontology'
    },
    children: [
        {
            path: 'index',
            name: 'ontologyIndex',
            component: () => import('@/views/ontology/index.vue'),
            meta: {
                title: '本体概览'
            }
        },
        {
            path: 'labels',
            name: 'labels',
            component: () => import('@/views/ontology/labels.vue'),
            meta: {
                title: '实体标签'
            }
        },
        {
            path: 'types',
            name: 'types',
            component: () => import('@/views/ontology/types.vue'),
            meta: {
                title: '关系类型'
            }
        },
    ]
}
