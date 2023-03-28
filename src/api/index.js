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
    },
    getUsers(params) {
        return request.get(BACKEND_URL + '/getUsers', {params: params})
    },
    deleteUsers(ids) {
        return request.post(BACKEND_URL + '/deleteUsers', ids)
    },
    getGroups(params) {
        return request.get(BACKEND_URL + '/getGroups', {params: params})
    },
    deleteGroup(id) {
        return request.post(BACKEND_URL + '/deleteGroup', {id:id})
    },
    changeGroupUserAdmin(group, name) {
        return request.post(BACKEND_URL + '/changeGroupUserAdmin', {group:group, user:name})
    },
    deleteGroupUser(group, name) {
        return request.post(BACKEND_URL + '/deleteGroupUser', {group:group, user:name})
    },
    addGroupUsers(form) {
        return request.post(BACKEND_URL + '/addGroupUsers', form)
    },
    getUsersNotInGroup(groupName) {
        return request.get(BACKEND_URL + '/getUsersNotInGroup', {params: {groupName:groupName}})
    },
    getFundInfoByGroup(groupId) {
        return request.get(BACKEND_URL + '/getFundInfoByGroup', {params: {groupId:groupId}})
    },
    deleteGroupFund(groupId, fundId) {
        return request.post(BACKEND_URL + '/deleteGroupFund', {groupId:groupId,fundId:fundId})
    }
}

export default api