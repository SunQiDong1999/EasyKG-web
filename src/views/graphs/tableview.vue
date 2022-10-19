<template>
    <div>
        <page-header :title="graph.name">
            <template #content>
                {{ graph.description }}
            </template>
        </page-header>
        <page-main>
            <el-tabs
                type="card"
            >
                <el-tab-pane label="实体列表" name="entity">
                    <batch-action-bar :data="dataList" :selection-data="selectionDataList" @check-all="$refs.table.toggleAllSelection()" @check-null="$refs.table.clearSelection()">
                        <el-button size="default">单个批量操作按钮</el-button>
                        <el-button-group>
                            <el-button size="default">批量操作按钮组1</el-button>
                            <el-button size="default">批量操作按钮组2</el-button>
                        </el-button-group>
                    </batch-action-bar>
                    <el-table ref="table" :data="dataList" border stripe highlight-current-row @selection-change="selectionDataList = $event">
                        <el-table-column type="selection" width="40" />
                        <el-table-column prop="date" label="日期" width="180" />
                        <el-table-column prop="name" label="姓名" width="180" />
                        <el-table-column prop="address" label="地址" />
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="关系列表" name="relation" />
            </el-tabs>
        </page-main>
    </div>
</template>

<script>
import { defineComponent, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router/dist/vue-router'
import { getGraphById } from '@/api/graph'

export default defineComponent({
    name: 'Tableview',
    setup() {
        const router = useRouter()
        const graphId = router.currentRoute.value.params.id
        const graph = reactive({})

        onMounted(() => {
            getGraphById(graphId).then(res => {
                graph.id = res.data.id
                graph.name = res.data.name
                graph.description = res.data.description
            })
        })
        return {
            graph
        }
    }
})
</script>

<style scoped>

</style>
