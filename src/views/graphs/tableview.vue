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
                        <el-button link @click="dialogVisible.dialog1=true">
                            <template #icon>
                                <el-icon>
                                    <svg-icon name="ep:search" />
                                </el-icon>
                            </template>
                        </el-button>
                    </el-space>
                    <el-dialog v-model="dialogVisible.dialog1" title="实体查询">
                        实体标签：<el-select
                            v-model="entityQueryForm.label"
                            style="width: 50%;"
                            disabled
                            @change="entityQueryLabelChange()"
                        >
                            <el-option v-for="label in labelsOptions.list" :key="label.name" :label="label.name" :value="label.name" />
                        </el-select>
                        <el-divider />
                        <el-descriptions border column="1">
                            <el-descriptions-item
                                v-for="(attribute, index) in entityQueryForm.attributes"
                                :key="attribute.name"
                                :label="attribute.nameZh + '（' + attribute.name + '）'"
                                align="center"
                            >
                                <el-space>
                                    <el-select v-model="entityQueryForm.operators[index]">
                                        <el-option
                                            v-for="condition in entityQueryForm.conditions[index]"
                                            :key="condition" :value="condition"
                                        />
                                    </el-select>
                                    <el-input v-model="entityQueryForm.values[index]" />
                                </el-space>
                            </el-descriptions-item>
                        </el-descriptions>
                        <el-divider />
                        <el-button @click="entityQuery()">
                            查询
                        </el-button>
                    </el-dialog>
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
                        <el-button link @click="dialogVisible.dialog2=true">
                            <template #icon>
                                <el-icon>
                                    <svg-icon name="ep:search" />
                                </el-icon>
                            </template>
                        </el-button>
                    </el-space>
                    <el-dialog v-model="dialogVisible.dialog2" title="关系查询">
                        关系标签：<el-select
                            v-model="relationQueryForm.type"
                            style="width: 50%;"
                            disabled
                            @change="relationQueryLabelChange()"
                        >
                            <el-option v-for="label in typesOptions.list" :key="label.name" :label="label.name" :value="label.name" />
                        </el-select>
                        <el-divider />
                        <el-descriptions border column="1">
                            <el-descriptions-item
                                v-for="(attribute, index) in relationQueryForm.attributes"
                                :key="attribute.name"
                                :label="attribute.nameZh + '（' + attribute.name + '）'"
                                align="center"
                            >
                                <el-space>
                                    <el-select v-model="relationQueryForm.operators[index]">
                                        <el-option
                                            v-for="condition in relationQueryForm.conditions[index]"
                                            :key="condition" :value="condition"
                                        />
                                    </el-select>
                                    <el-input v-model="relationQueryForm.values[index]" />
                                </el-space>
                            </el-descriptions-item>
                        </el-descriptions>
                        <el-divider />
                        <el-button @click="relationQuery()">
                            查询
                        </el-button>
                    </el-dialog>
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
import {
    getEntitiesQuery,
    getGraphById,
    getLabelAttributeMap,
    getLabelTableData, getRelationsQuery,
    getTypeAttributeMap,
    getTypeTableData
} from '@/api/graph'
import { getLabels, getTypes } from '@/api/project'

export default defineComponent({
    name: 'Tableview',
    setup() {

        const dialogVisible = reactive({
            dialog1: false,
            dialog2: false
        })

        const activeName = ref('entity')
        const router = useRouter()
        const graphId = router.currentRoute.value.params.id
        const graph = reactive({
            labelAttributeMap: Map,
            typeAttributeMap: Map
        })
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
        const entityQueryForm = reactive({
            label: '',
            attributes: [],
            conditions: [],
            operators: [],
            values: []
        })
        const query = reactive({
            entity: '',
            relation: ''
        })
        const entityQueryLabelChange = () => {
            entityQueryForm.label = labelValue.name
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

        const entityQuery = () => {
            query.entity = ''
            query.relation = ''
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
            dataList.pagination.page = 1
            pageChange()
        }

        const relationQueryForm = reactive({
            type: '',
            attributes: [],
            conditions: [],
            operators: [],
            values: []
        })

        const relationQueryLabelChange = () => {
            relationQueryForm.type = typeValue.name
            relationQueryForm.attributes = graph.typeAttributeMap[relationQueryForm.type]
            relationQueryForm.operators = []
            relationQueryForm.values = []
            let newRelationsAtts = relationQueryForm.attributes.filter(item => {
                return item.name === 'sourceId' || item.name === 'targetId'
            })
            relationQueryForm.attributes = newRelationsAtts
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

        const relationQuery = () => {
            query.entity = ''
            query.relation = ''
            let queryList = []
            relationQueryForm.attributes.forEach((attribute, index) => {
                if (relationQueryForm.operators[index] !== undefined && relationQueryForm.values[index] !== undefined && relationQueryForm.values[index] !== '') {
                    if (attribute.type === 1 ||  attribute.type === 2) {
                        if (attribute.name === 'sourceId') {
                            queryList.push('s.' + attribute.name + ' ' + relationQueryForm.operators[index] + ' ' + relationQueryForm.values[index])
                        } else if (attribute.name === 'targetId') {
                            queryList.push('t.' + attribute.name + ' ' + relationQueryForm.operators[index] + ' ' + relationQueryForm.values[index])
                        }

                    }
                }
            })
            query.entity = queryList[0]
            for (let i = 1; i < queryList.length; i++) {
                query.entity += ' and ' + queryList[i]
            }
            dataList.pagination.page = 1
            pageChange()
        }

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
            query.entity = ''
            query.relation = ''
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
            entityQueryLabelChange()
        }
        const pageChange = () => {
            if (activeName.value === 'entity') {
                if (query.entity.length === 0) {
                    getLabelTableData(graphId, labelValue.name, dataList.pagination.size, dataList.pagination.page).then(res => {
                        dataList.pagination.size = res.data.size
                        dataList.pagination.total = res.data.total
                        dataList.list = [...res.data.data]
                    })
                } else if (query.entity.length !== 0) {
                    getEntitiesQuery(graphId, entityQueryForm.label, dataList.pagination.size, dataList.pagination.page, query.entity).then(res => {
                        dataList.pagination.size = res.data.size
                        dataList.pagination.total = res.data.total
                        dataList.list = [...res.data.data]
                        Array.from(new Set(dataList.list))
                    })
                }

            } else {
                if (query.relation.length === 0) {
                    getTypeTableData(graphId, typeValue.name, dataList.relationPagination.size, dataList.relationPagination.page).then(res => {

                        dataList.relationPagination.total = res.data.total
                        dataList.relationList = [...res.data.data]
                        console.log(res.data)
                    })
                } else if (query.relation.length !== 0) {
                    getRelationsQuery(graphId, entityQueryForm.label, dataList.pagination.size, dataList.pagination.page, query.entity).then(res => {
                        dataList.relationPagination.total = res.data.total
                        dataList.relationList = [...res.data.data]
                        console.log(res.data)
                        Array.from(new Set(dataList.relationList))
                    })
                }
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
            relationQueryLabelChange()
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
            getLabelAttributeMap(graphId).then(res => {
                graph.labelAttributeMap = res.data
            })
            getTypeAttributeMap(graphId).then(res => {
                graph.typeAttributeMap = res.data
            })

        })
        return {
            relationQuery,
            relationQueryLabelChange,
            entityQuery,
            entityQueryLabelChange,
            entityQueryForm,
            relationQueryForm,
            dialogVisible,
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
