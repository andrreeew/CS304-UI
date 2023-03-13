<template>

    <a-space direction="vertical" :size=20 style="width: 100%">
<!--      <a-divider style="margin-bottom: 0px"></a-divider>-->
      <a-table
          :columns="columns"
          :data="data"
          :bordered="false"
          :pagination="false"
          :scroll="{x: 1400, y: '100%',}"
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
          </a-space>
        </template>
      </a-table>


<!--      <div style="display: flex; justify-content: right">-->
<!--        <a-pagination :total="50" size="medium" show-total show-jumper show-page-size />-->
<!--      </div>-->

    </a-space>
</template>

<script>
import dayjs from 'dayjs'

export default {
  name: "record-detail",
  data(){
    return{
      dayjs,
      columns:[
        {title: '经费编号', dataIndex: 'id', width: 150 },
        {title: '经费名称', dataIndex: 'name',  width: 180 },
        {title:'经费状态', slotName: 'state', width: 180 },
        {title: '课题组', dataIndex: 'group', width: 150 },
        {title: '金额', dataIndex: 'num', width: 120 },
        {title: '申请日期', slotName: 'date',},
        {title: '支出类别', dataIndex: 'category', },
        {title: '操作', slotName: 'optional', fixed: 'right', width:150},
      ],
      data:[{
        key: '1',
        id: 4214,
        name: 'Jane Doe',
        state: 'complete',
        group: 'dsafsa',
        num: 2141,
        category: '办公费',
        disabled: true,
      }, {
        key: '1',
        id: 424,
        name: 'Jfsae Doe',
        state: 'reject',
        group: 'dsafsa',
        num: 2141,
        category: '办公费',
        disabled: true,
      }, {
        key: '1',
        id: 424,
        name: 'Jfsae Doe',
        state: 'underway',
        group: 'dsafsa',
        num: 2141,
        category: '办公费',
        disabled: true,
      }
      ],
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
    }
  }
}
</script>

<style scoped>
</style>