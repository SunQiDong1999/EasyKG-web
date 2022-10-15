<template>
    <div>
        <page-header :title="project.name">
            <template #content>
                {{ project.description }}
            </template>
            <el-space>
                <el-button round @click="createOntologyClick(0, project.baseEntityId)">
                    <template #icon>
                        <el-icon>
                            <svg-icon name="add" />
                        </el-icon>
                    </template>
                    新增实体标签
                </el-button>
                <el-button round @click="createOntologyClick(1, project.baseRelationId)">
                    <template #icon>
                        <el-icon>
                            <svg-icon name="add" />
                        </el-icon>
                    </template>
                    新增关系类型
                </el-button>
            </el-space>
        </page-header>
        <page-main>
            <el-container>
                <el-aside>
                    <el-menu
                        unique-opened
                        @select="selectOntology"
                    >
                        <el-sub-menu index="labels">
                            <template #title>
                                <span>实体标签</span>
                            </template>
                            <el-menu-item v-for="label in labels.list" :key="label.id" :index="label.id.toString()">
                                <span>{{ label.name }}</span>
                            </el-menu-item>
                        </el-sub-menu>
                        <el-sub-menu index="types">
                            <template #title>
                                <span>关系类型</span>
                            </template>
                            <el-menu-item v-for="type in types.list" :key="type.id" :index="type.id.toString()">
                                <span>{{ type.name }}</span>
                            </el-menu-item>
                        </el-sub-menu>
                    </el-menu>
                </el-aside>
                <el-container>
                    <el-header style="text-align: right; font-size: 12px">
                        <div class="toolbar">
                            <el-space>
                                <el-button type="primary" round @click="onSubmit">保存</el-button>
                                <el-button round @click="deleteOntologySubmit">删除</el-button>
                            </el-space>
                        </div>
                    </el-header>
                    <el-main>
                        <el-container>
                            <el-main>
                                <el-card shadow="never">
                                    <template #header>
                                        <div>
                                            <span>继承关系图</span>
                                        </div>
                                    </template>
                                </el-card>
                            </el-main>
                        </el-container>
                        <el-container>
                            <el-main>
                                <el-form v-model="ontologyForm">
                                    <el-card shadow="never">
                                        <template #header>
                                            <div>
                                                <span>详细信息</span>
                                            </div>
                                        </template>
                                        <el-form-item label="名称">
                                            <el-input v-model="ontologyForm.name" style="width: 50%" />
                                        </el-form-item>
                                        <el-form-item v-if="ontologyForm.type === 0" label="父类">
                                            <el-select v-model="ontologyForm.parentId" style="width: 50%">
                                                <el-option v-for="label in labels.list" :key="label.id" :label="label.name" :value="label.id" />
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item v-if="ontologyForm.type === 1" label="父类">
                                            <el-select v-model="ontologyForm.parentId" style="width: 50%">
                                                <el-option v-for="type in types.list" :key="type.id" :label="type.name" :value="type.id" />
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="描述">
                                            <el-input v-model="ontologyForm.description" style="width: 50%" />
                                        </el-form-item>
                                        <el-table
                                            :data="ontologyForm.attributes"
                                            highlight-current-row
                                        >
                                            <template #empty>
                                                <span v-if="ontologyForm.id === -1">请点击</span>
                                                <el-button v-if="ontologyForm.id !== -1">
                                                    <template #icon>
                                                        <el-icon @click="addRow(-1)">
                                                            <svg-icon name="add" />
                                                        </el-icon>
                                                    </template>
                                                </el-button>
                                            </template>
                                            <el-table-column prop="name" label="属性名称">
                                                <template #default="scope">
                                                    <el-input v-model="scope.row.name" />
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="type" label="属性类型">
                                                <template #default="scope">
                                                    <el-select v-model="scope.row.type">
                                                        <el-option v-for="option in attributeTypeOptions" :key="option.value" :label="option.label" :value="option.value" />
                                                    </el-select>
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="nameZh" label="属性中文名">
                                                <template #default="scope">
                                                    <el-input v-model="scope.row.nameZh" />
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="description" label="属性描述">
                                                <template #default="scope">
                                                    <el-input v-model="scope.row.description" />
                                                </template>
                                            </el-table-column>
                                            <el-table-column label="操作">
                                                <template #default="scope">
                                                    <el-button link>
                                                        <template #icon>
                                                            <el-icon @click="deleteRow(scope.$index)">
                                                                <svg-icon name="delete" />
                                                            </el-icon>
                                                        </template>
                                                    </el-button>
                                                    <el-button v-if="scope.$index === ontologyForm.attributes.length - 1" link>
                                                        <template #icon>
                                                            <el-icon @click="addRow(0)">
                                                                <svg-icon name="add" />
                                                            </el-icon>
                                                        </template>
                                                    </el-button>
                                                </template>
                                            </el-table-column>
                                        </el-table>
                                    </el-card>
                                </el-form>
                            </el-main>
                        </el-container>
                    </el-main>
                </el-container>
            </el-container>
        </page-main>
        <el-dialog
            v-model="createDialog.visible"
            title="新增本体"
            :draggable="createDialog.draggable"
            :center="createDialog.center"
            @close="createDialogClose"
        >
            <el-form v-model="createForm">
                <el-form-item label="本体名称">
                    <el-input v-model="createForm.name" />
                </el-form-item>
                <el-form-item label="本体描述">
                    <el-input v-model="createForm.description" type="textarea" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="createOntologySubmit">新增</el-button>
                    <el-button @click="createDialog.visible = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import { defineComponent, onMounted, reactive } from 'vue'
