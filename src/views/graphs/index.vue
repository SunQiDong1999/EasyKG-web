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
                            <el-button link>
                                <template #icon>
                                    <el-icon @click="scope">
                                        <svg-icon name="upload" />
                                    </el-icon>
                                </template>
                            </el-button>
                            <el-button link>
                                <template #icon>
                                    <el-icon @click="scope">
                                        <svg-icon name="tablevis" />
                                    </el-icon>
                                </template>
                            </el-button>
                            <el-button link>
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
                            <el-button link>
                                <template #icon>
                                    <el-icon @click="scope">
                                        <svg-icon name="delete" />
                                    </el-icon>
                                </template>
                            </el-button>
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
    </div>
</template>

<script>

import { defineComponent } from 'vue'
import { onMounted, reactive } from 'vue'
import { getGraphs, getProjectById } from '@/api/project'
import { createGraph } from '@/api/graph'
import { ElMessage } from 'element-plus'

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

        // 呼出新增本体的对话框
        const createGraphClick = () => {
            createDialog.visible = true
            createForm.projectId = project.id
            console.log(createForm)
        }

        // 新增本体对话框关闭
        const createDialogClose = () => {
            createForm.name = ''
            createForm.description = ''
        }

        // 新增本体
        const createGraphSubmit = () => {
            console.log(createForm)
            createGraph(createForm).then(res => {
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
            })
            getGraphs(projectId).then(res => {
                graphs.list = res.data
                console.log(graphs.list)
            })
        })

        return {
            project,
            graphs,
            createDialog,
            createForm,
            createGraphClick,
            createDialogClose,
            createGraphSubmit
        }
    }
})
</script>

<style scoped>
.inline-block {
    display: inline-block;
}
</style>
