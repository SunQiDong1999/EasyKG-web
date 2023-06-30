<template>
    <div>
        <page-header :title="graph.name">
            <template #content>
                {{ graph.description }}
            </template>
        </page-header>
        <page-main>
            <el-container>
                <el-main>
                    <el-card shadow="never">
                        <el-skeleton :rows="4" animated :loading="loading">
                            <template #default>
                                <el-tree-v2
                                    :data="data"
                                    :props="props"
                                    :height="550"
                                    style="font-size: 15px"
                                >
                                    <template #default="{ node }">
                                        {{ handleID2NodeInfoMap(node.label) }}
                                        <span v-if="id2NodeInfo.map[node.key].type ==='[TopicTag]'">
                                            类别：{{ id2NodeInfo.map[node.key].name }}
                                        </span>
                                        <span v-else-if="id2NodeInfo.map[node.key].type === '[WeiboTag]'">
                                            话题：{{ id2NodeInfo.map[node.key].name }}
                                        </span>
                                        <span v-else-if="id2NodeInfo.map[node.key].type === '[Weibo]'">
                                            <span style="width: 100px">文本：{{ id2NodeInfo.map[node.key].text }}</span><br>
                                            <span>是否隐喻：{{ id2NodeInfo.map[node.key].has_irony }}</span><br>
                                            <span>是否讽刺：{{ id2NodeInfo.map[node.key].has_metaphor }}</span><br>
                                            <span>情感：{{ id2NodeInfo.map[node.key].sentiment }}</span>
                                        </span>
                                    </template>
                                </el-tree-v2>
                            </template>
                        </el-skeleton>
                    </el-card>
                </el-main>
            </el-container>
        </page-main>
    </div>
</template>

<script>
import { defineComponent, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router/dist/vue-router'
import {
    getEntitiesQuery,
    getGraphById,
    getLabelAttributeMap,
    getLabelTableData, getRelationsQuery, getTreeList,
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
                    } else if (attribute.type === 1 || attribute.type === 2) {
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
                } else if (attribute.type === 1 || attribute.type === 2) {
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

        const data = ref([])

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
            getTreeList(graphId).then(res => {
                data.value = res.data
                loading.value = false
                console.log(id2NodeInfo.map)
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
            query,
            data,
            props,
            loading,
            id2NodeInfo,
            handleID2NodeInfoMap
        }
    }
})
</script>

<style lang="scss" scoped>
::v-deep.el-descriptions__content{
    max-width: 500px;
}
</style>
