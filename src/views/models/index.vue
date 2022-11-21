<template>
    <div>
        <page-header :title="project.name">
            <template #content>
                {{ project.description }}
            </template>
            <el-space>
                <el-button round @click="createModelClick">
                    <template #icon>
                        <el-icon>
                            <svg-icon name="add" />
                        </el-icon>
                    </template>
                    新增模型
                </el-button>
            </el-space>
        </page-header>
        <page-main>
            <el-row :gutter="6">
                <el-col v-for="model in modelList" :key="model.id" :span="6">
                    <el-card shadow="hover">
                        <el-row align="middle" justify="center">
                            <el-col :span="12">
                                <div class="card-header">
                                    <div>
                                        <el-badge v-if="model.isConnected" is-dot type="success" class="item">
                                            {{ model.name }}
                                        </el-badge>
                                        <el-badge v-else is-dot type="danger" class="item">
                                            <span>{{ model.name }}</span>
                                        </el-badge>
                                        <br>
                                        <span style="font-size: 10px; color: #6d737b;">{{ model.description }}</span>
                                    </div>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <el-progress type="dashboard" :percentage="model.percentage" :color="colors" />
                            </el-col>
                        </el-row>
                        <el-divider />
                        <el-row justify="center">
                            <el-space size="large">
                                <el-button link @click="testModelConnected(model.id)">
                                    <template #icon>
                                        <el-icon>
                                            <svg-icon name="refresh" />
                                        </el-icon>
                                    </template>
                                </el-button>
                                <el-button link @click="uploadModelData(model.id, model.inputType)">
                                    <template #icon>
                                        <el-icon>
                                            <svg-icon name="upload" />
                                        </el-icon>
                                    </template>
                                </el-button>
                                <el-button link @click="runModel(model.id)">
                                    <template #icon>
                                        <el-icon>
                                            <svg-icon name="start" />
                                        </el-icon>
                                    </template>
                                </el-button>
                                <el-button link @click="viewResult(model.id, model.resultType)">
                                    <template #icon>
                                        <el-icon>
                                            <svg-icon name="eye" />
                                        </el-icon>
                                    </template>
                                </el-button>
                                <el-button link @click="download(model.id)">
                                    <template #icon>
                                        <el-icon>
                                            <svg-icon name="download" />
                                        </el-icon>
                                    </template>
                                </el-button>
                                <el-button link>
                                    <template #icon>
                                        <el-icon>
                                            <svg-icon name="cancel-1" />
                                        </el-icon>
                                    </template>
                                </el-button>
                                <el-button link>
                                    <template #icon>
                                        <el-icon>
                                            <svg-icon name="delete" />
                                        </el-icon>
                                    </template>
                                </el-button>
                            </el-space>
                        </el-row>
                    </el-card>
                </el-col>
            </el-row>
        </page-main>
        <el-dialog
            v-model="createDialog.visible"
            title="新增模型"
            :draggable="createDialog.draggable"
            :center="createDialog.center"
            @close="createDialogClose"
        >
            <el-form v-model="createForm">
                <el-form-item label="模型名称">
                    <el-input v-model="createForm.name" />
                </el-form-item>
                <el-form-item label="模型描述">
                    <el-input v-model="createForm.description" type="textarea" />
                </el-form-item>
                <el-form-item label="输入来源">
                    <el-select v-model="createForm.inputType">
                        <el-option :value="0" label="上传文件" />
                        <el-option :value="1" label="图谱数据" />
                    </el-select>
                </el-form-item>
                <el-form-item label="结果类型">
                    <el-select v-model="createForm.resultType">
                        <el-option :value="0" label="图谱数据（JSON）" />
                    </el-select>
                </el-form-item>
                <el-form-item label="url" label-width="60px">
                    <el-input v-model="createForm.url" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="createModelSubmit">新增</el-button>
                    <el-button @click="createDialog.visible = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog
            v-model="uploadDialog.visible"
            title="上传数据"
            :draggable="uploadDialog.draggable"
            :center="uploadDialog.center"
            @close="uploadDialogClose"
        >
            <file-upload
                :files="uploadDialog.files"
                action="#"
                :ext="['json', 'xlsx']"
                @on-success="uploadSuccess"
                @http-request="upload"
            />
        </el-dialog>
        <el-dialog
            v-model="resultDialog.visible"
            title="结果展示"
            :draggable="resultDialog.draggable"
            :center="resultDialog.center"
        >
            <el-card v-if="resultDialog.type === 0" shadow="never">
                <json-viewer
                    :value="resultDialog.data"
                    copyable
                    boxed
                />
            </el-card>
        </el-dialog>
    </div>
