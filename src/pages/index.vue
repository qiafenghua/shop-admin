<template>
    <div>
        页面首页
        {{ $store.state.user.username }}

        <!-- <el-button type="primary" round @click="handleLogout">退出登录</el-button> -->
    </div>
</template>


<script setup>

import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { showModal, toast } from '~/composables/util'
import { logout } from '~/api/manager'



const router = useRouter()
const store = useStore()

function handleLogout() {
    showModal('是否确认退出登录?').then(result => {
        logout()
            .finally(() => {
                store.dispatch('logout')
                //跳转至登录页
                router.push('/login')
                //提示退出登录信息
                toast('退出登录成功')
            })
    })
}
</script>
