<route>
{
    meta: {
        title: "修改密码"
    }
}
</route>

<script setup name="PersonalEditPassword">
import useUserStore from '@/store/modules/user'

const loading = ref(false)
const redirect = ref(null)

onMounted(() => {
    redirect.value = route.query.redirect ?? '/login'
})

const route = useRoute()
const router = useRouter()

const userStore = useUserStore()

const validatePassword = (rule, value, callback) => {
    if (value !== editForm.value.newpassword) {
        callback(new Error('两次输入的密码不一致，请重新输入新密码'))
    } else {
        callback()
    }
}

const editFormRef = ref()
const editForm = ref({
    account: localStorage.account,
    password: '',
    newpassword: '',
    checkpassword: ''
})

const rules = ref({
    password: [
        { required: true, message: '请输入原密码', trigger: 'blur' }
    ],
    newpassword: [
        { required: true, message: '请输入新密码', trigger: 'blur' },
        { min: 6, max: 18, trigger: 'blur', message: '密码长度为6到18位' }
    ],
    checkpassword: [
        { required: true, message: '请输入新密码', trigger: 'blur' },
        { validator: validatePassword }
    ]
})

function onSubmit() {
    editFormRef.value.validate(valid => {
        if (valid) {
            loading.value = true
            userStore.editPassword(editForm.value).then(() => {
                loading.value = false
                ElMessage({
                    type: 'success',
                    message: '密码修改成功，请重新登录'
                })
                userStore.logout().then(() => {
                    router.push(redirect.value)
                })
            }).catch(() => {
                loading.value = false
            })
        }
    })
}
</script>

<template>
    <div>
        <page-header title="修改密码" content="定期修改密码可以提高帐号安全性噢~" />
        <page-main>
            <el-row>
                <el-col :md="24" :lg="12">
                    <el-form ref="editFormRef" :model="editForm" :rules="rules" label-width="120px">
                        <el-form-item label="原密码" prop="password">
                            <el-input v-model="editForm.password" type="password" placeholder="请输入原密码" />
                        </el-form-item>
                        <el-form-item label="新密码" prop="newpassword">
                            <el-input v-model="editForm.newpassword" type="password" placeholder="请输入原密码" />
                        </el-form-item>
                        <el-form-item label="确认新密码" prop="checkpassword">
                            <el-input v-model="editForm.checkpassword" type="password" placeholder="请输入原密码" />
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </page-main>
        <fixed-action-bar>
            <el-button type="primary" size="large" :loading="loading" @click="onSubmit">提交</el-button>
        </fixed-action-bar>
    </div>
</template>
