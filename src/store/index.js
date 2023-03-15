import { createStore } from 'vuex'
import { getinfo, login } from '~/api/manager'
import { setToken, removeToken } from '~/composables/auth'

const store = createStore({
    state() {
        return {
            // 用户信息
            user: {},
            asideWidth: '250px',
            menus: [],
            ruleNames: []
        }
    },
    mutations: {
        // 记录用户信息
        SET_USERINFO(state, user) {
            state.user = user
        },
        handleAsideWidth(state) {
            state.asideWidth = state.asideWidth == '250px' ? '64px' : '250px'
        },
        //动态菜单
        SET_MENUS(state, menus) {
            state.menus = menus
        },
        SET_RULENAMES(state, ruleNames) {
            state.ruleNames = ruleNames
        }
    },
    actions: {
        //登录
        login({ commit }, { username, password }) {
            return new Promise((resolve, reject) => {
                login(username, password).then(result => {
                    console.log('登陆结果为')
                    console.log(result)
                    setToken(result.token)
                    resolve(result)
                }).catch(err => reject(err))
            })
        },
        //获取当前用户登录信息
        getinfo({ commit }) {
            return new Promise((resolve, reject) => {
                getinfo().then(result => {
                    console.log('用户信息为：')
                    console.log(result)
                    commit("SET_USERINFO", result)
                    commit('SET_MENUS', result.menus)
                    commit('SET_RULENAMES', result.ruleNames)
                    resolve(result)
                }).catch((err) => {
                    reject(err)
                })
            })
        },
        logout({ commit }) {
            //移除cookie中的Token
            removeToken()
            //清除当前用户状态
            commit('SET_USERINFO', {})
        }
    }
})

export default store