import {BACKEND_URL} from "@/utils/config";
import request from "@/utils/request";

const api={
    login(user) {
        return request.post(BACKEND_URL + '/user/login', user)
    },
    createAccount(name,email,phone,group) {
        return request.post(BACKEND_URL + '/admin/system/sysUser/createAccount', {name:name,email:email,phone:phone,groups:group})
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
        return request.post(BACKEND_URL + '/admin/system/sysUser/deleteUsers', {ids: ids})
    },
    getGroups(params) {
        return request.get(BACKEND_URL + '/admin/system/sysGroup/getGroups', {params: params})
    },
    deleteGroup(id) {
        return request.post(BACKEND_URL + '/admin/system/sysGroup/deleteGroup', {id:id})
    },
    changeGroupUserAdmin(groupName, userId) {
        return request.post(BACKEND_URL + '/admin/system/sysRole/changeGroupUserAdmin', {group:groupName, user:userId})
    },
    deleteGroupUser(groupName, userId) {
        return request.post(BACKEND_URL + '/admin/system/sysGroup/deleteGroupUser', {group:groupName, user:userId})
    },
    addGroupUsers(groupName, account, admin) {
        return request.post(BACKEND_URL + '/admin/system/sysGroup/addGroupUsers', {group:groupName, account:account, admin:admin})
    },
    getUsersNotInGroup(groupName) {
        return request.get(BACKEND_URL + '/admin/system/sysGroup/getUsersNotInGroup', {params: {groupName:groupName}})
    },


    getFundInfoByGroup(groupId) {
        return request.get(BACKEND_URL + '/admin/system/sysFunding/getFundInfoByGroup', {params: {groupId:groupId}})
    },
    deleteGroupFund(groupId, fundId) {
        return request.post(BACKEND_URL + '/admin/system/sysFunding/deleteGroupFund', {groupId:groupId,fundId:fundId})
    },
    getFunds(params) {
        return request.get(BACKEND_URL + '/admin/system/sysFunding/getFunds', {params: params})
    },
    getGroupByFund(fundId) {
        return request.get(BACKEND_URL + '/admin/system/sysFunding/getGroupByFund', {params: {id:fundId}})
    },
    deleteFundGroup(fundId, groupName) {
        return request.post(BACKEND_URL + '/admin/system/sysFunding/deleteFundGroup', {fundId:fundId,groupName:groupName})
    },
    addGroupsToFund(fundId, groups) {
        return request.post(BACKEND_URL + '/admin/system/sysFunding/addGroupsToFund', {fundId: fundId, groups:groups})
    },
    getFundDetailByGroup(fundId, groupId) {
        return request.get(BACKEND_URL + '/admin/system/sysFunding/getFundDetailByGroup', {params: {fundId:fundId,groupId:groupId}})
    },
    modifyGroupFundDetail(fundId, groupId, detail) {
        return request.post(BACKEND_URL + '/admin/system/sysFunding/modifyGroupFundDetail', {fundId:fundId,groupId:groupId, detail:detail})
    },
    //admin端对申请的操作
    getApplications(params) {
        return request.get(BACKEND_URL + '/admin/system/application/getApplications', {params: params})
    },
    permitApplication(applicationId) {
        return request.post(BACKEND_URL + '/admin/system/application//permitApplication', {id:applicationId})
    },
    denyApplications(applicationIds) {
        return request.post(BACKEND_URL + '/admin/system/application/denyApplications', {ids:applicationIds})
    },
    //user端对申请的操作
    getUserApplications(params) {
        return request.get(BACKEND_URL + '/user/application/getUserApplications', {params: params})
    },
    batchCancelApplication(applicationIds) {
        return request.post(BACKEND_URL + '/user/application/batchCancelApplication', {ids:applicationIds})
    },
    cancelApplication(id){
        return request.post(BACKEND_URL + '/user/application/cancelApplication', {id:id})
    },
    createApplication(form){
        return request.post(BACKEND_URL + '/user/application/createApplication', {form})
    },

    
    getAdminHomeStatistics(){
        return request.get(BACKEND_URL + '/admin/system/sysUser/getAdminHomeStatistics')
    },
    getGroupStatistics(groupId){
        return request.get(BACKEND_URL + '/admin/system/sysGroup/getGroupStatistics', {params: {groupId:groupId}})
    },
    getFundStatistics(fundId){
        return request.get(BACKEND_URL + '/admin/system/sysFunding/getFundStatistics', {params: {id:fundId}})
    },
    getApplicationInfo(id){
        return request.get(BACKEND_URL + '/admin/system/application/getApplicationInfo', {params: {id:id}})
    },
    getApplicationTimeline(id){
        return request.get(BACKEND_URL + '/admin/system/application/getApplicationTimeline', {params: {id:id}})
    },
    
    getAdminMessages(params){
        return request.get(BACKEND_URL + '/admin/system/sysUser/getAdminMessages', {params: params})
    },
    getUserHomeStatistics(){
        return request.get(BACKEND_URL + '/admin/system/sysUser/getUserHomeStatistics')
    },
    getUserGroups(){
        return request.get(BACKEND_URL + '/admin/system/sysFunding/getUserGroups')
    },
    getUserMessages(page,type){
        return request.get(BACKEND_URL + '/admin/system/sysUser/getUserMessages', {params: {page: page, type:type}})
    },
    addUserToGroups(userId, group, admin){
        return request.post(BACKEND_URL + '/admin/system/sysUser/addUserToGroups', {userId:userId, groups:group, admin:admin})
    },
    getFundHistory(fundId){
        return request.get(BACKEND_URL + '/admin/system/application/getApplicationsByFundId', {params: {fundId:fundId}})
    }
}

