<template>
    <div>
        <page-header :title="project.name">
            <template #content>
                {{ project.description }}
            </template>
        </page-header>
        <page-main>
            <el-container>
                <el-main>
                    <el-descriptions :column="1" border>
                        <el-descriptions-item align="center">
                            <template #label>
                                <span>实体标签数</span>
                            </template>
                            <span style="font-size: 30px">
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
                            <span style="font-size: 30px">
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
                            <span style="font-size: 30px">
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
                            <span style="font-size: 30px">
                                {{ project.modelNum }}
                            </span>
                            <span>
                                个
                            </span>
                        </el-descriptions-item>
                    </el-descriptions>
                </el-main>
            </el-container>
        </page-main>
    </div>
</template>

<script>
import { defineComponent, onMounted, reactive } from 'vue'
import { getProjectById } from '@/api/project'

export default defineComponent({
    name: 'Index',
    setup() {
        const project = reactive({
            name: '',
            description: ''
        })
        onMounted(() => {
            const projectId = localStorage.getItem('projectId')
            getProjectById(projectId).then(res => {
                project.name = res.data.name
                project.description = res.data.description
                project.labelNum = res.data.labelNum
                project.typeNum = res.data.typeNum
                project.graphNum = res.data.graphNum
                project.modelNum = res.data.modelNum
            })
        })
        return {
            project
        }
    }
})
</script>

<style scoped>

</style>
