<template>
    <div>
        <page-header :title="project.name">
            <template #content>
                {{ project.description }}
            </template>
            <el-space>
                <el-button round @click="createGraphClick">
                    <template #icon>
                        <el-icon>
                            <svg-icon name="add" />
                        </el-icon>
                    </template>
                    新增图谱
                </el-button>
            </el-space>
        </page-header>
        <page-main>
            <el-container>
                <el-table
                    :data="graphs.list"
                    :header-cell-style="{'text-align': 'center'}"
                    :cell-style="{'text-align': 'center'}"
                    highlight-current-row
                >
                    <template #empty>
                        <span>暂无图谱数据，请点击右上角按钮新增图谱</span>
                    </template>
                    <el-table-column prop="name" label="图谱名称" />
                    <el-table-column prop="entityNum" label="实体数" width="80px" />
                    <el-table-column prop="relationNum" label="关系数" width="80px" />
                    <el-table-column prop="subgraphNum" label="子图数" width="80px" />
                    <el-table-column prop="accessedTime" label="上次访问时间" />
                    <el-table-column prop="description" label="图谱描述" />
                    <el-table-column label="操作">
                        <template #default="scope">
                            <el-tooltip content="上传数据" effect="light" :hide-after="0">
                                <el-button link @click="uploadDialogOpen(scope.row.id)">
                                    <template #icon>
                                        <el-icon>
                                            <svg-icon name="upload" />
                                        </el-icon>
                                    </template>
                                </el-button>
                            </el-tooltip>
                            <el-tooltip content="列表视图" effect="light" :hide-after="0">
                                <el-button link @click="toTableview(scope.row.id)">
                                    <template #icon>
                                        <el-icon @click="scope">
                                            <svg-icon name="tablevis" />
                                        </el-icon>
                                    </template>
                                </el-button>
                            </el-tooltip>
                            <el-tooltip content="图谱视图" effect="light" :hide-after="0">
                                <el-button link @click="toGraphview(scope.row.id)">
                                    <template #icon>
                                        <el-icon @click="scope">
                                            <svg-icon name="graphvis" />
                                        </el-icon>
                                    </template>
                                </el-button>
                            </el-tooltip>
                            <el-tooltip content="导出数据" effect="light" :hide-after="0">
                                <el-button link>
                                    <template #icon>
                                        <el-icon @click="scope">
                                            <svg-icon name="download" />
                                        </el-icon>
                                    </template>
                                </el-button>
                            </el-tooltip>
                            <el-tooltip content="子图管理" effect="light" :hide-after="0">
                                <el-button link @click="createSubGraphClick(scope.row.id, scope.row.name)">
                                    <template #icon>
                                        <el-icon @click="scope">
                                            <svg-icon name="addSubgraph2" />
                                        </el-icon>
                                    </template>
                                </el-button>
                            </el-tooltip>
                            <el-tooltip content="删除" effect="light" :hide-after="0">
                                <el-button link @click="deleteGraph(project.id, scope.row.id)">
                                    <template #icon>
                                        <el-icon @click="scope">
                                            <svg-icon name="delete" />
                                        </el-icon>
                                    </template>
                                </el-button>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                </el-table>
            </el-container>
        </page-main>
        <el-dialog
            v-model="createDialog.visible"
            title="新增图谱"
            :draggable="createDialog.draggable"
            :center="createDialog.center"
            @close="createDialogClose"
        >
            <el-form v-model="createForm">
                <el-form-item label="图谱名称">
                    <el-input v-model="createForm.name" />
                </el-form-item>
                <el-form-item label="图谱描述">
                    <el-input v-model="createForm.description" type="textarea" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="createGraphSubmit">新增</el-button>
                    <el-button @click="createDialog.visible = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog
            v-model="createSubGraphDialog.visible"
            title="子图管理"
            :draggable="createSubGraphDialog.draggable"
            :center="createSubGraphDialog.center"
            width="70%"
            @close="SubGraphDialogClose"
        >
            <el-space>
                <span>{{ createSubGraphDialog.graph }}</span>
                <el-button round @click="createSubAddClick">
                    <template #icon>
                        <el-icon>
                            <svg-icon name="add" />
                        </el-icon>
                    </template>
                    新增子图
                </el-button>
                <el-dialog
                    v-model="createSubAddDialog.visible"
                    title="新增子图"
                    :draggable="createSubAddDialog.draggable"
                    :center="createSubAddDialog.center"
                    @close="SubAddDialogClose"
                >
                    <el-form v-model="createSubGraphForm">
                        <el-form-item label="子图名称">
                            <el-input v-model="createSubGraphForm.name" />
                        </el-form-item>
                        <el-form-item label="子图描述">
                            <el-input v-model="createSubGraphForm.description" type="textarea" />
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="createSubGraphSubmit">新增</el-button>
                            <el-button @click="createSubAddDialog.visible = false">取消</el-button>
                        </el-form-item>
                    </el-form>
                </el-dialog>
            </el-space>
            <el-container>
                <el-table
                    :data="subGraphs.list"
                    :header-cell-style="{'text-align': 'center'}"
                    :cell-style="{'text-align': 'center'}"
                    highlight-current-row
                >
                    <template #empty>
                        <span>暂无图谱数据，请点击右上角按钮新增子图</span>
                    </template>
                    <el-table-column prop="name" label="子图名称" />
                    <el-table-column prop="entityNum" label="实体数" width="80px" />
                    <el-table-column prop="relationNum" label="关系数" width="80px" />
                    <el-table-column prop="description" label="子图描述" />
                    <el-table-column label="操作">
                        <template #default="scope">
                            <el-button link @click="tosubgraphview(scope.row.graphId, scope.row.id)">
                                <template #icon>
                                    <el-icon @click="scope">
                                        <svg-icon name="graphvis" />
                                    </el-icon>
                                </template>
                            </el-button>
                            <el-button link>
                                <template #icon>
                                    <el-icon @click="scope">
                                        <svg-icon name="download" />
                                    </el-icon>
                                </template>
                            </el-button>
                            <el-tooltip content="删除" effect="light" :hide-after="0">
                                <el-button link @click="deleteSubGraph(scope.row.graphId, scope.row.id)">
                                    <template #icon>
                                        <el-icon @click="scope">
                                            <svg-icon name="delete" />
                                        </el-icon>
                                    </template>
                                </el-button>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                </el-table>
            </el-container>
        </el-dialog>
        <el-dialog
            v-model="uploadDialog.visible"
            title="上传图谱数据"
            :draggable="uploadDialog.draggable"
            :center="uploadDialog.center"
            @close="uploadDialogClose"
        >
            <file-upload
                :files="uploadDialog.files"
                action="#"
                @on-success="uploadSuccess"
                @http-request="upload"
            />
        </el-dialog>
    </div>
