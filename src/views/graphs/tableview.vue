<template>
    <div>
        <page-header :title="graph.name">
            <template #content>
                {{ graph.description }}
            </template>
        </page-header>
        <page-main>
            <el-tabs
                v-model="activeName"
                type="card"
            >
                <el-tab-pane label="实体列表" name="entity">
                    <el-space>
                        <el-select v-model="labelValue.name" class="m-2" placeholder="选择本体类型" @change="elSelectHandle">
                            <el-option
                                v-for="label in labelsOptions.list"
                                :key="label.id"
                                :label="label.name"
                                :value="label.name"
                            />
                        </el-select>
                        <el-button round @click="createOntologyClick(0, project.baseEntityId)">
                            <template #icon>
                                <el-icon>
                                    <svg-icon name="add" />
                                </el-icon>
                            </template>
                            新增实体
                        </el-button>
                        <el-input v-model="search.entity" size="default" placeholder="输入id/名称查找实体" />
                    </el-space>
                    <p />
                    <el-table ref="table" :data="filterTableData" border stripe highlight-current-row @selection-change="selectionDataList = $event">
                        <el-table-column type="selection" width="40" />
                        <template v-for="item in tableHeadNames.list" :key="item.id">
                            <el-table-column :prop="item.name" :label="item.nameZh" />
                        </template>
                        <el-table-column align="right" width="150">
                            <template #default="scope">
                                <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
                                    Edit
                                </el-button>
                                <el-button
                                    size="small"
                                    type="danger"
                                    @click="handleDelete(scope.$index, scope.row)"
                                >
                                    Delete
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="关系列表" name="relation">
                    <el-space>
                        <el-select v-model="typeValue.name" class="m-2" placeholder="选择本体类型" @change="elSelectTypeHandle">
                            <el-option
                                v-for="label in typesOptions.list"
                                :key="label.id"
                                :label="label.name"
                                :value="label.name"
                            />
                        </el-select>
                        <el-button round @click="createOntologyClick(0, project.baseEntityId)">
                            <template #icon>
                                <el-icon>
                                    <svg-icon name="add" />
                                </el-icon>
                            </template>
                            新增实体
                        </el-button>
                        <el-input v-model="search.relation" size="default" placeholder="输入id/名称查找实体" />
                    </el-space>
                    <p />
                    <el-table ref="table" :data="filterRelationTableData" border stripe highlight-current-row @selection-change="selectionRelationDataList = $event">
                        <el-table-column type="selection" width="40" />
                        <template v-for="item in tableHeadNames.relationHeadList" :key="item.id">
                            <el-table-column :prop="item.name" :label="item.nameZh" />
                        </template>
                        <el-table-column align="right" width="150">
                            <template #default="scope">
                                <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
                                    Edit
                                </el-button>
                                <el-button
                                    size="small"
                                    type="danger"
                                    @click="handleDelete(scope.$index, scope.row)"
                                >
                                    Delete
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs>
        </page-main>
        <fixed-action-bar>
            <el-space>
                <el-pagination
                    v-if="activeName==='entity'"
                    v-model:page-size="dataList.pagination.size"
                    v-model:current-page="dataList.pagination.page"
                    layout="prev, pager, next"
                    :total="dataList.pagination.total"
                    @current-change="pageChange"
                />
                <el-pagination
                    v-if="activeName==='relation'"
                    v-model:page-size="dataList.relationPagination.size"
                    v-model:current-page="dataList.relationPagination.page"
                    layout="prev, pager, next"
                    :total="dataList.relationPagination.total"
                    @current-change="pageChange"
                />
            </el-space>
        </fixed-action-bar>
    </div>
</template>

