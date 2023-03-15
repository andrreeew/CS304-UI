import {Message} from '@arco-design/web-vue';
import router from "@/router";
import {setToken, getToken, clearToken} from '@/utils/auth'
import api from "@/api";

export default {
    namespaced: true,
    state: {
        token: getToken()
    },

    getters: {
        isLogin(state) {
            return !!state.token
        },
    },

    mutations: {
        setToken(state, token) {
            state.token = token
            setToken(token)
        },

        clearToken(state) {
            state.token = null
            clearToken()
        },
    },

    actions: {
        login({commit}, auth) {
            api.login(auth)
                .then(res => {
                    try {
                        commit('setToken', res.data.data.token)
                        if(res.data.data.identity==='admin'){
                            Message.success('欢迎管理员')
                        }else {
                            Message.success('欢迎用户')
                        }
                        router.push({name:res.data.data.identity})
                    } catch (e) {
                        Message.error(res.data.msg)
                    }
                })
        },

        logout({commit}){
            commit('clearToken')
            Message.success('登出成功')
            router.push({name:'login'})
        },

    }
};
