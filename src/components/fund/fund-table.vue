<template>
  <a-table
      :columns="columns"
      :data="data"
      :bordered="false"
      :pagination="false"
      :scroll="{x: 1400, y: '100%',}"
      :loading="loading"
  >
    <template #state="{ record }">
      <a-tag v-if="record.state==='complete'" color="green">
        <template #icon>
          <icon-check-circle-fill />
        </template>
        Complete
      </a-tag>
      <a-tag v-else-if="record.state==='underway'" color="arcoblue">
        <template #icon>
          <icon-up-circle />
        </template>
        Underway
      </a-tag>
      <a-tag v-else-if="record.state==='reject'" color="red">
        <template #icon>
          <icon-close-circle-fill />
        </template>
        Reject
      </a-tag>
    </template>
    <template #dateRange="{ record }">
      {{dayjs(record.dataRange[0]).format('YYYY/MM/DD')}}-{{dayjs(record.dataRange[1]).format('YYYY/MM/DD')}}
    </template>
    <template #optional="{ record }">
      <a-space>
        <a-button @click="showDetail(record)">查看</a-button>
      </a-space>
    </template>
  </a-table>
</template>

<script>
import api from "@/api";
import dayjs from "dayjs";

export default {
  name: "fund-table",
  data(){
    return{
      dayjs,
      columns:[
        {title: '经费编号', dataIndex: 'id' },
        {title: '经费名称', dataIndex: 'name'},
        {title:'授权有效期', slotName: 'dateRange', width: 200},
        {title: '经费总额', dataIndex: 'totalNum'},
        {title: '剩余经费', dataIndex: 'leftNum',},
        {title: '执行率', dataIndex: 'percent', },
        {title: '是否达标', slotName: 'state',},
        {title: '剩余天数', dataIndex: 'leftDay'},
        {title: '操作', slotName: 'optional', fixed: 'right', width:150},
      ],
      loading: true,
      data:[],
      selectedKeys:[],
      rowSelection:{
        type: 'checkbox',
        showCheckedAll: true,
      },
      selectedRecord:'',
      visible:false,

    }
  },
  methods: {
    showDetail(record){
      this.$router.push({name:'admin-fund-detail', params:{fundId:record.id}})
    },
    getFunds(){
      this.loading=true
      api.getFunds({}).then(res => {
        this.data = res.data.data
        console.log(this.data)
      }).finally(()=>{this.loading=false})
    }
  },
  created(){
    this.getFunds()
  }
}
</script>

<style scoped>

</style>