<script>
import { defineComponent, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router/dist/vue-router'
import { getGraphById, getLabelAttributeMap, getLabelTableData, getTypeAttributeMap, getTypeTableData } from '@/api/graph'
import { getLabels, getTypes } from '@/api/project'

export default defineComponent({
    name: 'Tableview',
    setup() {
        const activeName = ref('entity')
        const router = useRouter()
        const graphId = router.currentRoute.value.params.id
        const graph = reactive({})
        const search = reactive({
            entity: '',
            relation: ''
        })
        const labelsOptions = reactive({
            list: []
        })
        const labelValue = reactive({
            name: ''
        })
        const typesOptions = reactive({
            list: []
        })
        const typeValue = reactive({
            name: ''
        })
        const tableHeadNames = reactive({
            list: [],
            relationHeadList: []
        }
        )
        const dataList = reactive({
            pagination: {
                size: 10,
                page: 1,
                total: -1
            },
            list: [],
            relationPagination: {
                size: 10,
                page: 1,
                total: -1
            },
            relationList: []
        })
        const selectionDataList = reactive([])
        const filterTableData = computed(() =>
            dataList.list.filter(
                data =>
                    !search.entity ||
                    data.name.toLowerCase().includes(search.entity.toLowerCase()) || data.id === parseInt(search.entity)
            )
        )
        const handleEdit = (index, row) => {
            console.log(index, row)
        }
        const handleDelete = (index, row) => {
            console.log(index, row)
        }
        const elSelectHandle = name => {
            console.log(name)
            getLabelAttributeMap(graphId).then(res => {
                const map = res.data
                tableHeadNames.list = map[name]
                console.log(tableHeadNames.list)
            })
            getLabelTableData(graphId, labelValue.name, dataList.pagination.size, 1).then(res => {
                dataList.pagination.size = res.data.size
                dataList.pagination.total = res.data.total
                dataList.list = [...res.data.data]
                console.log(res.data)
            })
        }
        const pageChange = () => {
            if (activeName.value === 'entity') {
                getLabelTableData(graphId, labelValue.name, dataList.pagination.size, dataList.pagination.page).then(res => {
                    dataList.pagination.size = res.data.size
                    dataList.pagination.total = res.data.total
                    dataList.list = [...res.data.data]
                })
            } else {
                getTypeTableData(graphId, typeValue.name, dataList.relationPagination.size, dataList.relationPagination.page).then(res => {

                    dataList.relationPagination.total = res.data.total
                    dataList.relationList = [...res.data.data]
                    console.log(res.data)
                })
            }

        }

        const elSelectTypeHandle = name => {
            console.log(name)
            getTypeAttributeMap(graphId).then(res => {
                const map = res.data
                tableHeadNames.relationHeadList = map[name]
                console.log(tableHeadNames.relationHeadList)
            })
            getTypeTableData(graphId, typeValue.name, dataList.relationPagination.size, 1).then(res => {
                dataList.relationPagination.total = res.data.total
                dataList.relationList = [...res.data.data]
                console.log(res.data)
            })
        }
        const selectionRelationDataList = reactive([])
        const filterRelationTableData = computed(() =>
            dataList.relationList.filter(
                data =>
                    !search.relation ||
                    data.id === parseInt(search.relation)
            )
        )

        onMounted(() => {
            const projectId = localStorage.getItem('projectId')
            getGraphById(graphId).then(res => {
                graph.id = res.data.id
                graph.name = res.data.name
                graph.description = res.data.description
            })
            getLabels(projectId).then(res => {
                labelsOptions.list = [...res.data]
            })
            getTypes(projectId).then(res => {
                typesOptions.list = [...res.data]
            })

        })
        return {
            activeName,
            graph,
            tableHeadNames,
            search,
            dataList,
            filterTableData,
            selectionDataList,
            handleEdit,
            handleDelete,
            labelsOptions,
            typesOptions,
            labelValue,
            typeValue,
            elSelectHandle,
            pageChange,
            elSelectTypeHandle,
            selectionRelationDataList,
            filterRelationTableData

        }
    }
})
</script>

<style scoped>

</style>
