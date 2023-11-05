<template>
    <div>
        <page-header title="政治人物" />
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
                    <el-menu title="话题" :default-active="'0'" @select="handleSelect">
                        <el-menu-item v-for="(weiboTag, index) in data" :key="index" style="height: 36px" :index="index.toString()">{{ (pagination.page - 1) * pagination.size + index + 1 }}.{{ id2NodeInfo.map[weiboTag.id].name }}</el-menu-item>
                    </el-menu>
                </el-aside>
                <el-main style="max-height: 500px">
                    <el-descriptions v-for="(weibo, index) in weiboData" :key="index" column="1">
                        <el-descriptions-item v-if="id2NodeInfo.map[weibo.id].type === '[Politicians]'" label="名&ensp;&ensp;&ensp;&ensp;称">{{ id2NodeInfo.map[weibo.id].name }}</el-descriptions-item>
                        <el-descriptions-item v-if="id2NodeInfo.map[weibo.id].type === '[Politicians]'" label="中文名称">{{ id2NodeInfo.map[weibo.id].cnName }}</el-descriptions-item>
                        <el-descriptions-item v-if="id2NodeInfo.map[weibo.id].type === '[Politicians]'" label="英文名称">{{ id2NodeInfo.map[weibo.id].enName }}</el-descriptions-item>
                        <el-descriptions-item v-if="id2NodeInfo.map[weibo.id].type === '[Image]'" label="图&ensp;&ensp;&ensp;&ensp;片">
                            <el-image
                                :src="'src/assets/images' +id2NodeInfo.map[weibo.id].image"
                                fit="fill"
                                style="width: 100px; height: 100px"
                                :preview-src-list="['src/assets/images' +id2NodeInfo.map[weibo.id].image]"
                            />
                        </el-descriptions-item>
                        <el-descriptions-item v-if="id2NodeInfo.map[weibo.id].type === '[Politicians]'" label="描&ensp;&ensp;&ensp;&ensp;述">{{ id2NodeInfo.map[weibo.id].des }}</el-descriptions-item>
                        <el-descriptions-item v-if="id2NodeInfo.map[weibo.id].type === '[Nation]'" label="国&ensp;&ensp;&ensp;&ensp;籍">{{ id2NodeInfo.map[weibo.id].name }}({{ id2NodeInfo.map[weibo.id].enName }})</el-descriptions-item>
                        <el-descriptions-item v-if="id2NodeInfo.map[weibo.id].type === '[Nation]'" label="国籍编码">{{ id2NodeInfo.map[weibo.id].code }}</el-descriptions-item>
                        <el-descriptions-item v-if="id2NodeInfo.map[weibo.id].type === '[Alias]'" label="别&ensp;&ensp;&ensp;&ensp;称">{{ id2NodeInfo.map[weibo.id].name }}</el-descriptions-item>
                        <el-descriptions-item v-if="id2NodeInfo.map[weibo.id].type === '[Position]'" label="职&ensp;&ensp;&ensp;&ensp;务">{{ id2NodeInfo.map[weibo.id].name }}</el-descriptions-item>
                    </el-descriptions>
                </el-main>
            </el-container>
        </page-main>
        <fixed-action-bar>
            <el-pagination
                v-model:page-size="pagination.size"
                v-model:current-page="pagination.page"
                layout="sizes, prev, pager, next"
                :total="98045"
                @size-change="pageChange"
                @current-change="pageChange"
            />
        </fixed-action-bar>
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
            console.log(data.value[parseInt(index)])
            weiboData.value.push(...data.value[parseInt(index)].children)
            console.log(weiboData.value)
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

        const filterForm = reactive({
            weibo: '',
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
            pagination.page = 1
            pageChange()
        }

        const pagination = reactive({
            size: 100,
            page: 1
        })

        const pageChange = () => {
            data.value = []
            getTreeList(graphId, 3, -1, pagination.page, 100, filterForm.weibo).then(res => {
                data.value = res.data
                console.log(data.value)
                allData.value = res.data
                data.value.forEach(node => {
                    node.children.forEach(child => {
                        handleID2NodeInfoMap(child.label)
                    })
                    handleID2NodeInfoMap(node.label)
                })
                console.log(id2NodeInfo.map)
                handleSelect('0')
            })
        }

        onMounted(() => {
            getTreeList(graphId, 3, -1, 1, 100, '').then(res => {
                data.value = res.data
                console.log(data.value)
                allData.value = res.data
                data.value.forEach(node => {
                    node.children.forEach(child => {
                        handleID2NodeInfoMap(child.label)
                    })
                    handleID2NodeInfoMap(node.label)
                })
                handleSelect('0')
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
            getSentimentDesc,
            pagination,
            pageChange
        }
    }
})
</script>

<style>
.el-menu-item-height: 36px
</style>
