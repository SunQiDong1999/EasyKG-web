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
                        <el-select v-model="entityQueryForm.label" class="m-2" placeholder="选择本体类型" @change="elSelectHandle(entityQueryForm)">
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
                        <el-button round @click="dialogVisible.dialog1=true">
                            <template #icon>
                                <el-icon>
                                    <svg-icon name="search" />
                                </el-icon>
                            </template>
                            查询实体
                        </el-button>
                    </el-space>
                    <el-dialog v-model="dialogVisible.dialog1" title="实体查询">
                        实体标签：<el-select
                            v-model="entityQueryForm.label"
                            style="width: 50%;"
                            disabled
                            @change="entityQueryLabelChange(entityQueryForm)"
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
                        <el-select v-model="typeValue.name" class="m-2" placeholder="选择关系类型" @change="elSelectTypeHandle">
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
                            新增关系
                        </el-button>
                        <el-button round @click="dialogVisible.dialog2=true">
                            <template #icon>
                                <el-icon>
                                    <svg-icon name="search" />
                                </el-icon>
                            </template>
                            查询关系
                        </el-button>
                    </el-space>
                    <el-dialog v-model="dialogVisible.dialog2" title="关系查询">
                        <el-divider />
                        <el-collapse accordion>
                            <el-collapse-item title="关系" name="relation">
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
                            </el-collapse-item>
                            <el-collapse-item title="源实体" name="source">
                                源实体标签：
                                <el-select
                                    v-model="query.relation.source.label"
                                    style="width: 50%;"
                                    @change="entityQueryLabelChange(query.relation.source)"
                                >
                                    <el-option
                                        v-for="label in labelsOptions.list" :key="label.name"
                                        :label="label.name" :value="label.name"
                                    />
                                </el-select>
                                <el-divider />
                                <el-descriptions border column="1">
                                    <el-descriptions-item
                                        v-for="(attribute, index) in query.relation.source.attributes"
                                        :key="attribute.name"
                                        :label="attribute.nameZh + '（' + attribute.name + '）'"
                                        align="center"
                                    >
                                        <el-space>
                                            <el-select v-model="query.relation.source.operators[index]">
                                                <el-option
                                                    v-for="condition in query.relation.source.conditions[index]"
                                                    :key="condition" :value="condition"
                                                />
                                            </el-select>
                                            <el-input v-model="query.relation.source.values[index]" />
                                        </el-space>
                                    </el-descriptions-item>
                                </el-descriptions>
                            </el-collapse-item>
                            <el-collapse-item title="目标实体" name="target">
                                目标实体标签：
                                <el-select
                                    v-model="query.relation.target.label"
                                    style="width: 50%;"
                                    @change="entityQueryLabelChange(query.relation.target)"
                                >
                                    <el-option
                                        v-for="label in labelsOptions.list" :key="label.name"
                                        :label="label.name" :value="label.name"
                                    />
                                </el-select>
                                <el-divider />
                                <el-descriptions border column="1">
                                    <el-descriptions-item
                                        v-for="(attribute, index) in query.relation.target.attributes"
                                        :key="attribute.name"
                                        :label="attribute.nameZh + '（' + attribute.name + '）'"
                                        align="center"
                                    >
                                        <el-space>
                                            <el-select v-model="query.relation.target.operators[index]">
                                                <el-option
                                                    v-for="condition in query.relation.target.conditions[index]"
                                                    :key="condition" :value="condition"
                                                />
                                            </el-select>
                                            <el-input v-model="query.relation.target.values[index]" />
                                        </el-space>
                                    </el-descriptions-item>
                                </el-descriptions>
                            </el-collapse-item>
                        </el-collapse>
                        <el-divider />
                        <el-button @click="relationQuery()">
                            查询
                        </el-button>
                    </el-dialog>
                    <p />
                    <el-table
                        ref="table" :data="filterRelationTableData" border stripe highlight-current-row
                        @selection-change="selectionRelationDataList = $event"
                        @expand-change="getHeadListByLabel"
                    >
                        <el-table-column type="expand">
                            <template #default="props">
                                <el-card>
                                    <h3>源实体</h3>
                                    <el-table :data="props.row.sourceNode" border stripe highlight-current-row>
                                        <template v-for="item in tableHeadNames.sourceNodeHeadList" :key="item.id">
                                            <el-table-column :prop="item.name" :label="item.nameZh" />
                                        </template>
                                    </el-table>
                                </el-card>
                                <el-card>
                                    <h3>目标实体</h3>
                                    <el-table :data="props.row.targetNode" border stripe highlight-current-row>
                                        <template v-for="item in tableHeadNames.targetNodeHeadList" :key="item.id">
                                            <el-table-column :prop="item.name" :label="item.nameZh" />
                                        </template>
                                    </el-table>
                                </el-card>
                            </template>
                        </el-table-column>
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
                    layout="sizes, prev, pager, next"
                    :total="dataList.pagination.total"
                    @size-change="pageChange"
                    @current-change="pageChange"
                />
                <el-pagination
                    v-if="activeName==='relation'"
                    v-model:page-size="dataList.relationPagination.size"
                    v-model:current-page="dataList.relationPagination.page"
                    layout="sizes, prev, pager, next"
                    :total="dataList.relationPagination.total"
                    @size-change="pageChange"
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
        // const labelValue = reactive({
        //     name: ''
        // })
        const typesOptions = reactive({
            list: []
        })
        const typeValue = reactive({
            name: ''
        })
        const tableHeadNames = reactive({
            list: [],
            relationHeadList: [],
            sourceNodeHeadList: [],
            targetNodeHeadList: []
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
            // entityQueryForm.label = labelValue.name
            if (entityQueryForm.label.length > 0) {
                entityQueryForm.attributes = graph.labelAttributeMap[entityQueryForm.label]
                entityQueryForm.operators = []
                entityQueryForm.values = []
                entityQueryForm.attributes.forEach((attribute, index) => {
                    if (attribute.type === 0) {
                        entityQueryForm.conditions[index] = ['=', '=~']
                    } else if (attribute.type === 1 || attribute.type === 2) {
                        entityQueryForm.conditions[index] = ['>', '>=', '=', '<=', '<']
                    } else if (attribute.type === 3) {
                        entityQueryForm.conditions[index] = ['=']
                    } else if (attribute.type === 4) {
                        entityQueryForm.conditions[index] = ['>', '>=', '=', '<=', '<']
                    } else if (attribute.type === 5) {
                        entityQueryForm.conditions[index] = ['contains']
                    }
                })
            } else {
                entityQueryForm.attributes = []
                entityQueryForm.operators = []
                entityQueryForm.values = []
                entityQueryForm.conditions = []
            }
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
            // let newRelationsAtts = relationQueryForm.attributes.filter(item => {
            //     return item.name === 'sourceId' || item.name === 'targetId'
            // })
            // relationQueryForm.attributes = newRelationsAtts
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
                    } else if (attribute.type === 1 || attribute.type === 2) {
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
                    } else if (attribute.type === 1 || attribute.type === 2) {
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
                    } else if (attribute.type === 1 || attribute.type === 2) {
                        queryList.push('t.' + attribute.name + ' ' + query.relation.target.operators[index] + ' ' + query.relation.target.values[index])
                    }
                }
            })

            if (queryList[0] !== undefined) {
                query.relation.r = queryList[0]
            }
            for (let i = 1; i < queryList.length; i++) {
                query.relation.r += ' and ' + queryList[i]
            }
            console.log(query.relation.r)
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
        const elSelectHandle = entityQueryForm => {
            query.entity = ''
            query.relation.r = ''
            getLabelAttributeMap(graphId).then(res => {
                const map = res.data
                tableHeadNames.list = map[entityQueryForm.label]
                console.log(tableHeadNames.list)
            })
            getLabelTableData(graphId, entityQueryForm.label, dataList.pagination.size, 1).then(res => {
                dataList.pagination.size = res.data.size
                dataList.pagination.total = res.data.total
                dataList.list = [...res.data.data]
                console.log(res.data)
            })
            entityQueryLabelChange(entityQueryForm)
        }
        const pageChange = () => {
            if (activeName.value === 'entity') {
                if (query.entity.length === 0) {
                    getLabelTableData(graphId, entityQueryForm.label, dataList.pagination.size, dataList.pagination.page).then(res => {
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

            } else if (activeName.value === 'relation') {
                if (query.relation.r.length === 0) {
                    getTypeTableData(graphId, typeValue.name, dataList.relationPagination.size, dataList.relationPagination.page).then(res => {
                        dataList.relationPagination.size = res.data.size
                        dataList.relationPagination.total = res.data.total
                        dataList.relationList = [...res.data.data]
                        console.log(res.data)
                    })
                } else if (query.relation.r.length !== 0) {
                    getRelationsQuery(graphId, relationQueryForm.type, dataList.relationPagination.size, dataList.relationPagination.page, query.relation.r, query.relation.source.label, query.relation.target.label).then(res => {
                        dataList.relationPagination.total = res.data.total
                        dataList.relationPagination.size = res.data.size
                        dataList.relationList = [...res.data.data]
                        console.log('************')
                        console.log(res.data)
                        console.log('****************')
                        Array.from(new Set(dataList.relationList))
                    })
                }
            }

        }

        const elSelectTypeHandle = name => {
            console.log(name)
            query.entity = ''
            query.relation.r = ''
            getTypeAttributeMap(graphId).then(res => {
                const map = res.data
                tableHeadNames.relationHeadList = map[name]
                console.log(tableHeadNames.relationHeadList)
            })
            getTypeTableData(graphId, typeValue.name, dataList.relationPagination.size, 1).then(res => {
                dataList.relationPagination.total = res.data.total
                dataList.relationList = [...res.data.data]
                console.log(dataList.relationList)
            })
            relationQueryLabelChange()
        }

        const getHeadListByLabel = (row, expandedRows) => {
            console.log(row)
            console.log(expandedRows)
            getLabelAttributeMap(graphId).then(res => {
                const map = res.data
                tableHeadNames.sourceNodeHeadList = map[row.sourceNode[0].labels[0]]
                tableHeadNames.targetNodeHeadList = map[row.targetNode[0].labels[0]]
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
            typeValue,
            elSelectHandle,
            pageChange,
            elSelectTypeHandle,
            selectionRelationDataList,
            filterRelationTableData,
            getHeadListByLabel,
            query
        }
    }
})
</script>
