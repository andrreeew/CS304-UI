<template>
  <a-table
      :columns="columns"
      :data="data"
      :bordered="false"
      :row-selection="rowSelection"
      :pagination="false"
      :loading="loading"
      :scroll="{x: 1400, y: '100%',}"
      v-model:selectedKeys="selectedKeys"
  >
    <template #state="{ record }">
      <a-tag v-if="record.state==='complete'" color="green">
        <template #icon>
          <icon-check-circle-fill />
        </template>
        通过
      </a-tag>
      <a-tag v-else-if="record.state==='underway'" color="arcoblue">
        <template #icon>
          <icon-up-circle />
        </template>
        审批中
      </a-tag>
      <a-tag v-else-if="record.state==='reject'" color="red">
        <template #icon>
          <icon-close-circle-fill />
        </template>
        驳回
      </a-tag>
    </template>
    <template #date="{ record }">
      {{dayjs(record.date).format('YYYY-MM-DD HH:mm')}}
    </template>
    <template #optional="{ record }">
      <a-space>
        <a-button @click="showDetail(record)">查看</a-button>
        <a-tooltip  v-if="identity==='admin'&&record.state==='underway'" content="通过" >
          <check-button @click="permitApplication(record.id)"></check-button>
        </a-tooltip>
        <a-tooltip  v-if="record.state==='underway'" :content="identity==='admin'?'驳回':'撤回'" >
          <delete-button @click="denyApplication(record.id)"></delete-button>
        </a-tooltip>
      </a-space>
    </template>
  </a-table>

    <a-modal v-model:visible="visible" width="auto" title="申请详情" >
      <template #footer>
        <a-tooltip  v-if="identity==='admin'&&selectedRecord.state==='underway'" content="通过" >
          <check-button></check-button>
        </a-tooltip>
        <a-tooltip  v-if="selectedRecord.state==='underway'" :content="identity==='admin'?'驳回':'撤回'" >
          <delete-button></delete-button>
        </a-tooltip>
      </template>
      <application-detail></application-detail>
    </a-modal>
</template>

<script>
import dayjs from 'dayjs'
import applicationDetail from '@/components/application/application-detail'
import deleteButton from '@/components/operation/delete-button'
import checkButton from '@/components/operation/check-button'
import api from "@/api";
import {Message} from "@arco-design/web-vue";

export default {
  name: "application-table",
  components:{
    applicationDetail,
    checkButton,
    deleteButton,
  },

  props:{
    select:{default:true},
    rows:{default:[]},
    data:{default:[]},
    loading:{default:false},
    updateData: {
      type: Function,
      default() {}
    }
  },
  watch:{
    selectedKeys(value){
      this.$emit('update:rows', value)
    },
  },
  computed:{
    rowSelection(){
      return this.select? {type: 'checkbox', showCheckedAll: true,}:null
    }
  },
  data(){
    return{
      dayjs,
      identity:this.$route.path.substring(1).split('/')[0],
      columns:[
        {title: '经费名称', dataIndex: 'name' },
        {title: '课题组', dataIndex: 'group'},
        {title:'经费状态', slotName: 'state'},
        {title: '金额', dataIndex: 'cost'},
        {title: '申请日期', slotName: 'date',},
        {title: '经办人', dataIndex: 'people'},
        {title: '支出类别一级', dataIndex: 'category'},
        {title: '操作', slotName: 'optional', fixed: 'right', width:200},
      ],
      selectedKeys:this.rows,
      selectedRecord:'',
      visible:false,
    }
  },

  methods: {
    showDetail(record){
      this.selectedRecord = record
      this.visible = true
    },
    denyApplication(id){
      api.denyApplications([id], 'admin').then(res => {
        if (res.data.code=== 200) {
          Message.success(res.data.msg)
          this.$socket.send('deny');
        } else {
          Message.error(res.data.msg)
        }
      }).finally(()=>{this.updateData()})
    },
    permitApplication(id){
      api.permitApplication(id).then(res => {
        if (res.data.code=== 200) {
          Message.success(res.data.msg)
          this.$socket.send('permit');
        } else {
          Message.error(res.data.msg)
        }
      }).finally(()=>{this.updateData()})
    }
  }
}
</script>

<style scoped>
</style>