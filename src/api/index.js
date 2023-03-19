import {BACKEND_URL} from "@/utils/config";
import request from "@/utils/request";

const api={
    login(user) {
        return request.post(BACKEND_URL + '/login', user)
    },
    createAccount(account) {
        return request.post(BACKEND_URL + '/createAccount', account)
    },
    createGroup(group) {
        return request.post(BACKEND_URL + '/createGroup', group)
    },
    getAllAccountName() {
        return request.get(BACKEND_URL + '/getAllAccountName')
    },
    getAllGroupName() {
        return request.get(BACKEND_URL + '/getAllGroupName')
    }
}

export default api