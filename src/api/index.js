import {BACKEND_URL} from "@/utils/config";
import request from "@/utils/request";

const api={
    login(user) {
        return request.post(BACKEND_URL + '/user/login', user)
    },
    createAccount(account) {
        return request.post(BACKEND_URL + '/admin/system/sysUser/createAccount', account)
    },

    createGroup(group) {
        return request.post(BACKEND_URL + '/admin/system/sysGroup/create', group)
    },

    getAllAccountName() {
        return request.get(BACKEND_URL + '/admin/system/sysUser/getAllAccountName')
    },
    getAllGroupName() {
        return request.get(BACKEND_URL + '/admin/system/sysGroup/getAllGroupName')
    },
    getUsers(params) {
        return request.get(BACKEND_URL + '/admin/system/sysUser/getUsers', {params: params})
    },
    deleteUsers(ids) {
        return request.post(BACKEND_URL + '/admin/system/sysUser/deleteUsers', ids)
    },
    getGroups(params) {
        return request.get(BACKEND_URL + '/admin/system/sysGroup/getGroups', {params: params})
    },

    getGroup(id){
        return request.get(BACKEND_URL + '/admin/system/sysGroup/getGroup', {params:{id:id}})
    },
    deleteGroup(id) {
        return request.post(BACKEND_URL + '/admin/system/sysGroup/deleteGroup', {id:id})
    },

    changeGroupUserAdmin(group, userId) {
        return request.post(BACKEND_URL + '/admin/system/sysRole/changeAdmin', {group:group, user:userId})
    },
    deleteGroupUser(group, userId) {
        return request.post(BACKEND_URL + '/admin/system/sysGroup/deleteGroupUser', {group:group, user:userId})
    },
    addGroupUsers(group, form) {
        return request.post(BACKEND_URL + '/addGroupUsers', {group:group, form:form})
    },
    getUsersNotInGroup(groupName) {
        return request.get(BACKEND_URL + '/admin/system/sysGroup/getUsersNotInGroup', {params: {groupName:groupName}})
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
    addGroupsToFund(fundId, groups) {
        return request.post(BACKEND_URL + '/addGroupsToFund', {fundId: fundId, groups:groups})
    },
    getFundDetailByGroup(fundId, groupId) {
        return request.get(BACKEND_URL + '/getFundDetailByGroup', {params: {fundId:fundId,groupId:groupId}})
    },
    modifyGroupFundDetail(fundId, groupId, detail) {
        return request.post(BACKEND_URL + '/modifyGroupFundDetail', {fundId:fundId,groupId:groupId, detail:detail})
    },
    getApplications(params) {
        return request.get(BACKEND_URL + '/admin/system/application/getApplications', {params: params})
    },
    permitApplication(applicationId) {
        return request.post(BACKEND_URL + '/permitApplication', {id:applicationId})
    },
    denyApplications(applicationIds, role) {
        return request.post(BACKEND_URL + '/denyApplications', {ids:applicationIds,role:role})
    },
    createApplication(form){
        return request.post(BACKEND_URL + '/admin/system/application/createApplication', form)
    },
    getAdminHomeStatistics(){
        return request.get(BACKEND_URL + '/getAdminHomeStatistics')
    },
    getGroupStatistics(groupId){
        return request.get(BACKEND_URL + '/getGroupStatistics', {params: {groupId:groupId}})
    },
    getFundStatistics(fundId){
        return request.get(BACKEND_URL + '/getFundStatistics', {params: {fundId:fundId}})
    },
    getApplicationInfo(fundId){
        return request.get(BACKEND_URL + '/getApplicationInfo', {params: {fundId:fundId}})
    },
    getApplicationTimeline(fundId){
        return request.get(BACKEND_URL + '/getApplicationTimeline', {params: {fundId:fundId}})
    },
    getAdminMessages(params){
        return request.get(BACKEND_URL + '/getAdminMessages', {params: params})
    },
    getUserHomeStatistics(){
        return request.get(BACKEND_URL + '/getUserHomeStatistics')
    },
    getUserGroups(){
        return request.get(BACKEND_URL + '/getUserGroups')
    },
    getUserMessages(params){
        return request.get(BACKEND_URL + '/getUserMessages', {params: params})
    },
    addUserToGroups(userId, form){
        return request.post(BACKEND_URL + '/addUserToGroups', {userId:userId, form:form})
    }
}

export default api