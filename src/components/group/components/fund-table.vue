<template>
  <a-table :columns="columns" :data="data" :bordered="false" :scroll="{x: 900, y: '100%',}" :pagination="false">

    <template #complete="{ record }">
      <a-tag v-if="record.complete" color="green">是</a-tag>
      <a-tag v-else color="arcoblue">否</a-tag>
    </template>

    <template #optional="{ record }">
      <a-space>
        <a-button @click="this.$router.push({name:identity+'-fund-group', params:{fundId:record.fundId, groupId: groupName}})">查看</a-button>
          <delete-button v-if="identity==='admin'" @click="deleteFund(record.fundId)"></delete-button>
      </a-space>
    </template>
  </a-table>

  <!-- <div style="display: flex;justify-content: center; margin-top: 10px"> -->

    <!-- <a-button v-if="identity==='admin'" @click="visible=true" shape="circle">
      <icon-plus></icon-plus>
    </a-button> -->
  <!-- </div> -->
  <a-divider  style="margin-top: 10px"></a-divider>

  <!-- <a-modal v-model:visible="visible" title="添加经费">
    <a-select v-model="selectFunds"  placeholder="Please select ..." multiple allow-create>
      <a-option v-for="item in funds">{{item.label}}</a-option>
    </a-select>
  </a-modal> -->
</template>

<script>
import deleteButton from '@/components/operation/delete-button'
import api from "@/api"
import {Message} from '@arco-design/web-vue'

export default {
  name: "fund-table",
  components:{
    deleteButton
  },
  props:{
    groupId: {
      default: -1
    },
    groupName: {
      default: '',
    }

  },
  computed:{
    identity(){
      return this.$route.path.substring(1).split('/')[0];
    },
  },
  data(){
    return{
      identity: this.$route.path.substring(1).split('/')[0],
      visible: false,
      selectFunds:[],
      funds:[
        {value: 'li', label: 'Li'},
        {value: 'fang', label: 'Fang'}
      ],
      columns:[
        {title: '经费编号', dataIndex: 'fundId'},
        {title: '经费名称', dataIndex: 'fund'},
        {title: '经费总额', dataIndex: 'total'},
        {title:'已使用', dataIndex: 'cost'},
        {title: '经费余额', dataIndex: 'left'},
        {title: '执行率', dataIndex: 'percent'},
        {title: '是否达标', slotName: 'complete',},
        {title: '操作', slotName: 'optional', fixed: 'right', width:175},
      ],
      data:[{
        // complete: true,
        // fundId: 14,
        // fund: 'dsafsa',
        // total: 2141,
        // cost: 242,
        // left: 155,
        // percent: 241,
      }]
    }
  },
  methods:{
    deleteFund(fundId){
      api.deleteGroupFund(this.groupId, fundId).then(res => {
        if (res.data.code === 200) {
          this.data = res.data.data
        } else {
          Message.error(res.data.msg)
        }
      })
    }
  },
  watch:{
    groupId(newVal, oldVal){
      api.getFundInfoByGroup(newVal).then(res => {
        console.log('datatatatatat');
        console.log(res.data.data)
        // if (res.data.code=== 200) {
          this.data = res.data.data
        // }
      })
    }
  },
  created(){
  }
}
</script>

<style scoped>

</style>