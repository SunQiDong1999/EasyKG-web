<template>
    <div>
        <page-header title="军事话题" />
        <page-main>
            <el-container>
                <el-header>
                    <el-form :inline="true" :model="filterForm">
                        <el-form-item label="文本">
                            <el-input v-model="filterForm.weibo" />
                        </el-form-item>
                        <el-form-item label="是否讽刺">
                            <el-select v-model="filterForm.hasIrony">
                                <el-option label="是" :value="true" />
                                <el-option label="否" :value="false" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="是否隐喻">
                            <el-select v-model="filterForm.hasMetaphor">
                                <el-option label="是" :value="true" />
                                <el-option label="否" :value="false" />
                            </el-select>
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
                        <el-menu-item v-for="(weiboTag, index) in data" :key="index" style="height: 36px" :index="index.toString()">{{ index + 1 }}.#{{ id2NodeInfo.map[weiboTag.id].name }}#</el-menu-item>
                    </el-menu>
                </el-aside>
                <el-main style="max-height: 500px">
                    <el-collapse :accordion="true">
                        <el-collapse-item v-for="(weibo, index) in weiboData" :key="index" :name="index" :title="parseInt(index + 1) + '.' +handleLongText(id2NodeInfo.map[weibo.id].text)">
                            <el-descriptions column="1">
                                <el-descriptions-item label="文&ensp;&ensp;&ensp;&ensp;本">{{ id2NodeInfo.map[weibo.id].text }}</el-descriptions-item>
                                <el-descriptions-item label="图&ensp;&ensp;&ensp;&ensp;片">
                                    <el-space wrap>
                                        <el-image
                                            v-for="(sr, index) in id2NodeInfo.map[weibo.id].imgs"
                                            :key="index"
                                            style="width: 100px; height: 100px"
                                            fit="fill"
                                            :preview-src-list="['src/assets/images/' + sr]"
                                            :src="'src/assets/images/' + sr"
                                        />
                                    </el-space>
                                </el-descriptions-item>
                                <el-descriptions-item label="是否隐喻">
                                    {{
                                        num2String(id2NodeInfo.map[weibo.id].has_irony)
                                    }}
                                </el-descriptions-item>
                                <el-descriptions-item label="是否讽刺">
                                    {{
                                        num2String(id2NodeInfo.map[weibo.id].has_metaphor)
                                    }}
                                </el-descriptions-item>
                                <el-descriptions-item label="情&ensp;&ensp;&ensp;&ensp;感">
                                    <el-descriptions column="10" border>
                                        <el-descriptions-item v-for="(v,k) in id2NodeInfo.map[weibo.id].qinggan" :key="k" :label="k">{{ getSentimentDesc(v) + '(' + v +')' }}</el-descriptions-item>
                                    </el-descriptions>
                                </el-descriptions-item>
                            </el-descriptions>
                        </el-collapse-item>
                    </el-collapse>
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
            console.log(nodeInfo.id)
            if (nodeInfo.sentiment != null && nodeInfo.sentiment.length > 0) {
                nodeInfo.qinggan = JSON.parse(nodeInfo.sentiment.replaceAll('\'', '"').replaceAll('：', ':').replaceAll('None', '0'))
            }
            nodeInfo.imgs = eval(nodeInfo.originalImg)
            id2NodeInfo.map[nodeInfo.id] = nodeInfo
        }

        const handleSelect = index => {
            weiboData.value = []
            for (let i = 0; i < data.value[parseInt(index)].children.length; i++) {
                const weibo = id2NodeInfo.map[data.value[parseInt(index)].children[i].id]
                if (filterForm.weibo.length > 0 && weibo.text.split(filterForm.weibo).length <= 1) {
                    continue
                }
                if (filterForm.hasIrony != null) {
                    if (num2Bool(weibo.has_irony) !== filterForm.hasIrony) {
                        continue
                    }
                }
                if (filterForm.hasMetaphor != null) {
                    if (num2Bool(weibo.has_metaphor) !== filterForm.hasMetaphor) {
                        continue
                    }
                }
                weiboData.value.push(data.value[parseInt(index)].children[i])
            }
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
                for (let i = 0; i < node.children.length; i++) {
                    const weibo = id2NodeInfo.map[node.children[i].id]
                    if (filterForm.weibo.length > 0 && weibo.text.split(filterForm.weibo).length <= 1) {
                        continue
                    }
                    if (filterForm.hasIrony != null) {
                        if (num2Bool(weibo.has_irony) !== filterForm.hasIrony) {
                            continue
                        }
                    }
                    if (filterForm.hasMetaphor != null) {
                        if (num2Bool(weibo.has_metaphor) !== filterForm.hasMetaphor) {
                            continue
                        }
                    }
                    newData.push(node)
                    break
                    
                }
            })
            data.value = newData
        }

        onMounted(() => {
            getTreeList(graphId, 1, 0, 0, 0, '').then(res => {
                data.value = res.data[0].children
                allData.value = res.data[0].children
                loading.value = false
                data.value.forEach(node => {
                    node.children.forEach(child => {
                        handleID2NodeInfoMap(child.label)
                    })
                    handleID2NodeInfoMap(node.label)
                })
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
