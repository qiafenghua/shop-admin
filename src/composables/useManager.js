import { logout, updatePassword } from '~/api/manager'
import { showModal, toast } from '~/composables/util'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex';
import { reactive, ref } from 'vue';

//退出登录
export function useLogout() {
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

    return {
        handleLogout
    }
}

export function useRepassword() {
    const router = useRouter()
    const store = useStore()

    //修改密码抽屉
    const formDrawerRef = ref(null)

    const form = reactive({
        oldpassword: '',
        password: '',
        repassword: ''
    })

    //表单验证规则
    const rules = {
        oldpassword: [{
            required: true,
            message: '旧密码不能为空',
            trigger: 'blur'
        }],
        password: [{
            required: true,
            message: '密码不能为空',
            trigger: 'blur'
        }],
        repassword: [{
            required: true,
            message: '旧密码不能为空',
            trigger: 'blur'
        }]
    }

    const formRef = ref(null)
    const onSubmit = () => {
        formRef.value.validate((valid) => {
            if (!valid) {
                return false
            }
            formDrawerRef.value.showLoading()
            updatePassword(form).then(result => {
                toast('修改密码成功,青重新登录')
                store.dispatch('logout')
                router.push('/login')
            }).finally(() => {
                formDrawerRef.value.hideLoading()
            })
        })
    }

    const openRePasswordForm = () => formDrawerRef.value.open()

    return {
        formDrawerRef,
        form,
        rules,
        formRef,
        onSubmit,
        openRePasswordForm
    }
}

