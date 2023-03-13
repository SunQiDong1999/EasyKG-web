<script setup name="FileUpload">
import { ref } from 'vue'

const props = defineProps({
    action: {
        type: String,
        required: true
    },
    headers: {
        type: Object,
        default: () => {}
    },
    data: {
        type: Object,
        default: () => {}
    },
    name: {
        type: String,
        default: 'file'
    },
    size: {
        type: Number,
        default: 100
    },
    max: {
        type: Number,
        default: 1
    },
    files: {
        type: Array,
        default: () => []
    },
    notip: {
        type: Boolean,
        default: false
    },
    ext: {
        type: Array,
        default: () => ['json']
    }
})

const emit = defineEmits(['on-success', 'http-request', 'on-change'])

function beforeUpload(file) {
    const fileName = file.name.split('.')
    const fileExt = fileName[fileName.length - 1]
    const isTypeOk = props.ext.indexOf(fileExt) >= 0
    const isSizeOk = file.size / 1024 / 1024 < props.size
    if (!isTypeOk) {
        ElMessage.error(`上传文件只支持 ${ props.ext.join(' / ') } 格式！`)
    }
    if (!isSizeOk) {
        ElMessage.error(`上传文件大小不能超过 ${props.size}MB！`)
    }
    return isTypeOk && isSizeOk
}
function onExceed() {
    ElMessage.warning('文件上传超过限制')
}
function onSuccess(res, file, fileList) {
    emit('on-success', res, file, fileList)
}

function onChange(file, fileList) {
    emit('on-change', file, fileList)
}
const uploadRef = ref()
function submitUpload() {
    uploadRef.value.submit()
}
function upload(param) {
    emit('http-request', param)
}
</script>

<template>
    <el-upload
        ref="uploadRef"
        :headers="headers"
        :action="action"
        :data="data"
        :name="name"
        :before-upload="beforeUpload"
        :on-exceed="onExceed"
        :on-success="onSuccess"
        :on-change="onChange"
        :file-list="files"
        :limit="max"
        :auto-upload="false"
        drag
        :http-request="upload"
    >
        <div class="slot">
            <el-icon class="el-icon--upload">
                <svg-icon name="cloud" />
            </el-icon>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </div>
        <template #tip>
            <div v-if="!notip" class="el-upload__tip">
                <div style="display: inline-block;">
                    <el-alert :title="`上传文件支持 ${ ext.join(' / ') } 格式，单个文件大小不超过 ${ size }MB，且文件数量不超过 ${ max } 个`" type="info" show-icon :closable="false" />
                </div>
            </div>
        </template>
    </el-upload>
    <el-button class="ml-3" type="success" @click="submitUpload">
        上传
    </el-button>
</template>

<style lang="scss" scoped>

</style>
