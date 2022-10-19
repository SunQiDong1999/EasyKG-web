<template>
    <div>
        <page-header :title="graph.name">
            <template #content>
                {{ graph.description }}
            </template>
        </page-header>
        <page-main>
            <el-container>
                <el-header height="20px">
                    <el-space>
                        <el-pagination
                            v-model:page-size="pagination.size"
                            v-model:current-page="pagination.page"
                            layout="prev, pager, next"
                            :total="graph.entityNum"
                        />
                        <button @click="aside.one=!aside.one">开抽屉</button>
                    </el-space>
                </el-header>
                <el-divider />
                <el-container>
                    <el-main>
                        <div id="mountNode" />
                    </el-main>
                    <el-divider direction="vertical" />
                    <el-aside v-if="aside.one">
                        ss
                    </el-aside>
                    <el-aside v-if="!aside.one">
                        dd
                    </el-aside>
                </el-container>
            </el-container>
        </page-main>
    </div>
</template>

<script>
import { defineComponent, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router/dist/vue-router'
import { getGraphById, getGraphData } from '@/api/graph'
import G6 from '@antv/g6'

export default defineComponent({
    name: 'Tableview',
    setup() {
        const router = useRouter()
        const graphId = router.currentRoute.value.params.id
        const graph = reactive({})

        const aside = reactive({
            visible: false
        })
        const pagination = reactive({
            size: 1,
            page: 1
        })
        // 图配置
        const g6Config = {
            container: 'mountNode', // String | HTMLElement，必须，在 Step 1 中创建的容器 id 或容器本身
            width: 800, // Number，必须，图的宽度
            height: 500, // Number，必须，图的高度
            animate: false, // Boolean，可选，全局变化时否使用动画过渡
            modes: {
                default: ['drag-canvas', 'zoom-canvas', 'drag-node'] // 允许拖拽画布、放缩画布、拖拽节点
            },
            layout: {
                // Object，可选，布局的方法及其配置项，默认为 random 布局。
                type: 'force', // 指定为力导向布局
                preventOverlap: true, // 防止节点重叠
                linkDistance: 100 // 指定边距离为100
            },
            // 节点在默认状态下的样式配置（style）和其他配置
            defaultNode: {
                size: 30, // 节点大小
                // ...                 // 节点的其他配置
                // 节点样式配置
                style: {
                    fill: 'steelblue', // 节点填充色
                    stroke: '#666', // 节点描边色
                    lineWidth: 1 // 节点描边粗细
                },
                // 节点上的标签文本配置
                labelCfg: {
                    // 节点上的标签文本样式配置
                    style: {
                        fill: '#fff' // 节点标签文字颜色
                    }
                }
            },
            // 边在默认状态下的样式配置（style）和其他配置
            defaultEdge: {
                // ...                 // 边的其他配置
                // 边样式配置
                style: {
                    opacity: 0.6, // 边透明度
                    stroke: 'grey' // 边描边颜色
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
                    fill: 'lightsteelblue'
                },
                // 鼠标点击节点，即 click 状态为 true 时的样式
                click: {
                    stroke: '#000',
                    lineWidth: 3
                }
            },
            // 边不同状态下的样式集合
            edgeStateStyles: {
                // 鼠标点击边，即 click 状态为 true 时的样式
                click: {
                    stroke: 'steelblue'
                }
            }
        }

        onMounted(() => {
            const g6Graph = new G6.Graph(g6Config)
            getGraphById(graphId).then(res => {
                graph.id = res.data.id
                graph.name = res.data.name
                graph.description = res.data.description
                graph.entityNum = res.data.entityNum
                graph.relationNum = res.data.relationNum
                getGraphData(graphId, pagination.page).then(res => {
                    const g6Data = res.data
                    console.log(g6Data)
                    g6Graph.data(g6Data) // 读取 Step 2 中的数据源到图上
                    g6Graph.render() // 渲染图
                })
            })
            // 鼠标进入节点
            g6Graph.on('node:mouseenter', e => {
                const nodeItem = e.item // 获取鼠标进入的节点元素对象
                g6Graph.setItemState(nodeItem, 'hover', true) // 设置当前节点的 hover 状态为 true
            })

            // 鼠标离开节点
            g6Graph.on('node:mouseleave', e => {
                const nodeItem = e.item // 获取鼠标离开的节点元素对象
                g6Graph.setItemState(nodeItem, 'hover', false) // 设置当前节点的 hover 状态为 false
            })

            // 点击节点
            g6Graph.on('node:click', e => {
                // 先将所有当前是 click 状态的节点置为非 click 状态
                const clickNodes = g6Graph.findAllByState('node', 'click')
                clickNodes.forEach(cn => {
                    graph.setItemState(cn, 'click', false)
                })
                const nodeItem = e.item // 获取被点击的节点元素对象
                graph.setItemState(nodeItem, 'click', true) // 设置当前节点的 click 状态为 true
            })

            // 点击边
            g6Graph.on('edge:click', e => {
                // 先将所有当前是 click 状态的边置为非 click 状态
                const clickEdges = g6Graph.findAllByState('edge', 'click')
                clickEdges.forEach(ce => {
                    g6Graph.setItemState(ce, 'click', false)
                })
                const edgeItem = e.item // 获取被点击的边元素对象
                g6Graph.setItemState(edgeItem, 'click', true) // 设置当前边的 click 状态为 true
            })
        })
        return {
            graph,
            aside,
            pagination
        }
    }
})
</script>

<style scoped>
</style>
