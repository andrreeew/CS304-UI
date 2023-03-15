<template>
  <a-list :bordered="false">
    <a-list-item v-for="item in members">
      <div style="display: flex;justify-content: space-between">
        <a-space size="medium">
          <a-avatar :size=35>L</a-avatar>
          <a-link style="margin-left: -10px">{{item.name}}</a-link>
          <a-tag v-if="item.admin" color="arcoblue">管理员</a-tag>

        </a-space>
        <a-button @click="item.admin=!item.admin">修改权限</a-button>
      </div>

    </a-list-item>
    <a-list-item >
      <div style="display: flex;justify-content: center">
        <a-button shape="circle" @click="visible=true">
          <icon-plus></icon-plus>
        </a-button>
      </div>
    </a-list-item>
    <a-modal v-model:visible="visible" title="添加成员">
      <a-form>
        <a-form-item label="添加成员">
      <a-select v-model="form.account" multiple>
        <a-option v-for="item in accounts">{{item.label}}</a-option>
      </a-select>
        </a-form-item>
      <a-form-item  label="管理员权限">
        <a-checkbox-group v-model="form.admin" :options="form.account">
        </a-checkbox-group>
      </a-form-item>
      </a-form>
    </a-modal>
  </a-list>
</template>

<script>
export default {
  name: "account-list",
  data(){
    return{
      visible: false,
      members:[
        {id:124, name:'Li', admin:true},
        {id:14, name:'fsa', admin:false},
      ],
      accounts:[
        {value: 'li', label: 'Li'},
        {value: 'fang', label: 'Fang'}
      ],
      form:{
        account:[],
        admin:[],
      },
    }
  }
}
</script>

<style scoped>

</style>