<template>
  <a-table
      :columns="columns"
      :data="data"
      :bordered="false"
      :row-selection="rowSelection"
      :pagination="false"
      :scroll="{x: 1400, y: '100%',}"
      v-model:selectedKeys="selectedKeys"
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
    <template #date="{ record }">
      {{dayjs(record.date).format('YYYY-MM-DD HH:mm')}}
    </template>
    <template #optional="{ record }">
      <a-space>
        <a-button @click="showDetail(record)">view</a-button>
        <a-tooltip  v-if="identity==='admin'&&record.state==='underway'" content="通过" >
          <check-button></check-button>
        </a-tooltip>
        <a-tooltip  v-if="record.state==='underway'" :content="identity==='admin'?'驳回':'撤回'" >
          <delete-button></delete-button>
        </a-tooltip>
      </a-space>
    </template>
  </a-table>

    <a-modal v-model:visible="visible" title="申请详情">
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

export default {
  name: "application-table",
  components:{
    applicationDetail,
    checkButton,
    deleteButton,
  },
  mounted() {
    console.log(this.$route.path.substring(1).split('/')[0])
  },
  props:{
    select:false,
    rows:[],
  },
  watch:{
    selectedKeys(value){
      this.$emit('update:rows', value)
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
      data:[{
        key: '1',
        id: 4214,
        name: 'Jane Doe',
        state: 'complete',
        group: 'dsafsa',
        num: 2141,
        category: '办公费',
      }, {
        key: '2',
        id: 424,
        name: 'Jfsae Doe',
        state: 'reject',
        group: 'dsafsa',
        num: 2141,
        category: '办公费',
      }, {
        key: '3',
        id: 424,
        name: 'Jfsae Doe',
        state: 'underway',
        group: 'dsafsa',
        num: 2141,
        category: '办公费',
      }
      ],
      selectedKeys:this.rows,
      rowSelection: this.select? {type: 'checkbox', showCheckedAll: true,}:null,
      selectedRecord:'',
      visible:false,
    }
  },

  methods: {
    showDetail(record){
      this.selectedRecord = record
      this.visible = true
    }
  }
}
</script>

<style scoped>
</style>