</template>

<script>

import { defineComponent } from 'vue'
import { onMounted, reactive } from 'vue'
import { createGraph, getGraphs, getProjectById, deleteGraphById } from '@/api/project'
import { ElMessage } from 'element-plus'
import { uploadGraphData, createSubGraph, getSubgraphs, deleteSubGraphById } from '@/api/graph'
import { useRouter } from 'vue-router/dist/vue-router'

export default defineComponent({
    name: 'Index',
    setup() {
        // 当前项目信息
        const project = reactive({
            id: Number,
            name: '',
            description: ''
        })
        // 图谱列表
        const graphs = reactive({
            list: []
        })

        // 子图列表
        const subGraphs = reactive({
            list: []
        })

        // 新增实体标签、关系类型的对话框相关变量
        const createDialog = reactive({
            visible: false,
            draggable: false,
            center: true
        })

        // 新增实体标签、关系类型的表单
        const createForm = reactive({
            projectId: project.id,
            name: '',
            description: ''
        })
        const createSubGraphForm = reactive({
            GraphId: -1,
            name: '',
            description: ''
        })

        // 呼出新增本体的对话框
        const createGraphClick = () => {
            createDialog.visible = true
            createForm.projectId = project.id
            console.log(createForm)
        }

        // 唤出子图管理的对话框
        const createSubGraphClick = (id, name) => {
            createSubGraphDialog.visible = true
            createSubGraphDialog.graph = name
            createSubGraphForm.GraphId = id
            getSubgraphs(id).then(res => {
                subGraphs.list = res.data
            })
            console.log(id)
        }
        const createSubAddDialog = reactive({
            visible: false,
            draggable: true,
            center: true
        })
        const createSubAddClick = () => {
            createSubAddDialog.visible = true
        }

        const SubAddDialogClose = () => {
            createSubGraphForm.name = ''
            createSubGraphForm.description = ''
        }

        // 新增实体标签、关系类型的对话框相关变量
        const createSubGraphDialog = reactive({
            visible: false,
            draggable: false,
            center: true,
            graph: null,
            id: -1
        })

        const SubGraphDialogClose = () => {
            createSubGraphForm.GraphId = -1
        }

        // 新增本体对话框关闭
        const createDialogClose = () => {
            createForm.name = ''
            createForm.description = ''
        }

        // 新增本体
        const createGraphSubmit = () => {
            console.log(createForm)
            createGraph(project.id, createForm).then(res => {
                if (res.code === 1000) {
                    ElMessage({
                        message: '新增图谱成功',
                        type: 'success'
                    })
                }
                createDialog.visible = false
                getGraphs(project.id).then(res => {
                    graphs.list = res.data
                })
                createDialog.visible = false
            })
        }

        // 新增子图
        const createSubGraphSubmit = () => {
            createSubGraph(createSubGraphForm.GraphId, createSubGraphForm).then(res => {
                if (res.code === 1000) {
                    ElMessage({
                        message: '新增子图成功',
                        type: 'success'
                    })
                }
                getGraphs(project.id).then(res => {
                    graphs.list = res.data
                })
                getSubgraphs(createSubGraphForm.GraphId).then(res => {
                    subGraphs.list = res.data
                })
                // getSubgraphs
                createSubAddDialog.visible = false

            })
            console.log(createSubGraphForm)
        }

        // 删除图谱
        const deleteGraph = (projectId, id) => {
            deleteGraphById(projectId, id).then(() => {
                getGraphs(project.id).then(res => {
                    graphs.list = res.data
                })
            })
        }

        // 删除子图
        const deleteSubGraph = (graphId, id) => {
            deleteSubGraphById(graphId, id).then(() => {
                getSubgraphs(graphId).then(res => {
                    subGraphs.list = res.data
                })
                getGraphs(project.id).then(res => {
                    graphs.list = res.data
                })
            })

        }

        // 上传数据
        const uploadDialog = reactive({
            visible: false,
            draggable: false,
            center: true,
            files: []
        })
        const uploadDialogOpen = id => {
            uploadDialog.visible = true
            uploadDialog.graphId = id
        }
        const uploadDialogClose = () => {
            console.log('清空')
        }
        const upload = param => {
            const formData = new FormData()
            formData.append('file', param.file)
            uploadGraphData(uploadDialog.graphId, formData).then(res => {
                console.log('上传成功' + res.code)
                uploadDialog.files = []
                uploadDialog.visible = false
                getGraphList()
            }).catch(res => {
                console.log('上传失败' + res.code)
            })
        }
        const uploadSuccess = (res, file, fileList) => {
            if (res.error === '') {
                uploadDialog.files.push({
                    name: file.name,
                    url: res.error === '' ? res.data.path : ''
                })
            } else {
                fileList.pop()
                ElMessage.warning(res.error)
            }
        }

        const getGraphList = () => {
            getGraphs(project.id).then(res => {
                graphs.list = res.data
                console.log(graphs.list)
            })
        }

        const router = useRouter()

        const toTableview = id => {
            router.push({
                name: 'tableview',
                params: {
                    id: id
                }
            })
        }

        const toGraphview = id => {
            router.push({
                name: 'graphview',
                params: {
                    id: id
                }
            })
        }

        const tosubgraphview = (graphId, id) => {
            console.log(graphId)
            console.log(id)
            router.push({
                name: 'subgraphview',
                params: {
                    id: graphId,
                    subgraphId: id
                }
            })
        }

        onMounted(() => {
            // 从本体存储中读取出projectId
            const projectId = localStorage.getItem('projectId')
            getProjectById(projectId).then(res => {
                project.id = res.data.id
                project.name = res.data.name
                project.description = res.data.description
                project.labelNum = res.data.labelNum
                project.typeNum = res.data.typeNum
                project.graphNum = res.data.graphNum
                project.modelNum = res.data.modelNum
                getGraphList()
            })
        })

        return {
            project,
            graphs,
            subGraphs,
            createSubGraphForm,
            createDialog,
            createSubAddClick,
            createSubGraphDialog,
            createSubAddDialog,
            SubGraphDialogClose,
            SubAddDialogClose,
            createSubGraphSubmit,
            createForm,
            createGraphClick,
            createSubGraphClick,
            createDialogClose,
            createGraphSubmit,
            deleteGraph,
            uploadDialog,
            uploadDialogOpen,
            uploadDialogClose,
            upload,
            uploadSuccess,
            toTableview,
            toGraphview,
            tosubgraphview,
            deleteSubGraph
        }
    }
})
</script>
