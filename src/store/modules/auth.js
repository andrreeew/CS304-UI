import {Message} from '@arco-design/web-vue';
import router from "@/router";
import {setToken, getToken, clearToken} from '@/utils/auth'

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
            commit('setToken', 42141)
            Message.success('Welcome')
            router.push({name:'home'})
        },
        logout({commit}){
            commit('clearToken')
            router.push({name:'login'})
        },

    }
};