import {createOntology, deleteOntology, getLabels, getProjectById, getTypes} from '@/api/project'
import { getOntologyById, updateOntology } from '@/api/ontology'
import { ElMessage } from 'element-plus'

export default defineComponent({
    name: 'Index',
    setup() {
        // 属性类型的选项
        const attributeTypeOptions = [
            { value: 0, label: 'string' },
            { value: 1, label: 'integer' },
            { value: 2, label: 'float' },
            { value: 3, label: 'boolean' },
            { value: 4, label: 'datetime' },
            { value: 5, label: 'list' },
            { value: 6, label: 'map' }
        ]

        // 当前项目信息
        const project = reactive({
            id: Number,
            name: '',
            description: '',
            // base实体标签id
            baseEntityId: Number,
            // base关系类型id
            baseRelationId: Number
        })

        // 当前项目的实体标签
        const labels = reactive({
            list: []
        })
        // 当前项目的关系类型
        const types = reactive({
            list: []
        })

        // 本体表单，用于本体的update
        const ontologyForm = reactive({
            id: -1,
            projectId: -1,
            name: '',
            type: -1,
            parentId: -1,
            description: '',
            createdTime: '',
            attributes: [],
            // 删除的属性列表
            deleteList: []
        })

        // 选中本体，对本体信息进行展示
        const selectOntology = index => {
            // 根据id获取本体信息
            getOntologyById(index).then(res => {
                ontologyForm.id = res.data.id
                ontologyForm.projectId = res.data.projectId
                ontologyForm.name = res.data.name
                ontologyForm.type = res.data.type
                ontologyForm.parentId = res.data.parentId
                ontologyForm.description = res.data.description
                ontologyForm.createdTime = res.data.createdTime
                ontologyForm.attributes = res.data.attributes
            })
        }

        // 保存本体事件
        const onSubmit = () => {
            updateOntology(ontologyForm).then(res => {
                if (res.code === 1000) {
                    ElMessage({
                        message: '保存成功',
                        type: 'success'
                    })
                }
                selectOntology(ontologyForm.id)
            })
        }

        // 删除本体事件
        const deleteOntologySubmit = () => {
            deleteOntology(project.id, ontologyForm.id).then(res => {
                if (res.code === 1000) {
                    ElMessage({
                        message: '删除成功',
                        type: 'success'
                    })
                }
                selectOntology(ontologyForm.parentId)
                // 重新获取labels和types列表
                getLabels(project.id).then(res => {
                    labels.list = [...res.data]
                })
                getTypes(project.id).then(res => {
                    types.list = [...res.data]
                })
            })
        }

        // 添加一条属性
        const addRow = index => {
            console.log(index)
            ontologyForm.attributes.splice(index + 1, 0, {
                id: -1,
                ontologyId: ontologyForm.id,
                name: '',
                type: 0,
                nameZh: '',
                description: ''
            })
        }

        // 删除一条属性
        const deleteRow = index => {
            const deleteAttribute = ontologyForm.attributes.splice(index, 1)[0]
            if (deleteAttribute.id !== -1) {
                // 加入到删除列表
                ontologyForm.deleteList.push(deleteAttribute.id)
            }
        }

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
            type: 0,
            parentId: project.baseEntityId,
            description: ''
        })

        // 呼出新增本体的对话框
        const createOntologyClick = (type, baseId) => {
            createDialog.visible = true
            createForm.projectId = project.id
            createForm.type = type
            createForm.parentId = baseId
        }

        // 新增本体对话框关闭
        const createDialogClose = () => {
            createForm.name = ''
            createForm.description = ''
        }

        // 新增本体
        const createOntologySubmit = () => {
            console.log(createForm)
            createOntology(project.id, createForm).then(res => {
                if (res.code === 1000) {
                    ElMessage({
                        message: '新增本体成功',
                        type: 'success'
                    })
                }
                // 重新获取labels和types列表
                getLabels(project.id).then(res => {
                    labels.list = [...res.data]
                })
                getTypes(project.id).then(res => {
                    types.list = [...res.data]
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
                getLabels(projectId).then(res => {
                    labels.list = [...res.data]
                    project.baseEntityId = labels.list[0].id
                })
                getTypes(projectId).then(res => {
                    types.list = [...res.data]
                    project.baseRelationId = types.list[0].id
                })
            })
        })
        return {
            project,
            labels,
            types,
            ontologyForm,
            attributeTypeOptions,
            createDialog,
            createForm,
            selectOntology,
            onSubmit,
            addRow,
            deleteRow,
            createOntologyClick,
            createOntologySubmit,
            createDialogClose,
            deleteOntologySubmit
        }
    }
})
</script>

<style scoped>
.toolbar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    right: 20px;
}
</style>
