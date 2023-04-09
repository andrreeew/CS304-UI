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
          <check-button @click="permitApplication(selectedRecord.id)"></check-button>
        </a-tooltip>
        <a-tooltip  v-if="selectedRecord.state==='underway'" :content="identity==='admin'?'驳回':'撤回'" >
          <delete-button @click="denyApplication(selectedRecord.id)"></delete-button>
        </a-tooltip>
      </template>
      <application-detail :applicationInfo="applicationInfo" :applicationTimeline="applicationTimeline"></application-detail>
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
        {title: '金额', dataIndex: 'num'},
        {title: '申请日期', dataIndex: 'date'},
        {title: '经办人', dataIndex: 'people'},
        {title: '支出类别一级', dataIndex: 'category'},
        {title: '操作', slotName: 'optional', fixed: 'right', width:200},
      ],
      selectedKeys:this.rows,
      selectedRecord:'',
      visible:false,
      applicationInfo:[
        {label: '申请序号', value: 213},
        {label: '经费编号', value: 321321},
        {label: '经费名称', value: 124214},
        {label: '课题组', value: 1244},
        {label: '课题组总额度', value: 19},
        {label: '已用额度', value: true},
        {label: '经办人', value: 'fasfsa'},
        {label: '支出类别一级', value: true},
        {label: '支出类别二级', value: true},
        {label: '支出金额', value: 192},
        {label: '内容摘要', value: 21414451251},
        {label: '备注', value:241241242}
      ],
      applicationTimeline:{}
    }
  },

  methods: {
    showDetail(record){
      this.getApplicationInfo(record.id)
      this.getApplicationTimeline(record.id)
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
    },
    getApplicationInfo(id){
      api.getApplicationInfo(id).then(res => {
        let info = res.data.data
        this.applicationInfo[0].value = info.applicationId
        this.applicationInfo[1].value = info.fundId
        this.applicationInfo[2].value = info.fundName
        this.applicationInfo[3].value = info.groupName
        this.applicationInfo[4].value = info.groupTotalFund
        this.applicationInfo[5].value = info.groupUsedFund
        this.applicationInfo[6].value = info.people
        this.applicationInfo[7].value = info.category1
        this.applicationInfo[8].value = info.category2
        this.applicationInfo[9].value = info.useNum
        this.applicationInfo[10].value = info.summary
        this.applicationInfo[11].value = info.comment
      })
    },
    getApplicationTimeline(id){
      api.getApplicationTimeline(id).then(res => {
        this.applicationTimeline = res.data.data
      })
    }
  }
}
</script>

<style scoped>
</style>