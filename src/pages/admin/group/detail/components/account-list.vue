<template>
  <a-list :bordered="false">
    <a-list-item v-for="item in groupData.users">
      <div style="display: flex;justify-content: space-between">
        <a-space size="medium">
          <a-avatar :size=35>L</a-avatar>
          <a-link style="margin-left: -10px">{{item.name}}</a-link>
          <a-tag v-if="item.admin" color="arcoblue">管理员</a-tag>
        </a-space>

        <a-space>
        <a-button @click="changeUserAdmin(item)">修改权限</a-button>
        <delete-button @click="deleteUser(item)"></delete-button>
        </a-space>
      </div>
    </a-list-item>
    <a-list-item >
      <div style="display: flex;justify-content: center">
        <a-button shape="circle" @click="visible=true">
          <icon-plus></icon-plus>
        </a-button>
      </div>
    </a-list-item>
    <a-modal v-model:visible="visible" @ok="addUsers" @cancel="clearForm" title="添加成员">
      <a-form>
        <a-form-item label="添加成员">
          <a-select v-model="form.account" multiple>
            <a-option v-for="item in accounts">{{item.name}}</a-option>
          </a-select>
        </a-form-item>
        <a-form-item label="管理员权限">
          <a-checkbox-group v-model="form.admin" :options="form.account">
          </a-checkbox-group>
        </a-form-item>
      </a-form>
    </a-modal>
  </a-list>
</template>

<script>
import deleteButton from '@/components/operation/delete-button'
import api from "@/api"
import {Message} from '@arco-design/web-vue'

export default {
  name: "account-list",
  components:{
    deleteButton
  },
  props:{
    groupData: {
      default:{
        name: '',
        users: [],
      }
    },
    accounts:{
      default:[]
    },
    updateData: {
      type: Function,
      default() {}
    }
  },
  data(){
    return{
      visible: false,
      form:{
        account:[],
        admin:[],
      },
    }
  },
  methods: {
    changeUserAdmin(user){
      api.changeGroupUserAdmin(this.groupData.name, user.id).then(res => {
        if (res.data.code === 200) {
          Message.success(res.data.msg)
          this.data = res.data.data
        } else {
          Message.error(res.data.msg)
        }
      }).finally(()=>this.updateData)
    },
    deleteUser(user){
      api.deleteGroupUser(this.groupData.name, user.id).then(res => {
        if (res.data.code === 200) {
          Message.success(res.data.msg)
          this.data = res.data.data
        } else {
          Message.error(res.data.msg)
        }
      }).finally(()=>this.updateData)
    },
    addUsers(){
      api.addGroupUsers(this.groupData.name, this.form.account,this.form.admin).then(res => {
        if (res.data.code === 200) {
          Message.success(res.data.msg)
          this.data = res.data.data
        } else {
          Message.error(res.data.msg)
        }
      }).finally(()=>this.updateData)
      this.clearForm()
    },

    clearForm(){
      this.form.account = []
      this.form.admin = []
    }
  },
}
</script>

<style scoped>

</style>