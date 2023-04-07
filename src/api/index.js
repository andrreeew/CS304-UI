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
    },
    getFunds(params) {
        return request.get(BACKEND_URL + '/getFunds', {params: params})
    },
    getGroupByFund(fundId) {
        return request.get(BACKEND_URL + '/getGroupByFund', {params: {id:fundId}})
    },
    deleteFundGroup(fundId, groupName) {
        return request.post(BACKEND_URL + '/deleteFundGroup', {fundId:fundId,groupName:groupName})
    },
    addGroupsToFund(groups) {
        return request.post(BACKEND_URL + '/addGroupsToFund', {groups:groups})
    },
    getFundDetailByGroup(fundId, groupId) {
        return request.get(BACKEND_URL + '/getFundDetailByGroup', {params: {fundId:fundId,groupId:groupId}})
    },
    modifyGroupFundDetail(detail) {
        return request.post(BACKEND_URL + '/modifyGroupFundDetail', {detail:detail})
    },
    getApplications(params) {
        return request.get(BACKEND_URL + '/getApplications', {params: params})
    },
    permitApplication(applicationId) {
        return request.post(BACKEND_URL + '/permitApplication', {id:applicationId})
    },
    denyApplications(applicationIds, role) {
        return request.post(BACKEND_URL + '/denyApplications', {ids:applicationIds,role:role})
    },
    createApplication(form){
        return request.post(BACKEND_URL + '/createApplication', form)
    }
}

export default api