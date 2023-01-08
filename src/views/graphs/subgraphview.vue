<template>
    <div>
        <page-header :title="graph.name">
            <template #content>
                {{ graph.description }}
            </template>
        </page-header>
        <page-main>
            <el-container>
                <el-header height="20px" />
                <el-divider />
                <el-container>
                    <el-main>
                        <el-card id="container" shadow="never" style="min-height: 500px;">
                            <div id="mountNode" />
                        </el-card>
                    </el-main>
                    <el-divider direction="vertical" />
                    <el-aside v-if="aside.cur === 'overview'">
                        <el-card header="概览" shadow="never">
                            <el-descriptions :column="1" border>
                                <el-descriptions-item align="center">
                                    <template #label>
                                        <span>实体数</span>
                                    </template>
                                    <span style="font-size: 30px;">
                                        {{ graph.entityNum }}
                                    </span>
                                    <span>
                                        个
                                    </span>
                                </el-descriptions-item>
                                <el-descriptions-item align="center">
                                    <template #label>
                                        <span>关系数</span>
                                    </template>
                                    <span style="font-size: 30px;">
                                        {{ graph.relationNum }}
                                    </span>
                                    <span>
                                        个
                                    </span>
                                </el-descriptions-item>
                                <el-descriptions-item align="center">
                                    <template #label>
                                        <span>子图描述</span>
                                    </template>
                                    <span style="font-size: 30px;">
                                        {{ graph.description }}
                                    </span>
                                </el-descriptions-item>
                            </el-descriptions>
                        </el-card>
                    </el-aside>
                    <el-aside v-else-if="aside.cur === '实体信息'">
                        <el-card header="实体信息" shadow="never">
                            <el-descriptions border column="1">
                                <template #title>
                                    <el-tag
                                        v-for="label in entityInfo.labels" :key="label"
                                        effect="dark"
                                        class="mx-1" size="large" :color="graph.colorMap[label]" round
                                    >
                                        {{ label }}
                                    </el-tag>
                                </template>
                                <el-descriptions-item
                                    v-for="attribute in entityInfo.infoList"
                                    :key="attribute.name"
                                    :label="attribute.nameZh + '（' + attribute.name + '）'"
                                    align="center"
                                >
                                    {{ entityInfo.info[attribute.name] }}
                                </el-descriptions-item>
                            </el-descriptions>
                        </el-card>
                    </el-aside>
                    <el-aside v-else-if="aside.cur === '关系信息'">
                        <el-card header="关系信息" shadow="never">
                            <el-descriptions border column="1">
                                <template #title>
                                    <el-tag
                                        effect="dark"
                                        size="large" :color="graph.colorMap[relationInfo.type]" round
                                    >
                                        {{ relationInfo.type }}
                                    </el-tag>
                                </template>
                                <el-descriptions-item
                                    v-for="attribute in relationInfo.infoList"
                                    :key="attribute.name"
                                    :label="attribute.nameZh + '（' + attribute.name + '）'"
                                    align="center"
                                >
                                    {{ relationInfo.info[attribute.name] }}
                                </el-descriptions-item>
                            </el-descriptions>
                        </el-card>
                    </el-aside>
                </el-container>
            </el-container>
        </page-main>
    </div>
</template>

<script>
import { defineComponent, onMounted, reactive, ref } from 'vue'
import {
    getEntities,
    getEntitiesQuery, getEntityNeighbors,
    getGraphById,
    getLabelAttributeMap,
    getRelationsQueryEntities,
    getTypeAttributeMap
} from '@/api/graph'
import G6 from '@antv/g6'
import { getLabels, getOntologyColorMap, getTypes } from '@/api/project'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { ElDivider } from 'element-plus'
import { fittingString, uniqueFunc } from '@/views/graphs/graph_method'
import { getSubgraphById, getSubgraphEntities, getSubgraphRelations } from '@/api/subgraph'

