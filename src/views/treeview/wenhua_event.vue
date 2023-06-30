<template>
    <div>
        <page-header title="文化事件" />
        <page-main>
            <el-container>
                <el-header>
                    <el-form :inline="true" :model="filterForm">
                        <el-form-item label="文本">
                            <el-input v-model="filterForm.weibo" />
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="doFilter">筛选</el-button>
                        </el-form-item>
                    </el-form>
                </el-header>
            </el-container>
            <el-container>
                <el-aside style="max-height: 500px">
                    <el-menu title="话题" @select="handleSelect">
                        <el-menu-item v-for="(weiboTag, index) in data" :key="index" style="height: 36px" :index="index.toString()">{{ index + 1 }}.{{ id2NodeInfo.map[weiboTag.id].name }}</el-menu-item>
                    </el-menu>
                </el-aside>
                <el-main v-if="weiboData.length > 0" style="max-height: 500px">
                    <el-descriptions v-for="(weibo, index) in weiboData" :key="index" column="1">
                        <el-descriptions-item label="名&ensp;&ensp;&ensp;&ensp;称">{{ id2NodeInfo.map[weibo.id].name }}</el-descriptions-item>
                        <el-descriptions-item label="时&ensp;&ensp;&ensp;&ensp;间">{{ id2NodeInfo.map[weibo.id].time }}</el-descriptions-item>
                        <el-descriptions-item label="描&ensp;&ensp;&ensp;&ensp;述">{{ id2NodeInfo.map[weibo.id].desc }}</el-descriptions-item>
                        <el-descriptions-item label="主要对象">{{ id2NodeInfo.map[weibo.id].subject }}</el-descriptions-item>
                    </el-descriptions>
                </el-main>
            </el-container>
        </page-main>
    </div>
</template>

<script>
import { defineComponent, onMounted, reactive } from 'vue'
import { getTreeList } from '@/api/graph'

export default defineComponent({
    name: 'Tableview',
    setup() {
        const graphId = 32

        const data = ref([])
        const allData = ref([])
        const weiboData = ref([])

        const props = {
            value: 'id',
            label: 'label',
            children: 'children'
        }

        const loading = ref(true)

        const id2NodeInfo = {
            map: {}
        }

        const handleID2NodeInfoMap = label => {
            const typeAndAttributes = label.split('::')
            const nodeInfo = JSON.parse(typeAndAttributes[1])
            nodeInfo.type = typeAndAttributes[0]
            id2NodeInfo.map[nodeInfo.id] = nodeInfo
        }

        const handleSelect = index => {
            weiboData.value = []
            weiboData.value.push(data.value[parseInt(index)])
        }

        const handleLongText = text => {
            if (text.length > 50) {
                return text.substring(0, 50) + '......'
            } else {
                return text
            }
        }

        const num2String = b => {
            if (b === '0.0' || b === '0') {
                return '否'
            } else {
                return '是'
            }
        }

        const num2Bool = b => {
            if (b === '0.0' || b === '0') {
                return false
            } else {
                return true
            }
        }

        const filterForm = reactive({
            weibo: [],
            hasIrony: null,
            hasMetaphor: null
        })

        const getSentimentDesc = s => {
            s = parseInt(s)
            switch (s) {
                case -2:
                    return '极负 '
                case -1:
                    return '负向 '
                case 0:
                    return '中性 '
                case 1:
                    return '正向 '
                case 2:
                    return '极正'
            }
            return s
        }

        const doFilter = () => {
            const newData = []
            allData.value.forEach(node => {
                const weibo = id2NodeInfo.map[node.id]
                if (filterForm.weibo.length <= 0 || weibo.name.split(filterForm.weibo).length > 1) {
                    newData.push(node)
                }
            })
            data.value = newData
            weiboData.value = []
            weiboData.value.push(data.value[0])
        }

        onMounted(() => {
            getTreeList(graphId, 2, 3, 0, 0, '').then(res => {
                data.value = res.data[0].children
                allData.value = res.data[0].children
                data.value.forEach(node => {
                    node.children.forEach(child => {
                        handleID2NodeInfoMap(child.label)
                    })
                    handleID2NodeInfoMap(node.label)
                })
                weiboData.value.push(data.value[0])
            })
        })
        return {
            data,
            props,
            loading,
            id2NodeInfo,
            handleID2NodeInfoMap,
            handleSelect,
            weiboData,
            handleLongText,
            num2String,
            filterForm,
            doFilter,
            getSentimentDesc
        }
    }
})
</script>

<style>
.el-menu-item-height: 36px
</style>
