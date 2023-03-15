<template>
    <el-row class="login-container">
        <el-col :md="16" :sm="12" class="left">
            <div>
                <div class="font-bold text-5xl text-light-50 mb-4">欢迎光临</div>
                <div class="text-gray-200 text-sm">此站点是《vue3 + vite实战商城后台开发》视频课程的<a href="#" class="font-bold">演示地址</a>
                </div>
            </div>
        </el-col>
        <el-col :md="8" :sm="12" class="right">
            <div>
                <div class="title">欢迎回来</div>
                <div>
                    <span class="line"></span>
                    <span>账号密码登录</span>
                    <span class="line"></span>
                </div>
                <el-form ref="formRef" :model="form" :rules="rules" class="w-[250px]">
                    <el-form-item prop="username">
                        <el-input v-model="form.username" placeholder="请输入您的用户名">
                            <template #prefix>
                                <el-icon>
                                    <user />
                                </el-icon>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input v-model="form.password" type="password" show-password placeholder="请输入您的密码">
                            <template #prefix>
                                <el-icon>
                                    <lock />
                                </el-icon>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-button round color="#626aef" type="primary" class="w-[250px]" @click="onSubmit"
                        :loading="loading">登录</el-button>
                </el-form>
            </div>
        </el-col>
    </el-row>
</template>

<script setup>

import { onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex'
import { toast } from '~/composables/util.js'
import { useCookies } from '@vueuse/integrations/useCookies'

const form = reactive({
    username: '',
    password: ''
})

const router = useRouter()
const store = useStore()


const rules = {
    username: [
        {
            //必填，失去焦点后触发
            required: true,
            message: '用户名不能为空',
            trrgger: 'blur'
        }
    ],
    password: [
        {
            required: true,
            message: '密码不能为空',
            trrgger: 'blur'
        }
    ]
}

const cookie = useCookies()
const formRef = ref(null)
const loading = ref(false)

//登录提交按钮
const onSubmit = () => {

    formRef.value.validate((valid) => {
        if (!valid) {
            return false
        }
        loading.value = true
        console.log('form:')
        console.log(form)

        store.dispatch('login', form).then(result => {
            toast('登录成功!')
            router.push('/')

        }).finally(() =>
            loading.value = false
        )
    })
}

//回车登录事件
function onKeyUp(e) {
    if (e.key == 'Enter') onSubmit()
}
//添加键盘监听
onMounted(() => {
    document.addEventListener('keyup', onKeyUp)
})

//移除键盘监听
onBeforeUnmount(() => {
    document.removeEventListener('keyup', onKeyUp)
})
</script>

<style scoped>
.login-container {
    @apply min-h-screen bg-indigo-500;
}

.login-container .left {
    @apply flex items-center justify-center;
}

.login-container .right {
    @apply bg-light-200 flex items-center justify-center flex-col;
}

.login-container .content-position {
    @apply flex items-center justify-center;
}

.right .title {
    @apply font-bold text-4xl my-4;
}

.right>div>div:nth-child(2) {
    @apply flex items-center justify-center my-5 text-gray-300 space-x-2;
}

.right .line {
    @apply h-[1px] w-16 bg-gray-200;
}
</style>