<template>
  <a-card style="width: 100%">
    <a-space direction="vertical" :size=20 style="width: 100%">
      <a-divider style="margin-bottom: 0px"></a-divider>
      <div style="display: flex;justify-content: space-between;width: 100%">
        <a-space>
          <a-button>Import</a-button>
          select {{selectedKeys.length}} records
        </a-space>
        <a-space>
          <a-tooltip content="驳回" >
            <delete-button></delete-button>
          </a-tooltip>
          <a-button>
            <template #icon>
              <icon-download />
            </template>
            Download
          </a-button>
        </a-space>
      </div>
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
            <a-tooltip  v-if="record.state==='underway'" content="通过" >
              <check-button></check-button>
            </a-tooltip>
            <a-tooltip  v-if="record.state==='underway'" content="驳回" >
              <delete-button></delete-button>
            </a-tooltip>


          </a-space>
        </template>
      </a-table>

      <div style="display: flex; justify-content: right">
        <a-pagination :total="50" size="medium" show-total show-jumper show-page-size />
      </div>

      <a-modal :visible="visible" @cancel="visible=false" title="申请详情">
        <template #footer>
          <a-space v-if="selectedRecord.state==='underway'">

            <check-button></check-button>
            <delete-button></delete-button>
          </a-space>
        </template>
        <application-detail></application-detail>
      </a-modal>

    </a-space>
  </a-card>
</template>

<script>
import dayjs from 'dayjs'
import deleteButton from "@/components/operation/delete-button"
import checkButton from '@/components/operation/check-button'
import applicationDetail from '@/pages/admin/application/table/components/application-detail'

export default {
  name: "index",
  components:{
    deleteButton,
    checkButton,
    applicationDetail
  },
  data(){
    return{
      dayjs,
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
        name: 'Jane Doe',
        state: 'complete',
        group: 'Li',
        cost: 21424,
        category: '办公费',
        people: 'fasfa',
        disabled: true,
      }, {
        name: 'Jane Doe',
        state: 'reject',
        group: 'Li',
        cost: 21424,
        category: '办公费',
        people: 'fasfa',
        disabled: true,
      }, {
        name: 'Jane Doe',
        state: 'underway',
        group: 'Li',
        cost: 21424,
        category: '办公费',
        people: 'fasfa',
        disabled: true,
      } ],
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
      this.selectedRecord = record
      this.visible = true
      console.log(dayjs(5352))
    }
  }
}
</script>

<style scoped>
</style>