export default api


// import {BACKEND_URL} from "@/utils/config";
// import request from "@/utils/request";

// const api={
//     login(user) {
//         return request.post(BACKEND_URL + '/user/login', user)
//     },
//     createAccount(account) {
//         return request.post(BACKEND_URL + '/createAccount', account)
//     },

//     createGroup(group) {
//         return request.post(BACKEND_URL + '/createGroup', group)
//     },

//     getAllAccountName() {
//         return request.get(BACKEND_URL + '/getAllAccountName')
//     },
//     getAllGroupName() {
//         return request.get(BACKEND_URL + '/getAllGroupName')
//     },
//     getUsers(params) {
//         return request.get(BACKEND_URL + '/getUsers', {params: params})
//     },
//     deleteUsers(ids) {
//         return request.post(BACKEND_URL + '/deleteUsers', {ids: ids})
//     },
//     getGroups(params) {
//         return request.get(BACKEND_URL + '/getGroups', {params: params})
//     },

//     // getGroup(id){
//     //     return request.get(BACKEND_URL + '/admin/system/sysGroup/getGroup', {params:{id:id}})
//     // },
//     deleteGroup(id) {
//         return request.post(BACKEND_URL + '/deleteGroup', {id:id})
//     },
//     changeGroupUserAdmin(groupName, userId) {
//         return request.post(BACKEND_URL + '/changeGroupUserAdmin', {group:groupName, user:userId})
//     },
//     deleteGroupUser(groupName, userId) {
//         return request.post(BACKEND_URL + '/deleteGroupUser', {group:groupName, user:userId})
//     },
//     addGroupUsers(groupName, account, admin) {
//         return request.post(BACKEND_URL + '/addGroupUsers', {group:groupName, account:account, admin:admin})
//     },
//     getUsersNotInGroup(groupName) {
//         return request.get(BACKEND_URL + '/getUsersNotInGroup', {params: {groupName:groupName}})
//     },


//     getFundInfoByGroup(groupId) {
//         return request.get(BACKEND_URL + '/getFundInfoByGroup', {params: {groupId:groupId}})
//     },
//     deleteGroupFund(groupId, fundId) {
//         return request.post(BACKEND_URL + '/deleteGroupFund', {groupId:groupId,fundId:fundId})
//     },
//     getFunds(params) {
//         return request.get(BACKEND_URL + '/getFunds', {params: params})
//     },
//     getGroupByFund(fundId) {
//         return request.get(BACKEND_URL + '/getGroupByFund', {params: {id:fundId}})
//     },
//     deleteFundGroup(fundId, groupName) {
//         return request.post(BACKEND_URL + '/deleteFundGroup', {fundId:fundId,groupName:groupName})
//     },
//     addGroupsToFund(fundId, groups) {
//         return request.post(BACKEND_URL + '/addGroupsToFund', {fundId: fundId, groups:groups})
//     },
//     getFundDetailByGroup(fundId, groupId) {
//         return request.get(BACKEND_URL + '/getFundDetailByGroup', {params: {fundId:fundId,groupId:groupId}})
//     },
//     modifyGroupFundDetail(fundId, groupId, detail) {
//         return request.post(BACKEND_URL + '/modifyGroupFundDetail', {fundId:fundId,groupId:groupId, detail:detail})
//     },
    
//     getApplications(params) {
//         return request.get(BACKEND_URL + '/getApplications', {params: params})
//     },
//     permitApplication(applicationId) {
//         return request.post(BACKEND_URL + '/permitApplication', {id:applicationId})
//     },
//     denyApplications(applicationIds, role) {
//         return request.post(BACKEND_URL + '/denyApplications', {ids:applicationIds,role:role})
//     },
//     createApplication(form){
//         return request.post(BACKEND_URL + '/createApplication', form)
//     },
    
//     getAdminHomeStatistics(){
//         return request.get(BACKEND_URL + '/getAdminHomeStatistics')
//     },
//     getGroupStatistics(groupId){
//         return request.get(BACKEND_URL + '/getGroupStatistics', {params: {groupId:groupId}})
//     },
//     getFundStatistics(fundId){
//         return request.get(BACKEND_URL + '/getFundStatistics', {params: {fundId:fundId}})
//     },
//     getApplicationInfo(fundId){
//         return request.get(BACKEND_URL + '/getApplicationInfo', {params: {fundId:fundId}})
//     },
//     getApplicationTimeline(fundId){
//         return request.get(BACKEND_URL + '/getApplicationTimeline', {params: {fundId:fundId}})
//     },
    
//     getAdminMessages(params){
//         return request.get(BACKEND_URL + '/getAdminMessages', {params: params})
//     },
//     getUserHomeStatistics(){
//         return request.get(BACKEND_URL + '/getUserHomeStatistics')
//     },
//     getUserGroups(){
//         return request.get(BACKEND_URL + '/getUserGroups')
//     },
//     getUserMessages(params){
//         return request.get(BACKEND_URL + '/getUserMessages', {params: params})
//     },
//     addUserToGroups(userId, form){
//         return request.post(BACKEND_URL + '/addUserToGroups', {userId:userId, form:form})
//     }
// }

// export default api