export default defineComponent({
    name: 'SubgraphView',
    setup() {
        const router = useRouter()
        const spacer = h(ElDivider, { direction: 'vertical' })
        const subgraphId = router.currentRoute.value.params.subgraphId
        const graphId = router.currentRoute.value.params.id
        const graph = reactive({
            colorMap: Map,
            labelAttributeMap: Map,
            typeAttributeMap: Map
        })

        const aside = reactive({
            cur: 'overview'
        })
        const pagination = reactive({
            size: 25,
            page: 1
        })
        const g6Data = reactive({
            nodes: [],
            edges: []
        })
        const entityInfo = reactive({
            labels: [],
            infoList: [],
            info: {}
        })

        const relationInfo = reactive({
            type: '',
            infoList: [],
            info: {}
        })

        const pageChange = () => {
            if (query.entity.length === 0 && query.relation.r.length === 0) {
                getEntities(graphId, pagination.size, pagination.page).then(res => {
                    pagination.total = res.data.total
                    g6Data.nodes = res.data.data
                    setG6Data(g6Data)
                    g6Graph.value.render() // 读取 Step 2 中的数据源到图上
                })
            } else if (query.entity.length !== 0 && query.relation.r.length === 0) {
                getEntitiesQuery(graphId, entityQueryForm.label, pagination.size, pagination.page, query.entity).then(res => {
                    pagination.total = res.data.total
                    g6Data.nodes = res.data.data
                    setG6Data(g6Data)
                    g6Graph.value.render() // 读取 Step 2 中的数据源到图上
                })
            } else if (query.entity.length === 0 && query.relation.r.length !== 0) {
                getRelationsQueryEntities(graphId, relationQueryForm.type, pagination.size, pagination.page, query.relation.r, query.relation.source.label, query.relation.target.label).then(res => {
                    pagination.total = res.data.total
                    g6Data.nodes = res.data.data
                    setG6Data(g6Data)
                    g6Graph.value.render() // 读取 Step 2 中的数据源到图上
                })
            }
        }

        // 图配置
        const g6Config = {
            container: 'mountNode', // String | HTMLElement，必须，在 Step 1 中创建的容器 id 或容器本身
            animate: true, // Boolean，可选，全局变化时否使用动画过渡
            modes: {
                default: ['drag-canvas', 'zoom-canvas', 'drag-node'] // 允许拖拽画布、放缩画布、拖拽节点
            },
            layout: {
                type: 'force',
                linkDistance: 120, // 边长度
                nodeStrength: 50, // 节点作用力，正数代表节点之间的引力作用，负数代表节点之间的斥力作用
                edgeStrength: 0.2, // 边的作用力，范围是 0 到 1，默认根据节点的出入度自适应
                collideStrength: 0.1, // 防止重叠的力强度
                nodeSize: 30, // 节点大小
                nodeSpacing: 50, // 间距
                alpha: 0.8, // 当前的迭代收敛阈值
                alphaDecay: 0.028, // 迭代阈值的衰减率。范围 [0, 1]。0.028 对应迭代数为 300
                alphaMin: 0.01, // 停止迭代的阈值
                forceSimulation: null, // 自定义 force 方法，若不指定，则使用 d3.js 的方法
                preventOverlap: true, // 是否防止重叠
                condense: true
            },
            // 节点在默认状态下的样式配置（style）和其他配置
            defaultNode: {
                size: 50, // 节点大小
                // ...                 // 节点的其他配置
                // 节点样式配置
                style: {
                    stroke: 'black', // 节点描边色
                    lineWidth: 0.5 // 节点描边粗细
                },
                // 节点上的标签文本配置
                labelCfg: {
                    // 节点上的标签文本样式配置
                    style: {
                        fill: 'black' // 节点标签文字颜色
                    }
                }
            },
            // 边在默认状态下的样式配置（style）和其他配置
            defaultEdge: {
                // 边样式配置
                style: {
                    opacity: 0.6, // 边透明度
                    endArrow: {
                        path: G6.Arrow.vee(2, 5, 10), // 内置箭头，参数为箭头宽度、长度、偏移量 d（默认为 0）
                        d: 10 // 偏移量
                    }
                },
                // 边上的标签文本配置
                labelCfg: {
                    autoRotate: true // 边上的标签文本根据边的方向旋转
                }
            },
            // 节点不同状态下的样式集合
            nodeStateStyles: {
                // 鼠标 hover 上节点，即 hover 状态为 true 时的样式
                hover: {
                    lineWidth: 2
                },
                // 鼠标点击节点，即 click 状态为 true 时的样式
                click: {
                    lineWidth: 3
                }
            },
            // 边不同状态下的样式集合
            edgeStateStyles: {
                // 鼠标点击边，即 click 状态为 true 时的样式
                click: {
                    stroke: 'black',
                    lineWidth: 3
                }
            }
        }

        const setG6Data = g6Data => {
            g6Data.nodes.forEach(node => {
                node.style = {
                    fill: graph.colorMap[node.labels[0]]
                }
                node.label = fittingString(node.label, 50, 12)
            })
            g6Data.edges.forEach(edge => {
                delete edge.id
                edge.style = {
                    stroke: graph.colorMap[edge.type]
                }
                edge.label = fittingString(edge.label, 100, 12)
            })
        }
        // G6实例
        let g6Graph = ref()

        // 当前项目的实体标签
        const labels = reactive({
            list: []
        })
        // 当前项目的关系类型
        const types = reactive({
            list: []
        })

        const entityQueryForm = reactive({
            label: '',
            attributes: [],
            conditions: [],
            operators: [],
            values: []
        })

        const relationQueryForm = reactive({
            type: '',
            attributes: [],
            conditions: [],
            values: []
        })

        const query = reactive({
            entity: '',
            relation: {
                r: '',
                source: {
                    label: '',
                    attributes: [],
                    conditions: [],
                    operators: [],
                    values: []
                },
                target: {
                    label: '',
                    attributes: [],
                    conditions: [],
                    operators: [],
                    values: []
                }
            }
        })

        const entityQueryLabelChange = entityQueryForm => {
            entityQueryForm.attributes = graph.labelAttributeMap[entityQueryForm.label]
            entityQueryForm.operators = []
            entityQueryForm.values = []
            entityQueryForm.attributes.forEach((attribute, index) => {
                if (attribute.type === 0) {
                    entityQueryForm.conditions[index] = ['=', '=~']
                } else if (attribute.type === 1 ||  attribute.type === 2) {
                    entityQueryForm.conditions[index] = ['>', '>=', '=', '<=', '<']
                } else if (attribute.type === 3) {
                    entityQueryForm.conditions[index] = ['=']
                } else if (attribute.type === 4) {
                    entityQueryForm.conditions[index] = ['>', '>=', '=', '<=', '<']
                } else if (attribute.type === 5) {
                    entityQueryForm.conditions[index] = ['contains']
                }
            })
        }

        const relationQueryTypeChange = () => {
            relationQueryForm.attributes = graph.typeAttributeMap[relationQueryForm.type]
            relationQueryForm.operators = []
            relationQueryForm.values = []
            relationQueryForm.attributes.forEach((attribute, index) => {
                if (attribute.type === 0) {
                    relationQueryForm.conditions[index] = ['=', '=~']
                } else if (attribute.type === 1 ||  attribute.type === 2) {
                    relationQueryForm.conditions[index] = ['>', '>=', '=', '<=', '<']
                } else if (attribute.type === 3) {
                    relationQueryForm.conditions[index] = ['=']
                } else if (attribute.type === 4) {
                    relationQueryForm.conditions[index] = ['>', '>=', '=', '<=', '<']
                } else if (attribute.type === 5) {
                    relationQueryForm.conditions[index] = ['contains']
                }
            })
        }

        const entityQuery = () => {
            query.entity = ''
            query.relation.r = ''
            let queryList = []
            entityQueryForm.attributes.forEach((attribute, index) => {
                if (entityQueryForm.operators[index] !== undefined && entityQueryForm.values[index] !== undefined && entityQueryForm.values[index] !== '') {
                    if (attribute.type === 0) {
                        if (entityQueryForm.operators[index] === '=~') {
                            queryList.push('e.' + attribute.name + ' ' + entityQueryForm.operators[index] + ' \'.*' + entityQueryForm.values[index] + '.*\'')

                        } else if (entityQueryForm.operators[index] === '=') {
                            queryList.push('e.' + attribute.name + ' ' + entityQueryForm.operators[index] + ' \'' + entityQueryForm.values[index] + '\'')
                        }
                    } else if (attribute.type === 1 ||  attribute.type === 2) {
                        queryList.push('e.' + attribute.name + ' ' + entityQueryForm.operators[index] + ' ' + entityQueryForm.values[index])
                    }
                }
            })
            query.entity = queryList[0]
            for (let i = 1; i < queryList.length; i++) {
                query.entity += ' and ' + queryList[i]
            }
            pagination.page = 1
            pageChange()
        }

        const relationQuery = () => {
            console.log(query)
            query.entity = ''
            query.relation.r = ''
            let queryList = []
            relationQueryForm.attributes.forEach((attribute, index) => {
                if (relationQueryForm.operators[index] !== undefined && relationQueryForm.values[index] !== undefined && relationQueryForm.values[index] !== '') {
                    if (attribute.type === 0) {
                        if (relationQueryForm.operators[index] === '=~') {
                            queryList.push('r.' + attribute.name + ' ' + relationQueryForm.operators[index] + ' \'.*' + relationQueryForm.values[index] + '.*\'')

                        } else if (entityQueryForm.operators[index] === '=') {
                            queryList.push('r.' + attribute.name + ' ' + relationQueryForm.operators[index] + ' \'' + relationQueryForm.values[index] + '\'')
                        }
                    } else if (attribute.type === 1 ||  attribute.type === 2) {
                        queryList.push('r.' + attribute.name + ' ' + relationQueryForm.operators[index] + ' ' + relationQueryForm.values[index])
                    }
                }
            })

            query.relation.source.attributes.forEach((attribute, index) => {
                if (query.relation.source.operators[index] !== undefined && query.relation.source.values[index] !== undefined && query.relation.source.values[index] !== '') {
                    if (attribute.type === 0) {
                        if (query.relation.source.operators[index] === '=~') {
                            queryList.push('s.' + attribute.name + ' ' + query.relation.source.operators[index] + ' \'.*' + query.relation.source.values[index] + '.*\'')

                        } else if (entityQueryForm.operators[index] === '=') {
                            queryList.push('s.' + attribute.name + ' ' + query.relation.source.operators[index] + ' \'' + query.relation.source.values[index] + '\'')
                        }
                    } else if (attribute.type === 1 ||  attribute.type === 2) {
                        queryList.push('s.' + attribute.name + ' ' + query.relation.source.operators[index] + ' ' + query.relation.source.values[index])
                    }
                }
            })

            query.relation.target.attributes.forEach((attribute, index) => {
                if (query.relation.target.operators[index] !== undefined && query.relation.target.values[index] !== undefined && query.relation.target.values[index] !== '') {
                    if (attribute.type === 0) {
                        if (query.relation.target.operators[index] === '=~') {
                            queryList.push('t.' + attribute.name + ' ' + query.relation.target.operators[index] + ' \'.*' + query.relation.target.values[index] + '.*\'')

                        } else if (entityQueryForm.operators[index] === '=') {
                            queryList.push('t.' + attribute.name + ' ' + query.relation.target.operators[index] + ' \'' + query.relation.target.values[index] + '\'')
                        }
                    } else if (attribute.type === 1 ||  attribute.type === 2) {
                        queryList.push('t.' + attribute.name + ' ' + query.relation.target.operators[index] + ' ' + query.relation.target.values[index])
                    }
                }
            })

            query.relation.r = queryList[0]
            for (let i = 1; i < queryList.length; i++) {
                query.relation.r += ' and ' + queryList[i]
            }

            pagination.page = 1
            pageChange()
        }

        onMounted(() => {
            console.log(graphId)
            console.log(subgraphId)
            g6Config.width = document.getElementById('container').offsetWidth
            g6Config.height = document.getElementById('container').offsetHeight
            g6Graph.value = new G6.Graph(g6Config)
            getGraphById(graphId).then(res => {
                graph.id = res.data.id
                graph.name = res.data.name
                graph.projectId = res.data.projectId
                axios.all([
                    getSubgraphById(subgraphId).then(res => {
                        graph.entityNum = res.data.entityNum
                        graph.relationNum = res.data.relationNum
                        graph.description = res.data.description
                    }),
                    getSubgraphEntities(subgraphId).then(res => {
                        g6Data.nodes = res.data
                    }),
                    getSubgraphRelations(subgraphId).then(res => {
                        g6Data.edges = res.data
                    })
                ]).then(() => {
                    getOntologyColorMap(graph.projectId).then(res => {
                        graph.colorMap = res.data
                        setG6Data(g6Data)
                        g6Graph.value.read(g6Data)
                    })
                })
                pagination.total = graph.entityNum
                getLabelAttributeMap(graphId).then(res => {
                    graph.labelAttributeMap = res.data
                })
                getTypeAttributeMap(graphId).then(res => {
                    graph.typeAttributeMap = res.data
                })
                getLabels(graph.projectId).then(res => {
                    labels.list = [...res.data]
                })
                getTypes(graph.projectId).then(res => {
                    types.list = [...res.data]
                })
            })
            // 鼠标进入节点
            g6Graph.value.on('node:mouseenter', e => {
                const nodeItem = e.item // 获取鼠标进入的节点元素对象
                g6Graph.value.setItemState(nodeItem, 'hover', true) // 设置当前节点的 hover 状态为 true
            })

            // 鼠标离开节点
            g6Graph.value.on('node:mouseleave', e => {
                const nodeItem = e.item // 获取鼠标离开的节点元素对象
                g6Graph.value.setItemState(nodeItem, 'hover', false) // 设置当前节点的 hover 状态为 false
            })

            // 点击节点
            g6Graph.value.on('node:click', e => {
                aside.cur = '实体信息'
                // 先将所有当前是 click 状态的节点置为非 click 状态
                const clickNodes = g6Graph.value.findAllByState('node', 'click')
                clickNodes.forEach(cn => {
                    g6Graph.value.setItemState(cn, 'click', false)
                })
                const nodeItem = e.item // 获取被点击的节点元素对象
                g6Graph.value.setItemState(nodeItem, 'click', true) // 设置当前节点的 click 状态为 true
                // 展示实体信息
                entityInfo.info = nodeItem._cfg.model
                entityInfo.labels = entityInfo.info.labels
                entityInfo.infoList = []
                entityInfo.labels.forEach(label => {
                    entityInfo.infoList = [...graph.labelAttributeMap[label]]
                })
            })

            // 点击边
            g6Graph.value.on('edge:click', e => {
                aside.cur = '关系信息'
                // 先将所有当前是 click 状态的边置为非 click 状态
                const clickEdges = g6Graph.value.findAllByState('edge', 'click')
                clickEdges.forEach(ce => {
                    g6Graph.value.setItemState(ce, 'click', false)
                })
                const edgeItem = e.item // 获取被点击的边元素对象
                g6Graph.value.setItemState(edgeItem, 'click', true) // 设置当前边的 click 状态为 true
                // 展示关系信息
                relationInfo.info = edgeItem._cfg.model
                relationInfo.type = relationInfo.info.type
                relationInfo.infoList = []
                relationInfo.infoList = [...graph.typeAttributeMap[relationInfo.type]]
            })

            // 双击节点
            g6Graph.value.on('node:dblclick', e => {
                const nodeItem = e.item // 获取被点击的节点元素对象
                // 实体信息
                entityInfo.info = nodeItem._cfg.model
                getEntityNeighbors(graphId, entityInfo.info.id).then(res => {
                    g6Data.nodes = uniqueFunc(g6Data.nodes.concat(res.data), 'id')
                    setG6Data(g6Data)
                    g6Graph.value.render() // 读取 Step 2 中的数据源到图上
                })
            })
        })
        return {
            spacer,
            graph,
            aside,
            pagination,
            entityInfo,
            relationInfo,
            pageChange,
            labels,
            types,
            entityQueryForm,
            relationQueryForm,
            entityQueryLabelChange,
            entityQuery,
            relationQueryTypeChange,
            relationQuery,
            query
        }
    }
})
</script>
