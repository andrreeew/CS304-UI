<template>
  <a-table :columns="columns" :data="data" :bordered="false" :scroll="{x: 900, y: '100%',}" :pagination="false">
    <template #complete="{ record }">
      <a-tag v-if="record.complete" color="green">是</a-tag>
      <a-tag v-else color="arcoblue">否</a-tag>
    </template>

    <template #optional="{ record }">
      <a-space>
        <a-button @click="this.$router.push({name:'admin-fund-group', params:{fundId:fundId, groupId: record.group}})">查看</a-button>
        <delete-button @click="deleteGroup(record.group)"></delete-button>
      </a-space>

    </template>
  </a-table>

  <div style="display: flex;justify-content: center; margin-top: 10px">

    <a-button @click="visible=true" shape="circle">
      <icon-plus></icon-plus>
    </a-button>
  </div>
  <a-divider  style="margin-top: 10px"></a-divider>

  <a-modal v-model:visible="visible" @ok="addGroup" @cancel="clearForm" title="添加课题组">
    <a-select v-model="selectGroups"  multiple>
      <a-option v-for="item in candidateGroups">{{item}}</a-option>
    </a-select>
  </a-modal>

</template>

<script>
import api from "@/api";
import {Message} from '@arco-design/web-vue'
import deleteButton from '@/components/operation/delete-button'

export default {
  name: "group-table",
  props: {
    fundId: Number
  },
  components:{
    deleteButton
  },
  data(){
    return{
      visible: false,
      selectGroups:[],
      groups:[],
      columns:[
        {title: '课题组', dataIndex: 'group'},
        {title: '经费总额', dataIndex: 'total'},
        {title:'已使用', dataIndex: 'cost'},
        {title: '经费余额', dataIndex: 'left'},
        {title: '执行率', dataIndex: 'percent'},
        {title: '是否达标', slotName: 'complete',},
        {title: '操作', slotName: 'optional', fixed: 'right'},
      ],
      data:[]
    }
  },
  computed:{
    candidateGroups(){
      var result = []
      for (let i = 0; i < this.groups.length; i++) {
        var flag = false;
        for (let j = 0; j < this.data.length; j++) {
          if(this.data[j].group===this.groups[i]){
            flag = true;
            break
          }
        }
        if(!flag){
          result.push(this.groups[i])
        }
      }
      return result
    }
  },
  methods: {
    isNotIn(group){
      console.log(group)
      for (let i = 0; i < this.data.length; i++) {
        if(group===this.data[i].group){
          return false
        }
        console.log(group, this.data[i])
      }
      return true
    },
    deleteGroup(groupName){
      api.deleteFundGroup(this.fundId, groupName).then(res => {
        if (res.data.code === 200) {
          Message.success(res.data.msg)
          this.data = res.data.data
        } else {
          Message.error(res.data.msg)
        }
      })
    },
    addGroup(){
      api.addGroupsToFund(this.fundId,this.selectGroups).then(res => {
        if (res.data.code === 200) {
          Message.success(res.data.msg)
          this.data = res.data.data
        } else {
          Message.error(res.data.msg)
        }
      })
      this.clearForm()
    },
    clearForm(){
      this.selectGroups = []
    }
  },
  watch: {
    fundId(newVal, oldVal){
      api.getGroupByFund(newVal).then(res => {
        this.data = res.data.data
        console.log(this.data)
      })
    }
  },
  created(){
    api.getAllGroupName().then(res => {
      this.groups = res.data.data
      console.log(this.groups)
    })
  }
}
</script>

<style scoped>

</style>