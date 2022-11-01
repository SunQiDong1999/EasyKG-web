<template>
    <div>
        <page-header title="项目列表">
            <el-space>
                <el-button round @click="createDialog.visible=true">
                    <template #icon>
                        <el-icon>
                            <svg-icon name="add" />
                        </el-icon>
                    </template>
                    新建项目
                </el-button>
                <el-input />
            </el-space>
        </page-header>
        <page-main>
            <el-row :gutter="6">
                <el-col v-for="project in projectPage.projectList" :key="project.id" :span="6">
                    <el-card shadow="hover">
                        <template #header>
                            <div class="card-header">
                                <div>
                                    <span>{{ project.name }}</span>
                                    <br>
                                    <span style="font-size: 10px; color: #6d737b;">{{ project.description }}</span>
                                </div>
                                <el-space>
                                    <el-button class="button" text @click="toOverview(project.id)">进入</el-button>
                                    <el-button class="button" text @click="deleteProject(project.id)">删除</el-button>
                                </el-space>
                            </div>
                        </template>
                        <el-descriptions :column="1" border>
                            <el-descriptions-item align="center">
                                <template #label>
                                    <span>实体标签数</span>
                                </template>
                                <span style="font-size: 30px;">
                                    {{ project.labelNum }}
                                </span>
                                <span>
                                    个
                                </span>
                            </el-descriptions-item>
                            <el-descriptions-item align="center">
                                <template #label>
                                    <span>关系类型数</span>
                                </template>
                                <span style="font-size: 30px;">
                                    {{ project.typeNum }}
                                </span>
                                <span>
                                    个
                                </span>
                            </el-descriptions-item>
                            <el-descriptions-item align="center">
                                <template #label>
                                    <span>图谱数</span>
                                </template>
                                <span style="font-size: 30px;">
                                    {{ project.graphNum }}
                                </span>
                                <span>
                                    个
                                </span>
                            </el-descriptions-item>
                            <el-descriptions-item align="center">
                                <template #label>
                                    <span>模型数</span>
                                </template>
                                <span style="font-size: 30px;">
                                    {{ project.modelNum }}
                                </span>
                                <span>
                                    个
                                </span>
                            </el-descriptions-item>
                        </el-descriptions>
                    </el-card>
                </el-col>
            </el-row>
        </page-main>
        <el-dialog
            v-model="createDialog.visible" title="新建项目" :draggable="createDialog.draggable"
            :center="createDialog.center"
        >
            <el-form v-model="createForm">
                <el-form-item label="项目名称">
                    <el-input v-model="createForm.name" />
                </el-form-item>
                <el-form-item label="项目描述">
                    <el-input v-model="createForm.description" type="textarea" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">新建</el-button>
                    <el-button @click="createDialog.visible = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import { defineComponent, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { createProject, deleteProjectById, getProjects } from '@/api/project'

export default defineComponent({
    name: 'Index',
    setup() {
        const router = useRouter()
        const createDialog = reactive({
            visible: false,
            draggable: false,
            center: true
        })
        const createForm = reactive({
            name: '',
            description: ''
        })

        const project = reactive({
            projectList: []
        })

        const toOverview = id => {
            localStorage.setItem('projectId', id)
            router.push({ name: 'overview' })
        }

        const deleteProject = id => {
            deleteProjectById(id).then(() => {
                getProjectList()
            })
        }

        const onSubmit = () => {
            createProject(createForm).then(() => {
                createDialog.visible = false
                getProjectList()
                console.log(project.projectList)
            }
            )
        }

        const getProjectList = () => {
            getProjects().then(res => {
                project.projectList = res.data
            })
        }

        onMounted(() => {
            getProjectList()
        })

        return {
            router,
            createDialog,
            createForm,
            projectPage: project,
            onSubmit,
            toOverview,
            deleteProject
        }
    }
})
</script>

<style scoped>
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.text {
    font-size: 14px;
}
.item {
    margin-bottom: 18px;
}
.box-card {
    width: 480px;
}
.el-row {
    margin-bottom: 20px;
}
.el-row:last-child {
    margin-bottom: 0;
}
.el-col {
    border-radius: 4px;
}
</style>