</template>

<script>
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { createModel, getModels, getProjectById } from '@/api/project'
import { ElMessage } from 'element-plus'
import { downloadResult, fileUpload, getResult, progress, run, testConnected } from '@/api/model'

export default defineComponent({
    name: 'Index',
    setup() {
        // 当前项目信息
        const project = reactive({
            id: Number,
            name: '',
            description: ''
        })

        const colors = [
            { color: '#f56c6c', percentage: 20 },
            { color: '#e6a23c', percentage: 40 },
            { color: '#5cb87a', percentage: 60 },
            { color: '#1989fa', percentage: 80 },
            { color: '#6f7ad3', percentage: 100 }
        ]

        // 新增模型对话框相关变量
        const createDialog = reactive({
            visible: false,
            draggable: false,
            center: true
        })

        // 新增模型的表单
        const createForm = reactive({
            projectId: project.id,
            name: '',
            description: ''

        })

        // 呼出新增本体的对话框
        const createModelClick = () => {
            createDialog.visible = true
            createForm.projectId = project.id
        }

        // 新增本体对话框关闭
        const createDialogClose = () => {
            createForm.name = ''
            createForm.description = ''
        }

        const modelList = ref()

        // 新增模型
        const createModelSubmit = () => {
            console.log(createForm)
            createModel(project.id, createForm).then(res => {
                if (res.code === 1000) {
                    ElMessage({
                        message: '新增模型成功',
                        type: 'success'
                    })
                    createDialog.visible = false
                }
            })
        }

        // 检测模型连通性
        const testModelConnected = id => {
            testConnected(id).then(res => {
                if (res.code === 1000) {
                    ElMessage({
                        message: '连接成功',
                        type: 'success'
                    })
                }
                refreshModelList()
            }
            ).catch(() => {
                refreshModelList()
            }
            )
        }

        // 为模型选择数据
        const uploadModelData = (id, inputType) => {
            if (inputType === 0) {
                uploadDialogOpen(id)
            }
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
            uploadDialog.modelId = id
        }
        const uploadDialogClose = () => {
            console.log('清空')
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

        const upload = param => {
            const formData = new FormData()
            formData.append('file', param.file)
            fileUpload(uploadDialog.modelId, formData).then(res => {
                uploadDialog.files = []
                uploadDialog.visible = false
                if (res.code === 1000) {
                    ElMessage({
                        message: '上传成功',
                        type: 'success'
                    })
                }
            }).catch(res => {
                console.log('上传失败' + res.code)
            })
        }

        const runModel = id => {
            run(id).then(res => {
                if (res.code === 1000) {
                    ElMessage({
                        message: '运行成功',
                        type: 'success'
                    })
                }
                const model = modelList.value.find(model => {
                    return model.id === id
                })
                model.percentage = 0
                const timer = setInterval(() => {
                    progress(id).then(res => {
                        model.percentage = res.data
                        console.log('轮询结果', model.percentage)
                        if (model.percentage === 100) {
                            clearInterval(timer)
                        }
                    })
                }, 1000)
            })
        }

        const refreshModelList = () => {
            getModels(project.id).then(res => {
                res.data.forEach(model => {
                    console.log(model)
                    if (model.isCompleted) {
                        model.percentage = 100
                    } else {
                        model.percentage = 0
                    }
                })
                modelList.value = [...res.data]
            })
        }

        const viewResult = (id, resultType) => {
            getResult(id).then(res => {
                resultDialog.visible = true
                resultDialog.type = resultType
                resultDialog.data = res.data
            })
        }

        const download = id => {
            downloadResult(id).then(res => {
                console.log(res)
            })
        }

        // 新增模型对话框相关变量
        const resultDialog = reactive({
            visible: false,
            draggable: false,
            center: true
        })

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
                refreshModelList()
            })
        })

        return {
            project,
            createForm,
            createDialog,
            createModelClick,
            createDialogClose,
            createModelSubmit,
            modelList,
            testModelConnected,
            uploadModelData,
            uploadDialog,
            uploadDialogClose,
            uploadSuccess,
            upload,
            runModel,
            colors,
            viewResult,
            resultDialog,
            download
        }
    }
})
</script>

<style scoped>
.item {
    margin-top: 10px;
    margin-right: 40px;
}
</style>
