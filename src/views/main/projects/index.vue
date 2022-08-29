<template>
    <div>
        <page-header title="项目列表">
            <el-button round>
                <template #icon>
                    <el-icon>
                        <svg-icon name="ep:arrow-left"/>
                    </el-icon>
                </template>
                返回
            </el-button>
        </page-header>
        <page-main>
            <el-row :gutter="12" v-for="r in 2" :key="r">
                <el-col :span="6" v-for="c in 4" :key="c">
                    <el-card shadow="hover">
                        <template #header>
                            <div class="card-header">
                                <span>示例项目{{ 4 * (r - 1) + c }}</span>
                                <el-button class="button" text @click="toDashboard()">进入</el-button>
                            </div>
                        </template>
                        <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div>
                    </el-card>
                </el-col>
            </el-row>
            
        </page-main>
    </div>
</template>

<script>
export default {
    name: 'Index'
}

function toDashboard() {

}

toDashboard() {

}
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
