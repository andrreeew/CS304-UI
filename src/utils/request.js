import axios from 'axios'
import {getToken} from '@/utils/auth'
import {Message} from '@arco-design/web-vue'
import router from "@/router";


const instance = axios.create({
    timeout: 5000
})

instance.interceptors.request.use(
    config => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = token
        }
        else if(router.currentRoute.value.name!=='login'){
            router.push({name:'login'})
            Message.error('请先登入')
        }
        return config
    },

    error => Promise.reject(error)
)

instance.interceptors.response.use(
    response => {
        return response
    },
    error => {
        if (error.response.status === 404) {
            Message.error('404')
        }
        return Promise.reject(error)
    }
)

export default instance;
